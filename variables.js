const canvas = document.getElementById("canvas");
canvas.width = Math.min(window.innerWidth - 20, 550);
canvas.height = Math.min(window.innerHeight * 0.6, 400);
const ctx = canvas.getContext("2d");
function responsive_x(x){
    return x/550 *canvas.width;
}
function responsive_y(y){
    return y/400 *canvas.height;
}
// OBJETS
//---RAQUETTE---
let raquette = {
    l: responsive_x(150) >110? responsive_x(150) :110,
    h: responsive_y(20),
    x: canvas.width / 2 - (canvas.width * 0.28) / 2,
    y: canvas.height *0.96,
    taille_actuelle: responsive_x(150),
    dep: responsive_x(6)>3? responsive_x(6):3,
    trail:[],
};
//---BALLE---
let rayon_balle = responsive_x(12);
let min_rayon = 8;
let balles_max = 6;
let balles =[{
    rayon:rayon_balle,
    x:raquette.x + raquette.l/1.5,
    y:raquette.y -rayon_balle,
    dep_x:  2.5,
    dep_y:  -3.5, 
    vitesse: 4.25,
    impacte: 1,
    trail: []
},];
//---JOUEUR---
let joueur = {
    score: 0,
    vie: 3,
    vie_max: {"base":4, "infini":2, "detente":1, "boss":2},
    or:0,
    diamant:0,
    nom: "",
    skins_possedes: {
        raquette: ["base"], balle:["base"], fond: ["base"], titre:[], effet_vic: [], effet_bri: []
    },
    skin_equipe: {
        raquette: "base", balle: "base", fond: "base", titre:"", effet_vic: "", effet_bri: ""
    },
    modes_debloque: ["base"],
    meilleur_score: {"base":0, "infini":0, "detente":0, "boss":0},
    succes_ob: [],
    recompenses_suc: [],
    stats:{or_ttl:0, briques_casse:0, parties_jouees:0, xp:0},
    nbr_quetes:3,
    quetes_jour:[],
    date_quetes:"",
    xp:0,
};
//---BOOST---
let boosts = [
    {type: "raquette+large", actif: false, duree: 12000, rarete: 0.6},
    {type: "balle_lourde", actif: false, duree: 10000, effet: 3, rarete: 0.4},
    {type: "vie+", actif: false, duree: 0, effet: 1, rarete: 0.05},
    {type: "balle+", actif: false, duree:0, rarete: 0.8},
    {type: "explosion", actif:false, duree:0, rarete:0.08},
    {type: "doubleScore", actif:false, duree:12000, effet:1, effet_max:3},
];
let tps_fin =0;
let tps_restant = 0;
let timeout_raquette = null;
let timeout_balle = null;
let timeout_score = null;
let explosions = [];
function briques_boost(){
    let p_boost = Math.random();
    if (p_boost < 0.5){
        let p = Math.random();
            if (p <0.04) return {...boosts[2]};
            if (p < 0.18) return {...boosts[4]};
            if (p < 0.3) return {...boosts[1]};
            if (p < 0.4) return {...boosts[3]}; 
            if (p < 0.55) return {...boosts[0]};
            if (p < 0.65) return {...boosts[5]};

            else  return null;
    } else{
        return null;
    }
}
//---BRIQUES---
let briques = [];
let boost_brique = null;
let indice_vie = 0;
let vie_brique;
function creer_briques(nbr_ligne, nbr_col, vie_max){
    let margeX = responsive_x(44);
    let espaceX = responsive_x(16);
    let espaceY = responsive_y(12);
    let largeurTotale = canvas.width - margeX * 2;
    let largeurBrique = (largeurTotale - (nbr_col - 1) * espaceX) / nbr_col;
    let hauteurBrique = responsive_y(25);
    let b_y =0;
    for (let ligne = 0; ligne < nbr_ligne; ligne++) {
         indice_vie++; 
         for (let col = 0; col < nbr_col; col++) {
            indice_vie+=2; 
            if (indice_vie %2 ===0){
                vie_brique= vie_max ; 
            } else if (indice_vie %3 ===0){ 
                    vie_brique= vie_max-1; 
            } else { vie_brique= vie_max-2 || 1} 
            boost_brique = briques_boost();
            if (mode.id === "boss"){
                b_y = responsive_y(170) + Math.random() * responsive_y(160);
                b_x = responsive_x(35) + Math.random()*(canvas.width - responsive_x(100) - largeurBrique);
            }
            else { b_y = responsive_y(50) + ligne * (hauteurBrique + espaceY);
                b_x = responsive_x(45) + col * (largeurBrique + espaceX);
            }
            briques.push({ 
                x: b_x, 
                y: b_y, 
                l: largeurBrique, 
                h: hauteurBrique, 
                vie: vie_brique, 
                visible: true,
                grossit:1,
                boost: boost_brique });
        } 
    }; 
}
function creer_boss(){
    if (mode.id === "boss"){
        briques.push({x:canvas.width/4, y: responsive_y(60), l:responsive_x(275), h:responsive_y(90),
                    vie:100, vie_max:100, visible:true, grossit:1, cBoss: true, dep_x:2, palier_brique_spwan:[], boost:{...boosts[4]}, degat:10})
    } 
}
const donnees_brique_a_spawn = {90:{vie:1,nbr_lignes:1,nbr_cols:1}, 80:{vie:2,nbr_lignes:1,nbr_cols:3}, 70:{vie:3,nbr_lignes:1,nbr_cols:4}, 60:{vie:4,nbr_lignes:1,nbr_cols:4}, 50:{vie:3,nbr_lignes:2,nbr_cols:5}, 40:{vie:5,nbr_lignes:1,nbr_cols:4}, 30:{vie:6,nbr_lignes:1,nbr_cols:4}, 20:{vie:5,nbr_lignes:2,nbr_cols:5}, 10:{vie:6,nbr_lignes:3,nbr_cols:6}};
function spawn_brique(palier){
    if  (palier in donnees_brique_a_spawn) {
        const {vie,nbr_lignes,nbr_cols} = donnees_brique_a_spawn[palier];
        creer_briques(nbr_lignes,nbr_cols,vie)}

}

function creer_briques_detente(){
    if (mode.id !== "detente") return;
    
    if (briques.length < mode.nbr_briques_max && Math.random() < 0.05){
        let boost_brique = briques_boost();
        briques.push({vitesse:Math.random()*1.6+0.5, x: Math.random()*(canvas.width-responsive_x(115)), y:-40,l: responsive_x(100), h:responsive_y(25), vie:1, visible:true, grossit:1, boost: boost_brique});
    }
}
//---MODES---
let game = {
    base: {id:"base", niveau: 1, pause: false, actif: false, vie_max:joueur.vie_max.base, prix:0},
    infini:{id:"infini", niveau:4, pause: false, actif: false, vie_max:joueur.vie_max.infini, prix:400},
    detente:{id:"detente",nbr_briques_max:12, pause:false, actif:false, vie_max: joueur.vie_max.detente, prix:425},
    boss:{id:"boss", actif:false, pause:false, vie_max: joueur.vie_max.boss, prix:0}
} 
let mode = game.base;
const niveaux = {
    1: {nbr_ligne:4, nbr_col:5, vie_max: 2},
    2: {nbr_ligne:5, nbr_col:6, vie_max: 3},
    3: {nbr_ligne:6, nbr_col:6, vie_max: 4},
    4: {nbr_ligne:6, nbr_col:7, vie_max: 5},
    5: {nbr_ligne:7, nbr_col:7, vie_max: 6}
};
//---QUÊTE---
const dificulte = {1:20, 2:30, 3:50, 4:100, 5:250};
const quete_quoti = [
    {id:"score75", texte:"Faire 75 points", progression:0,objectif:75, type:"score", fini:false, gain:dificulte[1]},
    {id:"or100", texte:"Gagner 100 or", progression:0, objectif:100, type:"or", fini:false,  gain:dificulte[1]},
    {id:"combo20", texte:"Casser 20 briques", progression:0, objectif:20, type:"brique", fini:false,  gain:dificulte[1]},
    {id:"survie", texte:"Finir un niveau sans perdre de vie", progression:0, objectif:1,type:"survie", fini:false,  gain:dificulte[2]},
    {id:"boost", texte:"Obtenir 5 boosts", progression:0, objectif:5, type:"boost", fini:false,  gain:dificulte[1]},
    {id:"multi", texte:"Avoir 5 balles actives", progression:0, objectif:5,type:"balle", fini:false,  gain:dificulte[2]},
    {id:"score150", texte:"Faire 150 points", progression:0, objectif:150,type:"score", fini:false,  gain:dificulte[2]},
    {id:"score200", texte:"Faire 200 points", progression:0, objectif:200,type:"score", fini:false,  gain:dificulte[3]},
    {id:"score250", texte:"Faire 250 points", progression:0, objectif:250,type:"score", fini:false,  gain:dificulte[4]},
    {id:"or1000", texte:"Gagner 1 000 or", progression:0, objectif:1000,type:"or", fini:false,  gain:dificulte[5]},
    {id:"survie4", texte:"Finir 4 niveau sans perdre de vie", progression:0, objectif:4,type:"survie", fini:false,  gain:dificulte[5]},
    {id:"boost25", texte:"Obtenir 25 boosts", progression:0, objectif:25, type:"boost",fini:false, gain: dificulte[3]},
    {id:"boost50", texte:"Obtenir 50 boosts", progression:0, objectif:50,type:"boost", fini:false,  gain:dificulte[4]},
    {id:"combo100", texte:"Casser 100 briques", progression:0, objectif:100,type:"brique", fini:false,  gain:dificulte[3]},
    {id:"combo200", texte:"Casser 200 briques", progression:0, objectif:200,type:"brique", fini:false,  gain:dificulte[4]},
    {id:"combo500", texte:"Casser 500 briques", progression:0, objectif:500,type:"brique", fini:false,  gain:dificulte[5]},
    {id:"multi_modes", texte:"Jouer à tout les modes", progression:0, objectif:4,type:"mode", fini:false,  gain:dificulte[2]},
    {id:"combo75", texte:"Casser 75 briques en mode détente", progression:0, objectif:75,type:"brique", fini:false,  gain:dificulte[3]},
    {id:"score200", texte:"Faire 200 point en mode détente", progression:0, objectif:200,type:"score", fini:false,  gain:dificulte[3]},
];
function generer_quetes_jour(nbr_a_generer,quete_sup){
    let aujourdhui = new Date().toLocaleDateString();
    if (joueur.date_quetes === aujourdhui && joueur.quetes_jour.length >= joueur.nbr_quetes){
        return; // déjà générées
    }
    if (!quete_sup) joueur.quetes_jour = [];

    let copie = [...quete_quoti];
    
    for(let i=0;i<nbr_a_generer;i++){
        let indice = Math.floor(Math.random()*copie.length);
        joueur.quetes_jour.push({
            ...copie[indice],
            progression:0,
            fini:false
        });
        copie.splice(indice,1);
    }
    joueur.date_quetes = aujourdhui;
    sauvegarder();
}
let conteur_mode =[];

//---PASSE DE CASSE---
const xp_palier_suivant = {1:25,2:40,3:50,4:70,5:80,6:100,7:125,8:150,9:175,10:200,11:225,12:250};
const recompense_passe ={cosmos:{0:{gratuit:{type:"or",quant:100},plus:{type:"or",quant:100}},1:{plus:{type:"or",quant:100}},2:{gratuit:{type:"or",quant:150},plus:{type:"or",quant:150}},3:{plus:{type:"or",quant:100}},4:{gratuit:{type:"or",quant:100},plus:{type:"skin_balle",id:"comet_b",nom:"Commette"}},5:{plus:{type:"skin_fond",id:"nebula_f",nom:"Nébuleuse"}},6:{gratuit:{type:"diamant",quant:15},plus:{type:"or",quant:200}},7:{plus:{type:"titre",id:"Cadet de l Espace"}},8:{gratuit:{type:"or",quant:120},plus:{type:"or",quant:100}},9:{plus:{type:"or",quant:250}},10:{gratuit:{type:"skin_raquette",id:"shuttle_r",nom:"Navette"},plus:{type:"effet_brique",id:"poussiere_etoile"}},11:{plus:{type:"or",quant:175}},12:{gratuit:{type:"diamant",quant:15},plus:{type:"or",quant:220}},13:{plus:{type:"titre",id:"Astronaute"}},14:{gratuit:{type:"diamant",quant:15},plus:{type:"or",quant:250}},15:{plus:{type:"effet_victoire",id:"supernova"}},16:{gratuit:{type:"or",quant:180},plus:{type:"or",quant:120}},17:{plus:{type:"skin_balle",id:"alien_b",nom:"Alien"}},18:{gratuit:{type:"or",quant:200},plus:{type:"or",quant:250}},19:{plus:{type:"or",quant:150}},20:{gratuit:{type:"titre",id:"Pilote"},plus:{type:"effet_brique",id:"trou_noir"}},21:{plus:{type:"or",quant:250}},22:{gratuit:{type:"diamant",quant:15},plus:{type:"diamant",quant:15}},23:{plus:{type:"titre",id:"Conquérant Galactique"}},24:{gratuit:{type:"or",quant:250},plus:{type:"or",quant:250}},25:{gratuit:{type:"skin_fond",id:"galactique",nom:"Galactique"},
    plus:{type:"skin_fond",id:"quasar_f", nom:"Quasar"}}},maitre:{0:{gratuit:{type:"or",quant:200},plus:{type:"or",quant:150}},1:{plus:{type:"or",quant:150}},2:{gratuit:{type:"or",quant:100},plus:{type:"skin_raquette",id:"neon_r",nom:"Néon"}},3:{plus:{type:"or",quant:100}},4:{gratuit:{type:"or",quant:150},plus:{type:"skin_balle",id:"matrix_b",nom:"Matrix"}},5:{plus:{type:"skin_fond",id:"cyber_f",nom:"Cyber"}},6:{gratuit:{type:"diamant",quant:15},plus:{type:"or",quant:200}},7:{plus:{type:"titre",id:"Apprenti du Casse"}},8:{gratuit:{type:"or",quant:150},plus:{type:"or",quant:100}},9:{plus:{type:"or",quant:250}},10:{gratuit:{type:"or",quant:180},plus:{type:"effet_brique",id:"brique_doree"}},11:{plus:{type:"or",quant:120}},12:{gratuit:{type:"diamant",quant:15},plus:{type:"or",quant:220}},13:{plus:{type:"titre",id:"Expert des Blocs"}},14:{gratuit:{type:"or",quant:200},plus:{type:"effet_victoire",id:"pluie_de_code"}},15:{plus:{type:"or",quant:250}},16:{gratuit:{type:"or",quant:220},plus:{type:"skin_balle",id:"arcade_b",nom:"Arcade"}},17:{plus:{type:"or",quant:150}},18:{gratuit:{type:"diamant",quant:15},plus:{type:"effet_brique",id:"glitch"}},19:{plus:{type:"or",quant:250}},20:{gratuit:{type:"titre",id:"Vétéran"},plus:{type:"skin_raquette",id:"laser_r",nom:"Laser"}},21:{plus:{type:"or",quant:100}},22:{gratuit:{type:"or",quant:250},plus:{type:"or",quant:250}},23:{plus:{type:"effet_victoire",id:"feux_artifice"}},24:{gratuit:{type:"diamant",quant:15},plus:{type:"or",quant:150}},25:{gratuit:{type:"skin_raquette",id:"en_maitrise",nom:"Maitre"},plus:{type:"titre",id:"Maître Absolu"}}}}

const passe = {
    prix:300,
    passe_act:"",
    passe_fini:0,
    palier_act: 0,
    xp_necessaire:xp_palier_suivant[1],
    plus: false,
    recompense_peut_recup:{gratuit:[0], plus:[0]},
    recompense_recup:{gratuit:[], plus:[]},
    recompense_dispo:1,
    recompense_qui: {"plus":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], gratuit:[0,2,4,6,8,10,12,14,16,18,20,22,24,25]},
}
let passe_plus = {cosmos:false, maitre:false};

//---SAUVEGARDE---
function sauvegarder(){
    let donnees = {
        meilleur_niveau: game.base.niveau,
        skins_possedes: joueur.skins_possedes,
        skin_equipe: joueur.skin_equipe,
        meilleur_score: joueur.meilleur_score,
        or: joueur.or,
        diamant: joueur.diamant,
        modes_debloque: joueur.modes_debloque,
        succes_ob: joueur.succes_ob,
        recompenses_suc: joueur.recompenses_suc,
        stats: joueur.stats,
        vie_max: joueur.vie_max,
        quete_du_jour: joueur.quetes_jour,
        ce_jour: joueur.date_quetes,
        xp: joueur.xp,
        palier_act: passe.palier_act,
        xp_necessaire: passe.xp_necessaire,
        passe_passe_plus: passe.plus,
        passe_act: passe.passe_act,
        recomp_peut_recup: passe.recompense_peut_recup,
        recompense_recup: passe.recompense_recup,
        rec_dispo: passe.recompense_dispo,
        passe_fini: passe.passe_fini,
        nom: joueur.nom,
        nbr_quete: joueur.nbr_quetes,
        passe_plus: passe_plus,
        conteur_mode: conteur_mode,
    }
    localStorage.setItem("save_case_briques", JSON.stringify(donnees));
}
function charger_sauvegarde(){
    let save = localStorage.getItem("save_case_briques");
    if (save){
        let donnees = JSON.parse(save);
        joueur.or = donnees.or ?? joueur.or;
        joueur.diamant = donnees.diamant ?? joueur.diamant;
        joueur.skins_possedes = donnees.skins_possedes ?? joueur.skins_possedes;
        joueur.skin_equipe = donnees.skin_equipe ?? joueur.skin_equipe;
        joueur.modes_debloque= donnees.modes_debloque ?? joueur.modes_debloque;
        joueur.meilleur_score = donnees.meilleur_score ?? joueur.meilleur_score;
        joueur.succes_ob = donnees.succes_ob ?? joueur.succes_ob;
        joueur.recompenses_suc = donnees.recompenses_suc ?? joueur.recompenses_suc;
        joueur.stats =donnees.stats ?? joueur.stats;
        joueur.vie_max = donnees.vie_max ?? joueur.vie_max;
        joueur.quetes_jour = donnees.quete_du_jour ?? [];
        joueur.date_quetes = donnees.ce_jour ?? "";
        joueur.xp = donnees.xp ?? joueur.xp;
        joueur.nom = donnees.nom ?? joueur.nom;
        joueur.nbr_quetes = donnees.nbr_quete ?? joueur.nbr_quetes;
        passe.palier_act = donnees.palier_act ?? passe.palier_act;
        passe.xp_necessaire = donnees.xp_necessaire ?? passe.xp_necessaire;
        passe.plus = donnees.passe_passe_plus ?? passe.plus;
        passe.recompense_peut_recup = donnees.recomp_peut_recup ?? passe.recompense_peut_recup;
        passe.recompense_recup = donnees.recompense_recup ?? passe.recompense_recup;
        passe.recompense_dispo = donnees.rec_dispo ?? passe.recompense_dispo;
        passe.passe_act = donnees.passe_act ?? passe.passe_act;
        passe.passe_fini = donnees.passe_fini ?? passe.passe_fini;
        passe_plus = donnees.passe_plus ?? passe_plus;
        conteur_mode = donnees.conteur_mode ?? conteur_mode
    } 
}
charger_sauvegarde();
         
let leftPressed = false;
let rightPressed = false;

let multiplicateur =1;

let ecran_act = "menu";

//pour anim
let particules = [];
let particules_fond = [];
let pause_frame = 0;
let shake = 0;
let declenche_effet_vic = false;
let rayon_supernova = 0;
let lignes_matrix = [];
let lignes_aura = [];
let trophees_vic = [];
//UI
const menu = document.getElementById("menu");
const jeu_container = document.getElementById("jeu_container");
const win = document.getElementById("victoire");
const defaite = document.getElementById("defaite");
const pause_ecr = document.getElementById("pause");
const shop_ecr = document.getElementById("shop_ecr");
const succes_ecr = document.getElementById("succes_ecr");
const profil = document.getElementById("profil");
const ach_quete = document.getElementById("ach_quete");
const btn_passe = document.getElementById("btn_passe");
const passe_ecr = document.getElementById("passe_de_casse");
const conteneur_passe = document.getElementById("conteneur_passe");
const aff_palier_suivant = document.getElementById("aff_palier_suivant");
const nom_passe = document.getElementById("nom_passe");
const btn_p_suiv = document.getElementById("btn_passe_suiv");

const text_meilleur_score_v = document.querySelector("#meilleur_score_v");
const text_meilleur_score_d = document.querySelector("#meilleur_score_d");

const place_modes = document.getElementById("place_modes");

const messages = document.getElementById("message");
let timeout_message = null;
const message_ui = document.getElementById("message_ui");
let timer_message = null;
const nom_j = document.querySelector(".nom_joueur");
nom_j.textContent = joueur.nom;
const titre_j = document.getElementById("titre");
titre_j.textContent = joueur.skin_equipe.titre;


generer_quetes_jour(joueur.nbr_quetes,false);

/* nouv mode => détente ; 425;  
                spécificité: briques tombe du ciel (max 8 à 12 briques)
                */
//shop =>
const pris_obj = {rare:150, epique:500, legendaire:800};
const shop = {
    raquette: [
        {id: "base", nom:"Base", rarete: "commun", prix:0, color:"#226180",animation:[]},
        {id: "gel", nom:"Gel", rarete: "rare", prix:pris_obj.rare, color:"#90e5f8",animation:[]},
        {id: "feu", nom:"Feu", rarete: "rare", prix: pris_obj.rare, color: "rgb(145, 41, 41)",animation:[]},
        {id: "terre", nom:"Terre", rarete: "rare", prix:pris_obj.rare, color: "rgb(99,75,37)",animation:[]},
        {id:"foudre", nom:"Foudre", rarete:"epique",prix:pris_obj.epique, color:"rgb(44, 199, 255)", animation:[{type:"electrique",color:"rgb(110, 243, 255)"},{type:"glow", color:"#51a5dc"}]},
        {id:"arc_en_ciel", nom:"Arc-en-ciel", rarete:"legendaire",prix:pris_obj.legendaire, color:{1:"rgb(187, 36, 36)",2:"rgb(186,137,36)",3:"rgb(137,186,36)",4:"rgb(36,186,36)",5:"rgb(36,186,137)",6:"rgb(36,137,186)",7:"rgb(36, 36, 186)",8:"rgb(137,36,186)",9:"rgb(186,36,137)",10:"rgb(186,36,36)"}, animation:[{type:"electrique",color:"rgba(176, 160, 83, 0.75)"},{type:"glow", color:"#dede52"}]},

        {id: "gg", nom:"Good Game", rarete: "succes",prix: 0, color: "#5ecfff",animation:[{type:"glow",color:"#ffd700"}]},
        {id:"gold_r", nom:"Gold", rarete:"succes",prix:0,color: "#f4d000",animation:[{type:"glow",color:"#f4e105"},{type:"pulse",glowMin:15,glowMax:28,speed:0.005, color:"#f6b105"},{type:"electrique",color:"rgb(255, 141, 110)"}]},
        {id:"shuttle_r", nom:"Navette", rarete:"passe", prix:0,color:"#b9c8ff",animation:[{type:"glow", color:"#9bc6ff"},{type:"trail", length:8, opacite:0.4,color:"#bde6ff"}]},
        {id:"neon_r", nom:"Néon", rarete:"passe", prix:0,color:"#18ffd1",animation:[{type:"glow", color:"#18ffd1"},{type:"pulse", glowMin:8, glowMax:18, speed:0.008}]},
        {id:"laser_r", nom:"Laser", rarete:"passe", prix:0,color:"#ff214d",animation:[{type:"glow", color:"#ff214d"},{type:"trail", length:12, opacite:0.8},{type:"electrique",color:"rgb(255, 185, 110)"}]},
        {id:"en_maitrise", nom:"Maître", rarete:"passe",prix:0,color:"#ffd54a",animation:[{type:"glow",color:"#ffe870"},{type:"pulse",glowMin:15,glowMax:35,speed:0.005}]},
    ],
    balle: [
        {id: "base", nom:"Base", rarete: "commun", prix:0, color: "#226180",animation:[{type:"trail",length:10, opacite:0.6}]},
        {id: "gel", nom:"Gel", rarete: "rare", prix:pris_obj.rare, color:"#90e5f8",animation:[{type:"glow", glow:20, color:"#aaefff" }]},
        {id: "feu", nom:"Feu", rarete: "rare", prix: pris_obj.rare, color: "rgb(145, 41, 41)",animation:[{type:"particule"},{type:"glow", glow:20, color:"rgb(255, 0, 17)"}]},
        {id: "terre", nom:"Terre", rarete: "rare", prix:pris_obj.rare, color: "rgb(99, 75, 37)",animation:[{ type:"pulse",glowMin:10,glowMax:35,speed:0.005,color:"rgb(33,25,12)"}]},
        {id:"neon", nom:"Néon", rarete:"epique", prix:pris_obj.epique,color:"#ff008c",animation:[{type:"aura", color:"#c53439"},{type:"trail",color:"#e9429e49"},{type:"electric",color:"#e9429e"}]},

        {id:"cosmos", nom:"Cosmos", rarete:"legendaire", prix:pris_obj.legendaire,color:"#c36322",animation:[{type:"glow", glow:25},
        {type:"pulse", glowMin:10, glowMax:35, speed:0.005},{type:"trail", length:12, opacite:0.9},
        {type:"orbite", color:"rgb(194, 128, 29)", rayon:4, nbr:2 }]},
        {id:"gold_b", nom:"Gold", rarete:"succes", prix:0, color:"#f4d000", animation:[{type:"glow", glow:22, color:"#fff2a8"},
        {type:"trail", length:15, opacite:0.9},
        {type:"pulse", glowMin:15, glowMax:36, speed:0.004},{type:"orbite", color:"#fff2a8", rayon:4,nbr:3 }
        ]},
        {id:"voyageur", nom:"Voyageur", rarete:"succes",prix:0, color:"rgba(190, 184, 255, 0.65)",animation: [{type:"trail",color:"rgba(190, 184, 255, 0.35)"},{type:"orbite"}]},
        {id:"comet_b", nom:"Commette", rarete:"passe", prix:0,color:"#d5de1d",animation:[{type:"trail", length:20, opacite:0.95},{type:"glow", glow:30, color:"#fff2a8"},{type:"orbite", color:"#ffe59d", rayon:3, nbr:2},{type:"particule"}]},
        {id:"alien_b", nom:"Alien", rarete:"passe", prix:0,color:"#78ff8e",animation:[{type:"pulse", glowMin:12, glowMax:28, speed:0.005},{type:"orbite", color:"#bbff8f", rayon:4, nbr:3},{type:"aura",color:"#78ff8e"},{type:"particule"}]},
        {id:"matrix_b", nom:"Matrix", rarete:"passe", prix:0,color:"#00ff6e",animation:[{type:"trail", length:10, opacite:0.7},{type:"glow",glow:20, color:"#00ff6e"},{type:"electric",color:"#00ff6e"}]},
        {id:"arcade_b", nom:"Arcade", rarete:"passe", prix:0,color:"#ff8e00",animation:[{type:"pulse", glowMin:10, glowMax:22, speed:0.008},{type:"trail", length:12, opacite:0.8},{type:"aura",color:"#ff9d00"},{type:"particule"}]},
    ],
    fond: [
        {id: "base", nom:"Base", rarete: "commun", prix:0, color: "#04545a78",animation:[]},
        {id: "gel", nom:"Gel", rarete: "rare", prix:pris_obj.rare, color:"#5d9fadd8",animation:[{type:"none"}]},
        {id: "feu", nom:"Feu", rarete: "rare", prix: pris_obj.rare, color: "rgb(94, 10, 12)",animation:[{type:"none"}]},
        {id: "terre", nom:"Terre", rarete: "rare", prix:pris_obj.rare, color: "rgb(75, 42, 2)",animation:[{type:"none"}]},
        {id:"eau", nom:"Eau", rarete:"epique", prix:pris_obj.epique, color:"#37705f", animation:[{type:"particule",color:"rgb(47, 159, 164)",genere:false}]},
        {id:"pousiere_doree", nom:"Pousière dorée", rarete:"legendaire", prix:pris_obj.legendaire, color:"#9f9c38e2", animation:[{type:"particule",color:"rgba(197, 194, 0, 0.9)",genere:false},{type:"glow", glow:30, color: "rgb(228, 222, 140)"}]},

        {id:"gold_f", nom:"Gold", rarete:"succes", prix:0, color:"#6e5c1f", animation:[]},
        {id:"champion", nom:"Champion", rarete:"succes", prix:0, color:"#2b0064de", animation:[]},
        {id:"nebula_f", nom:"Nebuleuse", rarete:"passe", prix:0,color:"#22114b",animation:[]},
        {id:"quasar_f", nom:"Quasar", rarete:"passe", prix:0,color:"#150026",animation:[]},
        {id:"cyber_f", nom:"Cyber", rarete:"passe", prix:0,color:"#001212",animation:[]},
        {id:"galactique", nom:"Galactique", rarete:"passe",prix:0,color:"#090019",animation:[{type:"etoiles"},{type:"nebuleuse"}]},
    ],
    titre:[
        {id:"Cadet de l Espace",rarete:"passe"},
        {id:"Apprenti du Casse",rarete:"passe"},
        {id:"Astronaute",rarete:"passe"},
        {id:"Expert des Blocs",rarete:"passe"},
        {id:"Pilote",rarete:"passe"},
        {id:"Vétéran",rarete:"passe"},
        {id:"Conquérant Galactique",rarete:"passe"},
        {id:"Maître Absolu",rarete:"passe"},
    ],
    effet_bri:[
        {id:"poussiere_etoile",  nom:"Poussière d'étoile", rarete:"passe"},
        {id:"brique_doree", nom:"Brique dorée", rarete:"passe"},
        {id:"glitch", nom:"Glitch", rarete:"passe"},
        {id:"trou_noir", nom:"Trou noir", rarete:"passe"},

    ],
    effet_vic:[
        {id:"feux_artifice", nom:"Feux d'artifices", rarete:"passe"},
        {id:"supernova", nom:"Supernova", rarete:"passe"},
        {id:"pluie_de_code", nom:"Pluie de code", rarete:"passe"},
        {id:"vainqueur", nom:"Vainqueur", rarete:"succes", prix:0},

    ],
    Monnaie:[
        {id:"25💎", prix:500, quantite:25, reduc:0}, // 1💎 = 20or
        {id:"50💎", prix:1000, quantite:50, reduc:0},
        {id:"100💎", prix:1800, quantite:100, reduc:10},
        {id:"150💎", prix:2500, quantite:150, reduc:15} //petite reduc ☺
    ]
}
let nbr_skin_shop = 0;
for (let type in shop){
    if (type !== "Monnaie" && type !== "titre" && type !== "effet_bri"){
        for (let skin of shop[type]){
            if (skin.rarete !== "succes" && skin.rarete !== "passe"){
                nbr_skin_shop ++;
            }
        }
    }
}
function acheter_diamant(prix,quantite){
    if (joueur.or > prix){
        joueur.or -= prix;
        joueur.diamant += quantite;
        afficher_message_ui(`Tu as acheté ${quantite} diamant !`, "succes");
        sauvegarder();
        afficher_shop();
    }else{
        afficher_message_ui("Pas assez d'or","error");
    }
}
function acheter(obj,id_skin){
    let skin = shop[obj].find(sk => sk.id === id_skin);
    if (joueur.or >= skin.prix){
        joueur.or -= skin.prix;
        joueur.skins_possedes[obj].push(id_skin);
        maj_succes("radin",skin.prix,true);
        maj_succes("collectionneur",1)
        afficher_message_ui("Skin acheté !","succes");
        equipe(obj,id_skin);
        sauvegarder();
    }else{
        afficher_message_ui("Pas assez d'or !","error")
    }
}
function equipe(obj,id_skin){
    if (joueur.skins_possedes[obj].includes(id_skin)){
        if (obj === "fond"){
            particules_fond = [];
            let skin = shop[obj].find(sk => sk.id === id_skin);
            for (let anim of skin.animation){
                if (anim.type === "particule") anim.genere = false;
            }
        }
        joueur.skin_equipe[obj] = id_skin;
        sauvegarder(); 
    } if (obj === "titre"){
        titre_j.textContent = id_skin;
    }
}
function acheter_skin(obj,id){
    acheter(obj,id);
    verifier_succes("collectionneur");
    afficher_shop();
}
function equiper_skin(obj,id){
    equipe(obj,id);
    afficher_shop();
    afficher_message_ui("Skin équipé !","succes");
}
function changer_onglet(onglet){
    if (onglet === "boutique"){
        ongletAct = "boutique";
    }
    else {
        ongletAct = "casier";
    }
    afficher_shop();
}
const place_skin_shop = document.getElementById("place_skin_shop");
const text_or = document.getElementById("or");
const place_onglet = document.getElementById("shop_onglet");
let ongletAct = "boutique";
function afficher_shop(){
    place_skin_shop.innerHTML = "";
    place_onglet.innerHTML = `<div class="shop_onglet"> 
                                    <button class="btn_onglet ${ongletAct === "boutique"?"actif":""}" onclick="changer_onglet('boutique')">Boutique</button>
                                    <button class="btn_onglet ${ongletAct === "casier"?"actif":""}" onclick="changer_onglet('casier')">Mon casier</button>
                                </div>`
    text_or.textContent = "Or: "+joueur.or+"  "+ "Diamant: "+joueur.diamant;
    for (let type in shop){
        if (ongletAct === "casier" && type === "Monnaie") continue;
        let nom_type = "";
        switch (type){
            case "raquette": nom_type = "Raquette"; break;
            case "balle": nom_type = "Balle"; break;
            case "fond": nom_type = "Fond"; break;
            case "titre": nom_type = "Titre de joueur"; break;
            case "effet_bri": nom_type = "Effet de brique"; break;
            case "effet_vic": nom_type = "Effet de victoire"; break;
        }
         // titre catégorie
        place_skin_shop.innerHTML += `<div class="categorie_shop">
                                        <h3>${nom_type}</h3>`;
        if (type === "Monnaie"){
            for (let obj of shop[type]){
                let reduc ="";
                if (obj.reduc>0){
                    reduc = `-${obj.reduc} %`;
                }
                place_skin_shop.innerHTML += ` <div class="skin_card diams">
                                                        <h3>${obj.id}</h3>
                                                        <p>${reduc}</p>
                                                        <button class="btn_shop diams"
                                                            onclick="acheter_diamant(${obj.prix},${obj.quantite})">
                                                            Acheter ${obj.prix} or
                                                        </button>
                                                    </div>`;
            }
        }
        else{        
            for (let skin of shop[type]){
                let possede = joueur.skins_possedes[type].includes(skin.id);
                let equipe = joueur.skin_equipe[type] === skin.id;
                let bouton = "";
                let texte = "";
                let bloque = false;
                 if (ongletAct === "casier" && !possede) continue;
                 
                if (skin.rarete === "passe" && !possede){
                    bloque = true;
                    texte ="Débloquer ce skin grâce au passe ";
                }
                if (skin.rarete === "succes" && !joueur.recompenses_suc.includes(skin.id) && !possede){
                    bloque = true;
                    texte = "Débloquer ce skin en réalisant un succès";
                }
                if (bloque){
                        bouton = `<button class="btn_shop bloque">Bloqué</button>`;
                        place_skin_shop.innerHTML += `<div class="skin_card bloque">
                                                        <h4>${skin.nom ? skin.nom: skin.id}</h4>
                                                        <p>${texte}</p>
                                                        ${bouton}
                                                    </div>`;
                }else{
                    if (equipe){
                        bouton = `<button class="btn_shop equip">
                                    Equipé
                                </button>`;
                    } else if (possede){
                        bouton = `<button class="btn_shop"
                                    onclick="equiper_skin('${type}','${skin.id}')">
                                    Equiper
                                </button> `;
                    } else {
                        bouton = `<button class="btn_shop"
                                    onclick="acheter_skin('${type}','${skin.id}')">
                                    Acheter ${skin.prix} or
                                </button>`;
                    }
                    place_skin_shop.innerHTML += ` <div class="skin_card ${skin.rarete}">
                                                    <h4>${skin.nom ? skin.nom: skin.id}</h4>
                                                    <p>Rareté : ${skin.rarete}</p>
                                                    ${skin.color ?
                                                        `<div class="preview_skin"
                                                            style="background:${skin.color}">
                                                        </div>`
                                                        : ""
                                                    }
                                                    ${bouton}
                                                </div>`;
                }
            }
        }
        place_skin_shop.innerHTML += `</div>`;
    }
}
//succes =>
let nbr_skin_ob = 0;
for(let type in joueur.skins_possedes){
    if (type !== "titre" && type !== "effet_bri" && type !== "effet_vic"){
        for (let skin_id of joueur.skins_possedes[type]){
            let skin = shop[type].find(s => s.id === skin_id);
            if (skin.rarete !== "succes" && skin.rarete !== "passe" ){
                nbr_skin_ob ++;
            }
        }}
}
const succes =[
    {id: "sans_faute",nom: "Sans faute",debloque:false, objectif:1, progression:0,perdu_vie: false, condition:"Finir tout les niveau en ayant 4 vies et sans en perdre", recompense:{type: "skin", categorie: "raquette",id: "gg" }},
    {id: "radin",nom: "Radin",debloque:false, objectif:5000, progression:joueur.or, or:5000, condition:"Economiser 5 000 or", recompense:{type: "skin", categorie: "balle",id: "gold_b" }},
    {id: "riche",nom: "Riche",debloque:false, objectif:10000, progression:joueur.stats.or_ttl, or:10000, condition:"Obtenir 10 000 or", recompense:{type: "skin", categorie: "fond",id: "gold_f" }},
    {id: "pro",nom: "Pro",debloque:false, objectif:350, progression:0, score:350, condition: "Avoir un score de 350 en mode infini", recompense:{type: "skin", categorie: "fond",id: "champion" }},
    {id: "destructeur", nom:"Destructeur", debloque: false, objectif:2000, progression:joueur.stats.briques_casse, brique_casse:2000, condition: "Casser 2000 briques",recompense:{type:"or",gain:800}},
    {id: "acro",nom:"Acro au jeu",debloque:false, objectif:100, progression:joueur.stats.parties_jouees, parties_jouees:100, condition:"Jouer 100 parties",recompense:{type:"vie_max", gain:1}},
    {id:"collectionneur", nom:"Collectionneur",debloque:false, objectif:nbr_skin_shop, progression:nbr_skin_ob, skin_ob: nbr_skin_shop, condition: "Obtenir tous les skins du shop (hors succès & passe)",recompense:{type:"skin", categorie:"raquette",id:"gold_r"}},
    {id:"maitre_zen", nom:"Maître zen", debloque:false, objectif:300, progression:0, score:300, condition:"Avoir un score de 300 en mode détente", recompense:{type:"skin", categorie:"balle",id:"voyageur"}},
    {id:"champion", nom:"Champion", debloque:false,objectif:1, progression:0, perdu_vie:false, condition:"Térrasser le BOSS sans perdre de vie", recompense:{type:"skin", categorie:"effet_vic",id:"vainqueur"}},

]
function maj_succes(id_suc,ajout,moins=false){
    for (let suc of succes){
        if (joueur.succes_ob.includes(suc.id)) continue;
        if (suc.id === id_suc){

            if (!moins) suc.progression += ajout;

            else suc.progression -= ajout;
        }
    }
}

const place_suc = document.getElementById("place_suc");
function afficher_succes(){
    place_suc.innerHTML = "";
    for (let suc of succes){
        let etat = null;
        if (joueur.succes_ob.includes(suc.id)){
            etat = "debloque";
            suc.debloque = true;
        }else{
            etat = "bloque";
            suc.debloque = false;
        }
        let pourcentage = suc.debloque? 100 : suc.progression/ suc.objectif *100;
        place_suc.innerHTML += `<div class="succes_card ${etat}">
                                    <h3>${suc.nom}</h3>
                                    <p>${suc.condition}</p>
                                    <div class="barre">
                                        <div class="remplisage suc" style="width:${pourcentage}%">
                                        </div>
                                    </div>
                                </div>`;
    }
}
function verifier_succes(){
    for (let suc of succes){
        if (joueur.succes_ob.includes(suc.id)){
            suc.debloque = true;
            continue;
        }
        let condition_remplie = false;
        switch (suc.id){
            case ("sans_faute"):
            condition_remplie = !suc.perdu_vie && joueur.vie ===joueur.vie_max["base"] && mode.niveau===5 && briques.length ===0 &&!suc.debloque;
            break;

            case ("radin"):
                condition_remplie =joueur.or >= suc.or;
                break;

            case  "pro":
                if (mode === game.infini){
                    condition_remplie= suc.score <= joueur.meilleur_score.infini || suc.score <= joueur.score;
                }
                break;
            
            case "riche":
               condition_remplie = joueur.stats.or_ttl >= suc.or;
               break;
            
            case "destructeur":
                condition_remplie = joueur.stats.briques_casse >= suc.brique_casse;
                break;
            
            case "acro":
                condition_remplie = joueur.stats.parties_jouees >= suc.parties_jouees;
                break;
            
            case "collectionneur":
                nbr_skin_ob =0;
                for(let type in joueur.skins_possedes){
                    if (type !== "titre" && type !== "effet_bri" && type !== "effet_vic"){
                        for (let skin_id of joueur.skins_possedes[type]){
                            let skin = shop[type].find(s => s.id === skin_id);
                            if (skin.rarete !== "succes" && skin.rarete !== "passe" ){
                                nbr_skin_ob ++;
                            }
                        }}
                }
                condition_remplie = nbr_skin_ob >=suc.skin_ob;
                break;
            case "maitre_zen":
                if (mode.id === "detente"){
                    condition_remplie = joueur.score >= suc.score;
                }
                break;
            case "champion":
                condition_remplie = !suc.perdu_vie && mode.id === "boss" && briques.length === 0;
                
                break;
        }
        if (condition_remplie){
            suc.debloque = true;
            joueur.succes_ob.push(suc.id);
            joueur.recompenses_suc.push(suc.recompense.id);
            gagner_xp(250);
            afficher_message_ui(`Succès débloqué : ${suc.nom} !`, "record");
            if (suc.id === "champion") maj_succes("champion",1);
            if (suc.id === "sans_faute") maj_succes("sans_faute",1);
            if (suc.id === "destructeur"){
                joueur.or += suc.recompense.gain;
                joueur.stats.or_ttl += suc.recompense.gain;
                afficher_message_ui(`Succès débloqué : ${suc.nom} ! \nTu as gagné ${suc.recompense.gain} or`, "record");
            }
            if (suc.id === "acro"){
                joueur.vie_max["base"]+= suc.recompense.gain;
                joueur.vie_max["infini"] += suc.recompense.gain;
                joueur.vie_max["detente"] += suc.recompense.gain;
                game.base.vie_max = joueur.vie_max.detente;
                game.base.vie_max = joueur.vie_max.base;
                game.infini.vie_max = joueur.vie_max.infini;
                afficher_message_ui(`Succès débloqué : ${suc.nom} !\nVie maximale augmentée de ${suc.recompense.gain}`, "record");
            }
        }
    }
}

const place_quete = document.querySelector("#place_quete");
function afficher_quete(){
    place_quete.innerHTML = "";
    for (let quete of joueur.quetes_jour){
        let pourcentage = (quete.progression/quete.objectif)*100;
        place_quete.innerHTML += `<div class="card_quete ${quete.fini ? "fini":""}">
                                    <h4>${quete.texte}</h4>
                                    <h4>Recompense: ${quete.gain}xp</h4>
                                    <div class="barre">
                                        <div
                                            class="remplisage"
                                            style="width:${pourcentage}%">
                                        </div>
                                    </div>
                                    <p> ${quete.objectif ? `${quete.progression}/${quete.objectif}`: (quete.fini ? "✓ Terminé": "En cours")}</p>
                                 </div>`
    }
    if (joueur.nbr_quetes >=5){
        ach_quete.style.display = "none";
    }
}
afficher_quete();
function maj_quete(type,valeur=1){
    place_quete.innerHTML = "";
    for (let quete of joueur.quetes_jour){
        if (quete.fini) continue;
        if (quete.type === type){
            quete.progression +=  valeur;

            if (quete.progression >= quete.objectif){
                quete.progression = quete.objectif;
                quete.fini = true;
                gagner_xp(quete.gain);
                afficher_message_ui(`Quête terminé ! +${quete.gain} xp`,"succes");
            }
        }
    }
    sauvegarder();
}
function acheter_quete(){
    if (joueur.nbr_quetes <5){
        if (joueur.diamant >= 20){
            joueur.nbr_quetes++;
            joueur.diamant -= 20;
            afficher_message_ui("Quête supplémentaire acheté !", "succes");
            generer_quetes_jour(1,true);
            afficher_quete();
        }else {
            afficher_message_ui("Pas assez de diamant !","error");
        }
    }else {
        afficher_message_ui("Trop de quête acheté !", "error");
        ach_quete.style.display = "none";
    }
}

function palier_suivant(){
    while (joueur.xp >= passe.xp_necessaire){
        joueur.xp -= passe.xp_necessaire;
        passe.palier_act++;

        passe.recompense_peut_recup.plus.push(passe.palier_act);
        if (passe.plus){
        passe.recompense_dispo++;
        }  
        if (passe.recompense_qui.gratuit.includes(passe.palier_act)){
                passe.recompense_dispo++;
                passe.recompense_peut_recup.gratuit.push(passe.palier_act);
        }
        // Met à jour l'XP requise pour le nouveau palier (avec une sécurité si > palier 12)
        let prochain_palier = Math.min(passe.palier_act + 1, 12);
        passe.xp_necessaire = xp_palier_suivant[prochain_palier];
        btn_passe.classList.add("recomp_dispo");
    }
    if (passe.palier_act >= 25 && passe.passe_fini <2){
        if (passe.passe_act === "cosmos"){
            afficher_message_ui("Passe de casse Cosmos terminé !","record");
        }else{
            afficher_message_ui("Passe de casse Maitre terminé !","record");
        }
    }
    sauvegarder();
}
function passe_suivant(){
    if (passe.passe_fini < 1) {
        // Le joueur vient de finir le premier passe, on passe automatiquement au deuxième
        passe.passe_fini = 1;
        passe.passe_act = (passe.passe_act === "cosmos") ? "maitre" : "cosmos";
        
        btn_p_suiv.style.display = "none";
        passe.palier_act = 0;
        passe.plus = false;
        passe.recompense_dispo = 1;
        passe.xp_necessaire = xp_palier_suivant[1];
        passe.recompense_peut_recup = {gratuit: [0], plus: [0]};
        passe.recompense_recup = {gratuit: [], plus: []};
        
        afficher_message_ui("Nouveau passe débloqué !", "record");
        afficher_passe();
        sauvegarder();
    } 
    else {
        // Le joueur a fini le 2ème passe (ou clique à nouveau alors qu'il a tout fini)
        if (passe.passe_fini === 1) {
            passe.passe_fini = 2; // Les deux passes principaux sont officiellement clos
        }
        
        ouvrir_pop_up("choix");
    }
}
function charger_ancien_passe(nom_du_passe) {
    if (passe.passe_fini < 2) return; // Sécurité
    if (passe_plus.cosmos && passe_plus.maitre) afficher_message_ui("Bravo tu as fini tout les Passes de Casses !", "record");
    passe.plus = false;
    passe.passe_act = nom_du_passe;
    
    // 1. Définir si la version Plus de cet ancien passe avait été achetée
    passe.plus = (nom_du_passe === "cosmos") ? passe_plus.cosmos : passe_plus.maitre;
    console.log(passe.plus)
    
    // 2. On bloque le palier au max (25) puisqu'il a déjà été complété dans le passé
    passe.palier_act = 25;
    passe.xp_necessaire = xp_palier_suivant[12]; // Juste visuel pour la barre d'XP
    joueur.xp = passe.xp_necessaire;
    
    // 3. Forcer TOUTES les récompenses gratuites à être considérées comme déjà récupérées
    passe.recompense_peut_recup.gratuit = [];
    passe.recompense_recup.gratuit = [];
    for (let i = 0; i <= 25; i++) {
        passe.recompense_recup.gratuit.push(`palier_${i}`);
    }
    
    // 4. Calculer les récompenses du Pass Plus
    // Si le pass plus est acheté, tout est récupéré. Sinon, tous les paliers Plus passent en "Peut récupérer"
    if (passe.plus) {
        passe.recompense_peut_recup.plus = [];
        passe.recompense_recup.plus = [];
        for (let i = 0; i <= 25; i++) {
            if (passe.recompense_qui.plus.includes(i)) {
                passe.recompense_recup.plus.push(`palier_${i}`);
            }
        }
        passe.recompense_dispo = 0;
    } else {
        // Le pass plus n'est pas acheté : le joueur voit les boutons "Récupérer" (bloqués par le cadenas en UI)
        // Dès qu'il cliquera sur "Acheter 300💎", acheter_passe() lui donnera accès à tout d'un coup !
        passe.recompense_recup.plus = [];
        passe.recompense_peut_recup.plus = [...passe.recompense_qui.plus]; 
        passe.recompense_dispo = 0; 
    }
    
    // Rafraîchissement de l'interface
    fermer_pop_up(); // Ferme la pop-up de choix
    afficher_passe();
    sauvegarder();
}
function acheter_passe(){
    if (passe.plus) {
        afficher_message_ui("Déjà acheté ! ","succes");
        return;
    };
    if (joueur.diamant >= passe.prix){
        joueur.diamant -= passe.prix;
        joueur.xp += 500;
        joueur.stats.xp +=500;
        passe.plus = true;
        passe.recompense_dispo += passe.recompense_peut_recup.plus.length;

        if (passe.passe_act === "cosmos") passe_plus.cosmos = true;
        if (passe.passe_act === "maitre") passe_plus.maitre = true;
        
        afficher_message_ui("Passe de casse plus acheté !","record");

    }else{
        afficher_message_ui("Pas assez de diamant ! ","error");
    }
    afficher_passe();
    sauvegarder();
}
function donner_recompense(palier,quel_passe){
    let recompense = recompense_passe[passe.passe_act][palier]?.[quel_passe];
    if (!recompense) return;
    let texte = ``;
    if (recompense.type === "or"){
        joueur.or += recompense.quant;
        joueur.stats.or_ttl += recompense.quant;
        maj_succes("radin",recompense.quant);
        maj_succes("riche",recompense.quant);
        texte = `${recompense.quant} ${recompense.type}`;
    }else if (recompense.type === "diamant"){
        joueur.diamant += recompense.quant;
         texte = `${recompense.quant} ${recompense.type}`;
    }else if (recompense.type === "skin_raquette"){
        joueur.skins_possedes.raquette.push(recompense.id);
         texte = `Skin de raquette: ${recompense.nom}`;
    }
    else if (recompense.type === "skin_balle"){
        joueur.skins_possedes.balle.push(recompense.id);
        texte = `Skin de balle: ${recompense.nom}`;
    }else if (recompense.type === "skin_fond"){
        joueur.skins_possedes.fond.push(recompense.id);
        texte = `Skin de fond: ${recompense.nom}`;
    }else if (recompense.type === "titre"){
        joueur.skins_possedes.titre.push(recompense.id);
        titre_j.textContent = joueur.titre_equipe;
        texte = `Nouveau titre`;
    }else if (recompense.type === "effet_brique"){
        joueur.skins_possedes.effet_bri.push(recompense.id);
        texte = `Nouvel effet de brique`;
    }
    else if (recompense.type === "effet_victoire"){
        joueur.skins_possedes.effet_vic.push(recompense.id);
        texte = `Nouvel effet de victoire`;
    }
    afficher_message_ui(`${texte} récupéré !`,"succes");
}
function recuperer_obj(obj,palier,plus_ach){
    if (passe.recompense_peut_recup.plus.includes(palier) && plus_ach){
        if (passe.plus){
            if (passe.recompense_recup.plus.includes(obj) ){
                afficher_message_ui("Déjà récupéreé ! ","succes");
                return;
            }
            passe.recompense_recup.plus.push(obj);
            passe.recompense_dispo--;
            passe.recompense_peut_recup.plus= passe.recompense_peut_recup.plus.filter(p => p !== palier);
            donner_recompense(palier,"plus");
            sauvegarder();
            afficher_passe();
        }
    }else if (passe.recompense_peut_recup.gratuit.includes(palier)){
        if (passe.recompense_recup.gratuit.includes(obj) ){
            afficher_message_ui("Déjà récupéreé ! ","succes");
            return;
        }
        passe.recompense_recup.gratuit.push(obj);
        passe.recompense_dispo--;
        passe.recompense_peut_recup.gratuit = passe.recompense_peut_recup.gratuit.filter(p => p !== palier) ;
        donner_recompense(palier,"gratuit");
        sauvegarder();
        afficher_passe();
    }
    if (passe.recompense_dispo<=0){
        btn_passe.classList.remove("recomp_dispo");
    }
}
function afficher_passe(){
    if (passe.passe_act !== "cosmos" && passe.passe_act !== "maitre"){
        conteneur_passe.innerHTML = `<button class="btn" id="btn_chois_passe" onclick="ouvrir_pop_up('choix')">Choisir un passe</button>`
    }else {
        nom_passe.textContent = "";
        aff_palier_suivant.innerHTML ="";
        conteneur_passe.innerHTML = "";
        let pourcentage = (joueur.xp/passe.xp_necessaire)*100;
        let afi_pal_suiv= `<h4>Palier suivant (${passe.palier_act+1})</h4>
                            <p>${joueur.xp}/${passe.xp_necessaire}</p>
                                        <div class="barre">
                                            <div class="remplisage" style="width:${pourcentage}%">
                                            </div>
                                        </div>`
        let p_texte ="Activé";
        let html_gratuit = `
            <div id="place_passe_gratuit">
                <h3>Gratuit</h3>
                <p style="padding:7px">${p_texte}</p>
        `;
        if (passe.plus){
            p_texte = "Activé";
        }else{
            p_texte = "Acheter";
        }
        let html_plus = `
            <div id="place_passe_plus">
                <h3>💎 Plus 💎</h3>
                <p id="p_achete_passe" onclick="acheter_passe()">${p_texte} ${passe.prix}💎</p>
        `;
        let palier_nbr = "";
        let palier_nbr_p = "";
        for (let palier = 0; palier <= 25; palier++){
            palier_nbr = `palier_${palier}`;
            palier_nbr_p = `palier_${palier}`;
            let texte_g = "";
            let texte_p = "";
            if (passe.recompense_recup.gratuit.includes(palier_nbr)){
                texte_g = "Récupéré";
            }else if (passe.recompense_peut_recup.gratuit.includes(palier)){
                texte_g = "Récupérer";
            }
            else{
                texte_g = `${passe.recompense_qui.gratuit.includes(palier)? "Récompense ☺": "—"}`;
            }
            if (passe.recompense_recup.plus.includes(palier_nbr)){
                texte_p = "Récupéré";
            }else if  (passe.recompense_peut_recup.plus.includes(palier)){ 
                texte_p = "Récupérer";               
            }
            else{
                texte_p =  `${passe.recompense_qui.plus.includes(palier) ? "Récompense ☺" : "🔒"}`;
            }
            // GRATUIT
            let dispo_g = passe.palier_act >= palier && passe.recompense_qui.gratuit.includes(palier);
            html_gratuit += `
                <div class="case_passe ${dispo_g ? "dispo" : ""}" onclick="recuperer_obj('${palier_nbr}',${palier},${false})">
                    <p>Palier ${palier}</p>
                    ${texte_g}
                </div>
            `;
            // PREMIUM
            let dispo_p =passe.palier_act >= palier && passe.recompense_qui.plus.includes(palier);
            let a_plus_ou_pas = "";
            if (!passe.plus && dispo_p){
                a_plus_ou_pas = "pas_plus";
            }

            html_plus += `
                <div class="case_passe ${ a_plus_ou_pas} ${dispo_p ? "dispo" : ""}" onclick="recuperer_obj('${palier_nbr_p}',${palier},${true})">
                    <p>Palier ${palier}</p>
                    ${texte_p}
                </div>
            `;
        }
        html_gratuit += "</div>";
        html_plus += "</div>";
        if (passe.palier_act >= 25){
            if(passe.passe_fini <2 && (!passe_plus.cosmos || !passe_plus.maitre)) btn_p_suiv.textContent = "Revenir au passe pour le finir";
            btn_p_suiv.style.display = "flex";
            if (passe.passe_fini === 2 && !passe.plus) btn_p_suiv.style.display = "none";
        }
        nom_passe.textContent = passe.passe_act;
        aff_palier_suivant.innerHTML = afi_pal_suiv;
        conteneur_passe.innerHTML = html_gratuit + html_plus;
    }
}

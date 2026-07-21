function niveau_suivant(){
    afficher_message("Appuis sur Entrée pour commencer !", "indic_entree");
    mode.niveau++;
    balles[0].vitesse +=0.25;
    gagner_xp(15);
    sauvegarder();
    initGame();
    jeu();
}
function creer_effet_victoire(){
    if (joueur.skins_possedes.effet_vic.length === 0) return;

     switch (joueur.skin_equipe.effet_vic){
        case "feux_artifice":
            if (Math.random() < 0.06){
                particules.push({x: responsive_x(15)+Math.random()*canvas.width, y:canvas.height,
                    dx:Math.random()-0.5, dy: -5, type: "feu_artifice", cible_y: Math.random()*300+50,
                    color: "rgb(173, 164, 28)", alpha:2, rayon:3
                })
            }
            break;
        case "pluie_de_code":
            if (lignes_matrix.length !== 0) return;
            for (let i=0; i < canvas.width/25; i++){
                lignes_matrix.push({x:i*25, y: Math.random()*-canvas.height, largeur:25,hauteur:Math.random()*40+20, vitesse:Math.random()*4+2})
            }
            break;
        case "vainqueur":
            if (lignes_aura.length !== 0) return;
            if (trophees_vic.length !== 0)return;
            for (let i=0; i< 18; i++){
                lignes_aura.push({x: Math.random()*canvas.width,y: canvas.height, l:3.5, d_y: Math.random()*-2-2, alpha:0.5});
            }
            for (let j=0;j<20;j++){
                trophees_vic.push({x:Math.random()*canvas.width, y:-30, d_y:Math.random()*2+1, alpha:1, rotation:Math.random()*Math.PI*2})
            }
     } 
     return joueur.skin_equipe.effet_vic;
}
function boucle_ecran_victoire() {
    // On efface le canvas pour la nouvelle frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    creer_effet_victoire(); 
    draw_effet_victoire();
    draw_particules();
    if (ecran_act === "victoire" || ecran_act === "defaite"){
        requestAnimationFrame(boucle_ecran_victoire);
    }
}
function victoire(){
    let nouv_m_sc = false;
    if ("base" === mode.id){
        if (briques.length ===0){
            mode.actif = false;
            if (/* mode.niveau === 1 */mode.niveau === Object.keys(niveaux).length){
                if (joueur.meilleur_score[mode.id] < joueur.score){
                    joueur.meilleur_score[mode.id] = joueur.score;
                    nouv_m_sc = true;
                }
                declenche_effet_vic = true;
                verifier_succes();
                sauvegarder();
                afficher_ecran("victoire",nouv_m_sc);
                boucle_ecran_victoire();
            } else {
                gagner_or(0,25);
                if (!succes[0].perdu_vie){
                    maj_quete("survie");
                }
                afficher_message("Niveau suivant !", "niv_suivant");
            }
        }
    }
    if ( mode.id === "boss"){
        if (briques.length ===0){
            if (joueur.meilleur_score[mode.id] < joueur.score){
                joueur.meilleur_score[mode.id] = joueur.score;
                nouv_m_sc = true;
            }
            mode.actif = false;
            declenche_effet_vic = true;
            verifier_succes();
            sauvegarder();
            afficher_ecran("victoire", nouv_m_sc);
            boucle_ecran_victoire();
        }
    }
}
function mort(){
    if (joueur.vie<=0){
        afficher_ecran("defaite");
        if (joueur.meilleur_score[mode.id] < joueur.score){
            joueur.meilleur_score[mode.id] = joueur.score;
            declenche_effet_vic = true;
            afficher_ecran("defaite",true);
            boucle_ecran_victoire();
        }
        shake =0;
        joueur.score =0;
        succes[3].progression = 0;
        succes[7].progression = 0;
        mode.actif = false;
        ctx.restore();
        sauvegarder();
    }
}
function jeu_pause(){
    if (mode.pause === false){
        mode.pause = true;
        mode.actif = false;
        afficher_ecran("pause");
    }else if (mode.pause === true){
        mode.pause = false;
        mode.actif = true;
        jeu();
        afficher_ecran("jeu");
    }
}
function gagner_or(or=1,orBonus){
    if (mode === game.base){
        if (briques.length ===0){
            joueur.or += orBonus;
            joueur.stats.or_ttl += orBonus;
            maj_quete("or",orBonus);
            afficher_message_ui(`Bonus de fin de niveau: ${orBonus}or & 15xp`,"succes");
        }
    }
    joueur.or+=or;
    joueur.stats.or_ttl+= or;
    maj_succes("riche",or);
    maj_succes("radin",or);
    verifier_succes();
    maj_quete("or",or);
    sauvegarder();
}
function gagner_xp(xp){
    if (passe.palier_act >=25) return;
    joueur.xp += xp;
    joueur.stats.xp += xp;
}
function gagner_score(score){
    score_augmente = score*multiplicateur;
    joueur.score += score_augmente;
    if (mode.id === "infini") maj_succes("pro",score_augmente);
    if (mode.id === "detente") maj_succes("maitre_zen",score_augmente);
    return score_augmente
}
let dernier_palier = 0;
function malus(){
    if (mode === game.infini){
        let palier =Math.floor(joueur.score / 50);
        if (palier > dernier_palier && joueur.score !==0){
            for (let i=0; i<balles.length; i++){
                let balle = balles[i];
                if (balle.vitesse <5){
                    balle.vitesse +=0.5;
                    raquette.dep +=0.25;
                }
            }
            if (raquette.taille_actuelle > responsive_x(80)){
                raquette.taille_actuelle -= responsive_x(10);
            }
            dernier_palier = palier;
        }
    }
}

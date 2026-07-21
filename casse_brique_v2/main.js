function initGame() {
    savoir_ecran();
    succes[0].perdu_vie = false;
    succes[8].perdu_vie = false;
    raquette.l = responsive_x(150);
    raquette.taille_actuelle = raquette.l;
    raquette.h = responsive_y(20);
    raquette.x = canvas.width / 2 - (canvas.width * 0.28) / 2;
    raquette.y = canvas.height *0.96;
    raquette.dep = responsive_x(6) >3? responsive_x(6):3;
    balles.splice(1);
        balles[0].rayon = responsive_x(12);
        balles[0].x = raquette.x + raquette.l/1.5;
        balles[0].y = raquette.y-rayon_balle;
        balles[0].dep_x = 2.5;
        balles[0].dep_y = -3.5;
        balles[0].vitesse = 4.25;
        balles[0].impacte = 1;
        balles[0].trail = [];
    briques = [];
    if (mode.id !== "detente" && mode.id !== "boss"){
        // On extrait directement les 3 variables de l'objet niveau actuel
        const { nbr_ligne, nbr_col, vie_max } = niveaux[mode.niveau];
        creer_briques(nbr_ligne, nbr_col, vie_max);
    }
    if (mode.id === "boss") creer_boss();
    clearTimeout(timeout_balle);

}

function jeu(){
    canvas.style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate((Math.random()-0.5)*shake,(Math.random()-0.5)*shake);
    shake*=0.8;
     
    draw_fond();
    draw_particule_fond();
    draw_particules();
    draw_briques();
    draw_explosion();
    draw_raquette();
    draw_balle();
    draw_vies();
    draw_score();
    draw_or();
    ctx.restore();
    
    colision_balle_murs();
    colision_balle_raquette();
    colision_balle_briques();

    creer_briques_detente();
    deplacement_briques();

    if (boosts[0].actif){
        tps_restant = tps_fin -Date.now();
        if (tps_restant <=0){
            boosts[0].actif = false;
            tps_restant = 0;
            raquette.l = raquette.taille_actuelle;
        }else if (tps_restant <2000){
            if (raquette.l > raquette.taille_actuelle){
                raquette.l -= (raquette.l-raquette.taille_actuelle)/40;
            }
        }
    }

    malus();
    perte_vie();
    mort();
    victoire();
    palier_suivant();

    if (pause_frame >0 && mode.actif){
        pause_frame--;
        requestAnimationFrame(jeu);
        return;
    }

    balles.forEach((balle) => {
        balle.x += balle.dep_x;
        balle.y += balle.dep_y;
        balle.trail.push({ x: balle.x, y: balle.y });
        if (balle.trail.length > 15) {
            balle.trail.shift();
        }
    });

    raquette.trail.push({x:raquette.x, y:raquette.y});
    if (raquette.trail.length > 10){
        raquette.trail.shift();
    }
    
    if (leftPressed && raquette.x > 0){
        raquette.x -=raquette.dep;
    }
    if (rightPressed && raquette.x + raquette.l < canvas.width){
        raquette.x +=raquette.dep;
    }

    if (!mode.actif) return; 
    requestAnimationFrame(jeu); 
}
function demarrer_jeu(mode_demande){
    if (mode.actif) return;
    afficher_ecran("jeu")
    //----Verif quête ----
    conteur_mode.push(mode_demande);
    if (!conteur_mode.includes(mode_demande.id)){
        conteur_mode.push(mode_demande.id);
        maj_quete("mode");
    }
    
    mode = mode_demande;
    if (mode.id === "base")  mode.niveau =1;
    if (mode.id === "infini" || mode.id === "detente" ) joueur.vie = 1;
    else if (mode.id === "boss") joueur.vie = 2;
    else joueur.vie = 3;
    joueur.score =0;

    afficher_message("Appuis sur Entrée pour commencer !", "indic_entree");
    initGame();
    joueur.stats.parties_jouees++;
    maj_succes("acro",1);
    jeu();
}
function rejouer(){
    if (mode.id === "base")  mode.niveau =1;
    else if (mode.id === "infini" || mode.id === "detente")joueur.vie=1;
    else if (mode.id ===" boss") joueur.vie = 2;
    else joueur.vie =3;
    joueur.score =0;
    initGame();
    demarrer_jeu(mode);
}
function acheter_mode(mode){
    if (joueur.or >= mode.prix){
        joueur.or -= mode.prix;
        joueur.modes_debloque.push(mode.id);
        afficher_message_ui(`Mode ${mode.id} acheté !`,"succes");
        maj_succes("radin",mode.prix,true);
        sauvegarder();
        update_menu();
    }else{
        afficher_message_ui("Pas assez d'or !", "error");
    }
}
function update_menu(){
    place_modes.innerHTML = "";
    let peut_ach_infi = false;
    let peut_ach_detente = false;
    if (joueur.or >= game.infini.prix) peut_ach_infi = true;
    if (joueur.or >= game.detente.prix) peut_ach_detente = true;
    if (joueur.modes_debloque.includes("infini")){
       place_modes.innerHTML += `<button class="btn mode" id="jouer" onclick="demarrer_jeu(game.infini);afficher_ecran('jeu')" >Mode infini</button>`;
    }else{
        place_modes.innerHTML += `<button class="btn bloque ${peut_ach_infi? "peut": "peut_pas"}" onclick="acheter_mode(game.infini)">${game.infini.prix} or</button>`;
    }
    if (joueur.modes_debloque.includes("detente")){
       place_modes.innerHTML += `<button class="btn mode" id="jouer" onclick="demarrer_jeu(game.detente);afficher_ecran('jeu')" >Mode détente</button>`;
    }else{
        place_modes.innerHTML += `<button class="btn bloque ${peut_ach_detente? "peut": "peut_pas"}" onclick="acheter_mode(game.detente)">${game.detente.prix} or</button>`;
    }
    if (passe.recompense_dispo >0){
            btn_passe.classList.add("recomp_dispo");
            btn_passe.textContent = `Passe de casse (${passe.recompense_dispo})`;
    }else {
        btn_passe.classList.remove("recomp_dispo");
        btn_passe.textContent = `Passe de casse`;

    }
    
}
update_menu();

function creer_particules(balle,){
    let skin_balle = shop.balle.find(sk => sk.id === joueur.skin_equipe.balle);
    if (skin_balle.animation.some(anim => anim.type === "particule")) {
        for(let i=0; i<5; i++) { // Génère 5 particules à l'impact
            particules.push({
                x: balle.x,
                y: balle.y,
                rayon: Math.random() * 4 + 2,
                alpha: 1,
                dx: (Math.random() - 0.5) * 3,
                dy: (Math.random() - 0.5) * 3,
                color: skin_balle.color
            });
        }
    }
}
function creer_particule_brique(brique){
    if (joueur.skins_possedes.effet_bri.length ===0) return;
    
    switch (joueur.skin_equipe.effet_bri){
        case "poussiere_etoile":
            for (let i=0; i <10;i++){
                particules.push({ x: brique.x+ brique.l / 2, y: brique.y+ brique.h / 2, rayon: Math.random()*3+2,
                    color: "rgb(216, 233, 150)", alpha:1.5,
                    dx: (Math.random()-0.6)*1.1, dy: (Math.random()-0.6)*1.1
                })
            }
            break;
        case "glitch":
            let decalage_y = [-10,0,10];
            for (let i=0; i <10;i++){
                let random_y = decalage_y[Math.floor(Math.random() * decalage_y.length)];
                particules.push({x:brique.x+ brique.l / 2, y:brique.y+ brique.h / 2 + random_y,
                    alpha:1.25, dx:(Math.random()-0.5)*4, dy:0,
                    forme: "carre", color: "rgb(64, 158, 175)",taille: Math.random() * 5 + 3.8
                })
            }
            break;
        case "trou_noir":
            for (let i=0; i <10;i++){
                particules.push({x: brique.x+ brique.l / 2, y: brique.y+ brique.h / 2, rayon: Math.random()*3.6+2,
                    alpha:1.5, color:"rgb(56, 58, 194)", comportement: "aspiration",
                    dx:(Math.random()-0.5)*8.5, dy:(Math.random()-0.5)*8.5,
                    centreX: brique.x + brique.l / 2, centreY: brique.y + brique.h / 2,
                })
            }
            break;
        case "brique_doree":
            for (let i=0; i <10;i++){
                particules.push({ x: brique.x+ brique.l / 2, y: brique.y+ brique.h / 2, rayon: Math.random()*3+2,
                    color: "rgb(251, 255, 0)", alpha:1,
                    dx: (Math.random()-0.6)*1.3, dy: (Math.random()-0.6)*1.3
                })
            }
            break;
    }
}
function colision_balle_murs(){
    for (let i=0; i<balles.length; i++){
        let balle = balles[i];
    
        if (balle.x + balle.rayon >canvas.width) {
            balle.x = canvas.width - balle.rayon;
            balle.dep_x *= -1;
            creer_particules(balle);
        }else if(balle.x - balle.rayon < 0){
            balle.x = balle.rayon;
            balle.dep_x *=-1;
            creer_particules(balle);
        }
        else if(balle.y - balle.rayon <0){
            balle.y = balle.rayon;
            balle.dep_y *=-1;
            creer_particules(balle);
        }
    }
}
function colision_balle_raquette(){
    for (let i=0; i<balles.length; i++){
        let balle = balles[i];
        if (balle.y + balle.rayon > raquette.y && balle.y - balle.rayon < raquette.y + raquette.h && balle.x > raquette.x && balle.x < raquette.x + raquette.l){
            let centre = raquette.x + raquette.l / 2;
            let ratio = (balle.x - centre) / (raquette.l / 2);

        balle.dep_x = ratio * balle.vitesse;
        balle.dep_y = -Math.sqrt(balle.vitesse**2 - balle.dep_x**2);  //calcule deplacement vertical pour garder la vitesse constante
        }
    }
}
function brique_casse(b, index,explosion){
                        if (mode.id === "infini"){
                            b.visible = false;
                            verifier_succes();
                            gagner_or(3,0);
                            setTimeout(()=>{
                                if (joueur.score <125){
                                    if (Math.random()<0.5){
                                    b.vie = 4;}
                                    else{
                                        b.vie =6;
                                    }
                                }else{
                                    b.vie= 9;
                                }
                                b.boost = briques_boost();
                                b.visible = true;
                            },6000);
                        }
                        if (mode.id === "base"){
                             gagner_or(1,25);
                             briques.splice(index,1);
                             index--;
                        }
                        if (mode.id === "detente"){
                            briques.splice(index,1);
                            index--;
                             gagner_or(2,0);
                             maj_quete("brique");
                             maj_quete("score")
                        }
                        if (mode.id === "boss"){
                            if (b.cBoss){
                                gagner_score(200);
                                gagner_or(50,0);
                                gagner_xp(50);
                                active_boost(b);
                            }
                            briques.splice(index,1);
                            index--;
                            gagner_or(5,0);
                        }
                                                
                        if (!explosion){
                            active_boost(b);
                        }

                        shake += 5;
                        gagner_score(1);
                        if (score_augmente !==1){
                            if (joueur.score % 50 ===0 || joueur.score%50 === 1 || joueur.score %50 ===2) gagner_xp(15);
                        }
                        else{ if (joueur.score % 50 ===0 && joueur.score !==0) gagner_xp(15);}

                        joueur.stats.briques_casse++;
                        maj_succes("destructeur",1);
                        creer_particule_brique(b)
                        maj_quete("brique");
                        maj_quete("score");
                }
function colision_balle_briques(){
    for (let i = 0; i < briques.length; i++){
        let b = briques[i];
        if (!b.visible) continue;

        for (let j=0; j<balles.length;j++){
            let balle = balles[j];
            if (b.visible){
                if (
                    balle.y - balle.rayon < b.y + b.h &&
                    balle.y + balle.rayon > b.y &&
                    balle.x + balle.rayon > b.x &&
                    balle.x - balle.rayon < b.x + b.l
                ){
                    creer_particules(balle);
                    let centreX = b.x + b.l / 2;
                    let centreY = b.y + b.h / 2;
                    let dx = balle.x - centreX;
                    let dy = balle.y - centreY;
                    if (Math.abs(dx / b.l) > Math.abs(dy / b.h)){
                        balle.dep_x *= -1;
                        // Sortie forcée latérale
                        balle.x += balle.dep_x > 0 ? 2 : -2;
                    } else {
                        balle.dep_y *= -1;
                        // Sortie forcée verticale
                        balle.y += balle.dep_y > 0 ? 2 : -2;
                    }
                    b.vie -= balle.impacte;
                    b.grossit = 1.08;
                    setTimeout(()=>{
                        b.grossit = 1;
                    },70);
                    if (b.cBoss){
                        if (b.vie in donnees_brique_a_spawn && !b.palier_brique_spwan.includes(b.vie)){
                            spawn_brique(b.vie);
                            b.palier_brique_spwan.push(b.vie);
                        }
                    }
                    if (b.vie <= 0){
                        brique_casse(b,i,false);
                        pause_frame = 1;
                    }
                    break;
                }
            }
        }
    }
}
function deplacement_briques(){
    if (mode.id !== "detente") return;
    for (let i=0; i< briques.length; i++){
        let b = briques[i];
        b.y += b.vitesse;
        if (b.y - b.h> canvas.height) {
            briques.splice(i,1);
            i--;
            return;
        }
    }
}
function active_boost(brique) {
    if (!brique.boost) return;
     maj_quete("boost");
    let boost = brique.boost;
    if (boost.type === "raquette+large") {
        afficher_message("Raquette agrandie !","boost");
        raquette.l =  raquette.taille_actuelle*1.6;
        boost.actif = true
        boosts[0].actif = true;
        tps_fin = Date.now() + boost.duree;
    }
    else if (boost.type === "balle_lourde") {
        afficher_message("Balle impactante !","boost");
        for (let i=0; i<balles.length; i++){
            let balle = balles[i];
            clearTimeout(timeout_balle);
            balle.impacte = boost.effet;
            timeout_balle = setTimeout(() => {
                balle.impacte = 1;
            }, boost.duree);
        }
    }
    else if (boost.type === "vie+") {
        if (joueur.vie < mode.vie_max){
            afficher_message("Vie ajoutée !","boost");
            joueur.vie += boost.effet;
        }
        else {
            afficher_message("Vie maximale atteinte !", "boost");
        }
    }
    else if (boost.type === "balle+"){
        if (balles.length < balles_max){
            afficher_message("+ 1 balle !", "boost");
            let nouvelleBalle = {
                rayon: responsive_x(12),
                x: raquette.x + raquette.l/2,
                y: raquette.y - responsive_x(12),
                dep_x: (Math.random()*5)-2,
                dep_y: -3.5,
                vitesse: balles[0].vitesse,
                impacte: balles[0].impacte,
                trail:[]
            };
            balles.push(nouvelleBalle);
            maj_quete("balle");
           /* nbr_b.textContent = "nombre de balles:"+ balles.length;*/
        } else {
            afficher_message("Trop de balles !", "boost");
        }
    }else if (boost.type === "explosion"){
        afficher_message("Kaboum !", "boost");
        explosions.push({x:brique.x+brique.l/2, y:brique.y+brique.h/2, rayon:brique.l*2,alpha:1});
        for (let i=0; i<briques.length;i++){
            let autre_b = briques[i];
            if (!autre_b.visible)continue;
            if (autre_b === brique) continue;
            let centreX = autre_b.x+autre_b.l/2;
            let centreY = autre_b.y+autre_b.h/2;
            let distX = centreX - (brique.x+brique.l/2);
            let distY = centreY - (brique.y+brique.h/2);
            let distance = Math.sqrt(distX*distX+distY*distY);
            if (distance < brique.l*2 || distance < brique.h*2){
                autre_b.vie -= brique.degat || 2;
                if (autre_b.vie <= 0){
                    brique_casse(autre_b,i,true);
                    pause_frame = 3;
                    shake += 15;
                }
            }
        }
    }
    else if (boost.type === "doubleScore"){
        
        if (multiplicateur < boost.effet_max){
            afficher_message("Multiplicateur de score augmenté !", "boost");
            multiplicateur += boost.effet;
            clearTimeout(timeout_score);
            timeout_score = setTimeout(() => {
                multiplicateur =1;
            }, boost.duree)
        }
        else afficher_message("Multiplicateur de score déjà a 3 !", "boost");
    }
}
function appliquer_perte_vie(){
        joueur.vie -= 1;
        succes[0].perdu_vie = true;
        succes[8].perdu_vie = true;
        shake += 20;

        if (balles.length > 0) {
            balles[0].x = raquette.x + raquette.l / 1.5;
            balles[0].y = raquette.y - rayon_balle;
            balles[0].dep_x = 2.5;
            balles[0].dep_y = -3.5;
            balles[0].vitesse = 4.25;
        }

        if (mode.id === "detente") briques = []; 
        sauvegarder();
}
function perte_vie(){
    for (let i=0; i<balles.length; i++){
        let balle = balles[i];
        if (balle.y + balle.rayon >canvas.height){
            if (balles.length === 1){
                sauvegarder();
                appliquer_perte_vie();
            } else if (balles.length > 1){
                sauvegarder();
                balles.splice(i,1);
                i--;
               /* nbr_b.textContent = "nombre de balles:"+ balles.length;*/
            }
        }
    }
}

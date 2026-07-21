function draw_raquette(){
    let skin_equipe = joueur.skin_equipe.raquette;
    let skin = shop.raquette.find(s => s.id === skin_equipe);
    let gradient = null;

    for (let anim of skin.animation){
        if (anim.type === "glow"){
            let glow = 25 + Math.sin(Date.now()/200) * 2;
            ctx.shadowBlur = glow;
            ctx.shadowColor = anim.color;
        }
        if(anim.type==="pulse"){
            let glow=anim.glowMin+Math.abs(Math.sin(Date.now()*anim.speed))*(anim.glowMax-anim.glowMin);
            ctx.shadowBlur=glow;
            ctx.shadowColor=anim.color||skin.color;
        } if (anim.type==="electrique"){
                    let x_depart = raquette.x;
                    let y_depart = raquette.y; 
                    for (let i=0; i<3; i++){
                        ctx.beginPath();
                        ctx.moveTo(x_depart, y_depart-i*5);
                        while(x_depart < raquette.x + raquette.l) {
                            x_depart += 15; // On avance vers la droite
                            // On dévie légèrement en haut ou en bas par rapport à la raquette
                            let targetY = raquette.y-i*5 + (Math.random() - 0.5) * 12; 
                            ctx.lineTo(x_depart, targetY);
                        }
                        ctx.strokeStyle = anim.color || skin.color;
                        ctx.stroke();
                    }
        }
        if (anim.type === "trail"){
            for (let t = 1; t <= raquette.trail.length;t++){
                    ctx.globalAlpha = anim.opacite * (t/ raquette.trail.length /1.4);
                    ctx.fillStyle = anim.color || skin.color;
                    ctx.beginPath();
                    ctx.fillRect(raquette.trail[t-1].x, raquette.trail[t-1].y, raquette.l, raquette.h);
                    ctx.fill();
                }
                ctx.globalAlpha =1;
        }
    }
    if (skin.id === "arc_en_ciel"){
         gradient = ctx.createLinearGradient(raquette.x, raquette.y, raquette.x+raquette.l, raquette.y);
         let decalage = (Date.now()/9000)%1;
         let couleurs = [skin.color[1],skin.color[2],skin.color[3],skin.color[4],skin.color[5],skin.color[6],skin.color[7],skin.color[8],skin.color[9],skin.color[10]];
         for (let i=0; i<couleurs.length;i++){
            let position = (i/(couleurs.length-1)+decalage)%1;
            gradient.addColorStop(position, couleurs[i]);
         }
    }

    if ( tps_restant >0 && tps_restant <3000 && boosts[0].actif){
        if ( Date.now()%4 ===0){
            ctx.globalAlpha =  0.4;
        }else{
           ctx.globalAlpha = 1;
        }
    }
    ctx.fillStyle = gradient || skin.color;
    ctx.fillRect(raquette.x, raquette.y, raquette.l, raquette.h);

   if (skin.id === "gg") {
        ctx.fillStyle = "#429cc3";
        ctx.fillRect(raquette.x, raquette.y, raquette.l,raquette.h);
        // bordure
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 3;
        ctx.strokeRect(raquette.x,raquette.y, raquette.l,raquette.h);
        // joyau central
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.moveTo(raquette.x + raquette.l/2, raquette.y - 5);
        ctx.lineTo(raquette.x + raquette.l/2 + 10, raquette.y + 5);
        ctx.lineTo(raquette.x + raquette.l/2, raquette.y + 15);
        ctx.lineTo(raquette.x + raquette.l/2 - 10, raquette.y + 5);
        ctx.fill();
        // joyau gauche
        ctx.beginPath();
        ctx.arc(raquette.x + 20,raquette.y + raquette.h/2, 4,0,Math.PI * 2);
        ctx.fill();
        // joyau droit
        ctx.beginPath();
        ctx.arc(raquette.x + raquette.l - 20, raquette.y + raquette.h/2, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    // SHUTTLE 
    if (skin.id === "shuttle_r"){
        ctx.fillStyle="#dff4ff";
        let nbr = 3;
        if (canvas.width < 415)nbr =2;
        for(let i=0;i<nbr;i++){
            ctx.beginPath();
            let pulse =Math.sin(Date.now()/90+i)*3;
            ctx.arc(raquette.x+raquette.l/3+i*30,raquette.y+raquette.h,7+pulse,0,Math.PI*2);
            ctx.fill();
        }
        ctx.strokeStyle="#9bc6ff";
        ctx.lineWidth=2;
        ctx.strokeRect(raquette.x,raquette.y,raquette.l,raquette.h);
    }
    // NEON 
    if (skin.id==="neon_r"){
        for(let i=0;i<4;i++){
            ctx.fillStyle=`rgba(0,255, 200,${0.15+i*0.1})`;
            ctx.fillRect(raquette.x+i*25,raquette.y,12,raquette.h);
        }
    }
    // LASER
    if (skin.id==="laser_r"){
        let pulse=Math.sin(Date.now()/150)*3;
        ctx.strokeStyle="#ff5068";
        ctx.lineWidth=3+pulse;
        ctx.beginPath();
        ctx.moveTo(raquette.x,raquette.y+raquette.h/2);
        ctx.lineTo(raquette.x+raquette.l,raquette.y+raquette.h/2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}
function draw_balle(){
    let skin_equipe = joueur.skin_equipe.balle;
    let skin = shop.balle.find(sk => sk.id === skin_equipe);
    for (let balle of balles){
        //dessine la balle
        if (balle.rayon < min_rayon){
            balle.rayon = min_rayon;
        }
        ctx.fillStyle = skin.color;
        ctx.beginPath();
        ctx.arc(balle.x, balle.y, balle.rayon, 0, Math.PI*2);
        ctx.fill();

        for (let anim of skin.animation){
            if (anim.type === "glow"){
                ctx.shadowBlur = anim.glow;
                ctx.shadowColor = anim.color;
            }else if (anim.type === "pulse"){
                let glow = anim.glowMin +Math.abs(Math.sin(Date.now() * anim.speed)) * (anim.glowMax - anim.glowMin);
                ctx.shadowBlur = glow;
                ctx.shadowColor = anim.color || skin.color;
            }else if (anim.type === "trail"){
                for (let t = 1; t <= balle.trail.length;t++){
                    ctx.globalAlpha = anim.opacite * (t/ balle.trail.length /1.65);
                    ctx.fillStyle = anim.color || skin.color;
                    ctx.beginPath();
                    ctx.arc(balle.trail[t-1].x, balle.trail[t-1].y, balle.rayon *(t/balle.trail.length/1.08) , 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }else if (anim.type === "orbite"){
                let angle_general = Date.now() / 280;
                if (skin.id === "voyageur"){
                    for (let i = 0; i < 6; i++) {
                        let baseAngle = (i / 6) * Math.PI * 2;
                        let angle = baseAngle + Math.sin(angle_general + i) * 0.7;
                        let radius = 10 + (Math.sin(angle_general * 2 + i) + 1) / 2 * (18 - 10);
                        let rayon = (Math.sin(angle_general * 3 + i * 1.5) + 1) / 2 * 4.5 * 0.7 + 1;
                        let hue = 280 + 40 * Math.sin(angle_general * 3 + i * 2);
                        ctx.fillStyle = `hsla(${hue}, 80%, 40%, 0.85)`; 
                        ctx.beginPath();
                        ctx.arc(balle.x + Math.cos(angle + angle_general) * radius, balle.y + Math.sin(angle + angle_general) * radius, rayon, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                        ctx.shadowBlur = 0;
                    }
                }else{
                    ctx.fillStyle = anim.color;
                    for (let i=1; i<=anim.nbr;i++){
                        ctx.beginPath();
                        ctx.arc(
                            balle.x + Math.cos(angle_general*i/2) * (balle.rayon + 7*i/2),
                            balle.y + Math.sin(angle_general*i/2) * (balle.rayon + 7*i/2),
                            anim.rayon,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                    }
                }
            }else if (anim.type==="electric"){
                    for(let i=0;i<4;i++){
                        ctx.strokeStyle= anim.color||skin.color;
                        ctx.lineWidth=2;
                        ctx.beginPath();
                        ctx.moveTo(balle.x,balle.y);
                        ctx.lineTo(balle.x+(Math.random()-0.5)*35,balle.y+(Math.random()-0.5)*35);
                        ctx.stroke();
                    }
            }else if(anim.type==="aura"){
                    let rayon=balle.rayon+8+Math.sin(Date.now()/200)*3;
                    ctx.globalAlpha=0.45;
                    ctx.fillStyle=anim.color|| skin.color;
                    ctx.beginPath();
                    ctx.arc(balle.x,balle.y,rayon,0,Math.PI*2);
                    ctx.fill();
                    ctx.globalAlpha=1;
                }
            }
       
        
        if (skin.id === "gold_b") {
            // cercle intérieur plus clair
            ctx.fillStyle = "#fff6b3";
            ctx.beginPath();
            ctx.arc(balle.x,balle.y, balle.rayon * 0.55, 0, Math.PI * 2 );
            ctx.fill();
            // reflet
            ctx.fillStyle = "rgba(255, 240, 173, 0.8)";
            ctx.beginPath();
            ctx.arc(balle.x - balle.rayon * 0.35, balle.y - balle.rayon * 0.35, balle.rayon * 0.2,0,Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        ctx.globalAlpha = 1;
    }
}
function draw_particules(){
    for (let i = 0; i < particules.length; i++){
        let p = particules[i];
        if (p. comportement === "aspiration"){
            // On freine l'explosion de départ
            p.dx *= 0.97;
            p.dy *= 0.97;
            // on calcule la distance qui la sépare du centre
            let attractionX = (p.centreX - p.x) * 0.15; // 0.15 = la vitesse d'aspiration
            let attractionY = (p.centreY - p.y) * 0.15;
            // On applique le mouvement (vitesse de départ + force d'aspiration)
            p.x += p.dx + attractionX;
            p.y += p.dy + attractionY;
            p.alpha -= 0.015;
        }
        else{
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.02;
        }
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            if (p.forme === "carre"){
                ctx.fillRect(p.x,p.y,p.taille*1.3,p.taille);
            }else {
                ctx.arc(p.x, p.y, p.rayon, 0, Math.PI * 2);
            }
            ctx.fill();
            if (p.alpha <= 0){
                particules.splice(i,1);
                i--;
            }
            ctx.globalAlpha = 1;
    }
}
function draw_particule_fond(){
    for (let i = 0; i < particules_fond.length; i++){
        let p = particules_fond[i];
                p.x += p.dx;
                p.y += p.dy;
                if (p.x > canvas.width) p.x = Math.random()*50;
                if (p.y > canvas.height) p.y = Math.random()*50;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.rayon, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        
}
function draw_effet_victoire(){
    if (joueur.skins_possedes.effet_vic.length === 0) return;
    canvas.style.background = "rgb(10,20,30)";
     switch (joueur.skin_equipe.effet_vic){
        case "feux_artifice":
            for (let i=0; i< particules.length; i++){
                let p = particules[i];
                if (p.type === "feu_artifice"){
                    if (p.y <= p.cible_y){
                        let x = p.x;
                        let y = p.cible_y;
                        particules.splice(i,1)
                        i--;
                        for (let j=0; j<25;j++){
                            particules.push({x: x, y: y, rayon: Math.random() * 4 + 2, alpha: 1,
                                dx: (Math.random() - 0.5) * 3, dy: (Math.random() - 0.5) * 3,
                                color: "rgb(226, 212, 14)"
                            })
                        }
                    }
                }
            }
            break;
        case "supernova":
            rayon_supernova +=8;
            let alpha = 1- rayon_supernova/350;
            if (alpha <= 0) rayon_supernova =0;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = "rgb(122, 4, 190)";
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2,rayon_supernova,0,Math.PI*2)
            ctx.fill();

            break;
        case "pluie_de_code":
            for (let i=0; i < lignes_matrix.length; i++){
                ctx.fillStyle = "rgb(28,104,49)";
                ctx.beginPath();
                ctx.fillRect(lignes_matrix[i].x,lignes_matrix[i].y,lignes_matrix[i].largeur-3,lignes_matrix[i].hauteur)
                ctx.fill();
                lignes_matrix[i].y += lignes_matrix[i].vitesse;
                if (lignes_matrix[i].y > canvas.height) lignes_matrix[i].y =  -30;
            }
            break;
        case "vainqueur":
            for (let i=0; i<lignes_aura.length; i++){
                let ligne = lignes_aura[i];
                // dessein
                ctx.fillStyle = `rgba(173,208,110, ${ligne.alpha})`;
                ctx.shadowBlur =10;
                ctx.fillRect(ligne.x, ligne.y, ligne.l, canvas.height)
                ctx.shadowBlur =0;
                //mouvement
                ligne.x += Math.sin(Date.now()/500);
                ligne.y += ligne.d_y;
                if (ligne.y < -10) {
                    ligne.y = canvas.height;
                    ligne.x = Math.random()*canvas.width;
                }
            }
            for (let j=0;j< trophees_vic.length;j++){
                let tr = trophees_vic[j];
                //dessein
                ctx.save();
                ctx.translate(tr.x, tr.y);
                ctx.rotate(tr.rotation);
                ctx.globalAlpha = tr.alpha;
                // Effet brillant sur l'or
                ctx.shadowBlur = 15;
                ctx.shadowColor = "rgba(255, 215, 0, 0.6)";
                ctx.fillStyle = "rgb(255, 215, 0)"; // Couleur Or principal
                // --- DESSIN DE LA COUPE (Formes simples assemblées) ---
                // Le haut du calice (un demi-cercle)
                ctx.beginPath();
                ctx.arc(0, -10, 14, 0, Math.PI, false);
                ctx.fill();
                // Le pied de la coupe (un fin rectangle vertical)
                ctx.fillRect(-3, -10, 6, 15);
                // Le socle de la coupe (un petit rectangle horizontal)
                ctx.fillStyle = "rgb(212, 175, 55)"; // Or un poil plus foncé pour le socle
                ctx.fillRect(-10, 5, 20, 6);           
                // Les anses de la coupe (gauche et droite)
                ctx.strokeStyle = "rgb(255, 215, 0)";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(-13, -13, 6, 0, Math.PI * 2); // Anse gauche
                ctx.arc(13, -13, 6, 0, Math.PI * 2);  // Anse droite
                ctx.stroke();
                ctx.restore(); // Remet l'alpha, le shadow et les rotations à la normale
                //mouvement
                tr.y += tr.d_y;
                tr.rotation +=0.008;
                if (tr.y > canvas.height+30){
                    tr.x = Math.random()*canvas.width;
                    tr.y = -30;
                    tr.d_y = Math.random()*2+1;
                }
            }

     }
}

const cx = canvas.width / 2;
const cy = canvas.height / 2;
function draw_fond(){
    let fond_equipe = joueur.skin_equipe.fond;
    let fond = shop.fond.find(s => s.id === fond_equipe);

    canvas.style.background = mode.id === "detente" ? "#0b0c1a" : fond.color;
    if (mode.id === "detente") return;
    for (let anim of fond.animation){
        if (anim.type === "particule"){
            if (!anim.genere){
                particules_fond = []
                for (let i=0; i< 15; i++){
                    let vitesse = 2+i*0.95;
                    let x = (Date.now()/25*vitesse+i*70)%canvas.width;
                    let y = 38*Math.random()*((Date.now()+i*20)/65*vitesse)%canvas.height;
                    let rayon = 4+Math.sin(Date.now()/400+i);
                    particules_fond.push({x:x,y:y,rayon:rayon, alpha:5, dx:0.3, dy:0.3, color: anim.color, comportement: "draw_fond"});
                }
                anim.genere =true;
            }
        }else if (anim.type === "glow"){
                ctx.shadowBlur = anim.glow;
                ctx.shadowColor = anim.color;
        }
    }
    switch (fond.id){
        case  "gold_f":
            canvas.style.backgroundColor = "#6e5c1f";
            for (let i = 0; i < 15; i++) {
                let vitesse = 1 + i * 0.15;
                let x = (Date.now() / 25 * vitesse + i * 70) % canvas.width;
                let y = (i * 35 + Date.now() / 60 * vitesse) % canvas.height;
                let rayon = 2 + Math.sin(Date.now()/400 + i) * 1.5;
                ctx.save();
                ctx.shadowBlur = 12;
                ctx.shadowColor = "#FFD700";
                ctx.fillStyle = "#FFD700";
                ctx.beginPath();
                ctx.arc(x, y, rayon, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            break;
        case "champion" :
            canvas.style.backgroundColor = "#2b0064de";
            let rayonAura = 55 + Math.sin(Date.now()/250) * 8;// Aura pulsante
            ctx.save();
            ctx.shadowBlur = 50;
            ctx.shadowColor = "#FFD700";
            ctx.fillStyle = "#FFD700";
            ctx.beginPath();
            ctx.arc(cx, cy, rayonAura, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            ctx.fillStyle = "#FFF2A8"; // Couronne
            ctx.beginPath();
            ctx.moveTo(cx - 40, cy + 10);
            ctx.lineTo(cx - 25, cy - 30);
            ctx.lineTo(cx, cy - 5);
            ctx.lineTo(cx + 25, cy - 30);
            ctx.lineTo(cx + 40, cy + 10);
            ctx.closePath();
            ctx.fill();
            // Etoiles tournantes
            for(let i = 0; i < 6; i++){
                let angle = Date.now()/1000 + i * Math.PI/3;
                let x = cx + Math.cos(angle) * 120;
                let y = cy + Math.sin(angle) * 120;
                ctx.save();
                ctx.shadowBlur = 20;
                ctx.shadowColor = "#FFD700";
                ctx.fillStyle = "#FFD700";
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            break;
        //NEBULA
        case "nebula_f":
            canvas.style.background="#22114b";
            for(let i=0;i<6;i++){
                let x=canvas.width/2+Math.sin(Date.now()/3000+i)*220;
                let y=canvas.height/2+Math.cos(Date.now()/4000+i)*120;
                let rayon=90+Math.sin(Date.now()/800+i)*25;
                ctx.save();
                ctx.globalAlpha=.18;
                ctx.fillStyle=i%2?"#a24cff":"#4cc6ff";
                ctx.beginPath();
                ctx.arc(x,y,rayon,0,Math.PI*2);
                ctx.fill();
                ctx.restore();
            }
            for(let i=0;i<30;i++){
                ctx.fillStyle="white";
                ctx.fillRect((i*123)%canvas.width,(i*87)%canvas.height, 2,2);
            }
            break;
        //QUASAR
        case "quasar_f":
            canvas.style.background="#150026";
            ctx.save();
            ctx.shadowBlur=70;
            ctx.shadowColor="#ff66ff";
            ctx.fillStyle="#ffccff";
            ctx.beginPath();
            ctx.arc(cx,cy,25+Math.sin(Date.now()/300)*4,0,Math.PI*2);
            ctx.fill();
            ctx.restore();
            for(let i=0;i<20;i++){
                let angle=Date.now()/1200+i;
                let dist=50+i*10;
                ctx.fillStyle=`rgba(255,180,255,${1-i/30})`;
                ctx.beginPath();
                ctx.arc(cx+Math.cos(angle)*dist,cy+Math.sin(angle)*dist,3,0,Math.PI*2);
                ctx.fill();
            }
            break;
        // CYBER 
        case "cyber_f":
            canvas.style.background="#001212";
            ctx.strokeStyle="#00ff95";
            for(let y=0;y<canvas.height;y+=35){
                ctx.beginPath();
                ctx.moveTo((Date.now()/20)%50, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            for(let i=0;i<8;i++){
                ctx.fillStyle=`rgba(0,255,120,.15)`;
                ctx.fillRect((i*80+Date.now()/8)%canvas.width, i*60, 18,18);
            }
            break;
        case "galactique":
            canvas.style.background="#090019";
            for(let i=0;i<60;i++){
                let x=(i*97)%canvas.width;
                let y=(i*53+Date.now()/20)%canvas.height;
                ctx.fillStyle=`rgba(255,255,255,${0.2+Math.sin(Date.now()/700+i)*0.4})`;
                ctx.beginPath();
                ctx.arc(x,y%canvas.height,1+Math.random()*2,0,Math.PI*2);
                ctx.fill();
            }
            break;
    }
    
}
function draw_briques(){
    for (let i =0; i < briques.length; i++){
        if (briques[i].visible){
            if (briques[i].cBoss){
                if ((briques[i].vie >=40 && briques[i].vie <50) ) ctx.fillStyle = "rgb(99, 46, 46)";
                else if ((briques[i].vie >=30 && briques[i].vie <40) ) ctx.fillStyle = "rgb(144, 144, 74)";
                else if (( briques[i].vie <20) ) ctx.fillStyle = "rgb(34, 97, 128)"; 
                else if ((briques[i].vie >=50 && briques[i].vie <60) )ctx.fillStyle = "rgb(144, 139, 183)"; 
                else if ((briques[i].vie >=60 && briques[i].vie <70) ) ctx.fillStyle = "rgb(196, 175, 182)"; 
                else if ((briques[i].vie >=20 && briques[i].vie <30) ) ctx.fillStyle = "rgb(40, 108, 74)"; 
                else if ((briques[i].vie >=80)) ctx.fillStyle = "rgb(24, 38, 46)";
                else if ((briques[i].vie >=70 && briques[i].vie <80) ) ctx.fillStyle = "rgba(30, 45, 50, 0.9)";

                ctx.fillRect(briques[i].x, briques[i].y, briques[i].l*briques[i].grossit, briques[i].h*briques[i].grossit);
                //sa vie
                let pourcent = briques[i].vie / briques[i].vie_max;
                ctx.fillStyle = "rgba(99, 120, 124, 0.81)";
                ctx.fillRect(briques[i].x, briques[i].y-15, briques[i].l, 5);
                ctx.fillStyle = 'rgb(71, 153, 131)';
                ctx.fillRect(briques[i].x, briques[i].y-15, briques[i].l*pourcent,5);
                ctx.beginPath();
                ctx.fillStyle = "rgb(167,54,80)";
                ctx.arc(briques[i].x +briques[i].l/3,briques[i].y+briques[i].h/3, 12, Math.PI/6, Math.PI);  // oeuil gauche
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "rgb(167,54,80)";
                ctx.arc(briques[i].x +briques[i].l/1.5,briques[i].y+briques[i].h/3, 12, -Math.PI/3, Math.PI); // oeuil droit
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "rgb(130, 44, 71)";
                ctx.arc(briques[i].x +briques[i].l/2,briques[i].y+briques[i].h/1.5, 12, 0, Math.PI);  // bouche
                ctx.fill();
                ctx.closePath();
            }
            else {
                if (briques[i].vie ===4) ctx.fillStyle = "rgb(99, 46, 46)";//rouge foncé
            else if (briques[i].vie ===3) ctx.fillStyle = "rgb(144, 144, 74)";//jaune pâle
            else if (briques[i].vie ===1) ctx.fillStyle = "rgb(34, 97, 128)"; //bleu
            else if (briques[i].vie ===5)ctx.fillStyle = "rgb(144, 139, 183)"; //violet pâle
            else if (briques[i].vie ===6) ctx.fillStyle = "rgb(196, 175, 182)"; //rose pâle
            else if (briques[i].vie ===2) ctx.fillStyle = "rgb(40, 108, 74)"; //vert
            else if (briques[i].vie === 8) ctx.fillStyle = "rgb(24, 38, 46)";
            else if (briques[i].vie === 7) ctx.fillStyle = "rgba(30, 45, 50, 0.9)";
            
            ctx.fillRect(briques[i].x, briques[i].y, briques[i].l*briques[i].grossit, briques[i].h*briques[i].grossit);
            }
            if (mode.id === "detente"){ 
                ctx.fillStyle = "#223344";
                let glow = 30 + Math.sin(Date.now()/200) * 2;
                ctx.shadowBlur = glow;
                ctx.shadowColor = "#33506e";
                ctx.fillRect(briques[i].x, briques[i].y, briques[i].l*briques[i].grossit, briques[i].h*briques[i].grossit);

            }
        }
    }
    ctx.shadowBlur =0;
}
function draw_explosion(){
    for (let i=0; i<explosions.length; i++){
        let exp = explosions[i];
        ctx.save();
        ctx.globalAlpha = exp.alpha;
        let gradient = ctx.createRadialGradient(exp.x,exp.y,10,exp.x,exp.y,exp.rayon);
        gradient.addColorStop(0,"#fff7b3");
        gradient.addColorStop(0.4,"#ffb347");
        gradient.addColorStop(1,"rgba(255,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(exp.x,exp.y,exp.rayon,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
        exp.rayon+=5;
        exp.alpha-=0.06;
        if (exp.alpha <=0){
            explosions.splice(i,1);
            i--
        }

    }
}

function draw_vies(){
    ctx.fillStyle = "rgb(243,214,224)";
    ctx.font = "1.25rem Halo";
    ctx.fillText("Vies: "+ joueur.vie, responsive_x(230), responsive_y(30));
}
function draw_score(){
    ctx.fillStyle = "rgb(243,214,224)";
    ctx.font = "1.25rem Halo";
    ctx.fillText("Score: " +joueur.score, responsive_x(25), responsive_y(30));
}
function draw_or(){
    ctx.fillStyle = "rgb(243,214,224)";
    ctx.font = "1.25rem Halo";
    ctx.fillText("Or:" + joueur.or,responsive_x(425), responsive_y(30));
}

function afficher_message(text,type){
    clearTimeout(timeout_message);
    messages.textContent = text;
    messages.style.display = "flex";
    if (type === "indic_entree"){
        messages.style.display ="flex";
    }else if (type !== "niv_suivant"){
       timeout_message = setTimeout(() => {
            messages.style.display = "none";
        }, 1500);
    }else if (type === "niv_suivant"){
        if (!mode.actif){
            timeout_message = setTimeout(() =>{
                messages.style.display = "none";
                niveau_suivant();
            }, 1500);
        }
    }
}
function afficher_message_ui(text,type){
    clearTimeout(timer_message);
    if (type === "error"){
        message_ui.style.backgroundColor = "rgba(89, 13, 42, 0.95)";
        message_ui.style.color = "rgb(255,255,255)";
    }else if (type === "succes"){
        message_ui.style.backgroundColor = "rgb(95, 222, 106)";
        message_ui.style.color = "rgb(255,255,255)";
    }else if (type === "record"){
        message_ui.style.backgroundColor = "rgba(246, 250, 40,0.95)";  
        message_ui.style.color = "rgb(69, 57, 0)";      
    }
    message_ui.textContent = text;
    message_ui.style.opacity = 1;
    timer_message = setTimeout(() =>{
        message_ui.style.opacity = 0;
    },2500);
}
function afficher_ecran(ecran,nouv_m_s=false){
    ecran_act = ecran;
    if (ecran === "victoire"){
        jeu_container.style.display = "flex";
        profil.style.display = "none";
        win.style.display = "flex";
        if (nouv_m_s) text_meilleur_score_d.textContent = "Nouveau meilleur score: " + joueur.meilleur_score[mode.id] +"!";
        else text_meilleur_score_d.textContent = "Meilleur score: " + joueur.meilleur_score[mode.id];        pause_ecr.style.display = "none";
    }else if (ecran === "defaite"){
        defaite.style.display = "flex";
        profil.style.display = "none";
        if (nouv_m_s) text_meilleur_score_d.textContent = "Nouveau meilleur score: " + joueur.meilleur_score[mode.id] +"!";
        else text_meilleur_score_d.textContent = "Meilleur score: " + joueur.meilleur_score[mode.id];
        jeu_container.style.display = "flex";
        pause_ecr.style.display = "none";
    }else if (ecran === "menu"){
        update_menu();
        afficher_quete();
        profil.style.display = "flex";
        menu.style.display = "flex";
        defaite.style.display ="none";
        win.style.display = "none";
        jeu_container.style.display = "none";
        pause_ecr.style.display = "none";
        shop_ecr.style.display = "none";
        succes_ecr.style.display = "none";
        jeu_container.style.display = "none";
        passe_ecr.style.display = "none";
        mode.actif = false;
    }else if (ecran === "pause"){
        win.style.display ="none";
        menu.style.display = "none";
        defaite.style.display = "none";
        jeu_container.style.display = "flex";
        pause_ecr.style.display = "flex";
    }else if (ecran === "jeu"){
        win.style.display ="none";
        menu.style.display = "none";
        profil.style.display = "none";
        defaite.style.display = "none";
        pause_ecr.style.display = "none";
        shop_ecr.style.display = "none";
        jeu_container.style.display = "flex";
    }else if (ecran === "shop_ecr"){
        afficher_shop();
        win.style.display ="none";
        menu.style.display = "none";
        defaite.style.display = "none";
        pause_ecr.style.display = "none";
        jeu_container.style.display = "none";
        profil.style.display = "none";
        shop_ecr.style.display = "flex";
    }else if (ecran === "succes_ecr"){
        afficher_succes();
        win.style.display ="none";
        menu.style.display = "none";
        defaite.style.display = "none";
        pause_ecr.style.display = "none";
        jeu_container.style.display = "none";
        shop_ecr.style.display = "none";
        profil.style.display = "none";
        succes_ecr.style.display = "flex";
    }else if (ecran === "passe_de_casse"){
        afficher_passe();
        passe_ecr.style.display = "flex";
        win.style.display ="none";
        menu.style.display = "none";
        defaite.style.display = "none";
        pause_ecr.style.display = "none";
        jeu_container.style.display = "none";
        shop_ecr.style.display = "none";
        profil.style.display = "none";
        succes_ecr.style.display = "none";
    }
    return ecran_act;
}
function savoir_ecran(){
    if (menu.style.display === "flex"){
        win.style.display ="none";
        profil.style.display = "flex";
        menu.style.display = "flex";
        defaite.style.display = "none";
        jeu_container.style.display = "none";
    } else if (win.style.display === "flex"){
        win.style.display ="flex";
        menu.style.display = "none";
        defaite.style.display = "none";
        jeu_container.style.display = "flex";
    }else if (defaite.style.display === "flex"){
        win.style.display ="none";
        menu.style.display = "none";
        defaite.style.display = "flex";
        jeu_container.style.display = "flex";
    } else if (jeu_container.style.display === "flex"){
        win.style.display ="none";
        menu.style.display = "none";
        defaite.style.display = "none";
        jeu_container.style.display = "flex";
    }else if (shop_ecr.style.display==="flex"){
        shop_ecr.style.display==="flex";
        win.style.display ="none";
        profil.style.display = "none";
        menu.style.display = "none";
        defaite.style.display = "none";
        jeu_container.style.display = "none";
    }else if (succes_ecr.style.display === "flex"){
        succes_ecr.style.display = "flex";
        win.style.display ="none";
        profil.style.display = "none";
        menu.style.display = "none";
        defaite.style.display = "none";
        jeu_container.style.display = "none";
    }
}
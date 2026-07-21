document.addEventListener("keypress", (event)=>{
    if (event.code === "Space") {
        if ((mode.actif && !mode.pause) || (!mode.actif && mode.pause)){
            jeu_pause();
        }
    }
    if (event.code === "Enter") {
        if (jeu_container.style.display === "flex"){
            if (!mode.actif){
                mode.actif = true;
                messages.style.display = "none";
                jeu();
            }
        }else {
            valider_popup()
        }
    }
});
document.addEventListener("keydown",(event)=>{
    if (event.code ==="ArrowLeft") leftPressed =true;
    if (event.code === "ArrowRight") rightPressed =true;
});
document.addEventListener("keyup",(event)=>{
    if (event.code ==="ArrowLeft") leftPressed =false;
    if (event.code === "ArrowRight") rightPressed =false;
});
window.addEventListener("resize", () => {
    canvas.width = Math.min(window.innerWidth - 20, 550);     // Ajustez la largeur maximale
    canvas.height = Math.min(window.innerHeight * 0.6, 400);
    if (!mode.actif) initGame();
});

// --- GESTION DU TACTILE SUR MOBILE ---

// Variable pour mémoriser si le joueur touche l'écran
let au_toucher = false;

canvas.addEventListener("touchstart", function(e) {
    au_toucher = true;
    if (jeu_container.style.display === "flex" && !mode.actif){
        mode.actif = true;
        messages.style.display = "none";
        jeu();
        return;
    }
    gerer_mouvement_tactile(e);
}, { passive: false });

canvas.addEventListener("touchmove", function(e) {
    // Évite que la page web ne défile ou ne tremble pendant qu'on bouge la raquette
    if (e.cancelable) e.preventDefault(); 
    gerer_mouvement_tactile(e);
}, { passive: false });

canvas.addEventListener("touchend", function(e) {
    au_toucher = false;
});

function gerer_mouvement_tactile(e) {
    if (!au_toucher) return;

    // 1. Récupérer la position du premier doigt
    let touch = e.touches[0];
    
    // 2. Calculer sa position X relative par rapport aux bords du canvas
    let rect = canvas.getBoundingClientRect();
    
    // Calcul de la position X du doigt adaptée à la résolution interne du canvas
    let touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    
    // 3. Déplacer la raquette en la centrant sous le doigt
    // (Remplace 'raquette' par ta propre variable globale si nécessaire, ex: joueur.raquette)
    raquette.x = touchX - raquette.l / 2;
    
    // 4. Sécurité pour bloquer la raquette aux murs
    if (raquette.x < 0) {
        raquette.x = 0;
    }
    if (raquette.x + raquette.l > canvas.width) {
        raquette.x = canvas.width - raquette.l;
    }
}

const pop_up = document.getElementById("pop-up");
const titre_popup = document.getElementById("titre_popup");
const contenu_popup = document.getElementById("contenu_popup");

let type_popup = "";

function ouvrir_pop_up(type){
    type_popup = type;
    if (type === "nom"){
        titre_popup.textContent = "Entre ton nom :";
        contenu_popup.innerHTML = `<input type="text" id="nom_joueur" placeholder="ex: super bebou ">`;

    }else if (type === "choix"){
        titre_popup.textContent = "Choisis ton passe :";
        contenu_popup.innerHTML = `<label> <input type="radio" name="passe" class="radio" value="cosmos"> Cosmos
                                   </label>
                                   <label> <input type="radio" name="passe" class="radio" value="maitre"> Maitre
                                   </label>`;
        
    }
    pop_up.style.display = "flex";
}

function valider_popup(){
    if (type_popup === "nom"){
        let valeur = document.getElementById("nom_joueur").value.trim();
        if (!valeur){
            afficher_message_ui("Entre un nom !","error");
            return;
        }
        joueur.nom = valeur;
        nom_j.textContent = joueur.nom;
        afficher_message_ui(`Bienvenue ${joueur.nom}`,"succes" );
    }
    if (type_popup === "choix"){
        let choix = document.querySelector('input[name="passe"]:checked');
        if (!choix){
            afficher_message_ui("Choisis un passe !", "error");
            return;
        }
        passe.passe_act = choix.value;
        afficher_message_ui(`Passe choisi : ${choix.value}`,"succes");
        charger_ancien_passe(passe.passe_act);
        afficher_passe();
    }
    sauvegarder();
    fermer_pop_up();
}
function fermer_pop_up(){
    pop_up.style.display = "none";
}
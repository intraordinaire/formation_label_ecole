
// On écoute l'évènement "click" sur toute la page
document.addEventListener("click", function (event) {
    // On regarde si la cible de l'évènement est dans le menu ou pas
    if (!event.target.classList.contains("content-toggle")) return;
    // On annule le comportement "normal" du click sur un lien
    event.preventDefault();
    
    // On met de côté le lien du menu
    var menuLink = event.target;
    // On va chercher le contenu correspondant
    var content = document.querySelector(menuLink.hash);
  
    // Si c'est le menu déjà actif, on ne fait rien
    if (menuLink.classList.contains("active")) {
      return;
    }

    // On enlève la class "active" des éléments qui l'ont déjà
    var activeElements = document.querySelectorAll(".active");
    for (var i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.remove("active");
    }
  
    // On ajoute la class "active" aux deux éléments : le lien du menu, et le contenu de la page
    menuLink.classList.toggle("active");
    content.classList.toggle("active");
  });
  
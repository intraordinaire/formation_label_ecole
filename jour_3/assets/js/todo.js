/**
 * PARTIE 1
 * Supprimer une todo quand on clique sur l'icone poubelle dans la liste
 *  - Ajouter l'évènement "click" sur le document
 *  - Vérifier que l'élément cliqué correspond bien (qu'il ait classe "delete") : l'élément est contenu dans event.target
 *  - Si oui (if), on supprime son élément parent (propriété "parentElement") de l'élément
 */
// On ajoute un écouteur sur l'évènement "click" sur tout le document
document.addEventListener("click", function(event) {
    // On vérifie si la cible (even.target) de l'évènement est une corbeille
    // Donc, s'il a la classe "delete"
    if(event.target.classList.contains("delete") == false) {
        // S'il ne l'a pas, on ne fait rien
        // return me permet de sortir et de ne rien faire
        return;
    }

    // S'il l'a, on va chercher l'élément parent de ma cible (ici mon li) et on l'enlève
    event.target.parentElement.remove();
})

/**
 * PARTIE 2
 * Ajouter une todo dans la liste quand on soumet le formulaire d'ajout
 * - Utiliser l'évènement "submit" sur le formulaire "new-todo-form"
 * - Annuler la vraie soumission du formulaire : event.preventDefault();
 * - Récupérer la valeur du champs #new-todo-value : attribut .value  de l'élément
 * - Créer le nouvel élément <li class="list-group-item d-flex justify-content-between align-items-center"><span>VALEUR_ICI</span><i class="far fa-trash-alt delete"></i></li>
 * - L'ajouter dans la liste #todos-list : .insertAdjacentHTML('beforeend', newTodoHtml)
 *
 * ----- BONUS
 * - Vérifier que la valeur ne soit pas vide (if et propriété length de la valeur, qui donne le nombre de lettres)
 * - Vider le champs de la valeur
 */
// On va sélectionner notre élément formulaire, et écouter son évènement "submit", qui arrive lorsqu'on appuie sur la touche entrée
document.querySelector("#new-todo-form").addEventListener("submit", function(event) {
    // On dit au navigateur de ne pas effectuer l'action de soumission par défaut, car on veut faire quelque chose nous même
    event.preventDefault();

    // On récupère la valeur du champs dans lequel l'utilisateur a tapé, et on le stocke dans une variable
    var maValeur = document.querySelector("#new-todo-value").value;

    // On regarde si la valeur est "non vide", donc si elle contient bien quelque chose
    // Si sa taille (length) est égale à 0, ça veut dire que ma chaine est vide
    if(maValeur.length == 0)  {
        // Alors, je ne fais rien, je ne souhaite pas ajouter un élément vide dans ma liste
        return;
    }

    // Je construit mon nouvel élément HTML, qui au final, est une grande chaine de caractères
    // Cette chaine va contenir les éléments (balises, classes, ...) du HTML, mais aussi ma valeur
    // En utilisant l'opérateur + on peut concaténer (coller) les chaines entre elles
    // "J'aime" + " le " + "JavaScript" => "J'aime le Javascript"
    var newTodoHtml = '<li class="list-group-item d-flex justify-content-between align-items-center"><span>' + maValeur + '</span><i class="far fa-trash-alt delete"></i></li>';

    // On va maintenant insérer ce nouvel élément dans le HTML de la page
    // On le met dans notre liste (#todos-list) et, comme on souhaite l'insérer en dernier,
    // on le spécifie en précisant "beforeend" (avant la fin)
    document.querySelector("#todos-list").insertAdjacentHTML('beforeend', newTodoHtml);

    // Maintenant que notre élément est ajouté, on peut enlever la valeur saisie du champs
    // On attribue donc au champs une valeur vide
    document.querySelector("#new-todo-value").value = "";
})

/**
 * PARTIE 3
 * Filtrer les todo quand on recherche
 *  - Utiliser l'évènement : "keyup" sur l'élément #search-todo-value
 *  - Récupérer la valeur saisie dans le champs
 *  - Boucler sur les éléments de la liste (.list-group-item) :
 *      - Regarder si le texte contient la valeur saisie (méthode :  text.include(anotherText))
 *      - Si oui (if), on le laisse affiché (ou on enlève la classe "d-none")
 *      - Si non (else), on ajoute la classe "d-none"
 * 
 * ----- BONUS
 * - Afficher le span "Effacer la recherche" lorsqu'une recherche est effectuée
 * - Au clic sur ce texte, effacer la recherche, et ré-afficher toute la liste
 */
// On va sélectionner notre champs de recherche et on lui ajoute un écouteur d'évènement keyup
// keyup est un un évènement qui se déclenche lorsqu'une touche du clavier est relachée
document.querySelector("#search-todo-value").addEventListener("keyup", function() {
    // On récupère la valeur saisie dans le champs de recherche dans une variable
    var search = document.querySelector("#search-todo-value").value;

    // On va sélectionner tous les éléments de notre liste, on utilise donc cette fois querySelectorAll
    // qui va nous retourner une liste (un tableau) d'éléments.
    // On va ensuite itérer (boucler) sur chaque élément (for each => pour chaque)
    document.querySelectorAll(".list-group-item").forEach(function(element) {
        // A ce moment là, on l'intégralité de notre balise <li>....</li>
        // Dans cette balise, on a bien notre texte, qui est dans un <span>, mais on a aussi l'icone de la corbeil
        // Pour être certain de ne chercher que dans notre texte, on va aller chercher l'élément <span> qui se trouve
        // dans notre élément.
        // Puis, on vérifie si le contenu de notre élément HTML contient (inclut) la valeur recherchée
        if(element.querySelector("span").innerHTML.includes(search)) {
            // Si c'est le cas, on enlève de notre élément la classe "d-none"
            element.classList.remove("d-none");
        } else {
            // Sinon, c'est un élément qu'on souhaite masquer pour afficher uniquement les bons résultats.
            // On ajoute la classe "d-none" à l'élément.
            // Cette classe permet d'appliquer la règle CSS suivante : "display: none;"
            // Ce qui cache l'élément à l'utilisateur, mais le garde dans le HTML
            element.classList.add("d-none");
        }
    })

    // PREMIERE PARTIE DU BONUS
    // => Afficher le span "Effacer la recherche" lorsqu'une recherche est effectuée

    // Si, j'ai quelque chose dans mon champs de recherche
    // Donc, si la chaine de caractères a une taille supérieure à 0
    if(search.length > 0) {
        // Alors, je vais aller afficher l'élément "Effacer la recherche" en lui enlevant la classe d-none
        document.querySelector("#clear-search").classList.remove("d-none");
    } else {
        // Sinon, je n'ai pas de recherche saisie actuellement, je masque l'élément
        document.querySelector("#clear-search").classList.add("d-none");
    }
})

// SECONDE PARTIE DU BONUS
// => Au clic sur ce "Effacer la recherche", effacer la recherche, et ré-afficher toute la liste

// On sélectionne l'élément #clear-search, et on lui ajoute un écouteur d'évènement pour le "click"
document.querySelector("#clear-search").addEventListener("click", function() {
    // On va vider le champs de recherche en lui affectant une chaine vide
    document.querySelector("#search-todo-value").value = "";

    // Comme plus haut, on a développé quelque chose qui nous permet de correctement "filtrer" les éléments
    // en fonction de ce qui est dans le champs, ici, on va pouvoir réutiliser ça.
    // On va donc "créer" un évènement de type "keyup" pour simuler le fait que l'utilisateur
    // relache une touche du clavier.

    // On créé l'évènement de type "keyup", et on le met dans une variable
    var keyupEvent = new Event('keyup');
    // On sélectionne notre champs de recherche et on lui lance (dispatch) cet évènement
    // Ici, ça simule vraiment le fait que l'utilisateur relache une touche même s'il n'a rien fait
    // On va donc rentrer dans notre écouteur d'évènement fait juste au dessus.
    document.querySelector("#search-todo-value").dispatchEvent(keyupEvent);
})
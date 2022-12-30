/**
 * PARTIE 1
 * Supprimer une todo quand on clique sur l'icone poubelle dans la liste
 *  - Ajouter l'évènement "click" sur le document
 *  - Vérifier que l'élément cliqué correspond bien (qu'il ait classe "delete")
 *  - Si oui (if), on supprime son élément parent (propriété "parentElement")
 */




/**
 * PARTIE 2
 * Ajouter une todo dans la liste quand on soumet le formulaire d'ajout 
 * - Utiliser l'évènement "submit" sur le formulaire "new-todo-form"
 * - Annuler la vraie soumission du formulaire : event.preventDefault();
 * - Récupérer la valeur du champs #new-todo-value
 * - Vérifier que la valeur ne soit pas vide (if et propriété length de la valeur, qui donne le nombre de lettres)
 * - Créer le nouvel élément <li class="list-group-item d-flex justify-content-between align-items-center"><span>VALEUR_ICI</span><i class="far fa-trash-alt delete"></i></li>
 * - L'ajouter dans la liste #todos-list : .insertAdjacentHTML('beforeend', newTodoHtml)
 * - Vider le champs de la valeur
 */


/**
 * PARTIE 3
 * Filtrer les todo quand on recherche
 *  - Utiliser l'évènement : "keyup" sur l'élément #search-todo-value
 *  - Récupérer la valeur saisie dans le champs
 *  - Boucler sur les éléments de la liste (.list-group-item) : 
 *      - Regarder si le texte contient la valeur saisie (méthode :  text.include(anotherText))
 *      - Si oui (if), on le laisse affiché (ou on enlève la classe "d-none")
 *      - Si non (else), on ajoute la classe "d-none"
 */



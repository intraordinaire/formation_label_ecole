// On appelle un service externe qui donnes les informations sur la météo du réseau électrique
fetch(
  "https://odre.opendatasoft.com/api/records/1.0/search/?dataset=nouveau_signal_ecowatt&q=&lang=fr&rows=1&sort=date&facet=date"
)
  // Quand la réponse arrive
  .then((response) => response.json())
  // On récupère le contenu de la réponse et on appelle la fonction qui traite le résultat
  .then(displayData);

/**
 * Affiche le résultat de la météo du réseau électrique
 * @param {Object} ecoWattData
 */
function displayData(ecoWattData) {
  // On vérifie d'abord qu'on a bien les données
  if (!ecoWattData.records && ecoWattData.records.length !== 1) {
    alert("Le résultat attendu n'est pas bon !");
  }

  // On récupère les données du jour
  const todayData = ecoWattData.records[0].fields;

  // On met la date du jour concerné dans le titre de la page
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.querySelector("#today-date").innerHTML = new Date(todayData.date).toLocaleDateString("fr-FR", dateOptions);

  // On met le message du jour concerné dans le titre de la page
  document.querySelector("#today-message").innerHTML = todayData.message;

  // Selon la couleur du jour, on change la couleur du titre
  switch (todayData.couleur_du_jour) {
    case 1: // Tout va bien, c'est vert
      document.querySelector("h2").classList.add("text-bg-success");
      break;
    case 2: // Réseau tendu, c'est jaune
      document.querySelector("header").classList.add("text-bg-warning");
      break;
    case 3: // Réseau saturé, c'est rouge
      document.querySelector("header").classList.add("text-bg-danger");
      break;
  }

  // On va faire le même travail, mais pour chaque heure de la journée
  for (let i = 0; i < 24; i++) {
    switch (todayData[`h${i}`]) {
      case 1: // Tout va bien, c'est vert
        document.querySelector(`#h${i}`).classList.add("bg-success");
        break;
      case 2: // Réseau tendu, c'est jaune
        document.querySelector(`#h${i}`).classList.add("bg-warning");
        break;
      case 3: // Réseau saturé, c'est rouge
        document.querySelector(`#h${i}`).classList.add("bg-danger");
        break;
    }
  }

  // On récupère l'heure courante
  const currentHour = new Date().getHours();
  // On ajoute sur l'élément de l'heure courante des classes pour le mettre en avant
  document.querySelector(`#h${currentHour}`).classList.add("progress-bar-striped", "progress-bar-animated");


  // Maitenant que tout le DOM est à jour, on enlève le loader et on affiche le contenu

  // On supprime le loader
  document.querySelector('#loader').remove();
  // On boucle sur chaque élement masqué, et on enlève la classe "d-none"
  document.querySelectorAll('.d-none').forEach(element => {
    element.classList.remove('d-none');
  })
}

ModifierImageFond();

// ****************************************************************
// Écran principal
// ****************************************************************
const ecranPrincipal = document.getElementById("ecran-principal");
const btnCommencer = document.getElementById("btnCommencer");
const btnConfiguration = document.getElementById("menu-configuration");

btnCommencer.addEventListener("click", AfficheJeu);
btnConfiguration.addEventListener("click", () => {
    console.log("Configuration");
    TransitionEcran(ecranPrincipal, false, "droite");
    TransitionEcran(ecranConfiguration, true);
});

function AfficheJeu() {
    TransitionEcran(ecranPrincipal, false, "haut");
    TransitionEcran(ecranJeu, true);

    InitialisationJeu(2000);
}


// ****************************************************************
// Écran de jeu
// ****************************************************************
const ecranJeu = document.getElementById("ecran-jeu");
const labelOperation = document.getElementById("label-operation");
const inputReponse = document.getElementById("reponse");
const btnValider = document.getElementById("btnValider");
const btnRecommencer = document.getElementById("btnJeuxRecommencer");
const btnRetourMenu = document.getElementById("btnJeuxRetourMenu");

const zoneAffichage = document.getElementById("jeu-zone-affichage");
const zoneValidation = document.getElementById("jeu-zone-validation");
const zoneMenu = document.getElementById("jeu-zone-menu");
const titre = document.getElementById("validation-titre");
const validationImage = document.getElementById("validation-image");
const encouragement = document.getElementById("validation-encouragement");

inputReponse.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        ValiderReponse();
    }
})
btnValider.addEventListener("click", ValiderReponse);
btnRecommencer.addEventListener("click", InitialisationJeu);
btnRetourMenu.addEventListener("click", () => {
    console.log("Principal");
    TransitionEcran(ecranPrincipal, true);
    TransitionEcran(ecranJeu, false);

    const Timer = setTimeout(() => {
        labelOperation.innerHTML = "...";
        inputReponse.value = "";
        zoneValidation.classList.add("hidden");
        zoneMenu.style.display = "none";
        zoneAffichage.classList.remove("hidden");
        zoneValidation.style.zIndex = "-1";
    }, 1000);
});

/**
 * Initialise une nouvelle partie
 * - charge les paramètres de l'utilisateur
 * - crée la liste des opérations à faire
 * - lance la première opération
 */
function InitialisationJeu(delais = 0) {

    ChargerConfiguration();

    operations = [];
    indexOperation = 0;
    essais = 0;

    // Création des opérations selon les choix
    for (operateur in choix) {
        choix[operateur].forEach(element => {
            operations = [...operations, ...tables[operateur][element]];
        })
    }
    console.log("Création de la liste des opérations : ", operations);

    const Timer = setTimeout(AfficherOperation, delais);
}

/**
 * Charge la configuration des tables et des choix de l'utilisateur
 * stockés en local storage.
 * Si la configuration n'existe pas, elle est initialisée avec des
 * valeurs par défaut.
 */
function ChargerConfiguration() {
    tables = JSON.parse(localStorage.getItem("tables"));
    // Configuration par défaut
    if(tables == null) {
        tables = {
            "addition": 
            {
                "1": ["1 + 0", "1 + 1"],
                "2": ["2 + 0", "2 + 1", "2 + 2"],
                "3": ["3 + 0", "3 + 1", "3 + 2", "3 + 3"],
                "4": ["4 + 0", "4 + 1", "4 + 2", "4 + 3", "4 + 4"],
                "5": ["5 + 0", "5 + 1", "5 + 2", "5 + 3", "5 + 4", "5 + 5"],
                "6": ["6 + 0", "6 + 1", "6 + 2", "6 + 3", "6 + 4", "6 + 5", "6 + 6"],
                "7": ["7 + 0", "7 + 1", "7 + 2", "7 + 3", "7 + 4", "7 + 5", "7 + 6", "7 + 7"],
                "8": ["8 + 0", "8 + 1", "8 + 2", "8 + 3", "8 + 4", "8 + 5", "8 + 6", "8 + 7", "8 + 8"],
                "9": ["9 + 0", "9 + 1", "9 + 2", "9 + 3", "9 + 4", "9 + 5", "9 + 6", "9 + 7", "9 + 8", "9 + 9"],
                "10": ["10 + 0", "10 + 1", "10 + 2", "10 + 3", "10 + 4", "10 + 5", "10 + 6", "10 + 7", "10 + 8", "10 + 9", "10 + 10"]
            },
            "soustraction": 
            {
                "1": ["1 - 0", "1 - 1"],
                "2": ["2 - 0", "2 - 1", "2 - 2"],
                "3": ["3 - 0", "3 - 1", "3 - 2", "3 - 3"],
                "4": ["4 - 0", "4 - 1", "4 - 2", "4 - 3", "4 - 4"],
                "5": ["5 - 0", "5 - 1", "5 - 2", "5 - 3", "5 - 4", "5 - 5"],
                "6": ["6 - 0", "6 - 1", "6 - 2", "6 - 3", "6 - 4", "6 - 5", "6 - 6"],
                "7": ["7 - 0", "7 - 1", "7 - 2", "7 - 3", "7 - 4", "7 - 5", "7 - 6", "7 - 7"],
                "8": ["8 - 0", "8 - 1", "8 - 2", "8 - 3", "8 - 4", "8 - 5", "8 - 6", "8 - 7", "8 - 8"],
                "9": ["9 - 0", "9 - 1", "9 - 2", "9 - 3", "9 - 4", "9 - 5", "9 - 6", "9 - 7", "9 - 8", "9 - 9"],
                "10": ["10 - 0", "10 - 1", "10 - 2", "10 - 3", "10 - 4", "10 - 5", "10 - 6", "10 - 7", "10 - 8", "10 - 9", "10 - 10"]
            }
        }
    }

    choix = JSON.parse(localStorage.getItem("choix"));
    // Choix par défaut
    if(choix == null) {
        choix = {
            "soustraction" : ["9", "10"],
        };
    }
    
    console.log("Chargement de la configuration réussi");
}

/**
 * Affiche la prochaine opération à faire
 * - supprime l'ancienne réponse
 * - cache les éléments de validation
 * - affiche la zone d'affichage
 * - cache la zone de validation en arrière plan
 * - tire au hasard une opération dans la liste des opérations
 * - affiche l'opération dans le label
 * - met le focus sur l'input de réponse
 */
function AfficherOperation() {
    inputReponse.value = "";
    zoneValidation.classList.add("hidden");
    zoneMenu.style.display = "none";
    zoneAffichage.classList.remove("hidden");
    zoneValidation.style.zIndex = "-1";
    indexOperation = getNombreAleatoire(0, operations.length);
    // console.log(operations[indexOperation]);
    labelOperation.innerHTML = operations[indexOperation];
    inputReponse.focus();

}

/**
 * Valide la réponse de l'utilisateur
 */
function ValiderReponse() {
    let bonneReponse = false;
    let reponse = Number(inputReponse.value);
    let operation = operations[indexOperation];
    essais++;

    if (reponse === eval(operation)) {
        bonneReponse = true;
        // Suppression de l'opération réussi du tableau
        operations.splice(indexOperation, 1);
        // Tester si il reste des opérations
        if(operations.length === 0) {
            console.log("Toutes les opérations sont faites!");
            FinJeu();
            return;
        }
    } else {
        // Compteur d'erreurs ?
    }

    AfficherValidation(bonneReponse, reponse, operation);

    inputReponse.value = "";
}

/**
 * Affiche une validation de la réponse de l'utilisateur
 * @param {boolean} succes - si la réponse est bonne ou non
 * @param {number} reponse - la réponse de l'utilisateur
 * @param {string} operation - l'opération qui a été faite
 */
function AfficherValidation(succes, reponse, operation) {
    zoneAffichage.classList.add("hidden");
    zoneValidation.classList.remove("hidden");
    zoneValidation.style.zIndex = "10";
    console.log(`${succes ? "Bonne" : "Mauvaise"} réponse ! | Operation : ${operation} = ${eval(operation)} | Votre reponse : ${reponse} | ${operations.length} opération(s) restantes`);

    if (succes) {
        titre.innerHTML = "Bonne réponse";
        validationImage.src = "../assets/images/success.png";
        encouragement.innerHTML = `${operations.length} opération(s) restante(s)`;
    } else {
        titre.innerHTML = "Oupss !";
        validationImage.src = "../assets/images/error.png";
        encouragement.innerHTML = 'On se reprend plus tard';
    }

    const Timer = setTimeout(AfficherOperation, 2000);
}

/**
 * Affiche l'écran de fin de jeu
 */
function FinJeu() {
    zoneAffichage.classList.add("hidden");
    zoneValidation.classList.remove("hidden");
    zoneMenu.style.display = "flex";

    zoneValidation.style.zIndex = "10";

    titre.innerHTML = "Fin de la partie";
    validationImage.src = "../assets/images/victory.png";
    encouragement.innerHTML = `Bravo! Tu as réussi en ${essais} essais!`;
}


// ****************************************************************
// Écran de configuration
// ****************************************************************
const ecranConfiguration = document.getElementById("ecran-configuration");
const btnRetour = document.getElementById("menu-retour");
btnRetour.addEventListener("click", () => {
    console.log("Retour");
    TransitionEcran(ecranConfiguration, false);
    TransitionEcran(ecranPrincipal, true);
});








/**
 * Permet de gérer la transition entre les différents écrans
 * @param {HTMLElement} ecran - L'écran que l'on souhaite faire apparaitre ou disparaitre
 * @param {boolean} retourCentre - Si true, l'écran apparaitra en position de base, sinon il disparaitra
 * @param {string} [destination] - Si "haut" ou "droite", l'écran disparaitra en haut ou à droite
 * 
 * Les écrans sont positionnés en fonction de leur id :
 * - ecran-principal : en position de base, disparait en haut ou à droite
 * - ecran-jeu : en position de base, disparait en bas
 * - ecran-configuration : en position de base, disparait à gauche
 */
function TransitionEcran(ecran, retourCentre, destination = "") {
    const delaisSortie = "0";
    const delaisRetour = "1000ms";

    if(retourCentre) {
        ecran.transitionDelay= delaisRetour;
        ecran.style.opacity = "1";
    } else {
        ecran.style.transitionDelay= delaisSortie;
        ecran.style.opacity = "0";
    }

    switch (ecran.id) {
        case "ecran-principal":
            if (retourCentre) {
                ecran.style.top = "0";
                ecran.style.right = "0";
            } else {
                if (destination === "haut") {
                    ecran.style.top = "-100vh";
                } else if (destination === "droite") {
                    ecran.style.right = "-100vw";
                }
            }
            break;

        case "ecran-jeu":
            if (retourCentre) {
                ecran.style.bottom = "0";
            } else {
                ecran.style.bottom = "-100vh";
            }
            break;

        case "ecran-configuration":
            if (retourCentre) {
                ecran.style.left = "0";
            } else {
                ecran.style.left = "-100vw";
            }
            break;
    }
}


/**
 * Fonction qui prend deux nombres min et max en argument et
 * retourne un nombre aléatoire compris entre min et max.
 * 
 * @param {number} min - Le minimum de l'intervalle.
 * @param {number} max - Le maximum de l'intervalle.
 * @returns {number} - Le nombre aléatoire.
 */
function getNombreAleatoire(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function ModifierImageFond() {
    const conteneurPrincipale = document.getElementById('conteneur_principale');
    const listeImages = [
        './assets/images/background01.png',
        './assets/images/background02.png',
        './assets/images/background03.png',
        './assets/images/background04.png',
        './assets/images/background05.png'
    ];
    let nombreAleatoire = getNombreAleatoire(0, listeImages.length - 1);
    console.log(nombreAleatoire);

    document.body.style.backgroundImage = `url(${listeImages[nombreAleatoire]})`;
}

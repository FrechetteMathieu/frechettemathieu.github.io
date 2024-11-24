
let tables = [];
let choix = {};
let operations = [];
let indexOperation = 0;
let essais = 0;

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
btnRetourMenu.addEventListener("click", AffichePrincipal);


InitialisationJeu();



function InitialisationJeu() {

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

    AfficherOperation();
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
        // choix = {
        //     "soustraction" : ["9", "10"],
        //     "addition" : ["1",]
        // };
        choix = {"addition" : ["1",]}
    }
    
    console.log("Chargement de la configuration réussi");
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



function AfficherOperation() {
    inputReponse.value = "";
    zoneValidation.classList.add("hidden");
    zoneMenu.classList.add("hidden");
    zoneAffichage.classList.remove("hidden");
    zoneValidation.style.zIndex = "-1";
    // document.getElementById("operation").innerHTML = operationsAleatoires[indexOperation];
    indexOperation = getNombreAleatoire(0, operations.length);
    // console.log(operations[indexOperation]);
    labelOperation.innerHTML = operations[indexOperation];
    inputReponse.focus();

}

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

function AfficherValidation(succes, reponse, operation) {
    zoneAffichage.classList.add("hidden");
    zoneValidation.classList.remove("hidden");

    console.log(`${succes ? "Bonne" : "Mauvaise"} réponse ! | Operation : ${operation} = ${eval(operation)} | Votre reponse : ${reponse} | ${operations.length} opération(s) restantes`);

    if (succes) {
        titre.innerHTML = "Bonne réponse";
        validationImage.src = "../assets/images/success.png";
        encouragement.innerHTML = `Bravo ! ${operations.length} opération(s) restante(s)`;
    } else {
        titre.innerHTML = "Mauvaise réponse";
        validationImage.src = "../assets/images/error.png";
        encouragement.innerHTML = 'On se reprend plus tard';
    }

    const Timer = setTimeout(AfficherOperation, 2000);
}

function FinJeu() {
    zoneAffichage.classList.add("hidden");
    zoneValidation.classList.remove("hidden");
    zoneMenu.classList.remove("hidden");

    zoneValidation.style.zIndex = "10";

    titre.innerHTML = "Fin de la partie";
    validationImage.src = "../assets/images/victory.png";
    encouragement.innerHTML = `Bravo! Tu as réussi en ${essais} essais!`;
}




















function AffichePrincipal() {
    console.log("Principal");
}




let operationsAleatoires = melangeTableau(operations);
/**
 * Fonction qui prend un tableau en argument et le retourne en ordre aléatoire.
 * Source : https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * 
 * @param {array} array - Le tableau à mélanger.
 * @returns {array} - Le tableau mélangé.
 */
function melangeTableau(array) { 
    return array.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
};
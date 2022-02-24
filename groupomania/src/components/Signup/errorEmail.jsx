// /* Importations des pages de styles + images */
import "../../Styles/App.css";
/* Importations des variables l'hors de la vérification 
du mot de passe du formulaire d'enregistrement */
function miseEnAttenteErrorEmail() {
  //Traitement
  setTimeout(ErrorEmail, 5000); //On attend 5 secondes avant d'exécuter la fonction
}

let ErrorEmail = (setemailData) => {
  if (!setemailData.match(/[a-z]+@[\w-]+\.[a-z]{2,4}$/i)) {
    console.log(setemailData);
    setemailData.classList.remove("invalid");
    setemailData.classList.add("valid");
  } else {
    setemailData.classList.remove("valid");
    setemailData.classList.add("invalid");
  }
  var myInputEmail = document.getElementById("Email");

  // When the user clicks on the password field, show the message box
  myInputEmail.onfocus = function () {
    document.getElementById("messageEmail").style.display = "block";
  };

  // When the user clicks outside of the password field, hide the message box
  myInputEmail.onblur = function () {
    document.getElementById("messageEmail").style.display = "none";
  };
  console.log("email");
};
miseEnAttenteErrorEmail();
export default ErrorEmail();

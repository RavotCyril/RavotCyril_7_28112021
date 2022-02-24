// /* Importations des pages de styles + images */
import "../../Styles/App.css";
/* Importations des variables l'hors de la vérification 
du mot de passe du formulaire d'enregistrement */
function miseEnAttenteErrorPassword() {
  //Traitement
  setTimeout(errorPassword, 5000); //On attend 5 secondes avant d'exécuter la fonction
}
function errorPassword() {
  var myInputPassword = document.getElementById("Password");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");

  // When the user clicks on the password field, show the message box
  myInputPassword.onfocus = function () {
    document.getElementById("messagePassword").style.display = "block";
  };

  // When the user clicks outside of the password field, hide the message box
  myInputPassword.onblur = function () {
    document.getElementById("messagePassword").style.display = "none";
  };
  // When the user starts to type something inside the password field
  myInputPassword.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInputPassword.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInputPassword.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInputPassword.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (myInputPassword.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };
}

miseEnAttenteErrorPassword();
export default errorPassword;

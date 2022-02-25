// /* Importations des pages de styles + images */
import "../../Styles/App.css";

var inputEmail = document.getElementById("Email");
var TextError = document.getElementById("TextError");

let errorTag = (tag, message, valid, invalid) => {
  const container = document.querySelector("." + tag);

  if (invalid) {
    container.classList.add("invalid");
    container.classList.remove("valid");
    container.textContent = message;
  } else if (valid) {
    container.classList.remove("invalid");
    container.textContent = message;
  }
};
// Variable validTag -> Fonction du code de validation avec message en cas de données exactes.

let validTag = (tag, message, valid, invalid) => {
  const container = document.querySelector("." + tag);

  if (valid) {
    container.classList.add("valid");
    container.classList.remove("invalid");
    container.textContent = message;
  } else if (invalid) {
    container.classList.remove("valid");
    container.classList.add("invalid");
    container.textContent = message;
  }
};
function ValidateEmail() {
  var mailRegex = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";
  if (inputEmail.value.match(mailRegex)) {
    console.log(inputEmail);
    validTag("textError", "Email validé", true, false);
    inputEmail.style.outline = "1px solid green";
    inputEmail.style.border = "1px solid green";
    TextError.style.content = "✖";
    TextError.style.color = "green";
  } else {
    errorTag("textError", "Email non valide", false, true);
    inputEmail.style.outline = "1px solid red";
    inputEmail.style.border = "1px solid red";
    TextError.style.content = "✔";
    TextError.style.color = "red";
  }
}
export default ValidateEmail();

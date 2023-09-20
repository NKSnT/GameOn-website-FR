function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal event
modalCloseBtn.onclick = (event) => {
  modalbg.style.display = "none";
};

let emailFailCheck = false;
let firstFailCheck = false;
let lastFailCheck = false;
let dateFailCheck = false;
let numberFailCheck = false;
let cguFailCheck = false;
let locationFailCheck = false;

//fonction qui crée et ajoute le/les element(s) d'erreur en cas de non validation du formulaire.
function addErrorElement(targetID, infoError) {
  var newP = document.createElement("p");
  newP.style.color = "red";
  newP.style.fontSize = "12px";
  newP.style.padding = "0.5vw 0 0 0";
  newP.innerText = infoError;
  var targetElement = document.getElementById(targetID);
  targetElement.insertAdjacentElement("afterend", newP);
}
// fonction qui permet la validation du formulair
//et l'affichage d'un erreure le cas contraire.
function form_Validate(target, Regex, infoError, errorState) {
  if (target.value == "") {
    if (errorState == false) {
      target.style.border = "2px solid red";
      addErrorElement(target.id, infoError);
      target.addEventListener("change", function () {
        //réajuste le visuelle si modification
        var test = target.value;
        if (test != "" && target.style.border != "") {
          target.style.border = "";
          target.nextElementSibling.remove();
          if (Object.keys({ emailFailCheck })[0].includes(target.id)) {
            emailFailCheck = false;
          } else if (Object.keys({ firstFailCheck })[0].includes(target.id)) {
            firstFailCheck = false;
          } else if (Object.keys({ lastFailCheck })[0].includes(target.id)) {
            lastFailCheck = false;
          }
        }
      });
    }
    return false;
  } else if (!Regex.test(target.value)) {
    if (errorState == false) {
      target.style.border = "2px solid red";
      addErrorElement(target.id, infoError);
      target.addEventListener("change", function () {
        //réajuste le visuelle si modification
        var test = target.value;
        if (test != "" && target.style.border != "") {
          target.style.border = "";
          target.nextElementSibling.remove();
          if (Object.keys({ emailFailCheck })[0].includes(target.id)) {
            emailFailCheck = false;
          } else if (Object.keys({ firstFailCheck })[0].includes(target.id)) {
            firstFailCheck = false;
          } else if (Object.keys({ lastFailCheck })[0].includes(target.id)) {
            lastFailCheck = false;
          }
        }
      });
    }
    return false;
  } else {
    return true;
  }
}

function form_checkBox_Validate(target, infoError, errorState) {
  var newP = document.createElement("p");
  newP.style.color = "red";
  newP.style.fontSize = "12px";
  newP.style.padding = "0 0 0 0";
  if (target.id == "checkbox1") {
    if (!document.getElementById("checkbox1").checked && !errorState) {
      newP.innerText = infoError;
      var targetElement = document.querySelector("[for='checkbox1']");
      targetElement.appendChild(newP);
      target.addEventListener("change", function () {
        if (this.checked) {
          document.querySelector("[for='checkbox1']").lastChild.remove();
          cguFailCheck = false;
        }
      });
      return false;
    } else {
      return true;
    }
  } else if (target.id == "location1") {
    var allTargets = document.querySelectorAll("[id^=location]");
    var elementsCheck = 0;
    allTargets.forEach((element) => {
      if (element.checked) {
        elementsCheck = elementsCheck + 1;
      }
    });
    if (elementsCheck != 1 && !errorState) {
      target.parentElement.insertAdjacentElement("beforeend", newP);
      newP.innerText = infoError;
      allTargets.forEach((element) => {
        element.addEventListener("change", function () {
          if (this.checked) {
            element.parentElement.lastChild.remove();
            locationFailCheck = false;
          }
        });
      });
      return false;
    } else {
      return true;
    }
  }
}

let form = document.querySelector("form[name='reserve']");

form.onsubmit = function (event) {
  //recupere les donnée , les verifie via la fonction validate, puis les envoi en POST
  event.preventDefault();

  let firstName = document.querySelector("#first");
  let lastName = document.querySelector("#last");
  let email = document.querySelector("#email");
  let birthDate = document.querySelector("#birthdate");
  let timeParticipate = document.querySelector("#quantity");
  let CGU = document.querySelector("#checkbox1");
  let checkBoxs = document.querySelector("#location1");

  //regex library
  const emailReg = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const nameReg = new RegExp(/^(.*[a-z]){2,}$/i); // min 2characters
  const dateReg = new RegExp(
    ///^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/ for fr date jj/mm/aaaa ou jj/mm/aa
    /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
  );
  const numberReg = new RegExp(/^[1-9][0-9]?$|^99$/); // 1 to 99

  let emailError = "Veuillez verifier votre Email. ";
  let nameError = "Veuillez entrer 2 caractère ou plus.";
  let dateError = "Vous devez entrer votre date de naissance";
  let numberError = "Seul les nombre entre 1 et 99 son accepté.";
  let CGUError = "Vous devez avoir lut et accepter les CGU";
  let checkboxError = "Veuilliez ne selectionner aumoin un élément.";

  let countError = 0;
  if (!form_Validate(email, emailReg, emailError, emailFailCheck)) {
    //email input is valid
    countError = countError + 1;
    emailFailCheck = true;
  }
  if (!form_Validate(firstName, nameReg, nameError, firstFailCheck)) {
    //first name input is valid
    countError = countError + 1;
    firstFailCheck = true;
  }
  if (!form_Validate(lastName, nameReg, nameError, lastFailCheck)) {
    //last name input is valid
    countError = countError + 1;
    lastFailCheck = true;
  }
  if (!form_Validate(birthDate, dateReg, dateError, dateFailCheck)) {
    countError = countError + 1;
    dateFailCheck = true;
  }
  if (
    !form_Validate(timeParticipate, numberReg, numberError, numberFailCheck)
  ) {
    countError = countError + 1;
    numberFailCheck = true;
  }
  if (!form_checkBox_Validate(CGU, CGUError, cguFailCheck)) {
    countError = countError + 1;
    cguFailCheck = true;
  }
  if (!form_checkBox_Validate(checkBoxs, checkboxError, locationFailCheck)) {
    countError = countError + 1;
    locationFailCheck = true;
  }
  if (countError != 0) {
    alert("votre réservation na pas pu être effectué.");
  } else {
    let modal = document.querySelector("div.content");
    let oldContent = document.querySelector("div.modal-body");
    let newContent = document.createElement("p");
    newContent.classList.add("modal-body_New");
    newContent.innerText = "Merci pour votre inscription";
    oldContent.style.opacity = "0";
    modal.appendChild(newContent);
    alert("Merci! votre réservation a été reçue.");
    let newDivBtn = document.createElement("div");
    newDivBtn.style.width = "100%";
    newDivBtn.classList.add("newDivBtn");
    let newCloseBtn = document.createElement("button");

    newCloseBtn.classList.add("newCloseBtn");
    newCloseBtn.innerText = "terminer";
    newDivBtn.appendChild(newCloseBtn);
    modal.appendChild(newDivBtn);

    newCloseBtn.onclick = (event) => {
      modalbg.style.display = "none";
    };
  }
};

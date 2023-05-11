/**
 * Colocar aquí JS "propio".
 * Notar que este código se ejecutará en el navegador.
 */

const contraseniaRadio = document.querySelector("#contraseniaRadio");
const divPass = document.querySelector("#divPass");

contraseniaRadio.addEventListener("click", mostrarInput);

function mostrarInput() {
  if (contraseniaRadio.checked) {
    divPass.style.display = "block";
  } else {
    divPass.style.display = "none";
  }
}

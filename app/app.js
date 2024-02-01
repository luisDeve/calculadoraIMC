import { categorias } from "./datos.js";



const formulario = document.querySelector(".formulario");
let selectSexo = document.querySelector("#genero");
let ocultar = document.querySelector(".dots");
let mostrar = document.querySelector(".container__oculta");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  validacion();
});

function datos() {
  let inputPeso = parseFloat(document.querySelector("#inputPeso").value);
  let inputAltura = parseFloat(document.querySelector("#inputAltura").value);
  const calcularIMCResult = calculoIMC(inputPeso, inputAltura);

  if (inputPeso && inputAltura && selectSexo.value === "Hombre") {
    imprimirDatos(inputPeso, calcularIMCResult.toFixed(2));
    preloader();
  } else if (inputPeso && inputAltura && selectSexo.value === "Mujer") {
    preloader();
    imprimirDatos(inputPeso, calcularIMCResult.toFixed(2));
  }
}
function preloader() {
  //anade el preloader
  ocultar.classList.add("aparecer_preloader");
  //esto oculta los datos
  mostrar.classList.remove("container__mostrar");
  setTimeout(() => {
    //oculta el preloader
    ocultar.classList.remove("aparecer_preloader");
    //anade despues de  5 segundos la informacion
    mostrar.classList.add("container__mostrar");
  }, 5000);
}

function validacion() {
  let inputPeso = parseFloat(document.querySelector("#inputPeso").value);
  let inputAltura = parseFloat(document.querySelector("#inputAltura").value);
  if (
    isNaN(inputPeso) ||
    isNaN(inputAltura) ||
    inputPeso === "" ||
    inputAltura === "" ||
    inputPeso < 0 ||
    inputAltura < 0
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      showCloseButton: false,
      focusConfirm: true,
      text: "No puedes dejar los espacios en blanco o con datos incorrectos",
    });
  } else {
    datos();
  }
}
function calculoIMC(peso, altura) {
  return Number(peso / (altura * altura));
}

function imprimirDatos(peso, IMC) {
  for (const categoria of categorias) {
    for (const rangoValor of categoria.rango) {
      if (parseFloat(IMC) === rangoValor) {
        document.querySelector(".container__datos").innerHTML = `
        <div class="container__dato-salud">
        <span>Tu salud es:</span>
        <span>${categoria.salud}</span>
      </div>
      <div class="container__dato-imc">
        <span>Tu IMC Personal:</span>
        <span>${IMC}</span>
      </div>
      <div class="container__dato-Actual">
        <span>Tu Peso Actual:</span>
        <span>${peso} </span>
      </div>`;
        setTimeout(() => {
          let container = document.querySelector(
            ".container__resultado-recomendacion-recomendaciones"
          );
          container.textContent = "";
          for (let prueba of categoria.recomendacion) {
            let parrafo = document.createElement("p");
            parrafo.classList.add("container__resultados");
            parrafo.textContent = prueba;
            container.appendChild(parrafo);
          }
          document.querySelector(
            ".container__resultado-tabla-texto"
          ).innerHTML = `<p class="container__resultado-tabla-informacion">
          Su IMC es ${IMC}, lo que indica que su peso esta en la categoría de
          ${categoria.salud} para adultos de su estatura. El IMC es una medida de
          detección y no para diagnosticar enfermedades o padecimientos.
          Para obtener más información, visite Acerca del índice de masa
          corporal para adultos.
        </p>
        <p class="container__resultado-tabla-informacion">
          Nota: es importante recordar que el cálculo del IMC no toma en
          consideración su composición corporal, es decir, si posee masa
          muscular, la contextura o si tiene retención de líquidos, por
          ejemplo. Por este motivo, lo ideal es consultar un nutricionista
          para que realice una evaluación personalizada.
        </p>`;
        });
        return;
      }
    }
  }
  if (parseFloat(IMC) >= 40) {
    document.querySelector(".container__datos").innerHTML = `
        <div class="container__dato-salud">
        <span>Tu salud es:</span>
        <span>Obesidad extrema (Clase III)</span>
      </div>
      <div class="container__dato-imc">
        <span>Tu IMC Personal:</span>
        <span>${IMC}</span>
      </div>
      <div class="container__dato-Actual">
        <span>Tu Peso Actual:</span>
        <span>${peso} </span>
      </div>`;
    setTimeout(() => {
      let container = document.querySelector(
        ".container__resultado-recomendacion-recomendaciones"
      );
      container.textContent = "";
      container.innerHTML = `<p class="container__resultados">Busca la orientación de un equipo médico especializado, que puede incluir médicos, nutricionistas, endocrinólogos y posiblemente cirujanos bariátricos. Un enfoque multidisciplinario es clave para abordar la obesidad extrema de manera integral.</p>
          
      <p class="container__resultados">Trabaja con un nutricionista para desarrollar un plan de alimentación equilibrado y sostenible. Es importante adoptar hábitos alimenticios saludables y reducir el consumo de calorías vacías.</p> 

      <p class="container__resultados">Incorpora gradualmente la actividad física bajo la supervisión de un profesional de la salud. La actividad física regular es esencial para la pérdida de peso y la mejora general de la salud.</p> `;
      document.querySelector(
        ".container__resultado-tabla-texto"
      ).innerHTML = `<p class="container__resultado-tabla-informacion">
          Su IMC es ${IMC}, lo que indica que su peso esta en la categoría de
           para adultos de su estatura. El IMC es una medida de
          detección y no para diagnosticar enfermedades o padecimientos.
          Para obtener más información, visite Acerca del índice de masa
          corporal para adultos.
        </p>
        <p class="container__resultado-tabla-informacion">
          Nota: es importante recordar que el cálculo del IMC no toma en
          consideración su composición corporal, es decir, si posee masa
          muscular, la contextura o si tiene retención de líquidos, por
          ejemplo. Por este motivo, lo ideal es consultar un nutricionista
          para que realice una evaluación personalizada.
        </p>`;
    });
  }else if(parseFloat(IMC) <= 18.5){
    document.querySelector(".container__datos").innerHTML = `
    <div class="container__dato-salud">
    <span>Tu salud es:</span>
    <span>Bajo peso</span>
  </div>
  <div class="container__dato-imc">
    <span>Tu IMC Personal:</span>
    <span>${IMC}</span>
  </div>
  <div class="container__dato-Actual">
    <span>Tu Peso Actual:</span>
    <span>${peso} </span>
  </div>`;
setTimeout(() => {
  let container = document.querySelector(
    ".container__resultado-recomendacion-recomendaciones"
  );
  container.textContent = "";
  container.innerHTML = `<p class="container__resultados">Trabaja con un nutricionista para crear un plan de alimentación equilibrado y nutritivo. Esto puede incluir alimentos ricos en proteínas, grasas saludables, carbohidratos complejos, vitaminas y minerales esenciales. Es posible que se necesite aumentar la ingesta calórica para promover el aumento de peso.</p>
      
  <p class="container__resultados">Aunque el ejercicio puede ayudar a mejorar la salud en general, es importante encontrar un equilibrio para no aumentar el gasto calórico de manera excesiva. Se pueden considerar actividades físicas que promuevan el desarrollo muscular y la fuerza, bajo la supervisión de un profesional de la salud o un entrenador personal.</p> 

  <p class="container__resultados">El estrés puede afectar negativamente el peso corporal. Aprender a gestionar el estrés a través de técnicas como la meditación, el yoga o la terapia puede ser beneficioso para mejorar la salud general y el bienestar emocional.</p> `;
  document.querySelector(
    ".container__resultado-tabla-texto"
  ).innerHTML = `<p class="container__resultado-tabla-informacion">
      Su IMC es ${IMC}, lo que indica que su peso esta en la categoría de
       para adultos de su estatura. El IMC es una medida de
      detección y no para diagnosticar enfermedades o padecimientos.
      Para obtener más información, visite Acerca del índice de masa
      corporal para adultos.
    </p>
    <p class="container__resultado-tabla-informacion">
      Nota: es importante recordar que el cálculo del IMC no toma en
      consideración su composición corporal, es decir, si posee masa
      muscular, la contextura o si tiene retención de líquidos, por
      ejemplo. Por este motivo, lo ideal es consultar un nutricionista
      para que realice una evaluación personalizada.
    </p>`;
});
  }
}

//Variables
let nav = document.getElementById("nav"); //creamos una variable nav la cual obtendra los elementos con id nav de html en este caso son el conjunto de links del encabezado
let menu = document.getElementById("enlaces"); //lo mismo que arriba, pero con enlaces osea los tipo 'a'
let preload = document.getElementById("onload");
let body = document.getElementById("body");
let cerrado = true;

function menus() {
  let desplazamiento_Actual = window.pageYOffset;

  if (desplazamiento_Actual <= 300) {
    //con window.pageYOffset miramos cuando llega mas o menos a 300 y caambiamos la clase del menu de navegacion
    nav.classList.remove("nav2"); //removemos una clase de los links
    nav.className = "nav1"; //agregamos la otra clase
    nav.style.transition = "1s"; //hacemos que se demore 1 segundo en hacer la transicion
  } else {
    nav.classList.remove("nav1");
    nav.className = "nav2";
    nav.style.transition = "1s";
  }
}

window.addEventListener("load", function () {
  //cuando recargo la pagina se actualiza tambien el header por si esta mas abajo
  $("#onload").fadeOut(); //escondemoes el preloader con jquery
  $("body").removeClass("hidden"); //removemos la clase hidden para poder hacer scroll
  //preload.style.display = 'none';  lo mismo de arriba pero hecho con js mas o menos
  //body.classList.remove('hidden');
  menus();
});

window.addEventListener("scroll", function () {
  //agregamo una funcion que ocurra cuando hacemos scroll en este caso que imprima
  menus();
});

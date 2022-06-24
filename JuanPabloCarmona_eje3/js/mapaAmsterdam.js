//Variables de juego
var game = new Phaser.Game(958, 769, Phaser.CANVAS, "mapaAmsterdam");

//Variables de imagen
var background;

//Variables de texto
var textTitulo;
var textDescripcion;
var image;
var info;

//puntos para seleccionar en el mapa
var sites = [
  {
    icon: "museo",
    image: "anafrank",
    pox: 325,
    posy: 280,
    scale: 1,
    title: "Museo de Ana Frank",
    description:
      "Tambien conocido como la Casa de Ana Frank en el Prinsengracht en Ámsterdam, Países Bajos, es un museo dedicado a la diarista de guerra judía Ana Frank, que se ocultó de la persecución nazi con su familia y cuatro personas más en el ático y el desván del edificio, tapada la entrada por una falsa estantería. Así como la preservación del escondite —conocido en neerlandés como Achterhuis— y una exhibición sobre la vida y tiempos de Ana Frank. El museo funciona como espacio para resaltar todas las formas de persecución y discriminación.",
  },
  {
    icon: "parque",
    image: "vondelpark",
    pox: 170,
    posy: 530,
    scale: 0.3,
    title: "Parque Vondel",
    description:
      "El Vondelpark es el parque más grande de Ámsterdam. Gratuito, céntrico y rodeado de alguno de los lugares más conocidos de la ciudad, como el Rijksmuseum o el Museo de Van Gogh. Se trata del sitio idóneo para descansar, caminar, hacer deporte, disfrutar de Ámsterdam con niños o comer al aire libre en sus más de 40 hectáreas.",
  },
  {
    icon: "castillo",
    image: "rijksmuseum",
    pox: 325,
    posy: 470,
    scale: 0.37,
    title: "Rijksmuseum",
    description:
      "El imponente Rijksmuseum o Museo Nacional, es otro de los mejores museos de Ámsterdam y de todo el país, con más de dos millones de visitantes al año. Durante la visita darás un paseo por la historia del arte del país, desde el Edad Media hasta el último siglo, viendo numerosas piezas de gran valor como preciosas colecciones de porcelana y algunas de las mejores pinturas del Siglo de Oro holandés como La Lechera y la Ronda de Noche, una de las obras maestras Rembrandt.",
  },
  {
    icon: "plaza",
    image: "plazadam",
    pox: 410,
    posy: 290,
    scale: 0.37,
    title: "Plaza Dam",
    description:
      "La Plaza Dam, la plaza más importante y con más ambiente que ver en Ámsterdam. Rodeada de edificios como el Palacio Real, la Nieuwe Kerk (Iglesia Nueva), el Museo de cera de Madame Taussauds y la tienda de lujo De Bijenkorf, esta plaza se llena de turistas todos los días sentados en las escaleras que rodean el Monumento Nacional, un obelisco de 22 metros de altura que rinde homenaje o los soldados holandeses que murieron en la Segunda Guerra Mundial, o en las terrazas de los numerosos bares.",
  },
  {
    icon: "flores",
    image: "mercadoflores",
    pox: 390,
    posy: 370,
    scale: 0.85,
    title: "Mercado de flores",
    description:
      "Uno de los atractivos turísticos de Ámsterdam que despierta más interés es el mercado flotante de las flores. Este mercadillo es único en el mundo, ya que los puestos dónde se venden las flores se colocan en casas flotantes. En este lugar podrás comprar los famosos tulipanes y bulbos a modo de recuerdo.",
  },
  {
    icon: "pista",
    image: "pistahielo",
    pox: 850,
    posy: 650,
    scale: 1.1,
    title: "Pista de hielo Jaap",
    description:
      "El Jaap Eden baan es una pista de hielo ubicada en Watergraafsmeer, un barrio del este de Ámsterdam. La pista lleva el nombre del famoso patinador sobre hielo holandés Jaap Eden. Contiene un carril de 400 metros y Jaap Edenhal. La sala es el hogar de los Amsterdam Tigers de la BeNe League.",
  },
];

//Funcion auxiliar que verifica si esta activo alguno de los cards
function verifyActive() {
  if (active) {
    graphics.visible = false;
    textTitulo.visible = false;
    textDescripcion.visible = false;
    close.visible = false;
    active = false;
  }
}

var play = {
  //Funcion que importa todos los elementos para el programa como imagenes
  preload: function () {
    game.load.image("imgBack", "../images/mapa/amsterdam.png");
    game.load.image("menu", "../images/mapa/borde.png");
    sites.forEach((site) => {
      game.load.image(site.icon, "../images/mapa/" + site.icon + ".png");
      game.load.image(site.image, "../images/" + site.image + ".jpg");
    });
  },

  //Funcion que crea los elementos del canvas
  create: function () {
    game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.setShowAll();
    game.scale.refresh();

    //Sprite con la imagen de fondo, e.g: Mapa
    background = game.add.sprite(0, 0, "imgBack");
    background.scale.setTo(1.15);

    sites.forEach((site) => {
      button = game.add.button(
        site.pox,
        site.posy,
        site.icon,
        actionOnClick.bind(this, site),
        this,
        2,
        1,
        0
      );
      //button.anchor.setTo(0.5);
      button.scale.setTo(0.1);
    });

    /* Menu  */
    info = this.add.image(600, 20, "menu");
    info.scale.setTo(0.8);
    info.visible = false;
    info.inputEnabled = true;
    info.events.onInputDown.add(function () {
      info.visible = false;
      img.visible = false;
      textTitulo.visible = false;
      textDescripcion.visible = false;
    });

    var styleTitle = { font: "bold 20px Arial" };
    textTitulo = game.add.text(650, 28, "", styleTitle);
    textTitulo.visible = false;

    var styleDescription = {
      font: "17px Arial",
      align: "left",
      boundsAlignH: "left",
      boundsAlignV: "top",
      wordWrap: true,
      wordWrapWidth: 310,
    };
    textDescripcion = game.add.text(620, 300, "", styleDescription);
    textDescripcion.setTextBounds(0, 0, 775, 568);
    textDescripcion.visible = false;

    //Creacion de los sprites con las imagenes
    img = game.add.sprite(620, 80, "anafrank");
    img.visible = false;

    function actionOnClick(site) {
      if (textTitulo._text == site.title) {
        img.visible = !img.visible;
        textTitulo.visible = !textTitulo.visible;
        textDescripcion.visible = !textDescripcion.visible;
        info.visible = !info.visible;
      } else {
        img.visible = true;
        textTitulo.visible = true;
        textDescripcion.visible = true;
        info.visible = true;
      }

      textTitulo.setText(site.title);
      textDescripcion.setText(site.description);
      img.loadTexture(site.image);
      img.scale.setTo(site.scale);
    }
  },

  update: function () {
    game.scale.setShowAll();
    game.scale.refresh();
  },
};

game.state.add("active", play);
game.state.start("active");

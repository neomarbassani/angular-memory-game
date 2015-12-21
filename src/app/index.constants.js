(function() {
  'use strict';

  angular
    .module('memoryGame')
    .constant('images', images())
    .constant('timeOut', 500);

  function images(){
    return [
      "avatares.gif",
      "bmw.jpg",
      "camaroSS.jpg",
      "car1.jpg",
      "car2.jpeg",
      "cars.png",
      "Corvette-Z06.jpg",
      "ferrari.jpg",
      "ford-gt.jpg",
      "fusion.jpg",
      "gtr.jpg",
      "indy.jpg",
      "mercedes.gif",
      "mustang.jpg",
      "peugeot.jpg",
      "slk.jpg",
      "usa-cars.jpg",
      "volvo.jpg"
    ];
  }
})();

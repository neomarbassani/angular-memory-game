(function() {
  'use strict';

  angular
    .module('memoryGame')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $interval, images, timeOut) {
    var vm = this;
    vm.options = [];
    vm.timer = 0;
    vm.moves = 0;
    vm.running = false;

    var selected = null;
    var startTime;
    var totalItems = images.length;

    var sortImages = function(){
      var allImgs = images.concat(images);
      vm.options = [];

      while(allImgs.length) {
        var item = {};
        item.url = allImgs.splice(Math.trunc(Math.random() * allImgs.length), 1)[0];
        item.selected = false;
        item.discovered = false;

        vm.options.push(item);
      }
    };

    var match = function(op1, op2){
      return (op1.url == op2.url);
    }

    var to = null;
    vm.select = function(option) {
      if(!vm.running || option.discovered || (selected != null && selected.$$hashKey == option.$$hashKey))
        return;

      if(selected == null){
        selected = option;
        selected.selected = true;
      }else if(to == null){
        vm.moves++;
        option.selected = true;

        if(!match(option, selected)){
          to = $timeout(function() {
            option.selected = false;
            selected.selected = false;
            selected = null;
            to = null;
          }, timeOut);
        }else{
          selected.discovered = true;
          option.discovered = true;
          totalItems--;
          if(totalItems == 0){
            vm.stop()
          }
          selected = null;
        }
      }
    }

    var timer;
    vm.start = function(){
      totalItems = images.length;
      vm.moves = 0;
      vm.running = true;
      vm.timer = 0;
      sortImages();
      
      startTime = new Date();
      timer = $interval(function() {
        vm.timer = new Date() - startTime;
      }, 1000);
    }

    vm.stop = function(){
      $interval.cancel(timer);
      vm.running = false;
    }

    sortImages();
  }
})();

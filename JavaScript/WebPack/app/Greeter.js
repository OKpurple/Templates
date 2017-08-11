//var config = require('.config.json');
import config from './config.json';


module.exports = function(){
  var greet = document.createElement('div');
  greet.textContent = config.greetText;
  return greet;
}

//Filter for select icon
myApp.filter('renderSymbol', function(){
  return function(val){
    var symbol =  document.createElement('div');
    symbol.innerHTML = val;
    return symbol.childNodes[0].nodeValue;
  };
});

// Diective For number only in form validation
myApp.directive('numbersOnly', function () {
    return {
        require: 'ngModel', 
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {

                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})
// Directive For letter only in form validation
.directive('letterOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^a-zA-Z]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})
.directive('focus', function() {
    return {
        restrict: 'A',
        link: function($scope,elem,attrs) {
    
          elem.bind('keydown', function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
              e.preventDefault();
              
              if(elem.next() != null)
                elem.next().focus();
            }
          });
        }
      }
  });




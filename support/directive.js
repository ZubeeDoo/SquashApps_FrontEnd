
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
                    var transformedInput = text.replace(/[^a-zA-Z/ ]/g, '');

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
  })
  //Otp
  .directive('otpDirective', ['$timeout', function($timeout) {
    return {
        restrict: 'A', // restrict by attribute
        scope: {
            options: "="
        },
        template: "<div class='scOTPDiv scCenterElement'>" +
        "<input type='{{type}}' ng-repeat=\"c in characters\" autocomplete='off' ng-keyup='onKeyUp($index,$event)' ng-keydown='onKeyDown($index,$event)' ng-model='c.value' id='otpInput{{c.index}}' name='otpInput{{c.index}}' ng-style=\"style\" placeholder=\"{{placeholder}}\" maxlength=\"1\"  />\n" +
        "</div>",
        link: function($scope, elem) {
            var size = parseInt($scope.options.size) || 6;
            var width = 100 / (size + 1);
            var margin = width / size;
            var tmp = [],
                elementArr = [];
            var DEFAULT_COLOR = "#6f6d6d";
            //generating a random number to attach to id
            var randomNumber = Math.floor(Math.random() * 10000) + 100
            $scope.style = {
                "margin-right": margin + "%",
                
                "display": "inline-block",
                "text-align": "center",
               
                "background":"transparent",
                "color": $scope.options.style && $scope.options.style.color ? $scope.options.style.color : DEFAULT_COLOR,
                "font-size": $scope.options.style && $scope.options.style.fontSize ? scope.options.style.fontSize : "20px",
    
                "padding": "10px 15px",
                "width": "15px",
                // "margin": "5px",
                "border-style": "unset",
                "border": "1px solid #bbbbbb"
            };
    
            $scope.type = $scope.options.type ? $scope.options.type : "text";
            $scope.placeholder = $scope.options.placeholder && $scope.options.placeholder.length === 1 ? $scope.options.placeholder : "";
    
            $scope.setOtpValue = function() {
                $scope.options.value = "";
                var done = true;
                angular.forEach($scope.characters, function(v, k) {
                    if (v.value.length !== 1) {
                        done = false;
                        return false;
                    }
                    $scope.options.value = $scope.options.value + v.value;
                });
                if (done) {
                    if (typeof($scope.options.onDone) === "function") {
                        $scope.options.onDone($scope.options.value);
                    }
                }
            };
    
            $scope.onKeyUp = function(index, e) {
                var key = e.keyCode || e.which;
                var old = $scope.options.value;
                $scope.setOtpValue();
                if ($scope.characters[index].value.length > 0 && key !== 8 && index != size - 1) {
                    $timeout(function() {
                        elementArr[index + 1][0].focus();
                    });
                }
                if (typeof($scope.options.onChange) === "function" && old !== $scope.options.value) {
                    $scope.options.onChange($scope.options.value);
                }
    
            };
    
            $scope.onKeyDown = function(index, e) {
                var key = e.keyCode || e.which;
                if (key === 8 && $scope.characters[index].value === "" && index !== 0) {
                    $timeout(function() {
                        elementArr[index - 1][0].focus();
                    });
                }
            };
    
            for (var i = 0; i < size; i++) {
                tmp.push({
                    index: randomNumber + "-" + i,
                    value: ""
                });
            }
            $scope.characters = tmp;
    
            $timeout(function() {
                for (var i = 0; i < size; i++) {
                    elementArr.push(angular.element(document.querySelector("#otpInput" + randomNumber + "-" + i)));
                }
            });
    
        }
    };
}]);
var services = angular.module('SqaureAppTask.services', []);
  
services.value('version', '0.1');

services.factory('pouchdb', function() {
  Pouch.enableAllDbs = true;
  return new Pouch('SqaureAppTask');
});


services.factory('DBService', function($q, pouchdb, $rootScope) {
  
  return {
    add: function(UserDetails) {
      var deferred = $q.defer();
      pouchdb.post(UserDetails, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(res)
          }
        });
      });
      return deferred.promise;
    },
    getScore: function(UserDetails) {
      pouchdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        console.log(result);
        res.json({"users": result.rows});
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
  
});
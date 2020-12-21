var services = angular.module('SqaureAppTask.services', []);

services.factory('pouchdb', function() {
  return new PouchDB('dbname');
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
    getAllData: function(fnSuccess) {
      pouchdb.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        console.log(result);
        fnSuccess(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
    },
    checkCredentials: function(UserDetails, fnSuccess) {
      pouchdb.query(function (doc, emit) {
        emit(doc.EmailId);
      }, {key: UserDetails.EmailId}).then(function (result) {
          fnSuccess(result.rows.length);
      }).catch(function (err) {
        // handle any errors
      });
    }
  }
  
});
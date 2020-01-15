'use strict';

module.exports = (User) => {
    var ObjectId = require('mongodb').ObjectId;

    User.getUser = function(id, cb){
        User.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('user');
            collection.find({'_id':ObjectId(id)}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };
    User.updateUserPassword = (params, cb) => {
        User.findOne({
          where: {
            email: params.email
          }
        }).then(result => {
          if (result) {
            result.updateAttribute('password', params.password, function(err, user) {
              if (user) {
                return cb(null, utils.s('AC0000', 'SUCCESS'));
              } else {
                return cb(utils.e(500, ''));
              }
            });
          } else {
            return cb(utils.e(400, 'WRONG PARAMETER'));
          }
        }).catch(error => {
          return cb(error);
        });
      };
      
    User.remoteMethod('getUser',{
        accepts : [
            { arg: 'getUser', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getUser',verb: 'get'}
    });
};

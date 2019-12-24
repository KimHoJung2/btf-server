'use strict';

module.exports = (AccessToken) => {

    AccessToken.getUser = function(id, cb){
        AccessToken.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('accessToken');
            collection.find({'_id':id}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    AccessToken.remoteMethod('getUser',{
        accepts : [
            { arg: 'getUser', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getUser',verb: 'get'}
    });

};
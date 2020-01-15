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
    User.remoteMethod('getUser',{
        accepts : [
            { arg: 'getUser', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getUser',verb: 'get'}
    });
};

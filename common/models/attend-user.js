'use strict';

module.exports = function(Attenduser) {

    var ObjectId = require('mongodb').ObjectId;
    
    Attenduser.getUser = function(name, id, cb){
        Attenduser.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('attendUser');
            collection.find({'username':name},{'boardId': ObjectId(id)}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Attenduser.remoteMethod('getUser',{
        accepts : [
            { arg: 'getName', type: 'string', require: true },
            { arg: 'getBoardId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getUser',verb: 'get'}
    });
};

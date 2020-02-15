'use strict';

module.exports = function(Mainscoreboarddata) {

    var ObjectId = require('mongodb').ObjectId;

    Mainscoreboarddata.getBoard = function(id, cb){
        Mainscoreboarddata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainscoreBoardData');
            collection.find({'boardId': ObjectId(id)}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Mainscoreboarddata.remoteMethod('getSuccess',{
        accepts : [
            { arg: 'getId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getSuccess',verb: 'get'}
    });
};

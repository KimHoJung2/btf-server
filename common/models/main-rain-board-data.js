'use strict';

module.exports = function(Mainrainboarddata) {


    var ObjectId = require('mongodb').ObjectId;

    Mainrainboarddata.getBoard = function(id, cb){
        Mainrainboarddata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainRainBoardData');
            collection.find({'boardId': ObjectId(id)}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Mainrainboarddata.remoteMethod('getBoard',{
        accepts : [
            { arg: 'getId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getBoard',verb: 'get'}
    });

};

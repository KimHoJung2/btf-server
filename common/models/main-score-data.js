'use strict';

module.exports = function(Mainscoredata) {

    var ObjectId = require('mongodb').ObjectId;

    Mainscoredata.getMyScore = function(name, date, cb){
        Mainscoredata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainScoreData');
            collection.find({'username':name, 'date': date}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Mainscoredata.getScoreAll = function(id, cb){
        Mainscoredata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainScoreData');
            collection.find({'boardId': ObjectId(id)}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Mainscoredata.remoteMethod('getMyScore',{
        accepts : [
            { arg: 'getName', type: 'string', require: true },
            { arg: 'getDate', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getMyScore',verb: 'get'}
    });

    Mainscoredata.remoteMethod('getScoreAll',{
        accepts : [
            { arg: 'getId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getScoreAll',verb: 'get'}
    });

};

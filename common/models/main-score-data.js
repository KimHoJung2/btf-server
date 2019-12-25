'use strict';

module.exports = function(Mainscoredata) {

    var ObjectId = require('mongodb').ObjectId;

    Mainscoredata.getMyScore = function(name, id, cb){
        Mainscoredata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainScoreData');
            collection.find({'username':name, 'boardId': ObjectId(id)}).toArray(function(err,res){
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

    Mainscoredata.getAllAvg = function(name, id, cb){
        Mainscoredata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainScoreData');
            collection.find({'username':name},{'userId': ObjectId(id)}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Mainscoredata.removeAll = function(id, cb){
        Mainscoredata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainScoreData');
            var query = {boardId : ObjectId(id)};
            collection.deleteOne(query).then(function(res){
                return res;
            });
        });
    };

    Mainscoredata.remoteMethod('getAllAvg',{
        accepts : [
            { arg: 'getName', type: 'string', require: true },
            { arg: 'getId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getAllAvg',verb: 'get'}
    });

    Mainscoredata.remoteMethod('getMyScore',{
        accepts : [
            { arg: 'getName', type: 'string', require: true },
            { arg: 'getId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getMyScore',verb: 'get'}
    });
    

    Mainscoredata.remoteMethod('removeAll',{
        accepts : [
            { arg: 'removeId', type: 'string', require: true },
        ],
        returns: { arg: 'Content-Type', type: 'string', http: { target: 'header' }}
    });

    Mainscoredata.remoteMethod('getScoreAll',{
        accepts : [
            { arg: 'getId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getScoreAll',verb: 'get'}
    });

};

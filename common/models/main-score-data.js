'use strict';

module.exports = function(Mainscoredata) {

    Mainscoredata.getMyScore = function(name, date, cb){
        Mainscoredata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainScoreData');
            collection.find({'username':name, 'date': date}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Mainscoredata.getScoreAll = function(name, date, cb){
        Mainscoredata.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('mainScoreData');
            collection.find({'date': date}).toArray(function(err,res){
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
            { arg: 'getDate', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getScoreAll',verb: 'get'}
    });

};

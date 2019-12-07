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

    Mainscoredatab.remoteMethod('getMyScore',{
        accepts : [
            { arg: 'getName', type: 'string', require: true },
            { arg: 'getDate', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getMyScore',verb: 'get'}
    });

};

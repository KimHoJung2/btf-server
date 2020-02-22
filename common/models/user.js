'use strict';

module.exports = (User) => {
    var ObjectId = require('mongodb').ObjectId;

    User.getUser = function(id, name, cb){
        User.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('user');
            console.log(name);
            if(name === "undefined" && id === "undefined"){
                collection.find({},{}).toArray(function(err,res){
                    cb(null,res);
                });
                
            }else if(name === "undefined"){
                collection.find({'_id':ObjectId(id)}).toArray(function(err,res){
                    cb(null,res);
                });
                
            }else{
                collection.find({'username':name}).toArray(function(err,res){
                    cb(null,res);
                });
            }
            
            
        });
    };
    User.remoteMethod('getUser',{
        accepts : [
            { arg: 'getUser', type: 'string', require: true },
            { arg: 'getName', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getUser',verb: 'get'}
    });
};

'use strict';

module.exports = function(Member) {

    var ObjectId = require('mongodb');
    Member.removeAll = function(type, arr, cb){
        console.log(type)
        Member.getDataSource().connector.connect(function(err, db){
            var collection = db.collection(type);
            var removeArr = [];
            arr.forEach(function(item){
                removeArr.push(new ObjectId(item));
            });
            var query = { _id : { $in : removeArr }};
            collection.deleteMany(query).then(function(res){
                return res;
            });
        });
        cb(null);
    };

    Member.insertData = function(type, data, cb){
        Member.getDataSource().connector.connect(function(err, db){
            var collection = db.collection(type);
            collection.insertOne(data, function(res){
                cb(null);
            });
        });
    };
    
    
    Member.remoteMethod('insertData', {
        accepts: [
            { arg: 'memberName', type: 'string', require: true },
            { arg: 'password', type: 'string', require: true }
        ],
        returns : { arg: 'Contetn-Type', type: 'strgin', http: { target : 'header' }}
    })
};

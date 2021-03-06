'use strict';

module.exports = function(Attenduser) {

    var ObjectId = require('mongodb').ObjectId;

    Attenduser.getUser = function(name, id, cb){
        Attenduser.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('attendUser');
            collection.find({$and : [{'username':name},{'boardId': ObjectId(id)}]}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };

    Attenduser.getList = function(id, cb){
        Attenduser.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('attendUser');
            collection.find({'boardId': ObjectId(id)}).toArray(function(err,res){
                cb(null,res);
            });
        });
    };
    
    Attenduser.deleteUser = function(name, id, cb){
        Attenduser.getDataSource().connector.connect(function(err,db){
            var collection = db.collection('attendUser');
            collection.deleteOne({'username':name},{'boardId': ObjectId(id)}).then(function(res){
                return res
            });
        });
        cb(null)
    };

    Attenduser.remoteMethod('getUser',{
        accepts : [
            { arg: 'getName', type: 'string', require: true },
            { arg: 'getBoardId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getUser',verb: 'get'}
    });

    Attenduser.remoteMethod('getList',{
        accepts : [
            { arg: 'getBoardId', type: 'string', require: true }
        ],
        returns : { arg: 'result', type: 'object'},
        http : { path : '/getList',verb: 'get'}
    });

    Attenduser.remoteMethod('deleteUser',{
        accepts : [
            { arg: 'deleteName', type: 'string', require: true },
            { arg: 'deleteBoardId', type: 'string', require: true },
        ],
        returns: { arg: 'Content-Type', type: 'string', http: { target: 'header' }}
    });
};

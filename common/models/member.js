'use strict';

module.exports = function(Member) {


    Member.signup = function(msg, cb){
        cb(null)
    } 
ß
  Member.remoteMethod('signup',{
    accepts : {arg:'asdfer', type: 'string'},
    returns : {arg: 'data', type: 'object'}
  });  
};

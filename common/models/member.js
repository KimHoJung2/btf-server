'use strict';

module.exports = function(Member) {


    Member.signup = function(msg, cb){
        cb(null)
    } 

  Member.remoteMethod('signup',{
    accepts : 
        { arg: 'memberId', type: 'string' },
      
    returns : { arg: 'data', type: 'object'}
  });  
};

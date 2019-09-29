'use strict';

module.exports = function(Member) {


    Member.signup = function(data, cb){
        cb(null, data)
    } 

  Member.remoteMethod('signup',{
    accepts : 
        { arg: 'memberId', type: 'string' },
      
    returns : { arg: 'data', type: 'object'}
  });  
};

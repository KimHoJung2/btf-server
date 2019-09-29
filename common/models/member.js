'use strict';

module.exports = function(Member) {


    Member.signup = function(msg, cb){
        cb(null, 'signup' + msg)
    } 

  Member.remoteMethod('signup',{
    accepts : {arg:'msg', type: 'string'},
    returns : {arg: 'greeting', type: 'strging'}
  });  
};

'use strict';

module.exports = function(Member) {


    Member.signup = function(){
        console.log("asdfasdfsadf")
    } 

    Member.remoteMethod('signup');  
};

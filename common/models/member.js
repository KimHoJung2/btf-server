'use strict';

module.exports = function(Member) {


    Member.findOne({where: {userName:'김호정'}}, (err, user) => {
      if(err || !user){
        console.log('false');
      }else{
        console.log(true);
        console.log(user);
      }
    })
};

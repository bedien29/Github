//tang su ly
const userService = require('./service');

exports.login =async(email,password) =>{
     const user =await userService.login(email);
     if (user&&user.password == password) {

         return user;
     }
     return null;
 }
const userModel = require('./model');





//tang goi database
exports.login = async(email) =>{
    // const user = data.filter(i => i.email == email)[0];
    // return user;
/**
 * select id, username, password from users where username=''
 */
    const user = await userModel.findOne({email: email},
        'id email password');
        return user;

}













var data =[
    {  
    id :1,
    email:'dien@gmail.com',
    password: '123456' ,
    name: ' Dien'
    }
]
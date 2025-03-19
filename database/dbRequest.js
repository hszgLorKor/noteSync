import {comparePassword} from './utils.js';
import collection from './mongoose.js';
async function loginCheck(username, password) {
    //anfrage an mongodb ob username existiert
    try {
        const user = await collection.findOne({username});
        if (!user) {
            return false;
        }
    }
    catch (error){
        console.error(error);
        return false;
    }
    //extract password that is hashed
    const hardedPassword = user.password;

    //Compaire password with hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return false;
    }
    return true;


    //aufruf compare password

}
function roleCheck(username){
    //extract role
    return user.role;

}
export {loginCheck, roleCheck};

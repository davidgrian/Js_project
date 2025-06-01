const validateUserData = (userData) =>{
    if(!userData.username || !userData.password){
        throw new Error('Enter the username AND the password');
    }
}

module.exports = {validateUserData};
const axios = require('axios');
const logger = require('../../lib/logs');

const getGitUser = async function(){
    try{
        const userProjects = await axios.get('https://api.github.com/users/Daniel-Modilevsky/repos');
        // 'https//https://api.github.com/users/${req.query.user_name}/repos.'
        userProjects.forEach(user => {
            logger.debug(user);
        });
    }
    catch(error){
        logger.error(error);
    }
}
getGitUser();

const d = 2;
module.exports = d;

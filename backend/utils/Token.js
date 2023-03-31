var jwt = require('jsonwebtoken');
function createtoken (payload) {
    return  jwt.sign(payload, process.env.jwtCode, {expiresIn: "1h"});
}
module.exports=createtoken
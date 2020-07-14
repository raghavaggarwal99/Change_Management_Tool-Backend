/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
var jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {


  if (req.body.headers) {

    var token = req.body.headers["Authorization"];

    let verifiedtoken=jwt.verify(token, 'shhhhh')


    if(verifiedtoken && verifiedtoken.foo){
        req.userId=verifiedtoken.foo
    }
    else{
      return res.json(401, {err: 'No Authorization header was found'});
    }
    
  } 
  else{
    return res.json(401, {err: 'No Authorization header was found'});
  }

  next();

}
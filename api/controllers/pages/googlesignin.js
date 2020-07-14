var jwt = require('jsonwebtoken');
sha256 = require('crypto-js/sha256');
const {OAuth2Client} = require('google-auth-library');

module.exports = {


  friendlyName: 'Google Sign In',


  inputs: {

    idToken: {
      description: 'The access token that we get through the gmail account',
      type: 'string',
      required: true
    },

  },


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,

    }

  },


  fn: async function (inputs) {

    const client = new OAuth2Client('347183469368-jqn8u16tg5rkivjapvpp8lpcl394190f.apps.googleusercontent.com');
    const ticket = await client.verifyIdToken({
        idToken: inputs.idToken,
        audience: '347183469368-jqn8u16tg5rkivjapvpp8lpcl394190f.apps.googleusercontent.com'
    });
    
    const payload= ticket.getPayload();

    let Email = payload['email'];
    console.log(Email)


    var UserRecord = await User.findOne({
        emailAddress: Email,
    });

    if(!UserRecord) {
        throw 'badCombo';
      }

    Token= await sails.helpers.createjwttoken.with({id: UserRecord.id})

    return this.res.json(200, {user: UserRecord, token: Token});

  }

};

var jwt = require('jsonwebtoken');
sha256 = require('crypto-js/sha256');

module.exports = {


  friendlyName: 'Login',

  inputs: {

    EmailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },

    Password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
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

    // Look up by the email address.

    let UserRecord = await User.findOne({
      emailAddress: inputs.EmailAddress,
      password: sha256(inputs.Password).toString()
    });
    
     // If there was no matching user, respond thru the "badCombo" exit.
    if(!UserRecord) {
      throw 'badCombo';
    }
    
    Token= await sails.helpers.createjwttoken.with({id: UserRecord.id})


    return this.res.json(200, {User: UserRecord, token: Token});

  }

};

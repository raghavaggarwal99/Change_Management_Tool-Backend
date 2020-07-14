var jwt = require('jsonwebtoken');
sha256 = require('crypto-js/sha256');

module.exports = {


  friendlyName: 'Change Password',

  inputs: {

    EmailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    }, 

    Password1: {
        description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
        type: 'string',
        required: true
      },

  },


  exits: {

    success: {
      description: 'The password is changed successfully',
    },

    badCombo: {
      description: `The passwords do not matchs`,
    }

  },


  fn: async function (inputs, exits) {

   var  UserRecord= await User.update({ emailAddress: inputs.EmailAddress})
    .set({
        password: sha256(inputs.Password1).toString(),
    }).fetch();


    return this.res.json(200, {user: UserRecord});

  }

};

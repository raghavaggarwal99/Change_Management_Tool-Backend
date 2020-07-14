module.exports = {


  friendlyName: 'Forgot Password',


  inputs: {
    emailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },
  },


  exits: {

    success: {
      description: 'The reset password mail has been sent successfully',
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
    }

  },


  fn: async function (inputs) {

    var UserRecord = await User.findOne({
      emailAddress: inputs.emailAddress,
    });

    if(!UserRecord) {
      throw 'badCombo';
    }

    //Random token for random url generated

    let Token = Math.random().toString(36).substring(7);
    await Mailer.sendWelcomeMail(UserRecord, Token); 

    return this.res.json(200, {token: Token});

  }

};

module.exports = {


  friendlyName: 'Profile',

  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
    
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
   
    }

  },


  fn: async function () {
    
    let UserRecord = await User.findOne({
      id: this.req.userId,
    });
    
     // If there was no matching user, respond thru the "badCombo" exit.
    if(!UserRecord) {
      throw 'badCombo';
    }


    return this.res.json(200, {user: UserRecord});

  }

};

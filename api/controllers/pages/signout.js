module.exports = {


    friendlyName: 'Signout',
  
  
    exits: {
  
      success: {
        description: 'The reset password mail has been sent successfully',
      
      },
  
      badCombo: {
        description: `The provided email and password combination does not
        match any user in the database.`,
     
      }
  
    },
  
  
    fn: async function () {
  
    this.req.userId=null
  
    return this.res.json(200);
  
    }
  
  };
  
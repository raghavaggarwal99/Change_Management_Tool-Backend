module.exports = {


    friendlyName: 'Delete Request',
  
    inputs: {
  
      RequestId: {
        description: 'Id of the request',
        type: 'number',
        required: true
      },
  
    },
  
  
    exits: {
  
      success: {
        description: 'Status changed',
      
      },
  
      badCombo: {
        description: `Error`,
     
      
      }
    },
  
  
    fn: async function (inputs) {
  
      //Current user id i am taking it "1"
      //Here only the user's and their requests only
  
      let UpdatedRequest = await Request.update({id: inputs.RequestId})
      .set({
        isDeleted: 1,
      })

      let Log = await Logs.create(_.extend({
        userId: this.req.userId,
        RequestId: inputs.RequestId,
        Action: "Deleted",
        TimeStamp:   await sails.helpers.gettimestamp.with({id: this.req.userId})
      },{})).fetch();
   

 
      return this.res.json(200);
      
    }
  
  };
  
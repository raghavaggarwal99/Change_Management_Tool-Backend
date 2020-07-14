module.exports = {


    friendlyName: 'Change Request Status',
  
    inputs: {

    Status: {
        description: 'The status of the request',
        type: 'string',
        required: true
    },
  
    RequestId: {
        description: 'The id of the request',
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
    

      let  NewRequest= await Request.update({ id:inputs.RequestId})
      .set({
          status: inputs.Status,
      }).fetch();

      let Log = await Logs.create(_.extend({
        userId: this.req.userId,
        RequestId: inputs.RequestId,
        Action: inputs.Status,
        TimeStamp:  new Date()
      },{}))
      .fetch();

  
      return this.res.json(200);
  
  
    }
  
  };
  
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
    

      async.auto({
        changerequeststatus : async (next) => {
            try {
              let  NewRequest= await Request.update({ id:inputs.RequestId}).set({
                                  status: inputs.Status,
                              }).fetch();

              return next(null, NewRequest)
            }
            catch(err){
              console.log(err)
              return next(err)
            }
        },
        logentry: async(next) => {

          try{
            let Log = await Logs.create(_.extend({
              userId: this.req.userId,
              RequestId: inputs.RequestId,
              Action: inputs.Status,
              TimeStamp:  new Date()
            },{}))
            .fetch();

            return next(null, Log);
          }
          catch(err){
            console.log(err)
            return next(err)
          }
        },
        mailtrigger: ['changerequeststatus', async(NewRequest,next) => {
          try{
           
          }

          catch(err){
            console.log(err);
            return next(err);
          }

        }],

      }, (err, asyncresults) => {
  
          if (err) {
            console.error(err);
          }
            // console.log(asyncresults)
          // return exits.success();
  
      });
  
  
    }
  
  };
  
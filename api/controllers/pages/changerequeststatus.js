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
    
      let maildictionary= {};

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

        notifieduser: ['changerequeststatus', async(NewRequest,next) => {
          try{

            let UserRecord= await User.findOne({id: NewRequest.changerequeststatus[0].userId,});
            
            await NotificationUser.statusmail(UserRecord, NewRequest.changerequeststatus[0]); 

            return next(null, "User Notified");
          }
          catch(err){
            console.log(err);
            return next(err);
          }

        }],

        mailtrigger: ['changerequeststatus', async(NewRequest,next) => {
          try{
           
            // console.log(NewRequest)

            let Status= NewRequest.changerequeststatus[0].status;

            let user = await User.findOne({
              id: NewRequest.changerequeststatus[0].userId,
            });

            let StatusRecords= await Statusoutlinemapping.find({
              initialstatus: Status,
            });
            
            for (const StatusRecord of StatusRecords){

              let PermissionStatus= StatusRecord.finalstatus;

              let ShownUsers= await Permission.find({
                  Feature : PermissionStatus,
                  // userId: user.ParentId,

              });

              console.log(ShownUsers);

              if(Array.isArray(ShownUsers) && ShownUsers.length){
                
                for(const ShownUser of ShownUsers){
                  let UserRecord= await User.findOne({
                    id: ShownUser.userId,
                  });

                  if(maildictionary[ShownUsers.userId]!=1){
                    await Notification.sendMail(UserRecord); 
                    maildictionary[ShownUsers.userId]=1
                  }
                }
              }
              // else{

              //   let user = await User.findOne({
              //     id: this.req.userId,
              //   });

              //   let ShownUsers= await Permission.find({
              //     Feature : PermissionStatus,
              //     id: user.ParentId,

              //   });

              //   if(Array.isArray(ShownUsers) && ShownUsers.length){
                
              //     for(const ShownUser of ShownUsers){
              //       let UserRecord= await User.findOne({
              //         id: ShownUser.userId,
              //       });
  
              //       if(!dict[UserRecord.emailAddress]){
              //         await Notification.sendMail(UserRecord); 
              //         dict[UserRecord.emailAddress]= 1
              //       }
              //     }
              //   }

              // }

            }

            return next(null, "Next mail triggered");

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
  
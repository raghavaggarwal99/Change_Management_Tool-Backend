module.exports = {


  friendlyName: 'Create Request',

  inputs: {

    Info: {
      description: 'The info of the request',
      type: 'string',
      required: true
    },

    Description: {
      description: 'description',
      type: 'string',
      required: true
    },

  },


  exits: {

    success: {
      description: 'The request has been added into the database',
    },

    badCombo: {
      description: `The same request has already been created by you`,
    
    }

  },


  fn: async function (inputs,exits) {

   
    let maildictionary= {}
   
      async.auto({
        createnewrequest : async (next) => {
            try {
              let NewRequest = await CreateRequest(inputs, this.req.userId);

              let Log=  await LogEntry(NewRequest.id, "Pending", this.req.userId);

              return next(null, NewRequest, Log)
            }
            catch(err){
              console.log(err)
              return next(err)
            }
        },

        requestupdate: ['createnewrequest', async(NewRequest,next) => {
          try{

              let UserRecord= await FindUser("Level2Approve", this.req.userId);

                if(Array.isArray(UserRecord) && UserRecord.length){

                  let UserDetails= await User.findOne({id: this.req.userId});

                  if(UserDetails.Role=="DepartmentHead"){
                    await Request.update({ id: NewRequest.createnewrequest[0].id })
                    .set({
                        status: "Level2Approve",
                    });

                    await LogEntry(NewRequest.createnewrequest[0].id, "Level2Approve", this.req.userId);
                  
                  }
                }

            return next(null, UserRecord)

          }

          catch(err){
            console.log(err);
            return next(err);
          }
         
        }],

        requestupdate2: ['createnewrequest', async(NewRequest,next) => {
          try{
              
            let UserRecord= await FindUser("Level1Approve", this.req.userId);

              if(Array.isArray(UserRecord) && UserRecord.length){

                  let UserDetails= await User.findOne({id: this.req.userId});

                  // console.log(UserDetails.ParentId);
                  // console.log(UserDetails);

                  let UserParentDetails= await User.findOne({id: UserDetails.ParentId});

                  // console.log(UserParentDetails.Role);
                  // console.log(UserParentDetails);

                  if(UserParentDetails.Role == "DepartmentHead"){
                      await Request.update({ id: NewRequest.createnewrequest[0].id })
                      .set({
                          status: "Level1Approve",
                      });

                      await LogEntry(NewRequest.createnewrequest[0].id, "Level1Approve", this.req.userId);
                  }
              }

            return next(null, UserRecord)

          }

          catch(err){
            console.log(err);
            return next(err);
          }
         
        }],

        mailtrigger: ['requestupdate' , 'requestupdate2',  async(NewRequest,next)=> {
          try{

            let RequestDetails = await Request.findOne({id: NewRequest.createnewrequest[0].id})

            // let Status= await NewRequest.createnewrequest[0].status;

            console.log(RequestDetails.status)

            let user = await User.findOne({
              id: NewRequest.createnewrequest[0].userId,
            });

            console.log(user.ParentId);

            let StatusRecords= await Statusoutlinemapping.find({
              initialstatus: RequestDetails.status,
            });
            
            for (const StatusRecord of StatusRecords){

              let PermissionStatus= StatusRecord.finalstatus;

              console.log(PermissionStatus)

              let ShownUsers= await Permission.find({
                  Feature : PermissionStatus,
                  userId: user.ParentId,

              });

              console.log(ShownUsers);

              if(Array.isArray(ShownUsers) && ShownUsers.length){
                
                for(const ShownUser of ShownUsers){
                  let UserRecord= await User.findOne({
                    id: ShownUser.userId,
                  });

                  if(maildictionary[ShownUsers.userId]!=1){
                    await Notification.sendMail(UserRecord); 
                    maildictionary[ShownUsers.userId]=1;
                  }
                }
              }

            }

            return next(null, "Mail Sent");

          }
          catch(err){
            console.log(err)
            return (err);
          }

        }],

      }, (err, asyncresults) => {
  
          if (err) {
            console.error(err);
          }
            // console.log(asyncresults)
          return exits.success();
  
      });
  }

};



async function CreateRequest(inputs, UserId){

  let NewRequest = await Request.create(_.extend({
    info: inputs.Info,
    description: inputs.Description,
    status: "Pending",
    userId: UserId,
  },{})).fetch();

  return NewRequest;

};


async function LogEntry(NewRequestId, Status, UserId){

  let Log = await Logs.create(_.extend({
    userId: UserId,
    RequestId : NewRequestId,
    Action: Status,
    TimeStamp:  new Date()
  },{})).fetch();

};

async function FindUser(Status, UserId){

   let UserRecord= await Permission.find({
          Feature: Status,
          userId: UserId,
    });

    return UserRecord; 

};



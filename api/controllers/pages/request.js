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
              let  UserRecord= await Request.update({ id: NewRequest.createnewrequest.id })
              .set({
                  status: "Level1Approve",
              });

              let Log=  await LogEntry(NewRequest.createnewrequest.id, "Level1Approve", this.req.userId);
             }

             return next(null, UserRecord)
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
          return exits.success();
  
      });
  }

};



async function CreateRequest(inputs, UserId){

  let NewRequest = await Request.create(_.extend({
    info: inputs.Info,
    status: "Pending",
    userId: UserId,
  },{})).fetch();

  return NewRequest;

};


async function LogEntry(NewRequestId, Status, UserId){

  let Log = await Logs.create(_.extend({
    userId: UserId,
    RequestId:NewRequestId,
    Action: Status,
    TimeStamp:  new Date()
  },{})).fetch();

  return Log; 

};

async function FindUser(Status, UserId){

   let UserRecord= await Permission.find({
          Feature: Status,
          userId: UserId,
    });

    return UserRecord; 

};
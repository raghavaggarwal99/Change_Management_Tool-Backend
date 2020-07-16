module.exports = {


    friendlyName: 'This is the most difficult part, here i will have all functionalty when all stuff happens',


    inputs: {

      PageId: {
        description: 'The page in pagination',
        type: 'number',
        required: true
      },

    },
  
    exits: {
  
      success: {
        description: 'The requesting user agent has been successfully logged in.',
      },
  
      badCombo: {
        description: `There are no requests that are sent by you`,
      }
  
    },
  
  
    fn: async function (inputs, exits) {

    let PerPage= 5;

    let PageId= inputs.PageId;
    let Start=(PageId-1)*PerPage

      var RequestRecords = await Request.find({
        isDeleted: 0,
      });

      //It contains Request Info and request Ids to show
      var FinalRequests = {};

      //It contains those user for which we will show approve and Decline button
      let FinalUsers= {}

       //It contains User details, who have created this request
      let UserDetails= {}

      
      for (const RequestRecord of RequestRecords) {
        var Status= RequestRecord.status;

        FinalUsers[RequestRecord.id] = new Array();

          var StatusRecords= await Statusoutlinemapping.find({
              initialstatus: Status,
          });

          for (const StatusRecord of StatusRecords){

              var PermissionStatus= StatusRecord.finalstatus;
              
              var ShownUsers= await Permission.find({
                    Feature : PermissionStatus,
                    userId: this.req.userId,
                })
                var obj ={}
                var check= await sails.helpers.checkparent.with({userid: RequestRecord.userId, currentId: this.req.userId})

                if (Array.isArray(ShownUsers) && ShownUsers.length && check==1){

                  obj["requestId"]=RequestRecord.id;
                  obj["requestinfo"]=await Request.find({id:RequestRecord.id});

                  FinalRequests[RequestRecord.id] = new Array();
                 

                    if(Object.keys(obj).length !== 0){
                     
                      FinalRequests[RequestRecord.id]= (obj)
                      FinalUsers[RequestRecord.id].push(ShownUsers);
                      UserDetails[RequestRecord.userId]= await User.find({id:RequestRecord.userId});

                    }
                  
                }
                
          }
          
      }

      console.log(Start);

      let totalPages= await getPages(FinalRequests, PerPage);

      //This is returning the records accrding to the pagination
      FinalRequests= Object.entries(FinalRequests).slice(Start,Start+PerPage).map(entry => entry[1]);

      return this.res.json(200, {users: FinalUsers, requests: FinalRequests, userdetails: UserDetails, totalPages: totalPages});

    }
  
  };
  

async function getPages(FinalRequests, PerPage){

  let totalPages=0;

  if( Object.keys(FinalRequests).length !== 0){

    let NumberOfRecords= Object.keys(FinalRequests).length 

    totalPages= Math.ceil(NumberOfRecords/PerPage);

  }

  return totalPages


}
module.exports = {


    friendlyName: 'This is the most difficult part, here i will have all functionalty when all stuff happens',


    inputs: {

      PageId: {
        description: 'The page in pagination',
        type: 'number',
        required: true
      },

      StatusFilter: {
        description: 'The filters in array',
        type: ['string'],
      },

      Requestfilter: {
        description: 'The request filters in array',
        type: ['string'],
      }

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

    let Query={}

    Query['isDeleted']= 0
      let PageId= inputs.PageId;
      let Start=(PageId-1)*PerPage

      if(Array.isArray(inputs.StatusFilter) && inputs.StatusFilter.length){
        Query['status'] = inputs.StatusFilter;
      }

      if(Array.isArray(inputs.Requestfilter) && inputs.Requestfilter.length){
        Query['info'] = inputs.Requestfilter;
      }

      var RequestRecords = await Request.find({
        where: Query,
      });

      //It contains Request Info and request Ids to show
      var FinalRequests = {};

      //It contains those user for which we will show approve and Decline button
      let FinalUsers= {}

       //It contains User details, who have created this request
      let UserDetails= {}


      let checkIt= await User.findOne({id: this.req.userId});

      if(checkIt.Role=="IT"){

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
  
                  if (Array.isArray(ShownUsers) && ShownUsers.length){

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

      }

      else{
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
    }

      // console.log(Start);

      let totalPages= await getPages(FinalRequests, PerPage);

      FinalRequests= Object.entries(FinalRequests).sort((a,b) => b[1]['requestinfo'][0].createdAt -a[1]['requestinfo'][0].createdAt).slice(Start,Start+PerPage).map(entry => entry[1]);

      // console.log(FinalRequests)


      return this.res.json(200, {users: FinalUsers, requests: FinalRequests, userdetails: UserDetails, totalPages: totalPages, PerPage: PerPage});

    }
  
  };
  

async function getPages(FinalRequests, PerPage){

  let totalPages=0;

  if( Object.keys(FinalRequests).length !== 0){

    let NumberOfRecords= Object.keys(FinalRequests).length 

    totalPages= Math.ceil(NumberOfRecords/PerPage);

  }

  return totalPages;


}
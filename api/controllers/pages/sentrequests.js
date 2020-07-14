module.exports = {


  friendlyName: 'Display all requests of a certain user',

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

    },


  exits: {

    success: {
      description: 'The process worked fine',
    },

    badCombo: {
      description: `ERROR`,
    }

  },


  fn: async function (inputs, exits) {

    //Per page how many items do you want to show
    let PerPage=10;
    let Query={}

    Query['userId'] = this.req.userId;

    let PageId= inputs.PageId;

    if(Array.isArray(inputs.StatusFilter) && inputs.StatusFilter.length){
      Query['status'] = inputs.StatusFilter;
    }
    
    PageId=(PageId-1)*PerPage;
    
    //Main function

    async.auto({
      fetchrequests:  async (next) => {
          try {
            let Requests=  await getRequests(Query, PageId, PerPage);
            return next(null, Requests);
          }
          catch (err) {
              console.log(err)
              return next(err); 
          }
      },
      fetchnumberpages: async(next) => {
          try{
            let TotalPages=  await getTotalPages(Query, PerPage);
            return next(null, TotalPages);
          }
          catch(err){
            console.log(err)
            return next(err); 
          }
      }
    }, (err, asyncresults) => {

        if (err) {
          console.error(err);
        }
          // console.log(asyncresults)
        return exits.success({requests: asyncresults, itemsperpage: PerPage });

    });
  }

};

//Get Requests
async function getRequests(Query, PageId, PerPage){

  let RequestRecords = await Request.find({
    where: Query
  }).skip(PageId).limit(PerPage);

  return RequestRecords;

};

//Get Total pages accordingly
async function getTotalPages(Query, PerPage){

  let NumberOfRecords= await Request.count({
    where: Query
  });

  let totalPages= Math.ceil(NumberOfRecords/PerPage)

  return totalPages;

};

 
module.exports = {


    friendlyName: 'Logs Table',
  
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
        description: 'The logs are retrieved successfully',
       
      },
  
      badCombo: {
        description: `Error`,
      
      }
  
    },
  
  
    fn: async function (inputs, exits) {

      //Items per Page
      let PerPage=5;
      var query= {};

      var PageId= inputs.PageId;

      PageId=(PageId-1)*PerPage;

      if(Array.isArray(inputs.StatusFilter) && inputs.StatusFilter.length){
          query['Action'] = inputs.StatusFilter;
      }

      let UserDetails ={}

      async.auto({
        fetchlogs:  async (next) => {
            try {
              let LogRecords=  await Logs.find({
                where: query
              }).skip(PageId).limit(PerPage);;
             
              return next(null, LogRecords);
            }
            catch (err) {
                console.log(err)
                return next(err); 
            }
        },
        fetchnumberpages: async(next) => {
            try{
              let NumberOfLogs=  await Logs.count({where: query});
              let TotalPages= Math.ceil(NumberOfLogs/PerPage)
              return next(null, TotalPages);
            }
            catch(err){
              console.log(err)
              return next(err); 
            }
        },
        fetchuserdetails: ['fetchlogs', async(LogRecords, next) => {

          for(let log of LogRecords.fetchlogs){
            UserDetails[log.userId]= await User.find({id: log.userId});
          }

          return next(null, UserDetails)

        }],


      }, (err, asyncresults) => {
  
          if (err) {
            console.error(err);
          }
            // console.log(asyncresults)
          return exits.success({results: asyncresults, itemsperpage: PerPage });
  
      });

    }
  
  };
  
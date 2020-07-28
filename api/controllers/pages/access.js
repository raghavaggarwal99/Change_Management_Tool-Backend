module.exports = {


    friendlyName: 'Access Table',
  
    inputs: {

      PageId: {
        description: 'The page in pagination',
        type: 'number',
        required: true
      },

      accessfilter: {
        description: 'The filters in array',
        type: ['string'],
      },

    },

  
  
    exits: {
  
      success: {
        description: 'The access are retrieved successfully',
      },
  
      badCombo: {
        description: `Error`,
      
      }
    },
  
  
  
    fn: async function (inputs, exits) {

      let query={}

      let PerPage=1;

      let PageId= inputs.PageId;
      
      PageId=(PageId-1)*PerPage;


      let UserRecords= await User.find();


      let AccessRecords= {};

      var finalrecords = [];
      var AccessObject ={}
      
      if(Array.isArray(inputs.accessfilter) && inputs.accessfilter.length){

          query['Access'] = inputs.accessfilter;
          
          AccessRecords= await Access.find({
            where: query
          }).skip(PageId).limit(PerPage);;

          for (const AccessRecord of AccessRecords){
            AccessObject[AccessRecord.userId] = new Array();
          }
      }
      else{

          AccessRecords= await Access.find();

          for (const UserRecord of UserRecords){ 
            // console.log(UserRecord)
              AccessObject[UserRecord.id] = new Array();
          }

      }


      for (const UserRecord of UserRecords){
        if(AccessObject[UserRecord.id]){
            AccessObject[UserRecord.id].push(UserRecord)
        }

      }

      // console.log(AccessObject)

      for (const AccessRecord of AccessRecords){
        if(AccessObject[AccessRecord.userId]){
            AccessObject[AccessRecord.userId].push(AccessRecord.Access);
        }
      }

    

      //Sorting
      AccessObject= Object.entries(AccessObject).sort((a, b) => {

        let fa = a[1][0].fullName.toLowerCase(),
            fb = b[1][0].fullName.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    }).map(entry => entry[1]);


      finalrecords.push(AccessObject);

      // console.log(finalrecords)
      
      return this.res.json(200, {userdetails: finalrecords,  itemsforpage: PerPage});
  
    }
  
  };
  
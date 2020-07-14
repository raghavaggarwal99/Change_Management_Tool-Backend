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
            AccessObject[UserRecord.id] = new Array();
          }

      }


      for (const UserRecord of UserRecords){
        if(AccessObject[UserRecord.id]){
            AccessObject[UserRecord.id].push(UserRecord)
        }

      }

      for (const AccessRecord of AccessRecords){
        if(AccessObject[AccessRecord.userId]){
            AccessObject[AccessRecord.userId].push(AccessRecord.Access);
        }
      }

      finalrecords.push(AccessObject);

      
      return this.res.json(200, {userdetails: finalrecords,  itemsforpage: PerPage});
  
  
    }
  
  };
  
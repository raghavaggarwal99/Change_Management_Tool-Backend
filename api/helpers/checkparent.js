module.exports = {
  friendlyName: 'Check Direct Parent',
  description: 'Check Direct Parent in Heirarchy',
  
  inputs: {

    userid: {
      type: 'number',
      example: 1,
      description: 'Id of a person who submitted that request',
      required: true
    },
    currentId: {
      type: 'number',
      example: 1,
      description: 'Id of a person who is logged in to check which request he/she will see',
      required: true
    },
  },

  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: async function (inputs) {

    var user = await User.findOne({
        id: inputs.userid
    });
    
    //If the user does not exist
    if(!user){
      return 0;
    }

    //Here check if the parent Id is cuurently logged in user id also the other one to see if the request is created by that person only

    var userparent = await User.findOne({
        id: user.ParentId
    });

    //If parent exists, we will check 
    // 1. Whether Current logged in id of that of parent, If i create a request that will be visible to Sahil that if
    // 2. Or in case of Sahil, request created by him will current logged in id, he has to approve level 1 right and same case aage if 
    // 3. 3rd is if i create a request, it will be shown to anshuman also
    //Here if anshuman creates a request, it is already handled that first it's status becomes"Level1Approved", then if level1 approved hai, then level2 vaala 2nd case ho jaayega
    if(userparent){
        if(user.ParentId==inputs.currentId || inputs.userid==inputs.currentId || userparent.ParentId==inputs.currentId){
          return 1;
      }
    }
    else if(user.ParentId==inputs.currentId || inputs.userid==inputs.currentId){
      return 1;
    }
    else{
      return 0;
    }


  }
}
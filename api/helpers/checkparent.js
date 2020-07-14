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
      description: 'Id of a person who submitted that request',
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
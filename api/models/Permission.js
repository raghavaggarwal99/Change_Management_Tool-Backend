
module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  
    Username: {
        type: 'string',
        required: true,
        maxLength: 200,
        example: 'Sahil'
    },
  
    Feature: {
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'Level1Approve'
    },

    userId: {
        type: 'Number',
        required: true,
        description: 'The user id from the user table',
        example: '1'
      },
  
    },
  
  
  };
  
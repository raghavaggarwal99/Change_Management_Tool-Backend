
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
  
    Access: {
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'VPN Accesss'
    },

    userId: {
        type: 'Number',
        required: true,
        description: 'The user id from the user table',
        example: '1'
    },
  
    },
  
  
  };
  
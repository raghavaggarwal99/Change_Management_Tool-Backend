module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  
      initialstatus: {
        type: 'string',
        required: true,
        maxLength: 200,
        example: 'Pending'
      },

      finalstatus: {
        type: 'string',
        required: true,
        maxLength: 200,
        example: 'The request is dash dash'
      },

    },
  
  
  };
  
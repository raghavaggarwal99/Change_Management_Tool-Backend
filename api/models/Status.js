module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  
      statusname: {
        type: 'string',
        required: true,
        unique: true,
        maxLength: 200,
        example: 'Pending'
      },

      statusdescription: {
        type: 'string',
        required: true,
        maxLength: 200,
        example: 'The request is dash dash'
      },

    },
  
  
  };
  
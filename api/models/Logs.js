/**
 * Logs.js
 *
 * A user who can log in to this application.
 */

module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    userId: {
        type: 'Number',
        required: true,
        description: 'User Id',
        example: '1'
    },

    RequestId: {
      type: 'Number',
      required: true,
      description: 'Request Id',
      example: '1'
    },

    Action: {
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'Request Action'
    },

    TimeStamp: {
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'Current date time stamp'
  },

  
    },
  
  
  };
  
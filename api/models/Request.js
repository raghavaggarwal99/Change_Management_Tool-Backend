/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    info: {
        type: 'string',
        required: true,
        maxLength: 200,
        example: 'dfvd dfvdb '
    },

    status: {
        type: 'string',
        required: true,
        description: 'Status of the created request',
        maxLength: 100,
        example: 'Pending'
    },

    userId: {
        type: 'Number',
        required: true,
        description: 'User Logged in ID',
        example: '1'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Whether the request is Deleted or not',
      example: '1'
  },

  
    },
  
  
  };
  
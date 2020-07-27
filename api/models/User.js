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
  
    EmployeeId: {
        type: 'string',
        required: true,
        description: 'Empployee Id',
        unique: true,
        example: '101'
    },

    emailAddress: {
        type: 'string',
        required: true,
        unique: true,
        isEmail: true,
        maxLength: 200,
        example: 'mary.sue@example.com'
    },

    phoneNumber: {
        type: 'string',
        required: true,
        description: 'Phone Number',
        unique: true,
        maxLength: 10,
        example: '7989834567'
    },

    password: {
        type: 'string',
        required: true,
        description: 'Securely hashed representation of the user\'s login password.',
        protect: true,
        example: '2$28a8eabna301089103-13948134nad'
    },
  
    fullName: {
        type: 'string',
        required: true,
        description: 'Full representation of the user\'s name.',
        maxLength: 120,
        example: 'Mary Sue van der McHenst'
    },

    ParentId: {
        type: 'Number',
        required: true,
        description: 'Parent Id',
        example: '1'
    },

    Role: {
        type: 'string',
        required: true,
        description: 'Role of this User',
        example: 'Developer'
    },
  
  },
  
  
  };

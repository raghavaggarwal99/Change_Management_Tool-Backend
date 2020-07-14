var jwt = require('jsonwebtoken')

module.exports = {
  friendlyName: 'Create JWT',
  description: 'Create a JWT token.',
  
  inputs: {

    id: {
      type: 'string',
      example: '1',
      description: 'The id of the person',
      required: true
    },

  },

  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: async function (inputs) {

    token= jwt.sign({ foo: inputs.id }, 'shhhhh');

    // console.log(token)

    return token




  }
}
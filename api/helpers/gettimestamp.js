module.exports = {
  friendlyName: 'get time stamp',

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
      description: 'Invalid',
    }
  },


  fn: async function () {

    let today = new Date();

    let time = today.toLocaleTimeString();



       
    let dd = today.getDate(); 
    let mm = today.getMonth() + 1; 
  
    let yyyy = today.getFullYear(); 
    if (dd < 10) { 
        dd = '0' + dd; 
    } 
        
    if (mm < 10) { 
        mm = '0' + mm; 
    } 

    today = dd + '/' + mm + '/' + yyyy; 

    console.log(today+'-'+ time)

    return today+'-'+ time




  }
}
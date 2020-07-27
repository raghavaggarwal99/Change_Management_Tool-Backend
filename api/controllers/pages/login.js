var jwt = require('jsonwebtoken');
sha256 = require('crypto-js/sha256');

module.exports = {


  friendlyName: 'Login',

  inputs: {

    EmailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },

    Password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true
    },

  },


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
    }

  },


  fn: async function () {

    let permission=0;

    let UserRecord = await User.findOne({
      emailAddress: inputs.EmailAddress,
      password: sha256(inputs.Password).toString()
    });
    
     // If there was no matching user, respond thru the "badCombo" exit.
    if(!UserRecord) {
      throw 'badCombo';
    }


    permission= await Permission.find({
      userId: UserRecord.id
    })

    if(Array.isArray(permission) && permission.length){
      permission=1;
    }


    Token= await sails.helpers.createjwttoken.with({id: UserRecord.id})


    return this.res.json(200, {User: UserRecord, token: Token, permission: permission});
  
  

    // let NewRequest = await User.create(_.extend({
    //   emailAddress: "raghavaggarwal0089@gmail.com",
    //   phoneNumber: "2323232323",
    //   password: sha256("raghav").toString(),
    //   fullName: "Raghav",
    //   ParentId: 2,
    //   Role: "Intern",
    //   EmployeeId: 1,
    // },{})).fetch();


    // let NewRequest = await User.create(_.extend({
    //   emailAddress: "r@gmail.com",
    //   phoneNumber: "2323232123",
    //   password: sha256("raghav").toString(),
    //   fullName: "Sahil",
    //   ParentId: 3,
    //   Role: "Developer",
    //   EmployeeId: 2,
    // },{})).fetch();

    // let NewRequest = await User.create(_.extend({
    //   emailAddress: "ra@gmail.com",
    //   phoneNumber: "2923232323",
    //   password: sha256("raghav").toString(),
    //   fullName: "Anshuman",
    //   ParentId: 4,
    //   Role: "DepartmentHead",
    //   EmployeeId: 3,
    // },{})).fetch();

    // let NewRequest = await User.create(_.extend({
    //   emailAddress: "rajeev@gmail.com",
    //   phoneNumber: "2923231323",
    //   password: sha256("raghav").toString(),
    //   fullName: "Rajeev",
    //   ParentId: 0,
    //   Role: "IT",
    //   EmployeeId: 4,
    // },{})).fetch();



    //  let NewRequest = await Access.create(_.extend({
    //   Username: "Sahil",
    //   Access: "New Laptop",
    //   userId: 2,
  
    // },{})).fetch();


   
  
    // return NewRequest;




  }

};

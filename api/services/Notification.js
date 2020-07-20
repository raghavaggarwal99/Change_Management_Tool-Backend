

module.exports.sendMail = function(UserRecord) {
    sails.hooks.email.send(
        "welcomeEmail",
        {
            Name:'Helloooooo',
            link: "http://localhost:8080/#/resetpassword",
            
        },
        {
            to: UserRecord.emailAddress,
            subject: "Request Mail"
        },
        function(err) {
            if(err)
            {
              console.log('Email not  send sucessfully-',err);
            }
            else
            {
              console.log('Email send sucessfully');
            }
        }
    )
};
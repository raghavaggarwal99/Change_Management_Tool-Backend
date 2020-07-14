

module.exports.sendWelcomeMail = function(UserRecord, token) {
    sails.hooks.email.send(
        "welcomeEmail",
        {
            Name:'Hi',
            link: "http://localhost:8080/#/resetpassword"+ token,
            
        },
        {
            to: UserRecord.emailAddress,
            subject: "Reset Password"
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
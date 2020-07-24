

module.exports.sendMail = function(UserRecord) {
    sails.hooks.email.send(
        "notificationEmail",
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

//Sort by created and updated at in dashboard table 
//Request Dialog automatic close after 
//CLose button in right top corner

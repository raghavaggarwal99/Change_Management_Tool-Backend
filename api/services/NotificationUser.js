
module.exports.statusmail = function(UserRecord, Request) {
    sails.hooks.email.send(
        "NotifyStatus",
        {
            Name:'Helloooooo',
            Content: Request.status,
            
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
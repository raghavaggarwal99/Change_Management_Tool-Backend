module.exports = {


    friendlyName: 'This is the most difficult part, here i will have all functionalty when all stuff happens',
  
    exits: {
  
      success: {
        description: 'The requesting user agent has been successfully logged in.',
      },
  
      badCombo: {
        description: `There are no requests that are sent by you`,
      }
  
    },
  
  
    fn: async function () {
  
      //Current logged in user id i am taking it "2" Sahil basically

      var requestrecords = await Request.find({
        isDeleted: 0,
      });

      var finalusers = [];
      
      for (const requestrecord of requestrecords) {
        var status= requestrecord.status;

          var statusrecords= await Statusoutlinemapping.find({
              initialstatus: status,
          });

          for (const statusrecord of statusrecords){

              var permissionstatus= statusrecord.finalstatus;
              var shownusers= await Permission.find({
                    Feature : permissionstatus,
                    userId: 3,
                })
                var obj ={}
                var check= await sails.helpers.checkparent.with({userid: requestrecord.userId, currentId: 3})

                if (Array.isArray(shownusers) && shownusers.length && check==1){
                  obj["requestId"]=requestrecord.id;
                  obj["requestinfo"]=await Request.find({id:requestrecord.id});
                  obj["userinfo"]=shownusers;
                  
                  finalusers.push(obj)
                }
                
          }
          
      }

      //check if the current user is his direct parent or not
      
      return this.res.json(200, {users: finalusers});

    }
  
  };
  
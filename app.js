const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { log } = require("console");
const { url } = require("inspector");
const app = express();
 
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstName= req.body.fname;
  const lastName= req.body.lname;
  const mail = req.body.mail;
  const data= {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url=  "https://us21.api.mailchimp.com/3.0/lists/26a255a4b9"

  const options = {
    method: "POST",
    auth: "rohan69:edbd262f6d208d05de3e33dda648a19b-us21"
  }

  const request = https.request(url , options , function(response){
    
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }
    
    
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/")
})
app.post("/success", function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000 , function () {
    console.log("Server started on port 3000");
  }); 

// edbd262f6d208d05de3e33dda648a19b-us21 API KEYS 
// 26a255a4b9 list
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(process.env.PORT || 3000,function(){
 console.log("Server is runing at port 3000");
});

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
 const firstName=req.body.fName;
 const lastName=req.body.lName;
 const email=req.body.email;
 
var data={
  members:[
     {
        email_address:email,
        status:"subscribed",

        merge_fields:{
           FNAME:firstName,
           LNAME:lastName
        } 

     }
  ]
};
var jsonData=JSON.stringify(data);
url='https://us6.api.mailchimp.com/3.0/lists/717ca93ce2'
options={
   method:"POST",
   auth:"Bhanusharma4:790efe002bbc020ab4188b964ab7429f-us6"
}

//Send this data to the mailchimp api by 
const request=https.request(url,options,function(response){

   if(response.statusCode===200)
   {
      res.sendFile(__dirname+"/success.html");

   }
else{
   res.sendFile(__dirname+"/failure.html");
}


   response.on("data",function(data){
  console.log(JSON.parse(data));
});

});

console.log("hello");
console.log(request.statusCode);
request.write(jsonData);//Baad me data bhejte hai last me phle request kr dete hai
request.end();


});

app.post("/failure",function(req,res){
   res.redirect("/");
});



// Apikey=790efe002bbc020ab4188b964ab7429f-us6
// 717ca93ce2.
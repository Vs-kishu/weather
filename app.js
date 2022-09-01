const express=require("express");
const https=require("https");
const bodyparser =require("body-parser");

const app =express();

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");

});

app.post("/",function(req,res){

  const apiKey="1762ca3bdd3660e7b6dcf4e816ae6cf7";
  const query =req.body.cityName;
  const unit ="metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response){

    response.on("data",function(data) {
      const weatherdata =JSON.parse(data)
      const des =weatherdata.weather[0].description
      const temp =weatherdata.main.temp
      const icon = weatherdata.weather[0].icon
      const imageURL="http://openweathermap.org/img/wn/" + icon +"@2x.png"


      res.write("<p>the weather is currently "+ des +"<p>");

      res.write("<h1> the temperature of "+ query +" is "+ temp + " celcius</h1>");
      res.write("<img src="+ imageURL+ ">")
      res.send();
      });
  });
});




app.listen(3000,function(){
  console.log("server running on 3000");
});

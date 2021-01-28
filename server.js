const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function (req,res)
{
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{

  let city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=922279dfbc62ddb22c97f178d9d96514&units=metric";
  https.get(url,function(response)
{
    response.on("data",function(data)
  {
     const weatherInfo = JSON.parse(data);
     let tem = weatherInfo.main.temp;
     let description = weatherInfo.weather[0].description;
     let imgicon = weatherInfo.weather[0].icon;
     let imgUrl = "http://openweathermap.org/img/wn/"+imgicon+"@2x.png";
     res.write("<p>The weather is currently "+ description+"</p>");
     res.write("<h1>The tempreature is : "+tem+" degree Celcius</h1>");
     res.write("<img src="+imgUrl+">");
     res.send();
  });
});


});

app.listen(3000,function(req,res)
{
  console.log("The sever is running on port 3000");
});

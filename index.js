var mysql = require('mysql');
const express = require("express");
const bodyparser= require("body-parser");
const serverrecieve= require(__dirname+"/public/Firstpage.js");
const reader = require('xlsx');
const app = express();
app.use(express.json());
app.set('view engine', 'card');
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static('public', { 
 setHeaders: (res, path, stat) => {
   if (path.endsWith('.js')) {
     res.set('Content-Type', 'application/javascript');
   }
 }
}));
var source ;

var sourcelist = [];
var destinationlist =[];
var flag;
var searchlist= ["Mandya","Maddur","Hassan","Chikkamagalur"];
var fromlist =[];
var fromlist1 =[];
var tolist =[];
var tolist1 =[];
var vialist =[];
var vialist1 =[];
var bustypelist =[];
var bustypelist1 =[];
var timelist =[];
var timelist1 =[];
var source1;
var decimaltime =[];
var formattedtime =[];
var formattedtime1 =[];






// app.get("/:sourcename",function(req,res)
// {  var apisource= req.params.sourcename; 
 
//   console.log(apisource);
//   var  file = reader.readFile(__dirname+'/public/assets/'+apisource+'.xlsx');

// let data = [];
// data.length=0;

// var  sheets = file.SheetNames;

// for (let i = 0; i < sheets.length; i++) {
//   var temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
//   temp.forEach(function (res) {
//     data.push(res);
//   });
// }   
//   destinationlist.length=0;



//   for(var ij =0; ij< data.length;ij++)
//   {
//     destinationlist[ij]=data[ij].To;
   

//   }
//   console.log(destinationlist.length);
//   var  uniqueDestinationlist = [];
//   uniqueDestinationlist.length=0;

//   for (let i = 0; i < destinationlist.length; i++) {
//     if (!uniqueDestinationlist.includes(destinationlist[i])) {
//       uniqueDestinationlist.push(destinationlist[i]);

//     }
//   }
//   console.log(uniqueDestinationlist);
//   res.send(uniqueDestinationlist);
 


// });





app.get('/sitemap.xml', function(req, res) {
res.sendFile('sitemap.xml', { root: '.' });
});


app.get("/",function(req,res)
{ 
 
 var  file1 = reader.readFile(__dirname+'/public/assets/Stations.xlsx');
 var  sheets1 = file1.SheetNames;
 var datalistsource =[];
 for (let i = 0; i < sheets1.length; i++) {
   var  temp = reader.utils.sheet_to_json(file1.Sheets[file1.SheetNames[i]]);
   temp.forEach(function (res) {
     datalistsource.push(res);
   });
 } 
 
 for(var ij =0; ij< datalistsource.length;ij++)
 {
   sourcelist[ij]=datalistsource[ij].City;
   
 }  


 
    res.render("sourceonly.ejs",{searchcontents:sourcelist} );
    
  
});


app.post("/source", function(req,res)
{  
      source =req.body.source;
      source1=source; 
      
      // Reading our test file
var  file = reader.readFile(__dirname+'/public/assets/'+source+'.xlsx');

let data = [];
data.length=0;

var  sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
 var temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
 temp.forEach(function (res) {
   data.push(res);
 });
}   
  destinationlist.length=0;



 for(var ij =0; ij< data.length;ij++)
 {
   destinationlist[ij]=data[ij].To;
   

 }
 console.log(destinationlist.length);
 var  uniqueDestinationlist = [];
 uniqueDestinationlist.length=0;

 for (let i = 0; i < destinationlist.length; i++) {
   if (!uniqueDestinationlist.includes(destinationlist[i])) {
     uniqueDestinationlist.push(destinationlist[i]);

   }
 } 
 uniqueDestinationlist.sort();
    
     res.render('index.ejs',{searchcontents:uniqueDestinationlist ,from1: source} );
   


});


app.post("/", function(req,res)
{  
    var source2=req.body.source;  
    var destination = req.body.destination;
    tolist.length=0;
    fromlist.length=0;
    vialist.length=0;
    bustypelist.length=0;
    timelist.length=0;
    decimaltime.length=0;
    formattedtime.length=0;
   var  file = reader.readFile(__dirname+'/public/assets/'+source2+'.xlsx');
   console.log(source2+"check");

let data = [];

var  sheets = file.SheetNames;


for (let i = 0; i < sheets.length; i++) {
 var  temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
 temp.forEach(function (res) {
   data.push(res);
 });
} for (var k=0; k<data.length;k++)
{   var ij=k;
 if(destination==data[ij].To)
 {
   fromlist[ij]=data[ij].From;
    
   tolist[ij]=data[ij].To;
 
   vialist[ij]=data[ij].Via;
    
   bustypelist[ij]=data[ij].BusType;
   
   timelist[ij]=data[ij].Time;
   
   
   decimaltime=timelist[ij];

   var hours = Math.floor(decimaltime * 24);
    var  minutes = Math.round(((decimaltime * 24) % 1) * 60);
 
    var  date = new Date();
   date.setHours(hours);
   date.setMinutes(minutes);
 
   formattedtime[ij] = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
 }
}   
fromlist1= fromlist.filter(element => element !== '');
tolist1= tolist.filter(element => element !== '');
formattedtime1= formattedtime.filter(element => element !== '');
vialist1= vialist.filter(element => element !== '');
bustypelist1= bustypelist.filter(element => element !== '');








 // for(var ij =0; ij< data.length;ij++)
 // {
 // fromlist[ij]=data[ij].From;
 // }
 // for(var ij =0; ij< data.length;ij++)
 // {
 //   tolist[ij]=data[ij].To;
 // }
 // for(var ij =0; ij< data.length;ij++)
 // {
 //   vialist[ij]=data[ij].Via;
    
 // }
 // // for(var ij =0; ij< data.length;ij++)
 // // {
 // //   bustypelist[ij]=data[ij].BusType;
 // // }
 // for(var ij =0; ij< data.length;ij++)
 // {
 //   timelist[ij]=data[ij].Time;
 // }  
  
 // for(var ij=0; ij<data.length;ij++)
 // {
 //   decimaltime=timelist[ij];

 // const hours = Math.floor(decimaltime * 24);
 //  const minutes = Math.round(((decimaltime * 24) % 1) * 60);

 //  const date = new Date();
 // date.setHours(hours);
 // date.setMinutes(minutes);

 // formattedtime[ij] = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

 
 // }


 
   res.render('card.ejs', { from1:source2,to1:destination ,from:fromlist1 ,to:tolist1,via:vialist1 ,bustype:bustypelist1 ,time:formattedtime1 });




   

});





 

const bodyParser = require('body-parser');

const multer = require('multer');
   
/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());
  
/*------------------------------------------
--------------------------------------------
image upload code using multer
--------------------------------------------
--------------------------------------------*/
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
   }
});
var upload = multer({ storage: storage });
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/image-upload', upload.single('image'),(req, res) => {
  const image = req.image;
    res.send(apiResponse({message: 'File uploaded successfully.', image}));
});
  
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
  
/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/




app.listen(3000, function(){

   console.log("Server is running");
 
 }
 );
 

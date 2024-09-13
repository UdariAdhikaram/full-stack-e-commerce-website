const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const exp = require("constants");

app.use(express.json());
app.use(cors());

//Databse connction with mongodb
mongoose.connect("mongodb+srv://ecomweb:ecom1234@cluster0.6ah2w.mongodb.net/e-commerce");

//API creation

app.get("/",(req,res)=>{
    res.send("Express App is running")
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on port "+port)
    }
    else{
        console.log("Error : "+error)
    }
})
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const exp = require("constants");

app.use(express.json()); //request to response that will automatically pass through the json
app.use(cors()); //react project connect to express app to 4000 port

// Database connection with MongoDB
//mongoose.connect("mongodb+srv://ecommerceweb:ecom1234@cluster0.553bf.mongodb.net/e-commerce");
//mongodb+srv://ecommerceweb:@cluster0.553bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// Database connection
mongoose.connect("mongodb+srv://ecommerceweb:ecom1234@cluster0.553bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
//Databse connction with mongodb
//mongoose.connect("mongodb+srv://ecommerceweb:<db_password>@cluster0.553bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

//API creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating Upload Endpoint for images

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})




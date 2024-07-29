const express = require('express');
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
require('dotenv').config();
const app = express();
const fs = require('fs');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fastw232esdfcv3fd3gdfgdgh6dfs';
app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin:"http://localhost:3000"
}));

// Mongoose 
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);

// Testing Server
app.get('/test', (req,res) => {
    res.json('test ok');
  });




// --------------Register Api--------------
app.post('/register', async (req,res)=>{
  const {name,email,password} = req.body;
  try{
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc);
  } catch(e){
    res.status(422).json(e);
  }
});

//--------------Login Api--------------
app.post('/login',async (req,res) =>{
  const {email,password} = req.body;
  const userDoc =  await User.findOne({email});
  // console.log(userDoc);
  if(!userDoc){
    // res.json('Register First');
    res.status(404).json('Email is Not Registered');
  } else {
    const passOK = bcrypt.compareSync(password,userDoc.password);
    if(passOK)
    {
      jwt.sign({email:userDoc.email ,id:userDoc._id}, jwtSecret,{}, (err,token)=>{
        if(err) throw err;
        res.cookie('token',token).json(userDoc);
      });
    }     
    else{
      res.status(422).json('Incorrect Password');
    }
  }
});

// --------For After Login Profile---------
app.get('/profile',async (req,res)=>{
  const {token} = req.cookies;
  if(token){
    jwt.verify(token,jwtSecret,{},async (err,userData) =>{
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  }else{
    res.json(null);
  }
  // res.json({token});
});

//--------------Logout API--------------
app.post('/logout', async (req,res) =>{
  res.cookie('token','').json(true);
});

//--------------Link-Upload--------------
// console.log({__dirname});
app.post('/upload-by-link', async (req,res) => {
  const {link} =  req.body;
  const newName = 'photo' + Date.now() + '.jpg'; 
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

//--------------Upload Button API-------------- 
const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos',100), async (req,res)=> {
  const uploadedFiles = [];
  for(let i=0;i<req.files.length;i++){
    const {path ,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\',''));
  }
  res.json(uploadedFiles);
});

//-------Place Form Page Info to database---------- 
app.post('/places', (req,res) => {
  const {token} = req.cookies;
  const {
    title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuests,price,
  } = req.body;
  jwt.verify(token,jwtSecret,{},async (err,userData) =>{
    if (err) throw err;
   const placeDoc = await Place.create({
      owner: userData.id,
      title,address, photos:addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuests,price,
    });
    res.json(placeDoc);
  });
});

//-------------- Fetch Places Data Stored -------------- 
app.get('/user-places',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token,jwtSecret,{},async (err,userData) =>{
    if (err) throw err;
    const {id} = userData;
    res.json( await Place.find({owner:id}))
  });
});

//--------------Upload Button API-------------- 
app.get('/places/:id', async (req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
});

//--------------To present data on main page -------------- 
app.put('/places', async (req,res) => {
  const {token} = req.cookies;
  const {  
    id,title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuests,price,
  } = req.body;
  jwt.verify(token,jwtSecret,{},async (err,userData) =>{
    if(err) throw err;
    const placeDoc = await Place.findById(id);
    // console.log(userData.id);
    // console.log(placeDoc.owner.toString());
    if(userData.id === placeDoc.owner.toString()){
      placeDoc.set({
      title, address, photos:addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests,price,
      });
      await placeDoc.save();
      res.json("So It's now set to th main Page");
    }
  });
});  

//----------- To show data on Index/Main Page  ----------- 
app.get('/places', async (req,res) => {
  res.json(await Place.find());
});



function getUserDataFromReq(req){
  return new Promise((resolve,reject) => {
    jwt.verify(req.cookies.token,jwtSecret,{},async (err,userData) =>{
      if(err) throw err;
      resolve(userData);
    });
  });
}

//----------- To store bookings in database ----------- 
app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {place,checkIn,checkOut,guests,name,mobile,price} = req.body;
  Booking.create({
    place,checkIn,checkOut,
    guests,name,mobile,price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
})

app.get('/bookings', async (req,res) => {
  const userData =  await getUserDataFromReq(req);
  res.json(await Booking.find({user:userData.id}).populate('place'))
})

app.listen(4000);
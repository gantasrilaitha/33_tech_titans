const express = require("express");
const cors = require("cors")
const app = express()
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")
const Users = require("./Users"); 
const Products = require("./product")

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

//connection url 
//connecting nodejs and mongodb
const connection_url = "mongodb://localhost:27017";

mongoose.connect(connection_url, {
  useNewUrlParser: true, //allows users to fall back to their old parser if they find bug in new parser
  useUnifiedTopology: true, // removes support for serval irrelevent connections 
});


//api
//add product
app.post('/products/add', (req, res) => {
  const productDetail = req.body;
  /*
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017';
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb1");
    var myobj = [req.body,];
    dbo.collection("customers").insertMany(myobj, function (err, res) {
      if (err) throw err;

    });
    */

    //verfiying product details
  console.log("Product Details >>>", productDetail);
  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });

});

//displaying the products in the webpage

app.get("/products/get", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// API for SIGNUP
//using promises

app.post("/auth/signup", async (req, res) => {
  const {role, email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    role: role,
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email }); //checking if the entered email 
  //matches with the email in the database

  if (user_exist) {
    res.send({ message: "The Email is already in use !" }); //email already exists in the database
  } else {
    Users.create(userDetail, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message }); // error 
      } else {
        res.send({ message: "User Created Succesfully" }); // email created successfully
      }
    });
  }
});

// API for LOGIN

app.post("/auth/login", async (req, res) => {
  const { role,email, password } = req.body;

  const userDetail = await Users.findOne({ role:role, email: email });//checking if the entered email 
  //matches with the email in the database

  if (userDetail) {
    if ((await bcrypt.compare(password, userDetail.password))) {  //if email exists, password is verified
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" }); // email doesn't exist 
  }
});
app.listen(port, () => console.log(`Listening on port: ${port}`));

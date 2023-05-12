const express = require("express");
const dotenv = require("dotenv");
const res = require("express/lib/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify= require("./verify token")
const app = express();
const mongoose = require("mongoose");
dotenv.config();
// const url = process.env.DB_CONNECT;
// mongoose.connect(url, { useNewUrlParser: true,});
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Mongo connected");
});
const con = mongoose.connection;
const User = require("./user");
const Feedback = require("./feedback");
const Menu = require("./menu");
const Address=require("./address");
const Orders=require("./order");
const Menu_Collection = require("./menu_collection");
const { Router } = require("express");
const { concat } = require("rxjs");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

app.listen(3000, function () {
  console.log("listening on 3000");
});

// app.post("/login", (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then((user) => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           msg: "user not exist",
//         });
//       }
//       if (req.body.password == user[0].password) {
//         res.status(200).json({
//           email: user[0].email,
//         });
//       } else {
//         res.status(401).json({
//           msg: "not matched",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         err: err,
//       });
//     });
// });

// app.post("/adduser", (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
// });()
app.post("/login", async (req, res) => {
  // checking user email id in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({msg:"Oops!! Email is not registered"});

  // checking password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({msg:"Oops!! Invalid password"});
  
  // creat and assignatoken
const token=jwt.sign({id:user._id},process.env.TOKEN_SECRET);
// res.header("auth-token",token).send("User Logged in"+ ({token:token}));
res.header("auth-token",token).send({msg:"Hurray!! User Logged in",user:user});
//email: user.email, mobile: user.mobile,name:user.name
});

app.post("/register", async (req, res) => {
  const emailExit = await User.findOne({
    email: req.body.email,
  });
  if (emailExit) return res.status(400).send("Email already exists");
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //create new user
  const user = new User({
    mobile: req.body.mobile,
    email: req.body.email,
    name:req.body.name,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/getusers", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.status(201).send(users);
});

app.get("/getuserbyid/:id", async(req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
  //   .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({
          msg: "no User found",
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
app.post("/addcomment", (req, res) => {
  const feedback = new Feedback(req.body);
  feedback
    .save()
    .then(() => {
      res.status(201).send(feedback);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/getcommentbymail", (req, res) => {
  Feedback.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({
          msg: "no comments",
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post("/addmenu", (req, res) => {
  const menu = new Menu(req.body);
  menu
    .save()
    .then(() => {
      res.status(201).send(menu);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post("/addaddress", (req, res) => {
  const address = new Address(req.body);
 address
    .save()
    .then(() => {
      res.status(201).send(address);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post("/addorder", (req, res) => {
  const orders = new Orders(req.body);
  orders
    .save()
    .then(() => {
      res.status(201).send(orders);
      
    })
    .catch((e) => {
      res.status(400).send(e);
      console.log(e)
    });
    console.log(res)
});


app.get("/getmenus", async (req, res) => {
  const menus = await Menu.find();
  console.log(menus);
  res.status(201).send(menus);
});

app.post("/addmenu_collection", (req, res) => {
  const menu_collection = new Menu_Collection(req.body);
  menu_collection
    .save()
    .then(() => {
      res.status(201).send(menu_collection);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/getmenus_collection", async (req, res) => {
  const menu_collection = await Menu_Collection.find();
  console.log(menu_collection);
  res.status(201).send(menu_collection);
});

app.get("/getorderbyid/:id", async(req, res) => {
  console.log(req.params.id);
  Orders.find({user:req.params.id})
  //   .exec()
    .then((order) => {
      if (!order) {
        res.status(401).json({
          msg: "no Order found",
        });
      } else {
        res.status(200).send(order);
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
app.post("/updatebyid/:id", async(req, res) => {
  User.findById(req.params.id)
  //   .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({
          msg: "no User found",
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post('/updateCart/:id',async(req,res)=> {

  // User.findByIdAndUpdate(req.params.id,{"cart":concat(req.body)}) .then(() => {
  //   res.status(201).send(res);
  // })
  // .catch((e) => {
  //   res.status(400).send(e);
  // });

  User.findOneAndUpdate({_id: req.params.id }, 
    {$push: { cart: req.body }}, null, function (err, docs) {
    if (err){
      res.status(400).send(err);
    }
    else{
      res.status(200).send(docs);
    }
});
});
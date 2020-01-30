// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes

// 1. استيراد وحدةالمدرس | import the teacher module

// 2. استيراد وحدة الطالب | import the student module

// 3. تسجيل مدرس جديد و تخزين بياناته | new teacher sign up

// 4. تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token

// 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)
const Router = require("express").Router();
const Teacher = require("../models/Teacher.js");
const Student = require("../models/Student.js");
const Joi = require("@hapi/hapi");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const hashPassword = (password, salt = "scret") => {
  return crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");
};
Router.get("/Student", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(token);
    if (!token) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    const user = await Teacher.findById(decodedToken.sub);
    if (!user) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }
  Student.find({})
    .then(result => res.send(result))
    .catch(err =>
      res.json({
        errMasg: err
      })
    );
});
Router.post("/Student/add", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(token);
    if (!token) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    const user = await Teacher.findById(decodedToken.sub);
    if (!user) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }
  const newPost = new Student({
    name: req.body.name,
    birthday: req.body.birthday,
    city: req.body.city,
    email: req.body.email
  });
  newPost
    .save()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      res.statusCode = 400;
      res.json(err.errmsg);
    });
});

Router.delete("/Student/delete/:id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(token);
    if (!token) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    const user = await Teacher.findById(decodedToken.sub);
    if (!user) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }
  Student.deleteOne({ _id: req.params.id })
    .then(result =>
      res.json({
        massege: `it is deleted ${req.params.id}`
      })
    )
    .catch(err =>
      res.json({
        errMasg: err
      })
    );
});
Router.put("/Student/edite/:id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(token);
    if (!token) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    const user = await Teacher.findById(decodedToken.sub);
    if (!user) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }
  Student.updateOne(
    { _id: req.params.id },
    {
      name: req.body.SName,
      birthday: req.body.Birthdate,
      city: req.body.City,
      email: req.body.Email
    }
  )
    .then(result => res.json(result))
    .catch(err => res.send(err));
});
Router.get("/Teacher", async (req, res) => {
  Teacher.find({})
    .then(result => res.send(result))
    .catch(err =>
      res.json({
        errMasg: err
      })
    );
});
Router.post("/Teacher/add", async (req, res) => {
  const newPost = new Teacher({
    name: req.body.name,
    birthday: req.body.birthday,
    city: req.body.city,
    email: req.body.email,
    Passward: req.body.Passward
  });
  newPost
    .save()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      res.statusCode = 400;
      res.json(err.errmsg);
    });
});
Router.delete("/Teacher/delete/:id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(token);
    if (!token) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    const user = await Teacher.findById(decodedToken.sub);
    if (!user) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }
  Teacher.deleteOne({ _id: req.params.id })
    .then(result =>
      res.json({
        massege: `it is deleted ${req.params.id}`
      })
    )
    .catch(err =>
      res.json({
        errMasg: err
      })
    );
});
Router.put("/Teacher/edite/:id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(token);
    if (!token) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    const user = await Teacher.findById(decodedToken.sub);
    if (!user) {
      res.statusCode = 401;
      res.send("you have no permissions!");
      return;
    }
    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }
  Teacher.updateOne(
    { _id: req.params.id },
    {
      name: req.body.SName,
      birthday: req.body.Birthdate,
      city: req.body.City,
      email: req.body.Email,
      Passward: req.body.Passward
    }
  )
    .then(result => res.json(result))
    .catch(err =>
      res.json({
        errMasg: err
      })
    );
});
Router.post("/Teacher/login", async (req, res) => {
  const { email, Passward } = req.body;
  const user = await Teacher.findOne({ email });
  if (!user) {
    res.statusCode = 401;
    res.send("No User found");
  } else {
    console.log(user);
    if (user.Passward === hashPassword(Passward, user.salt)) {
      const token = jwt.sign({ sub: user._id }, user.salt, {
        expiresIn: 30 * 60 * 24
      });
      res.send(`welcame back ${user.name} ${token}`);
    } else {
      res.statusCode = 401;
      res.send(`password is wrong`);
    }
  }
});
module.exports = Router;

// 3. تصدير الوحدة | export the module

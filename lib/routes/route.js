"use strict";

// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes
// 1. استيراد وحدةالمدرس | import the teacher module
// 2. استيراد وحدة الطالب | import the student module
// 3. تسجيل مدرس جديد و تخزين بياناته | new teacher sign up
// 4. تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token
// 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)
const r = require('express').Router();

const t = require('../models/Teacher.js');

const s = require('../models/Student.js');

const Joi = require('@hapi/hapi');

const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const hashPassword = function hashPassword(password) {
  let salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'scret';
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

r.get("/s", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.decode(token);

    if (!token) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    const user = await t.findById(decodedToken.sub);

    if (!user) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }

  s.find({}).then(result => res.send(result)).catch(err => res.json({
    errMasg: err
  }));
});
r.post("/s", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.decode(token);

    if (!token) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    const user = await t.findById(decodedToken.sub);

    if (!user) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }

  const newPost = new s({
    name: req.body.name,
    birthday: req.body.birthday,
    city: req.body.city,
    email: req.body.email
  });
  newPost.save().then(result => {
    return res.json(result);
  }).catch(err => {
    res.statusCode = 400;
    res.json(err.errmsg);
  });
});
r.delete("/s/:id", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.decode(token);

    if (!token) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    const user = await t.findById(decodedToken.sub);

    if (!user) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }

  s.deleteOne({
    _id: req.params.id
  }).then(result => res.json({
    massege: "it is deleted ".concat(req.params.id)
  })).catch(err => res.json({
    errMasg: err
  }));
});
r.put("/s/:id", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.decode(token);

    if (!token) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    const user = await t.findById(decodedToken.sub);

    if (!user) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }

  s.updateOne({
    _id: req.params.id
  }, {
    name: req.body.SName,
    birthday: req.body.Birthdate,
    city: req.body.City,
    email: req.body.Email
  }).then(result => res.json(result)).catch(err => res.send(err));
});
r.get("/t", async (req, res) => {
  t.find({}).then(result => res.send(result)).catch(err => res.json({
    errMasg: err
  }));
});
r.post("/t", async (req, res) => {
  const newPost = new t({
    name: req.body.name,
    birthday: req.body.birthday,
    city: req.body.city,
    email: req.body.email,
    Passward: req.body.Passward
  });
  newPost.save().then(result => {
    return res.json(result);
  }).catch(err => {
    res.statusCode = 400;
    res.json(err.errmsg);
  });
});
r.delete("/t/:id", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.decode(token);

    if (!token) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    const user = await t.findById(decodedToken.sub);

    if (!user) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }

  t.deleteOne({
    _id: req.params.id
  }).then(result => res.json({
    massege: "it is deleted ".concat(req.params.id)
  })).catch(err => res.json({
    errMasg: err
  }));
});
r.put("/t/:id", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.decode(token);

    if (!token) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    const user = await t.findById(decodedToken.sub);

    if (!user) {
      res.statusCode = 401;
      res.send('you have no permissions!');
      return;
    }

    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.send(error.messge);
  }

  t.updateOne({
    _id: req.params.id
  }, {
    name: req.body.SName,
    birthday: req.body.Birthdate,
    city: req.body.City,
    email: req.body.Email,
    Passward: req.body.Passward
  }).then(result => res.json(result)).catch(err => res.json({
    errMasg: err
  }));
});
r.post("/t/r", async (req, res) => {
  const {
    email,
    Passward
  } = req.body;
  const user = await t.findOne({
    email
  });

  if (!user) {
    res.statusCode = 401;
    res.send('No User found');
  } else {
    console.log(user);

    if (user.Passward === hashPassword(Passward, user.salt)) {
      const token = jwt.sign({
        sub: user._id
      }, user.salt, {
        expiresIn: 30
      });
      res.send("welcame back ".concat(user.name, " ").concat(token));
    } else {
      res.statusCode = 401;
      res.send("password is wrong");
    }
  }
});
module.exports = r; // 3. تصدير الوحدة | export the module
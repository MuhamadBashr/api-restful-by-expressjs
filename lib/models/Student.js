"use strict";

// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط الطالب | start defining your user schema
const {
  model,
  Schema
} = require('mongoose');

const BlogPost = new Schema({
  name: String,
  birthday: String,
  city: String,
  email: {
    type: String,
    unique: true
  }
});
module.exports = model('Student', BlogPost); // 3. إنشاء نموذج الطالب | create  the user model
// 4. تصدير الوحدة | export the module
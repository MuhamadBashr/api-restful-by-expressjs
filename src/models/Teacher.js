// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library

// 2. قم بتحديد مخطط المدرس | start defining your user schema
const crypto = require('crypto');
const {Schema,model}=require('mongoose')
const shartId =require('shortid')
const hashPassword=(password, salt)=>{
  return crypto.createHmac('sha256',salt).update(password).digest('hex')
}
const BlogPost = new Schema({
  name : String,
  birthday : String,
  city : String,
  email : {type:String , unique:true},
  Passward:String,
  salt:String
});
BlogPost.pre('save',function(next){
  if(!this.salt){
    this.salt=shartId.generate();
  }
  if(this.Passward){
    this.Passward=hashPassword(this.Passward ,this.salt)
  }
  
  next()
})

module.exports= model('Teacher', BlogPost);
// 3. إنشاء نموذج المدرس | create  the user model

// تخزين كلمة السر بعد عمل الهاش

// 4. تصدير الوحدة | export the module

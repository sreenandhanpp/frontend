var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProduct().then((products)=>{
    res.render('admin/view-products',{admin:true,products})
  })


  router.get('/add-product',(req,res)=>{
    res.render('admin/add-product')
  })
});
router.post('/add-product',(req,res)=>{
  // console.log(req.body)
  // console.log(req.files.image)
  productHelpers.addProduct(req.body,(id)=>{
    const image = req.files.image
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/admin/')
      }
    })
  })
})
router.get('/delete-product/:id',(req,res)=>{
  const id = req.params.id;
  productHelpers.deleteProduct(id).then((resp)=>{
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id',(req,res)=>{
  productHelpers.getProductDetails(req.params.id).then((data)=>{

    res.render('admin/edit-product',{product:data})
  })
})
router.post('/edit-product/:id',(req,res)=>{
  // console.log(req.body,req.params.id);
  productHelpers.updateProductDetails({body : req.body, id: req.params.id}).then(()=>{
    
    if(req.files.image){
      const image = req.files.image
    image.mv('./public/images/'+req.params.id+'.jpg',)
    }
    res.redirect('/admin/')
  })
})

module.exports = router;

const { Collection } = require("mongo");
const { resolve, reject } = require("promise");
const db = require("../config/connection");
const { PRODUCT_COLLECTION } = require("../config/constants");
const ObjectId = require('mongodb').ObjectId

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        callback(data.insertedId.toString());
      });
  },
  getAllProduct: () => {
    return new Promise(async (resolve, reject) => {
      const products = await db
        .get()
        .collection(PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(PRODUCT_COLLECTION)
        .remove({ _id: ObjectId(id) })
        .then((resp) => {
          console.log("delete response" + resp);
          resolve(resp);
        });
    });
  },
  getProductDetails:(id) => {
    return new Promise((resolve,reject)=>{
        db.get().collection(PRODUCT_COLLECTION).findOne({_id:ObjectId(id)}).then((data)=>{
            resolve(data)
        })
    })
  },
  updateProductDetails:(product) => {
    // console.log(product,product.id)
    return new Promise((resolve,reject)=>{
        db.get().collection(PRODUCT_COLLECTION).update({_id:ObjectId(product.id)},{
            $set:{
                name:product.body.name,
                category:product.body.category,
                price:product.body.price,
                description:product.body.description
            }
        }).then((resp)=>{
            console.log(resp);
            resolve()
        })
    })
  }
};

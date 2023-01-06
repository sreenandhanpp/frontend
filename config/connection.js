const MongoClient = require('mongodb').MongoClient;

const state = {
    db:null
}


module.exports.connect = (done)=>{
    const url = 'mongodb+srv://tutorial:jd0F69eW7gTBwFGg@cluster0.c3n7rcq.mongodb.net/test?retryWrites=true&w=majority'
    

    MongoClient.connect(url,(err,client)=>{
        if(err) done(err)
        else state.db = client.db('test')
        done()
    })
}

module.exports.get = ()=>{
    return state.db;
}
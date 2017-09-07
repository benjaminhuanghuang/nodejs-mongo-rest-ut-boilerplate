//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/mongo-playground', (err, db)=>{
  if(err){
    return  console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MonoDB server');

  // Insert
  db.collection('todos')
    .insertOne({text: 'something to do', complete: false},(err, result)=>{
      if(err){
        return  console.log('Unable to insert data', err);
      }
      console.log(result.ops[0]._id.getTimestamp());
      console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // Fetch
  db.collection('todos')
  .find({name:'ben'}).toArray()
  .then((docs)=>{
    
  },(err)=>{

  });

  // Delete
  db.collection('todos').deleteMany({name:'ben'})
  .then((result)=>{
    
  },(err)=>{

  });
  db.collection('todos').deleteOne({name:'ben'})
  .then((result)=>{
    
  },(err)=>{

  });
  db.collection('todos').findOneAndDelete({complete:true})
  .then((result)=>{
    
  },(err)=>{

  });

  // Update
  db.collection('todos').findOneAndUpdate({_id:new ObjectID('?????????????????')},{
    $set:{ complete: true }
  },
  {
    $inc:{age: 1}
  }
  ,{
    returnOriginal: false
    
  })
  .then((result)=>{
    
  },(err)=>{

  });


  db.close();
});
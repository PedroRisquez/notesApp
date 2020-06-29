const mongoose = require('mongoose');

/* const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(db => console.log("DB is connected")) */


mongoose.connect('mongodb://root:root@cluster0-shard-00-00-warly.mongodb.net:27017,cluster0-shard-00-01-warly.mongodb.net:27017,cluster0-shard-00-02-warly.mongodb.net:27017/notes_db_app?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
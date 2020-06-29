const mongoose = require('mongoose');

/* const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(db => console.log("DB is connected")) */


mongoose.connect('mongodb+srv://root:root@cluster0-warly.mongodb.net/notes_db_app?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
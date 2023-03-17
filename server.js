const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const connectToDB = () => {
    const db = process.env.DATABASE.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
    );
    
    mongoose
        .set('strictQuery', true) // terminal suggestes to use
        .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB Atlas');
        })
        .catch((err) => {
            console.log('Error connecting to MongoDB Atlas', err);
        });
} 

connectToDB();

const port = 3000;
app.listen(port, () => {
    console.log(`App running on -- ${port} --`);
});

module.exports = connectToDB;
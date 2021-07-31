// MongoDB Connection

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// 3. Initialize Database (mongodb)
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("Database Connected!");  
    } catch (error) {
        console.error(error.message);
        // Exit Process with Failure
        process.exit(1);
    }
}

module.exports = connectDB;
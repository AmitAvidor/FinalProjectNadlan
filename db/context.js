const mongoose = require('mongoose')

const mongoUri = 'mongodb://localhost:27017/final'


const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongo connected')
    }
    catch (err) {
        console.log('Mongo not connected' + err)
    }
}

module.exports = connectDB
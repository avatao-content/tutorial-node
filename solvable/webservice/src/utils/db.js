import mongoose from "mongoose";

const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};


var connectWithRetry = function() {
    return mongoose.connect('mongodb://127.0.0.1:27017/nodify', mongooseOpts, function(err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
            setTimeout(connectWithRetry, 1000);
        }
    });
};
connectWithRetry();

module.exports = mongoose;

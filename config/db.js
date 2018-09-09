const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const SLIDER_COLLECTION = "slider";

function connectDB(callback) {
    mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        // Save database object from the callback for reuse.
        console.log("Database connection ready");
        callback(client.db());
    });
}

module.exports = {
    connectClient: connectDB,
    SLIDER_COLLECTION: SLIDER_COLLECTION
};
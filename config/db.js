const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const SLIDER_COLLECTION = "slider";

let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");
});


module.exports = {
    db: db,
    SLIDER_COLLECTION: SLIDER_COLLECTION
};
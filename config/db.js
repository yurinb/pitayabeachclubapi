const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const logs = require("../logs");

// collections
const SLIDER_COLLECTION = "slider";
const GDESCRIPTION_COLLECTION = "gdescription";
const SMENU_COLLECTION = "smenu";
const LEVENT_COLLECTION = "levent";
const MBACKGROUND_COLLECTION = "mbackground";
const ROOM_COLLECTION = "room";
const GALERY_COLLECTION = "galery";
const DESCRIPTION_COLLECTION = "description";

let connection = null;
let connecting = false;

connection = getConnection();

function connectDB(callback) {
    connection = "connecting...";

    mongodb.MongoClient.connect(process.env.MONGODB_URI ||
        "mongodb://local:p4ssp4ss@ds251022.mlab.com:51022/heroku_mfxh7295", {
            useNewUrlParser: true
        },
        function (err, client) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            // Save database object from the callback for reuse.
            connection = client.db();
            console.log("database connected.");
            callback(connection);
        });
}



function getConnection() {
    if (connection) {
        console.log(logs.redLog() + logs.blueLog(), logs.dateNow(), ' get dbconnection.');
        return connection;
    } else {
        if (connecting == false) {
            connecting = true;
            connectDB((connection) => {
                return connection;
            });
            setTimeout(getConnection, 250);
        }
    }
}



module.exports = {
    getConnection,

    SLIDER_COLLECTION,
    GDESCRIPTION_COLLECTION,
    SMENU_COLLECTION,
    LEVENT_COLLECTION,
    MBACKGROUND_COLLECTION,
    ROOM_COLLECTION,
    GALERY_COLLECTION,
    DESCRIPTION_COLLECTION
};
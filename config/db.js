const mongodb  = require("mongodb");
const ObjectID = mongodb.ObjectID;

// collections
const SLIDER_COLLECTION       = "slider";
const GDESCRIPTION_COLLECTION = "gdescription";
const SMENU_COLLECTION        = "smenu";
const LEVENT_COLLECTION       = "levent";
const MBACKGROUND_COLLECTION  = "mbackground";
const ROOM_COLLECTION         = "room";
const GALERY_COLLECTIN        = "galery";
const DESCRIPTION_COLLECTIN        = "description";

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
        console.log('dbconnection returned.');
        return connection;
    } else {
        if (connecting == false) {
            connecting = true;
            connectDB((connection) => {
                return connection;
            });
            setTimeout(getConnection, 1000);
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
    GALERY_COLLECTIN,
    DESCRIPTION_COLLECTIN
};
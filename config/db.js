const mongodb = require("mongodb");
const logs = require("../logs");

// collections
const HOME_SLIDER_COLLECTION = "home_slider";
const HOME_DESC_COLLECTION = "home_desc";
const HOME_MENU_COLLECTION = "home_menu";
const HOME_EVENT_COLLECTION = "home_event";

const APART_BANNER_COLLECTION = "apart_banner";
const APART_ROOM_COLLECTION = "apart_room";
const APART_GALLERY_COLLECTION = "apart_gallery";
const APART_DESC_COLLECTION = "apart_desc";

const GASTRO_BANNER_COLLECTION = "gastro_banner";
const GASTRO_DESC_COLLECTION = "gastro_desc";
const GASTRO_SLIDER_COLLECTION = "gastro_slider";

const GAROPABA_DESC_COLLECTION = "garopaba_desc";
const GAROPABA_SLIDER_COLLECTION = "garopaba_slider";

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

function getID(id) {
    return new mongodb.ObjectID(id);
}



module.exports = {
    getConnection,
    getID,

    HOME_SLIDER_COLLECTION,
    HOME_DESC_COLLECTION,
    HOME_MENU_COLLECTION,
    HOME_EVENT_COLLECTION,

    APART_BANNER_COLLECTION,
    APART_ROOM_COLLECTION,
    APART_GALLERY_COLLECTION,
    APART_DESC_COLLECTION,

    GASTRO_BANNER_COLLECTION,
    GASTRO_DESC_COLLECTION,
    GASTRO_SLIDER_COLLECTION,

    GAROPABA_DESC_COLLECTION,
    GAROPABA_SLIDER_COLLECTION,

};
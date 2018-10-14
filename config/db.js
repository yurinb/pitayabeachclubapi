const mongodb = require("mongodb");
const logs = require("../logs");

// collections
module.exports = {
    getConnection,
    getID,
    USER_COLLECTION: "user"
        ,
    HOME_SLIDER_COLLECTION: "home_slider",
    HOME_DESC_COLLECTION: "home_desc",
    HOME_EVDESC_COLLECTION: "home_evdesc",
    HOME_MENU_COLLECTION: "home_menu",
    HOME_EVENT_COLLECTION: "home_event"
        ,
    APART_BANNER_COLLECTION: "apart_banner",
    APART_ROOM_COLLECTION: "apart_room",
    APART_GALLERY_COLLECTION: "apart_gallery",
    APART_DESC_COLLECTION: "apart_desc"
        ,
    GASTRO_BANNER_COLLECTION: "gastro_banner",
    GASTRO_DESC_COLLECTION: "gastro_desc",
    GASTRO_SLIDER_COLLECTION: "gastro_slider"
        ,
    GAROPABA_DESC_COLLECTION: "garopaba_desc",
    GAROPABA_SLIDER_COLLECTION: "garopaba_slider",
    GAROPABA_BANNER_COLLECTION: "garopaba_banner"
        ,
    CLUB_EVENT_COLLECTION: "club_event",
    CLUB_DESC_COLLECTION: "club_desc",
    CLUB_BANNER_COLLECTION: "club_banner",
    CLUB_GALLERY_COLLECTION: "club_gallery"

};
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
            console.log(logs.yellowLog("database connected."));
            callback(connection);
        });
}



function getConnection() {
    if (connection) {
        console.log(logs.redLog(logs.dateNow()) + logs.blueLog(' get dbconnection.'));
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
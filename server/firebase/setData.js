const firebase = require("./firebase-connect.js");

module.exports = {
    saveData: function (email, callback) {
        firebase.database().ref("/users").set({
            email: email,
        });
        callback(null, { statuscode: 200, message: "inserted successfully" });
    },
};

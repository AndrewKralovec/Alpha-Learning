var multer = require('multer'); //  middleware for handling multipart/form-data,
// Constructor 
module.exports = function (name) {
    try {
        // Configuring appropriate storage 
        var storage = multer.diskStorage({
            // Absolute path
            destination: function (req, file, callback) {
                callback(null, './uploads/'+name);
            },
            // Match the field name in the request body
            filename: function (req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now());
            }
        });
        return storage;
    } catch (ex) {
        console.log("Error :\n"+ex);
    }
}
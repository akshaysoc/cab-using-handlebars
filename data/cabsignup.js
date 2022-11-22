const db = require('./db');

function getAll(callback) {

    const sql = "SELECT id, fullname, mobile_no, email, password, FROM signup";

    db.executeQuery(sql, [], callback);

}
function addOne(fullname, mobile_no, email, Password, cpassword, callback) {

    const sql = "INSERT INTO signup (fullname, mobile_no, email, password, cpassword) VALUES( ?, ?, ?, ?, ?)"

    db.executeQuery(sql, [fullname, mobile_no, email, Password, cpassword], callback);
}

function updateOne(mobile_no, Password, cpassword, email, callback) {
    const sql = "UPDATE signup SET mobile_no = ?, password = ?, cpassword = ?  WHERE email = ?"

    db.executeQuery(sql, [mobile_no, Password, cpassword, email], callback);

}
function findOne(email, callback) {
    const sql = "SELECT id from signup WHERE email = ?"

    db.executeQuery(sql, email, callback);

}

module.exports.addOne = addOne;
module.exports.getAll = getAll;
module.exports.updateOne = updateOne;
module.exports.findOne = findOne;
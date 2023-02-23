const db = require("./db");

exports.create = (name, email, password, result) => {
    db.query("INSERT INTO User SET ?", 
        { name, email, password }, 
        (err, res) => {
            if (err) throw(err);
            result({ isSuccess: res.affectedRows > 0 });
        });
};

exports.findByEmail = (email, result) => {
    db.query("SELECT name, password FROM User WHERE email = ?", email, 
        (err, res) => {
            if (err) throw(err);
            if (res.length) {
                result(res[0]);
            }else {
                result(null);
            }
        });
};

exports.checkEmailExists = (email, result) => {
    db.query("SELECT COUNT(1) AS count FROM User WHERE email = ?", email, 
        (err, res) => {
            if (err) throw(err);
            result({ isExists: res[0].count > 0 });
        });
};
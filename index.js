const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'damian10',
    database: 'practica'
});

db.connect( (error) => {
    if(error) throw error;
    console.log("Connected")
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

app.get('/users', (req, res) => {
    var sql = "SELECT * FROM users";

    db.query(sql, (_error, _rows, _cols) => {
        if (_error) {
            res.json(
                {
                    error: true,
                    error_object: _error
                }
            )
        }
        else {
            res.json(_rows);
        }
    });
});

app.get('/users/:id', (req, res) => {
    var sql = "SELECT * FROM users WHERE user_id= ?";

    db.query(sql, [req.params.id], (_error, _rows, _cols) => {
        if (_error) {
            res.json(
                {
                    error: true,
                    error_object: _error
                }
            )
        }
        else {
            res.json(_rows);
        }
    });
});

app.post('/users', (req, res) => {
    var user = req.body;
    var sql = "INSERT INTO users(firstname, lastname, age, address) VALUES (?, ?, ?, ?)";
    db.query(sql, [user.firstname, user.lastname, user.age, user.address], function(err, result) {
        if(err) throw err;
        console.log("1 record inserted");
    });
    res.send(user);
});

app.put('/users/:id', (req, res) => {
    var user = req.body;
    var sql = "UPDATE users SET firstname= ?, lastname= ?, age= ?, address= ? WHERE user_id= ?";
    db.query(sql, [user.firstname, user.lastname, user.age, user.address, req.params.id], function(err, result) {
        if(err) throw err;
        console.log("1 record updated");
    });
    res.send(user);
});

app.delete('/users/:id', (req, res) => {
    var sql = "DELETE FROM users WHERE user_id=" + db.escape(req.params.id);
    db.query(sql, (error, rows, cols) => {
        if (error) {
            res.json(
                {
                    error: true,
                    error_object: error
                }
            )
        }
        else {
            res.json(rows);
        }
    });
});

app.listen(4000, () => {
    console.log('Server running on port 4000')
});






















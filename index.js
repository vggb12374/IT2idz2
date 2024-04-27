const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lb_pdo_rent',
});

const app = express();
const port = 7000;

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/get1', function (req, res) {
    const { Date_start } = req.query;

    const sql = "SELECT SUM(`Cost`) AS sum FROM `rent` WHERE `Date_start` = ?";
    const values = [Date_start];

    connection.execute(sql, values, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            return;
        }

        res.json(result[0].sum);
    });

    connection.unprepare(sql);
});

app.get('/get2select', function (req, res) {
    connection.query(
        "SELECT `Name` FROM `vendors`",
        function (err, results, fields) {
            res.send(results);
        }
    );
});

app.get('/get2', function (req, res) {
    const { vendorsName } = req.query;

    const sql = "SELECT `cars`.`Name` FROM `cars` INNER JOIN `vendors` ON `FID_Vendors` = `ID_Vendors` WHERE `vendors`.`Name` = ?";
    const values = [vendorsName];

    connection.execute(sql, values, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            return;
        }

        res.send(result);
    });

    connection.unprepare(sql);
});

app.get('/get3', function (req, res) {
    const { date } = req.query;

    const sql = "SELECT `Name`, `Release_date`, `Race`, `State(new,old)` AS `State`, `Price` FROM `cars` WHERE `ID_Cars` NOT IN (SELECT `FID_Car` FROM `rent` WHERE ? BETWEEN `Date_start` AND `Date_end`)";
    const values = [date];

    connection.execute(sql, values, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            return;
        }

        res.send(result);
    });

    connection.unprepare(sql);
});

app.listen(port, function () {
    console.log('Server running at http://localhost:' + port + '/');
});
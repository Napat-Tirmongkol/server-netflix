const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '157.245.59.56',
  user: 'u6300710',
  password: '6300710',
  database: 'u6300710',
  port: 3366
})

var app = express()
app.use(cors())
app.use(express.json())

app.get('/', function(req, res) {
  res.json({
    "status": "ok",
    "message": "Hello World"
  })
})

app.get('/Users', function(req, res) {
  connection.query(
    'SELECT * FROM Users',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/MovieLikes', function(req, res) {
  connection.query(
    'SELECT * FROM MovieLikes',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/Movies', function(req, res) {
  connection.query(
    'SELECT * FROM Movies',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/Moviestop', function(req, res) {
  connection.query(
    `SELECT Movies.*, COUNT(MovieLikes.movie_id) AS likes_count
    FROM Movies LEFT JOIN MovieLikes ON Movies.movie_id = MovieLikes.movie_id
    GROUP BY Movies.movie_id
    ORDER BY likes_count DESC`,
    function(err, results) {
      if (err) {
        // การจัดการข้อผิดพลาด
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        console.log(results); // แสดงผลที่ console
        res.json(results); // ตอบกลับ request ด้วยข้อมูลในรูปแบบ JSON
      }
    }
  );
});


app.listen(5000, () => {
  console.log('Server is started.')
})

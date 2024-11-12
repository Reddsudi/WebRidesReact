const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login',
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
/*const x = "abh.sudini@gmail.com";
    
  const SQL = `SELECT password from login WHERE email='${x}'`;
  const Password="kiraakman";
  con.query(SQL,(err,res)=>{
    
      if(res.length===0){
        console.log("signup cheyira batte");
      }
      else{
        if(Password===res[0].password){
          console.log("Succesful login");
        }
        else{
          console.log("Madda gudu");
        }
      
    }
  })*/
app.post('/signup', (req, res) => {
  const { Username, email, password } = req.body;

  // Check if Username, email, and password are provided
  if (!Username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
  const values = [Username, email, password];
  con.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log("here")
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Inserted ' + results.affectedRows + ' row(s)');
    res.status(200).json({ success: 'User registered successfully.' });
  });
});

app.post("/login", (req,res)=> {
    const { email, password } = req.body;
    const x=String(password)
    //const arr=[email,password];
    //console.log(arr);
    //console.log(arr[0],arr[1]);
    console.log(email,password);
    //const x = "abhi.sudini@gmail.com";
    
    const sql = `SELECT password from login WHERE email='${email}'`;
    con.query(sql,(err,res)=>{
      if(!email || !password){
       
        return res.status(400).json({ error: ' email, and password are required.' });
      }
      else{
        console.log(res[0].password)
        console.log(x);
        if(res.length===0){
          let messageFromBackend = "signup cheyira batte";
          console.log("signup cheyira batte");
        }
        else{
          if(x===res[0].password){
            
            console.log("Succesful login");
            
          }
          else{
            let messageFromBackend = "Madda gudu";
            return("Madda gudu");
          }
        }
      }
    });
      res.json({ message: messageFromBackend });
  }
  )

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
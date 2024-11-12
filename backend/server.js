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

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ridedata',
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

connection.connect((err) => {
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
      
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Inserted ' + results.affectedRows + ' row(s)');
    res.status(200).json({ success: 'User registered successfully.' });
  });
});


app.post("/rideavailable",(req,res)=>{
  try{
  
  const {PhoneNo, strength, from, to, time, date}  = req.body
  const values=[PhoneNo, strength, from, to, time, date]
  values[0]=BigInt(values[0])
  const sql = 'INSERT INTO `ride available` (PhoneNo, strength, `From place`, `To place`, Time, Date) VALUES (?, ?, ?, ?, ?,?)';
  connection.query(sql,values,(error,results,fields)=>{
    if (error) {
     
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
      
    }

    console.log('Inserted ' + results.affectedRows + ' row(s)');
    res.status(200).json({ success: 'User registered successfully.' });

  });
 
  console.log("connected")
  }
  catch(error){
    res.json(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/rideavdata", (req, res) => {
  const sql = "SELECT * FROM `ride available` ";
  
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      } else {
          
          res.json({result});
         
      }
  });
});

app.get("/needridedata", (req, res) => {
  const sql = "SELECT * FROM `need ride`";
  
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      } else {

          console.log(result)
          
          res.json({result});
          
      }
  });
});


app.post("/needride", (req, res) => {
  try{
  
    const {PhoneNo, strength, from, to, time, date}  = req.body
    const values=[PhoneNo, strength, from, to, time, date]
    
    values[0]=BigInt(values[0])
    const sql = 'INSERT INTO `need ride` (PhoneNo, strength, `From place`, `To place`, Time, Date) VALUES (?, ?, ?, ?, ?,?)';
    connection.query(sql,values,(error,results,fields)=>{
      if (error) {
        
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
        
      }
  
      console.log('Inserted ' + results.affectedRows + ' row(s)');
      res.status(200).json({ success: 'User registered successfully.' });
  
    });
    
    console.log("connected")
    }
    catch(error){
      res.json(error)
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  


app.post("/login", (req,res)=> {
    const { email, password } = req.body;
    const x=String(password)
    //const arr=[email,password];
    //console.log(arr);
    //console.log(arr[0],arr[1]);
    console.log(email,password);
    //const x = "abhi.sudini@gmail.com";
    const messageFromBackend="";
    const sql = `SELECT password from login WHERE email='${email}'`;
    con.query(sql,(err,results)=>{
      if(results==0){
        const mess = "emptyArray";
       res.json({ message: mess });
      }
      else{
       res.json({ message: results[0].password });
      }
    });
    
  }
  )

app.post("/desneedride",(req,res)=>{
  const { desfromplace, destoplace, destime, desdate } = req.body;
  console.log(desfromplace, destoplace, destime, desdate);
  const sql = `SELECT * FROM \`ride available\` WHERE Time BETWEEN ADDTIME(?,'-01:00:00') AND
  ADDTIME(?,'01:00:00') AND DATE(LEFT(Date, 10)) = ? `;
  

  // Execute the query
  connection.query(sql, [[destime],[destime],[desdate]], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal server error');
      return;
    }

    // Send the results back as JSON
    console.log(results)
    res.json(results);
  });
  
})

app.post("/desrideav",(req,res)=>{
  const{desfromplace,destoplace,destime,desdate}=req.body;
  console.log(desfromplace,destoplace,destime,desdate);
  const sql = `SELECT * FROM \`need ride\` WHERE Time BETWEEN ADDTIME(?,'-01:00:00') AND
  ADDTIME(?,'01:00:00') AND DATE(LEFT(Date, 10)) = ? `;
  

  // Execute the query
  connection.query(sql, [[destime],[destime],[desdate]], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal server error');
      return;
    }

    // Send the results back as JSON
    console.log(results)
    res.json(results);
  });
  
})
  /*if(destoplace=="" && destime==""){
   
      
      // Process the results here
      res.json(results);
    });
  } else {
    // Handle the case when destoplace or destime is not empty
    res.status(400).json({ error: 'Invalid request' });
  }
  }
)  */

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
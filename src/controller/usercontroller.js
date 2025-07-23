const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../db');

exports.registerUser = (req,res) => {
    const {name, phone , email , password} = req.body;
   
    if(!name || !phone || !email || !password){
        return res.status(400).json({message:"all fields required"})
    }
    
    const checkquery = "select * from users  where phone = ? ";
    db.query(checkquery , [phone] , async(err , result)=> {
        if (err) return res.status(500).json({message:"database error"});

        if(result.length > 0) {
            return res.status(409).json({message:"phone already registered"});

        }
        const hashedpassword = await bcrypt.hash(password,10);
        
        const insertquery = "insert into users (name,phone,email,password) values (?,?,?,?)";
        db.query(insertquery , [name,phone,email,hashedpassword], (err , result)=>{
            if(err) return res.status(201).json({message:"failed to register user"});

            res.status(201).json({message:"user registered successfully"});
        });

    });
};

//login

exports.loginUser  = (req, res)=> {
    const {phone , password} = req.body
    if(!phone || !password){
        return res.status(400).json({message:"all fields required"});
    }

    const findquery = "select * from users where phone = ?" ;
    db.query(findquery , [phone] , async (err , results) => {
        if(err) return res.status(500).json({ message: "user not found"}) ;

        if(results.length== 0){
            return res.status(401).json({message: "user not found"});
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch) {
            return res.status(401).json({message: "incorrect password"});
        }

        const token = jwt.sign({ userid : user.userid }, "mysecretkey" , {expiresIn : '2h'});
    res.status(200).json({message: 'login successful' , token});

    
    });
};

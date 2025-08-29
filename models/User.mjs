import connection from "../db/connect.mjs";
class User{
static async createUser(email,name,password,role='Customer'){

       let res= await connection.query(`INSERT INTO USERS(EMAIL,NAME,PASSWORD_HASH,ROLE) VALUES(?,?,?,?);`,[email,name,password,role])
       return res;
}


static async findUserByEmail(email){
    
      let res=  connection.query(`select * from users where email =?`,[email])
        return res;
}


static async findUserById(id){
 
       let res= connection.query(`select * from users where id=?`,[id])
        return res;
}
}


export default User


// Project Structure:
/*
convonite/
├── index.js                 # Server setup
├──db/
│   └── connect.js          # DB connection
├── models/
│   ├── User.js             # classes that require the operations of user
│   ├── Product.js          # Product database operations  
│   └── Order.js            # Order database operations
├── controllers/
│   ├── authController.js   # Auth business logic
│   ├── userController.js   # User business logic
│   └── productController.js # Product business logic
├── routes/
│   ├── auth.js             # Auth routes
│   ├── users.js            # User routes
│   └── products.js         # Product routes
├── middleware/
│   └── auth.js             # JWT middleware
└── package.json
*/
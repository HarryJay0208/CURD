const mysql = require('mysql');




//Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    database :  process.env.DB_NAME,
    
 });
 
 
exports.view= (req, res) => {

    
 //cONNECTION TO THE DATABASE
 
 pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);

    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {

        connection.release();

        if(!err) {
             res.render('home', { rows });
        }else{
            console.log(err);
        }

        console.log('The data from user table: \n',rows);

    });

});
}

//find user by search
exports.find = (req, res) => {


    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        let searchTerm = req.body.search;


        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?'  , 
        ['%' + searchTerm + '%','%' + searchTerm + '%','%' + searchTerm + '%','%' + searchTerm + '%'] , (err, rows) => {
            connection.release();
            if(!err) {
                 res.render('home', { rows });
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n',rows);
        });
    });
}

exports.form = (req,res) => {
    res.render('add-user');
}


//Add new user
exports.create = (req, res) => {
const { first_name, last_name, email, phone, comments} = req.body;
// res.render('add-user');

pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);

    let searchTerm = req.body.search;


    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? ',[first_name, last_name, email, phone, comments], (err, rows) => {
        connection.release();
        if(!err) {
             res.render('add-user', {alert: 'User added successfully'});
        }else{
            console.log(err);
        }
        console.log('The data from user table: \n',rows);
    });
});

}

//Edit user
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err, rows) => {
    
            connection.release();
    
            if(!err) {
                 res.render('edit-user', { rows });
            }else{
                console.log(err);
            }
    
            console.log('The data from user table: \n',rows);
    
        });
    
    });


}


//update user
exports.update = (req, res) => {
const {first_name, last_name, email, phone, comments} = req.body; 

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        connection.query('UPDATE user SET first_name = ?, last_name = ?,email = ?,phone = ?, comments = ? WHERE id = ?',[first_name, last_name, email, phone, comments, req.params.id],
         (err, rows) => {
            connection.release();
            if(!err) {
            
                pool.getConnection((err, connection) => {
                    if(err) throw err;
                    console.log('Connected as ID ' + connection.threadId);
                
                    connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err, rows) => {
                
                        connection.release();
                
                        if(!err) {
                             res.render('edit-user', { rows });
                        }else{
                            console.log(err);
                        }
                
                        console.log('The data from user table: \n',rows);
                
                    });
                
                });
            

            }else{
                console.log(err);
            }
            console.log('The data from user table : \n', rows);
        });
    });
}
              


//Delete user
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
    
        connection.query('DELETE FROM user WHERE id = ?',[req.params.id], (err, rows) => {
    
            connection.release();
    
            if(!err) {
                 res.redirect('/');
            }else{
                console.log(err);
            }
    
            console.log('The data from user table: \n',rows);
    
        });
    
    });


}



//viewall

 
exports.viewall= (req, res) => {

    
    //cONNECTION TO THE DATABASE
    
    pool.getConnection((err, connection) => {
       if(err) throw err;
       console.log('Connected as ID ' + connection.threadId);
   
       connection.query('SELECT * FROM user WHERE id = ? ', [req.params.id], (err, rows) => {
   
           connection.release();
   
           if(!err) {
                res.render('view-user', { rows });
           }else{
               console.log(err);
           }
   
           console.log('The data from user table: \n',rows);
   
       });
   
   });
   }
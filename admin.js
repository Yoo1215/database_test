var fs = require('fs');

var ejs = require('ejs');
var mysql = require('mysql');
var body_parser = require('body-parser');

var Connect = require('connect');
var Router = require('router');

var connection = mysql.createConnection({
   
   'host' : 'bambu-sopt.crigi8lwbgkh.us-west-2.rds.amazonaws.com',
	'user' : 'root',
	'password' : 'forestbambu',
	'database' : 'Bambu_Sopt',
});

var connect = new Connect();
var router = new Router();

connect.use(body_parser.urlencoded({ 'extended' : true }));

router.get('/', function (request, response) {

    fs.readFile('list_board.ejs', 'utf8', function (error, data) {
        
        if (!error) {
            
            connection.query('SELECT * FROM Total_Board ORDER BY timestamp desc;', function (error, query) {
                
                response.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8;' });
                response.end(ejs.render(data, { 'query' : query }));
            });
        }
        else {
         
            response.writeHead(503, { 'Content-Type' : 'text/html;' });
            response.end();
        }
    });
});

router.get('/Bambu', function (request, response) {

    fs.readFile('admin_bambu.ejs', 'utf8', function (error, data) {
        
        if (!error) {
            
            connection.query('SELECT * FROM Bambu_Board ORDER BY timestamp desc;', function (error, query) {
                
                response.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8;' });
                response.end(ejs.render(data, { 'query' : query }));
            });
        }
        else {
         
            response.writeHead(503, { 'Content-Type' : 'text/html;' });
            response.end();
        }
    });
});

router.get('/Thunder', function (request, response) {

    fs.readFile('admin_thunder.ejs', 'utf8', function (error, data) {
        
        if (!error) {
            
            connection.query('SELECT * FROM Thunder_Board ORDER BY timestamp desc;', function (error, query) {
                
                response.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8;' });
                response.end(ejs.render(data, { 'query' : query }));
            });
        }
        else {
         
            response.writeHead(503, { 'Content-Type' : 'text/html;' });
            response.end();
        }
    });
});

router.get('/Notice', function (request, response) {

    fs.readFile('admin_notice.ejs', 'utf8', function (error, data) {
        
        if (!error) {
            
            connection.query('SELECT * FROM Notice_Board ORDER BY timestamp desc;', function (error, query) {
                
                response.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8;' });
                response.end(ejs.render(data, { 'query' : query }));
            });
        }
        else {
         
            response.writeHead(503, { 'Content-Type' : 'text/html;' });
            response.end();
        }
    });
});

router.get('/delete/Bambu_Board/:board_id', function(req, res, next) {

        connection.query('delete from Bambu_Board where boardID=?;', 
                         [req.params.board_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

router.get('/delete/Thunder_Board/:board_id', function(req, res, next) {

        connection.query('delete from Thunder_Board where boardID=?;', 
                         [req.params.board_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

router.get('/delete/Notice_Board/:board_id', function(req, res, next) {

        connection.query('delete from Notice_Board where boardID=?;', 
                         [req.params.board_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

router.get('/users', function (request, response) {

    fs.readFile('users.ejs', 'utf8', function (error, data) {
        
        if (!error) {
            
            connection.query('SELECT * FROM User;', function (error, query) {
                
                response.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8;' });
                response.end(ejs.render(data, { 'query' : query }));
            });
        }
        else {
         
            response.writeHead(503, { 'Content-Type' : 'text/html;' });
            response.end();
        }
    });
});

connect.use(router);
connect.listen(8080, function () {

    console.log("Server running on port 8080 :)");
});
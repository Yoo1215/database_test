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

    fs.readFile('list.ejs', 'utf8', function (error, data) {
        
        if (!error) {
            
            connection.query('SELECT * FROM Bambu_Board;', function (error, query) {
                
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


router.get('/insert', function (request, response) {

    fs.readFile('insert.html', 'utf8', function (error, data) {
        
        if (!error) {
            
            response.writeHead(200, { 'Content-Type' : 'text/html' });
            response.end(data);
        }
        else {
         
            response.writeHead(503, { 'Content-Type' : 'text/html;' });
            response.end();
        }
    });
});

router.post('/insert', function (request, response) {

    connection.query('INSERT INTO Bambu_Board (nickname, content) values (?, ?);',
                  [ request.body.nickname, request.body.content ]);
    
    response.writeHead(302, { 'Location' : '/' });
    response.end();
});


router.get('/update/:board_id', function (request, response) {

   fs.readFile('update.ejs', 'utf8', function (error, data) {
       
       connection.query('SELECT * FROM Bambu_Board WHERE BoardID = ?;', [ request.params.board_id ], 
                        
                        function (error, query) {
           
                            if (!error && query.length > 0) {
                            
                                response.writeHead(200, { 'Content-Type' : 'text/html' });
                                response.end(ejs.render(data, { 'item' : query[0] }));
                            }
                            else {
                            
                                response.writeHead(404, { 'Content-Type' : 'text/html' });
                                response.end();
                            }
                        });
   });
});

router.post('/update/:board_id', function(req, res, next) {

        connection.query('update Bambu_Board set nickname=?, content=? where boardID=?;', 
                         [req.body.nickname, req.body.content]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});

router.get('/delete/:id', function(req, res, next) {

        connection.query('delete from Bambu_Board where boardID=?;', 
                         [req.params.board_id]);
    
        res.writeHead(302, {'Location' : '/'});
        res.end();
});


connect.use(router);
connect.listen(8080, function () {

    console.log("Server running on port 8080 :)");
});
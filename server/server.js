var express = require('express');
var app =express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var BDDconnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});
BDDconnection.connect();
console.log('listening on 8080');
server.listen(8081);
app.use('/js', express.static(path.resolve(__dirname, '../client/js')));
app.use('/css', express.static(path.resolve(__dirname, '../client/css')));
app.use('/img', express.static(path.resolve(__dirname, '../client/img')));
app.use('/', express.static(path.resolve(__dirname, '../client')));

console.log(path.resolve(__dirname, '../client'));
console.log(path.resolve(__dirname, '../client/js'));

app.get('/', function (req, res) {
  res.sendFile(express.static(path.resolve(__dirname, '../client')) + 'index.html');
});

io.on('connection', function (socket) {
  socket.emit('init', { bonjour: 'world' });
  socket.on('get me authors', function (data) {
    //console.log(data);
    var requete = BDDconnection.query('select * from authors', function(err,result){
			if (err){ 
				throw err;
			}
			else{
				socket.emit('authors', { authors: result });
				//console.log(result);
			}
		})
  });
  socket.on('get me books', function (data) {
    var requete = BDDconnection.query('select * from livres', function(err,result){
      if (err){ 
        throw err;
      }
      else{
        socket.emit('books', { books: result });
        console.log(result);
      }
    })
  });
});

/*
--> séparer le requetage en base dans des fonctions indépendantes
--> exporter les fonctions indépendantes dans des modules indépendants
--> ajouter une une fonction de configuration des routes puis la séparer dans un module indépendant
*/
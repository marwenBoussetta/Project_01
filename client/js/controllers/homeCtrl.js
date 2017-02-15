app.controller("homeCtrl",function($scope,socket){
	socket.on('init', function (data) {
	    console.log(data);
	    socket.emit('get me authors', { my: 'data' });
	    
	
	  });
	socket.on('authors', function (data) {
	    $scope.auteurs=data.authors;
	    console.log('voici les auteurs: ',$scope.auteurs)
  	}); 
  	socket.on('books', function (data) {
  		$scope.livres=data.books;
  		console.log('voici les livres: ',$scope.livres);
  	});
   $scope.trouve = function (){
	socket.emit('get me books', { my: 'data' });
	console.log('j\'ai demandé des livres');	
}
});



/*
prochaines améliorations à faire : 
 --> séparer la demende des livres et des auteurs hors de l'initialisation
 --> ajouter un menu de navigation pour visuliser soit les auteurs soit les livres 
 --> séparer toutes les fonctions dans des modules externes autant que possible 
*/
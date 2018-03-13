/* Получить (GET) домашнюю страницу */
module.exports.homelist = function(req, res){
 res.render('locations-list', { 
 	title: 'Loc8r - find a place to work with wifi',
 	pageHeader: {
 	  title: 'Loc8r',
 	  strapline: 'Find place to work with wifi near you!'
 	},
 	locations: [{
 		name: 'Bitch please',
 		address: 'Backer street 69',
 		rating: 3,
 		facilities: ['Hot drinks', 'Food', 'Premiun wifi'],
 		distance: '100m'
 	},{
 		name: 'No name',
 		address: 'Backer street 63',
 		rating: 4,
 		facilities: ['Hot drinks', 'Food', 'Premiun wifi'],
 		distance: '100m'
 	},{
 		name: 'Dumbs',
 		address: 'Backer street 3',
 		rating: 2,
 		facilities: ['Food', 'Premiun wifi'],
 		distance: '100m'
 	}]
  });
};
/* Получить (GET) страницу с информацией о местоположениях */
module.exports.locationInfo = function(req, res){
 res.render('locations-info', { title: 'Location info' });
};
/* Получить (GET) страницу добавления отзыва */
module.exports.addReview = function(req, res){
 res.render('location-review-form', { title: 'Add review' });
};
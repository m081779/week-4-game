$(document).ready(function () {

var game = {
	character1: {
		name: "character1",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 25
	},

	character2: {
		name: "character2",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 25
	},

	character3: {
		name: "character3",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 25
	},

	character4: {
		name: "character4",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 25
	},

	hero: undefined,
	enemy: undefined,
	clickCounter: 0,


	getHero: function() {
		if (game.clickCounter===0) {
			game.hero = $(this).attr('id');
			$(this).addClass('hero');
			var defender = $(this).siblings().detach();
			defender.appendTo('.defenderSelect');
			defender.addClass('defender');
			game.clickCounter++;
		}
	}, //end of getHero method  

	getDefender: function () {
		if (game.clickCounter===1) {
			game.enemy = $(this).attr('id');
			var remainingOpponents = $(this).siblings().detach();
			remainingOpponents.appendTo('.remainingOpponents');
			game.clickCounter++;
		}
	}, //end of getDefender method

	attack: function () {
		console.log(game.hero.name);

	} //end of attack method
}//end of game object

	$('body').on('click', '.character', game.getHero);

	$('body').on('click','.defenderSelect .defender', game.getDefender);

	$('body').on('click', 'button', game.attack);


});//end of document.ready function 


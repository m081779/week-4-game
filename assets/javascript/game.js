$(document).ready(function () {



 var game = {

	"character1": {
		name: "character1",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 10
	},

	"character2": {
		name: "character2",
		HP: 100,
		AP: 50,
		growAP:50,
		counterAP: 25
	},

	"character3": {
		name: "character3",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 25
	},

	"character4": {
		name: "character4",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 25
	},

	hero: '',
	enemy: '',
	clickCounter: 0,
	winCounter: 0,



	startState: function () {
		location.reload()
	},

	hideHeaders: function () {
		$('.heroArea h3').hide();
		$('.enemyArea h3').hide();
		$('.remainingOpponents h3').hide();
	},

	writeInstructions: function (inputText) {
		$('.textArea').html('<h1>BUGZ</h1><p>Welcome to BUGZ: Fight or Die!</p><p>'+inputText+'</p>');
	},

	writeHP: function () {
		$('.character').each(function (i) {
		 	 id = $(this).attr('id');
		 	$(this).find('span').text(game[id].HP);
		});
	},
	getHero: function() {
		if (game.clickCounter===0) {
			game.writeInstructions('Choose the bug you want to destroy!');
			game.hero = $(this).attr('id');

			$(this).siblings().addClass('rotate').css({
				'transform': "rotateY(180deg)"
			});

			$('.rotate h4').css({
				'transform': 'rotateY(180deg)'
			});
			
			$('.heroArea h3').show();
			$('.playerSelect').addClass('defenderSelect');
			$(this).addClass('hero')
				   .detach()
				   .appendTo('.heroArea');
			game.clickCounter++;
		}
	}, //end of getHero method  

	getDefender: function () {
		if (game.clickCounter===1) {
			$('body').on('click', 'button', game.attack);
			game.writeInstructions("Don't stop attacking until you've won!");
			$('.enemyArea h3').show();
			$('.remainingOpponents h3').show();
			game.enemy = $(this).attr('id');
			var defender = $(this).siblings().detach();
			defender.addClass('defender')
					.appendTo('.remainingOpponents');
			$("#"+ game.enemy).addClass('foe').appendTo('.enemyArea');
			game.clickCounter++;
		}
	}, //end of getDefender method

	attack: function () {
		var random = Math.floor(Math.random()*8);
		var message = ['Get him!', 'Don\'t stop!','You\'ve got him on the ropes!', 'He\'s no match for you!', 'You\'ve done this before...', 'I wouldn\'t mess with you!', 'You\'re one tough son of a BUG!', 'Service guarantees citizenship.  Would you like to know more?'];
		game.writeInstructions(message[random]);
		game.animate();
		var heroCalc = game[game.hero].HP -= game[game.enemy].counterAP;
		var enemyCalc = game[game.enemy].HP -= game[game.hero].AP;
		game.writeHP(heroCalc, enemyCalc );
		game[game.hero].AP+=game[game.hero].growAP
		game.getNewEnemy();
		game.removeEnemy();
		game.checkLoss();
		game.checkWin();

	}, //end of attack method

	animate: function () {

		$('.hero').removeClass('animateL');
		$('.foe').removeClass('animateR');
		setTimeout(function () {
			$('.hero').addClass('animateL')
		}, 50);
		setTimeout(function () {
			$('.foe').addClass('animateR')
		}, 50);
		// console.log('animate firing');
		// $('.hero').css({
		// 	'animation': 'animateLeft 1s 1'
		// });
		// $('.foe').css({
		// 	'animation': 'animateRight 1s 1'
		// });
	},

	writeHP: function (input1, input2) {
		var enemyHP = $("#" + game.enemy + " .hp");
		var heroHP = $("#" + game.hero + " .hp");

		heroHP.text(input1);
		enemyHP.text(input2);
	},

	removeEnemy: function () {
		var localEnemy = $('#'+game.enemy);
		if (game[game.enemy].HP<=0) {
			game.writeInstructions('Choose another victim!');
			setTimeout(function () {
				localEnemy.remove();
			},500);
			game.enemy = '';
			game.clickCounter--;
			game.winCounter++;
			console.log("win counter: ", game.winCounter);
			$('body').off('click', 'button', game.attack);
		}
	},

	getNewEnemy: function () {
		if (game.clickCounter===1) {
			$(this).detach().appendTo('.enemyArea');
			game.enemy = $(this).attr('id');
			$('body').on('click', 'button', game.attack);
			game.clickCounter++;
		}
	},

	checkWin: function () {

		if (game.winCounter===3){
			console.log('win firing');
			game.writeInstructions('You\'ve won!  You\'re KING of the BUGZ!');
			$('body').off('click', '.character', game.getHero);
			$('body').off('click','.defenderSelect .character', game.getDefender);
			$('body').off('click', '.remainingOpponents .character', game.getNewEnemy)			
			$('body').off('click', 'button', game.attack);
			game.endState = true;
			setTimeout(game.startState, 4000);
		}
	},

	checkLoss: function () {
		if (game[game.hero].HP<=0) {
			game.writeInstructions('You\'ve lost, but time is a circle.  Your time will come again!');
			$('body').off('click', '.character', game.getHero);
			$('body').off('click','.defenderSelect .character', game.getDefender);
			$('body').off('click', '.remainingOpponents .character', game.getNewEnemy)			
			$('body').off('click', 'button', game.attack);
			game.endState = true;
			setTimeout(game.startState, 4000);
		}
	}
}//end of game object

		$('.character').each( function (i, val){
			var id = $(this).attr('id');
			$(this).find('.hp').text(game[id].HP);
		});

		game.hideHeaders();
		game.writeInstructions('Choose a bug to begin');


		$('body').on('click', '.character', game.getHero);

		$('body').on('click','.defenderSelect .character', game.getDefender);

		$('body').on('click', '.remainingOpponents .character', game.getNewEnemy)
		
		// $('body').on('click', 'button', game.attack);

});//end of document.ready function 


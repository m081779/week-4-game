$(document).ready(function () {
	$('.heroArea h3').hide();
	$('.enemyArea h3').hide();
	$('.remainingOpponents h3').hide();
	// game.writeHP();



 var game = {

	
	
	"character1": {
		name: "character1",
		HP: 100,
		AP: 10,
		growAP:10,
		counterAP: 100
	},

	"character2": {
		name: "character2",
		HP: 100,
		AP: 10,
		growAP:10,
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
	// id: '',
	hero: '',
	enemy: '',
	clickCounter: 0,
	winCounter: 0,
	endState: false,

	startState: function () {
		location.reload()
	},

	writeHP: function () {
		// console.log('writeHP firing')
		$('.character').each(function (i) {
		 	 id = $(this).attr('id');
		 	$(this).find('span').text(game[id].HP);
		});
	},
	getHero: function() {
		if (game.clickCounter===0) {
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
			// $(this).css({
			// 	'transform': "rotateY(180deg)"
			// });
			$('.enemyArea h3').show();
			$('.remainingOpponents h3').show();
			game.enemy = $(this).attr('id');
			var defender = $(this).siblings().detach();
			defender.addClass('defender')
					.appendTo('.remainingOpponents');
			// var remainingOpponents = $(this).siblings().detach();
			$("#"+ game.enemy).appendTo('.enemyArea');
			game.clickCounter++;
		}
	}, //end of getDefender method

	attack: function () {

		var heroCalc = game[game.hero].HP -= game[game.enemy].counterAP;
		var enemyCalc = game[game.enemy].HP -= game[game.hero].AP;
		game.writeHP(heroCalc, enemyCalc );
		game[game.hero].AP+=game[game.hero].growAP
		game.removeEnemy();
		game.checkLoss();
		game.checkWin();
		game.getNewEnemy();

	}, //end of attack method

	writeHP: function (input1, input2) {
		var enemyHP = $("#" + game.enemy + " .hp");
		var heroHP = $("#" + game.hero + " .hp");

		heroHP.text(input1);
		enemyHP.text(input2);
	},

	removeEnemy: function () {
		var localEnemy = $('#'+game.enemy);
		if (game[game.enemy].HP<=0) {
			localEnemy.remove();
			game.enemy = '';
			game.clickCounter--;
			game.winCounter++;
			console.log("win counter: ", game.winCounter);
		}
	},

	getNewEnemy: function () {
		if (game.clickCounter===1) {
			$(this).detach().appendTo('.enemyArea');
			game.enemy = $(this).attr('id');
			game.clickCounter++;
		}
	},

	checkWin: function () {

		if (game.winCounter===3){
			$('body').off('click', '.character', game.getHero);

		$('body').off('click','.defenderSelect .character', game.getDefender);

		$('body').off('click', '.remainingOpponents .character', game.getNewEnemy)
		
		$('body').off('click', 'button', game.attack);
			game.endState = true;
			$('.textArea').text('YOU WIN!');
			setTimeout(game.startState, 4000);
		}
	},

	checkLoss: function () {
		if (game[game.hero].HP<=0) {
			$('body').off('click', '.character', game.getHero);

		$('body').off('click','.defenderSelect .character', game.getDefender);

		$('body').off('click', '.remainingOpponents .character', game.getNewEnemy)
		
		$('body').off('click', 'button', game.attack);
			game.endState = true;
			$('.textArea').text('YOU LOSE!');
			setTimeout(game.startState, 4000);
		}
	}
}//end of game object

		// game.writeHP();

	if (!game.endstate) {
		console.log(game.endState)
		$('body').on('click', '.character', game.getHero);

		$('body').on('click','.defenderSelect .character', game.getDefender);

		$('body').on('click', '.remainingOpponents .character', game.getNewEnemy)
		
		$('body').on('click', 'button', game.attack);
	}	
});//end of document.ready function 



var hero;
var currentEnemy;
var clickCounter = 0;


var character1 = {
	name: "character1",
	healthPoints: 100,
	attackPower: 10,
	growAP:10,
	counterAttackPower: 25
}

var character2 = {
	name: "character2",
	healthPoints: 100,
	attackPower: 10,
	growAP:10,
	counterAttackPower: 25
}

var character3 = {
	name: "character3",
	healthPoints: 100,
	attackPower: 10,
	growAP:10,
	counterAttackPower: 25
}

var character4 = {
	name: "character4",
	healthPoints: 100,
	attackPower: 10,
	growAP:10,
	counterAttackPower: 25
}

function game() {


	$('body').on('click', '.character', function () {
		if (clickCounter===0) {
			var hero = $(this).attr('id');
			console.log(hero);
			$(this).addClass('hero');
			var defender = $(this).siblings().detach();
			defender.appendTo('.defenderSelect');
			defender.addClass('defender');
			clickCounter++;
		}
		
	});

	$('body').on('click','.defenderSelect .defender', function () {
		if (clickCounter===1) {
			currentEnemy = $(this).attr('id');
			var remainingOpponents = $(this).siblings().detach();
			remainingOpponents.appendTo('.remainingOpponents');
			clickCounter++;
		}	
	});

	$('body').on('click', 'button', function () {
		console.log(hero);	
		console.log(currentEnemy);	
	});

}//end of game function




$(document).ready(game);


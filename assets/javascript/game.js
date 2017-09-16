$(document).ready(function () {

 var game = {
	//character objects lines 6-36
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

	//initialize variables
	hero: '',
	enemy: '',
	clickCounter: 0,
	winCounter: 0,

	//method that reloads the page when game is over
	startState: function () {
		location.reload()
	},//end of startState method

	//method that hides the headers of the different categories until
	//elements are moved there
	hideHeaders: function () {
		$('.heroArea h3').hide();
		$('.enemyArea h3').hide();
		$('.remainingOpponents h3').hide();
	},//end of hideHeaders method

	//writes text to the #textArea
	writeInstructions: function (inputText) {
		$('.textArea').html('<h1>BUGZ</h1><p>Welcome to BUGZ: Fight or Die!</p><p>'+inputText+'</p>');
	},//end of writeInstructions method

	//writes the HP data of the character objects to the screen
	writeSpansHP: function () {
		$('.character').each(function (i) {
		 	 id = $(this).attr('id');
		 	$(this).find('span').text(game[id].HP);
		});
	},//end of writeSpansHP method

	//method that selects which character you fight as
	getHero: function() {

		//conditional to ensure hero is only chosen once.
		if (game.clickCounter===0) {
			//writes instructions to #textArea
			game.writeInstructions('Choose the bug you want to destroy!');
			//saves the ID value of the clicked element for 
			//use in calculating attack
			game.hero = $(this).attr('id');
			//targets siblings of clicked element and rotates them to enemy
			//mode
			$(this).siblings().addClass('rotate').css({
				'transform': "rotateY(180deg)"
			});
			//re-rotates the h4 elements so text won't be backwards
			$('.rotate h4').css({
				'transform': 'rotateY(180deg)'
			});
			//shows the header for .heroArea
			$('.heroArea h3').show();
			//adds .defenderSelect so that click event can differentiate
			$('.playerSelect').addClass('defenderSelect');
			//adds .hero to clicked element, detaches it and appends it to .heroArea
			$(this).addClass('hero')
				   .detach()
				   .appendTo('.heroArea');
		   	//increments clickCounter to ensure only one hero chosen,
			game.clickCounter++;
		}
	}, //end of getHero method  

	//method that selects the current defender
	getDefender: function () {
		//conditional ensures only one defender is chosen
		if (game.clickCounter===1) {
			//enables click event for the attack button
			$('body').on('click', 'button', game.attack);
			//writes instructions to the #textArea
			game.writeInstructions("Don't stop attacking until you've won!");
			//shows the header for .enemyArea and .remainingOpponents
			$('.enemyArea h3').show();
			$('.remainingOpponents h3').show();
			//saves the ID value of the clicked element for 
			//use in calculating attack
			game.enemy = $(this).attr('id');
			//detaches clicked elements siblings and appends 
			//them to .remainingOpponents
			$(this).siblings()
				   .detach()
				   .appendTo('.remainingOpponents');
			//adds .foe to defender and moves them to .enemyArea
			$(this).addClass('foe').appendTo('.enemyArea');
			//increments clickCounter to ensure only one enemy is chosen
			game.clickCounter++;
		}
	}, //end of getDefender method

	//method that runs most of the game, and calculates damage
	attack: function () {
		//generating a random number to access a random message each time attack() is run
		//and writes it to the screen
		var random = Math.floor(Math.random()*8);
		var message = ['Get him!', 'Don\'t stop!','You\'ve got him on the ropes!', 'He\'s no match for you!', 'You\'ve done this before...', 'I wouldn\'t mess with you!', 'You\'re one tough son of a BUG!', 'Service guarantees citizenship.  Would you like to know more?'];
		game.writeInstructions(message[random]);


		//variables to store values of hero and foe HP after attack
		var heroCalc = game[game.hero].HP -= game[game.enemy].counterAP;
		var enemyCalc = game[game.enemy].HP -= game[game.hero].AP;
		//writes the calculated HP value to the screen
		game.writeHP(heroCalc, enemyCalc );
		//increments the AP of the hero by the original AP value
		game[game.hero].AP+=game[game.hero].growAP
		//runs animation, 
		game.animate();
		//removes the enemy from the screen, and checks win/loss conditions
		game.removeEnemy();
		game.checkLoss();
		game.checkWin();
	}, //end of attack method

	//produces the fight animation
	animate: function () {
		//removing the CSS animation classes and adding them back
		//to ensure that animation runs everytime the attack button is
		//clicked.  Settimeout function to ensure that enough time 
		//goes by to reset animation
		$('.hero').removeClass('animateL');
		$('.foe').removeClass('animateR');
		setTimeout(function () {
			$('.hero').addClass('animateL')
		}, 50);
		setTimeout(function () {
			$('.foe').addClass('animateR')
		}, 50);
	}, //end of animate method

	//method that writes the HP values of the fighters after calculation
	writeHP: function (input1, input2) {
		//variables that store the captured ID strings of hero and enemy
		//and convert them to jquery ID selectors targeting those elements
		//h4.hp elements
		var enemyHP = $("#" + game.enemy + " .hp");
		var heroHP = $("#" + game.hero + " .hp");
		//takes arguments and writes them to the correct elements
		heroHP.text(input1);
		enemyHP.text(input2);
	},// end of writeHP method

	//method that removes enemy from the screen and increments winCounter
	removeEnemy: function () {
		//variable that stores the captured ID strings of current enemy
		//and converts it to jquery ID selector for later use
		var localEnemy = $('#'+ game.enemy);
		//conditional that checks the HP value of current enemy
		if (game[game.enemy].HP<=0) {
			//if enemy has been defeated, instructions are written to #textArea
			game.writeInstructions('Choose another victim!');
			//the element of the defeated enemy is removed after a short delay
			//to ensure that user has time to process the victory
			setTimeout(function () {
				localEnemy.remove();
			},500);
			//sets the current enemy to an empty string to stop code from executing on it
			game.enemy = '';
			//decrements the clickCounter so that another enemy may be chosen only once
			game.clickCounter--;
			//increments the winCounter to enable checkWin() to determine win state
			game.winCounter++;
			//turns off click event of attack button to stop attack() from running
			$('body').off('click', 'button', game.attack);
		}
	},//end of removeEnemy method

	//method that selects a new enemy after one has been defeated
	getNewEnemy: function () {
		//uses clickCounter variable to ensure that only one new enemy is chosen
		if (game.clickCounter===1) {
			//detaches the clicked enemy and moves them to .enemyArea
			$(this).detach().appendTo('.enemyArea');
			//saves the ID value of the clicked element for 
			//use in calculating attack
			game.enemy = $(this).attr('id');
			//enables the attack button's click event now that a new enemy has been selected
			$('body').on('click', 'button', game.attack);
			//increments clickCounter so that only one enemy is chosen
			game.clickCounter++;
		}
	},//end of getNewEnemy method

	//method that checks win state conditions
	checkWin: function () {
		//conditional checks if all three enemies are defeated
		if (game.winCounter===3){
			//if true, it writes instructions to the screen
			game.writeInstructions('You\'ve won!  You\'re KING of the BUGZ!');
			//disables all click events
			$('body').off('click', '.character', game.getHero);
			$('body').off('click','.defenderSelect .character', game.getDefender);
			$('body').off('click', '.remainingOpponents .character', game.getNewEnemy)			
			$('body').off('click', 'button', game.attack);
			//and resets the game with a 4 second delay
			setTimeout(game.startState, 4000);
		}
	},//end of checkwin method

	//method that checks loss state conditions
	checkLoss: function () {
		//conditional checking if hero has lost all HP
		if (game[game.hero].HP<=0) {
			//if true, instructions are written to the screen
			game.writeInstructions('You\'ve lost, but time is a circle.  Your time will come again!');
			//disables all click events
			$('body').off('click', '.character', game.getHero);
			$('body').off('click','.defenderSelect .character', game.getDefender);
			$('body').off('click', '.remainingOpponents .character', game.getNewEnemy)			
			$('body').off('click', 'button', game.attack);
			//and resets the game with a 4 second delay 
			setTimeout(game.startState, 4000);
		}
	}//end of checkLoss method

}//end of game object

		//on page load, headers are hidden, HP values are written to screen,
		//and start state instructions are written to #textArea
		game.writeSpansHP();
		game.hideHeaders();
		game.writeInstructions('Choose a bug to begin');

		//click event handlers for various elements
		$('body').on('click', '.character', game.getHero);

		$('body').on('click','.defenderSelect .character', game.getDefender);

		$('body').on('click', '.remainingOpponents .character', game.getNewEnemy)
		
});//end of document.ready function 


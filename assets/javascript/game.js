$(document).ready(function () {
//game object
 var game = {
	//character objects lines 6-30
	//array of pristine character objects
	charSet: [{
		name: "character1",
		HP: 90,
		AP: 10,
		growAP:10,
		counterAP: 16
	}, {
		name: "character2",
		HP: 135,
		AP: 6,
		growAP:6,
		counterAP: 10
	}, {
		name: "character3",
		HP: 115,
		AP: 8,
		growAP:8,
		counterAP: 12
	}, {
		name: "character4",
		HP: 150,
		AP: 4,
		growAP:4,
		counterAP: 18
	}],

	//initialize variables
	hero: '',
	enemy: '',
	clickCounter: 0,
	winCounter: 0,
	writeWin: 0,
	writeLoss: 0,
	heroHP: '',
	enemyHP: '',
	counterAttack: true,

    //method that plays background music
	playbackgroundMusic: function () {
		var snd1  = new Audio();
		var src1  = document.createElement("source");
		src1.type = "audio/mpeg";
		src1.src  = "assets/audio/background-music.mp3";
		snd1.appendChild(src1);
		snd1.play();
	},//end of playBackgroundMusic method

	//method that plays punch sound effect
	playPunchSound: function () {
		var snd2  = new Audio();
		var src2  = document.createElement("source");
		src2.type = "audio/mpeg";
		src2.src  = "assets/audio/Punch.mp3";
		snd2.appendChild(src2);
		snd2.play();
	},//end of playPunchSound method

	//method that plays insect sound effect
	playInsectSound: function () {
		var snd3  = new Audio();
		var src3  = document.createElement("source");
		src3.type = "audio/mpeg";
		src3.src  = "assets/audio/Insect-Sound.mp3";
		snd3.appendChild(src3);
		snd3.play();
	},//end of playInsectSound method

	//method that plays win sound effect
	playWinSound: function () {
		var snd4  = new Audio();
		var src4  = document.createElement("source");
		src4.type = "audio/mpeg";
		src4.src  = "assets/audio/win-music.mp3";
		snd4.appendChild(src4);
		snd4.play();
	},//end of playWinSound method

	//method that plays loss sound effect
	playLossSound: function () {
		var snd5  = new Audio();
		var src5  = document.createElement("source");
		src5.type = "audio/mpeg";
		src5.src  = "assets/audio/loss-music.mp3";
		snd5.appendChild(src5);
		snd5.play();
	},//end of playLossSound method

	//method that reloads the page when game is over
	startState: function () {
		//Restarts the background music
		document.getElementById('background').play();
		//creates "disposable" character objects that we can modify
		//the values of and then rewrite them when startState is called
		character1 = JSON.parse(JSON.stringify(game.charSet[0]));
		character2 = JSON.parse(JSON.stringify(game.charSet[1]));
		character3 = JSON.parse(JSON.stringify(game.charSet[2]));
		character4 = JSON.parse(JSON.stringify(game.charSet[3]));
		jsonArr = [character1, character2, character3, character4];	
		//loops through character elements and resets their 
		//start position, their display and opacity values, 
		//and removes classes added during the game
		for (var i=1; i<=4; i++) {
			$('#character'+ i).appendTo('.playerSelect').css({
					'display': 'inline-block',
					'opacity': '1'
				 }).removeClass('hero foe defender rotate animateL animateR')
				   .children()
				   .removeClass('rotate');
		}
		//removes class that was added to control click event
		$('.playerSelect').removeClass('defenderSelect');
		//resets the game space and variables 
		game.hideHeaders();
		game.writeInstructions('Choose a bug to begin');
		game.writeSpansHP();
		game.hero = '';
		game.enemy = '';
		game.clickCounter = 0;
		game.winCounter = 0;
		//enables click events
		$('body').on('click', '.character', game.getHero);
		$('body').on('click','.defenderSelect .character', game.getDefender);
		$('body').on('click', '.remainingOpponents .character', game.getNewEnemy)			
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
		setTimeout(function () {$('.textArea').html('<h1 id="title">BUGZ</h1><p id="subtitle">Welcome to BUGZ: Fight or Die!</p><p id="instructions">' + inputText + '</p>Number of wins: ' + game.writeWin + '<p></p><p>Number of losses: ' + game.writeLoss + '</p>'), 50});
	},//end of writeInstructions method

	//writes the HP data of the character objects to the screen
	writeSpansHP: function () {
		$('.character').each(function (i) {
		 	 var id = $(this).attr('id');
		 	$(this).find('span').text(game.charSet[i].HP);
		});
	},//end of writeSpansHP method

	selectCharacter: function (type, element) {
		//when "element" is 'this' from a click event, it saves 
		//the ID value of the clicked element for 
		//use associating clicked element with 
		//corresponding object
		var id = $(element).attr('id');
		//loops through array of copies of character objects
		//to select which is the hero or the enemy depending on "type"
		for (var i=0; i<jsonArr.length; i++){
			if (jsonArr[i].name===id) {
				game[type] = jsonArr[i];
			}
		}
	},//end selectCharacter method

	//method that selects which character you fight as
	getHero: function() {
		//conditional to ensure hero is only chosen once.
		if (game.clickCounter===0) {
			//plays insect sound effect 
			game.playInsectSound();
			//writes instructions to #textArea
			game.writeInstructions('Choose the bug you want to destroy!');
			//runs selectCharacter to connect clicked element with corresponding object
			game.selectCharacter("hero", this);
			//targets siblings of clicked element and rotates them to enemy
			//mode
			$(this).siblings().addClass('rotate');
			//re-rotates the h4 elements so text won't be backwards
			$('.rotate h4').addClass('rotate');
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
			//plays insect sound effect 
			game.playInsectSound();
			//enables click event for the attack button
			$('body').on('click', 'button', game.attack);
			//writes instructions to the #textArea
			game.writeInstructions("Don't stop attacking until you've won!");
			//shows the header for .enemyArea and .remainingOpponents
			$('.enemyArea h3').show();
			$('.remainingOpponents h3').show();
			//runs selectCharacter to connect clicked element with corresponding object
			game.selectCharacter("enemy", this);			
			//takes remaining character elements not selected 
			//and appends them to .remainingOpponents
			$(this).siblings()
				   .detach()
				   .appendTo('.remainingOpponents');
			//adds .foe to defender and moves them to .enemyArea
			$(this).addClass('foe').appendTo('.enemyArea');
			//increments clickCounter to ensure only one enemy is chosen
			game.clickCounter++;
		}
	}, //end of getDefender method

	calculateEnemyHP: function () {
		enemyHP = game.enemy.HP -= game.hero.AP;
		game.hero.AP += game.hero.growAP;
		if (game.enemy.HP<=0 && game.hero.HP > 0) {
			game.counterAttack = false;
		}

	},

	calculateHeroHP: function () {
		if (game.counterAttack) {
		heroHP = game.hero.HP -= game.enemy.counterAP;
		}
	},

	//method that runs most of the game, and calculates damage
	attack: function () {
		//generates a random number to access a random message each time attack() is run
		//and writes it to the screen
		var random = Math.floor(Math.random()*8);
		var message = ['Get him!', 'Don\'t stop!','You\'ve got him on the ropes!', 'He\'s no match for you!', 'You\'ve done this before...', 'I wouldn\'t mess with you!', 'You\'re one tough son of a BUG!', 'Service guarantees citizenship.  Would you like to know more?'];
		game.writeInstructions(message[random]);
		//playes punch sound effect
		game.playPunchSound();
		//runs animation, 
		game.animate();
		//variables to store values of hero and foe HP after attack
		game.calculateEnemyHP();
		game.calculateHeroHP();
		//writes the calculated HP value to the screen
		game.writeHP(heroHP, enemyHP);
		//increments the AP of the hero by the original AP value
		console.log('counterAttack',game.counterAttack);	
		//removes the enemy from the screen, and checks win/loss conditions
		game.removeEnemy();
		game.checkLoss();
		game.checkWin();
	}, //end of attack method

	//produces the fight animation
	animate: function () {
		//removing the CSS animation classes and adding them back
		//to ensure that animation runs every time the attack button is
		//clicked.  SetTimeout function to ensure that enough time 
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
		var enemyHP = $("#" + game.enemy.name + " .hp");
		var heroHP = $("#" + game.hero.name + " .hp");
		//takes arguments and writes them to the correct elements
		heroHP.text(input1);
		enemyHP.text(input2);
	},// end of writeHP method

	//method that removes enemy from the screen and increments winCounter
	removeEnemy: function () {
		//variable that takes current enemy's name value and 
		//converts it to jquery ID selector for later use
		var localEnemy = $('#'+ game.enemy.name);
		//conditional that checks the HP value of current enemy
		if (game.enemy.HP<=0) {
			//if enemy has been defeated, instructions are written to #textArea
			game.writeInstructions('Choose another victim!');
			//the element of the defeated enemy is removed after a short delay
			//to ensure that user has time to process the victory, and that element
			//isn't taking up space in the DOM once new enemy is selected
			setTimeout(function () {
				localEnemy.css({
					'display': 'none'
				});
			},500);
			localEnemy.fadeTo("slow", 0, function () {});
			//sets the current enemy to an empty string to stop code from executing on it
			game.enemy = '';
			//resets counterAttack variable 
			game.counterAttack = true;
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
			game.playInsectSound();
			//detaches the clicked enemy and moves them to .enemyArea
			$(this).addClass('foe').detach().appendTo('.enemyArea');
			//runs selectCharacter to connect clicked element with corresponding object
			game.selectCharacter("enemy", this);
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
			//plays win music
			document.getElementById('background').pause();
			game.playWinSound();
			//disables all click events
			$('body').off('click', '.character', game.getHero);
			$('body').off('click','.defenderSelect .character', game.getDefender);
			$('body').off('click', '.remainingOpponents .character', game.getNewEnemy);	
			$('body').off('click', 'button', game.attack);
			//increments the number of wins for display
			game.writeWin++
			//and resets the game with a 3.5 second delay
			setTimeout(game.startState, 3500);
		}
	},//end of checkwin method

	//method that checks loss state conditions
	checkLoss: function () {
		//conditional checking if hero has lost all HP
		if (game.hero.HP<=0) {	
			//if true, instructions are written to the screen
			$('.hero').fadeTo("slow", 0, function () {});
			game.writeInstructions('You\'ve lost, but time is a circle.  Your time will come again!');
			//plays loss music
			document.getElementById('background').pause();
			game.playLossSound();
			//disables all click events
			$('body').off('click', '.character', game.getHero);
			$('body').off('click','.defenderSelect .character', game.getDefender);
			$('body').off('click', '.remainingOpponents .character', game.getNewEnemy);	
			$('body').off('click', 'button', game.attack);
			//increments the number of losses for display
			game.writeLoss++
			//and resets the game with a 4 second delay 
			setTimeout(game.startState, 4000);
		}
	}//end of checkLoss method

}//end of game object
		//starts the background music, and initializes the game
		// game.playbackgroundMusic();
		document.getElementById('background').play();
		game.startState()	
});//end of document.ready function 


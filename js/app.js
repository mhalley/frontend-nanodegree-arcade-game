//Create random numbers for rates in the game
function randomized (max, min) {
    //generate a random number
    return Math.floor((Math.random()* (max - min)) + min);
    //code credit: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //this.orientation = this.getOrientation();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set position horizontally
    this.x = randomized(505, 1);
    //set row
    this.row = [61, 144, 225, 315];
    //this.y = randomized(this.row[0], this.row[2]);
    this.y = this.row[Math.floor(Math.random()* this.row.length)]
    //code credit: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    //set speed for Enemy
    this.speed = randomized(115, 50);
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //update the enemy based on time difference
    this.x += this.speed * dt;
    //reset enemy to left side of screen
    if(this.x > 505) {
        this.x = -100;
    }
}; //code credit: https://discussions.udacity.com/t/how-to-get-enemies-to-start-off-canvas/31684/3

Enemy.prototype.enemyReset = function(){
    for (var i=0; i < allEnemies.length; i++)
        allEnemies[i].x = -200;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player () {
    //set initial player position
    this.x = 200;
    this.y = 425;
    //allow player to move
    this.right = 77;
    this.left = -15;
    this.bottom = 55;
    this.top = -25;
    //set player sprite
    this.sprite = 'images/char-boy.png';

}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            if (player.y <= -22) {
                player.y = -27;
            } else {
                player.y -= 75;
            }
            break;
        case 'down':
            if (player.y >= 388) {
                player.y = 388;
            } else {
                player.y += 75
            }
            break;
        case 'left':
            if (player.x <= 0) {
                player.x = 0;
            } else {
                player.x -= 101;
            }
            break;
        case 'right':
            if (player.x >= 400) {
                player.x = 404;
            } else {
                player.x += 101;
            }
            break;
    }
};//credit: https://discussions.udacity.com/t/player-handleinput-and-update-methods/4666/2

/////////////////////////////
//render player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.collide = function(){
    for (var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 60 && this.x + 60 > allEnemies[i].x && this.y < allEnemies[i].y + 70 && this.y + 70 > allEnemies[i].y) {
            console.log("Oops! Start again.");
            resetPlayer();
            scoreBoard.removePoint();
            break;
        }
    }
    for (var i=0; i < allGems.length; i++) {
        if (this.x < allGems[i].x + 60 && this.x + 60 > allGems[i].x && this.y < allGems[i].y + 70 && this.y + 70 > allGems[i].y) {
            console.log("You get a point!");
            scoreBoard.addPoint();
            allGems[i].x = -200;
            break;
        }
    }
}//code credit: https://discussions.udacity.com/t/player-bug-collision-problem/15068/9

Player.prototype.win = function() {
    for (var i=0; i < allEnemies.length; i++) {
        if (this.y <= -10) {
            if (confirm("Hooray! You made it across with " + scoreBoard.currentScore + " points! Would you like to play again?")){
            //code credit: http://stackoverflow.com/questions/9334636/javascript-yes-no-alert
                    resetPlayer();
                    allEnemies[i].enemyReset();
                } else {
                    alert("O.K. Thanks for playing!");
                    resetPlayer();
                }
            break;
        }
    }
}


//Check player's location relative to enemies
Player.prototype.update = function(dt) {
    //check for collisions
    player.collide();
    player.win();
 };

/////////////////////////////////
//Place Gems
// Gems our player can gather for points
var Gem = function() {
    // The image/sprite for our gems, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/gem-orange.png';
    //set position horizontally
    this.x = randomized(505, 1);
    //set row
    this.row = [100, 182, 268, 350];
    //this.y = randomized(this.row[0], this.row[2]);
    this.y = this.row[Math.floor(Math.random()* this.row.length)]
    //code credit: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    //set speed for Enemy
    this.speed = randomized(30, 20);
};


// Update the gems's position, required method for game
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //update the gem based on time difference
    this.x += this.speed * dt;
    //reset gem to left side of screen
    if(this.x > 505) {
        this.x = -100;
    }
}; //code credit: https://discussions.udacity.com/t/how-to-get-enemies-to-start-off-canvas/31684/3

//reset Gem after moves off the canvas
Gem.prototype.gemReset = function(){
    for (var i=0; i < allGems.length; i++)
        allGems[i].x = -200;
}

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Create Scoreboard
var ScoreBoard = function (currentScore) {
    this.currentScore = currentScore;
    console.log('ScoreBoard created');
    //$("#score").text("Score: " + currentScore);
    //document.getElementById('score').innerHTML = "Score: " + (this.currentScore = currentScore);
};//source: http://stackoverflow.com/questions/28822849/score-board-object-in-javascript

//Add points to score
ScoreBoard.prototype.addPoint = function() {
    //console.log(this.currentScore = this.currentScore + 1);
    document.getElementById('score').innerHTML = this.currentScore = this.currentScore + 1;
};//source: http://stackoverflow.com/questions/28822849/score-board-object-in-javascript

//Remove points if points have been gained
ScoreBoard.prototype.removePoint = function() {
    if (this.currentScore > 0) {
        //console.log(this.currentScore = this.currentScore - 1);
        document.getElementById('score').innerHTML = this.currentScore = this.currentScore - 1;
    } else {this.currentScore = 0}
};//source: http://stackoverflow.com/questions/28822849/score-board-object-in-javascript


// Now instantiate your objects.
//Create enemies
var allEnemies = [
    new Enemy,
    new Enemy,
    new Enemy,
    new Enemy
];

//Create gems
var allGems = [
    new Gem,
    new Gem,
    new Gem,
    new Gem
];

//create player
var player = new Player();

//Upon collision, send player back to starting position
var resetPlayer = function() {
    //place player at middle of bottom row.
    player.x = 200;
    player.y = 425;
};

//Create Score Board and points
var scoreBoard = new ScoreBoard(0);
var addFunction = scoreBoard.addPoint;
var removeFunction = scoreBoard.removePoint;


// Listen for key presses and send the keys to the
// Player.handleInput() method. Don't modify!
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

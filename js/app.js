//Create random numbers for rates in the game
function randomized (max, min) {
    //generate a random number
    return Math.floor((Math.random()* (max - min)) + min);
    //randomizing code from http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
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
    this.row = [61, 144, 225];
    //this.y = randomized(this.row[0], this.row[2]);
    this.y = this.row[Math.floor(Math.random()* this.row.length)]
    //randomizing code from http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
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
    //code from https://discussions.udacity.com/t/how-to-get-enemies-to-start-off-canvas/31684/3
    //reset enemy to left side of screen
    if(this.x > 505) {
        this.x = -100;
    }
};

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
};

//render player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.collide = function(){
    for (var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
            console.log("Oops!");
            resetPlayer();
            break;
        }
    }
}

Player.prototype.win = function() {
    for (var i=0; i < allEnemies.length; i++) {
        if (this.y <= -10) {
            prompt("Hooray! You made it across! Would you like to play again?");
                if (userAnswer === "yes"){
                    resetPlayer();
                    allEnemies[i].enemyReset();
                } else {
                    alert("O.K. Thanks for playing!");
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy,
    new Enemy,
    new Enemy
];

//create player
var player = new Player();

var resetPlayer = function() {
    player.x = (ctx.canvas.width / 2) - (101/2);
    player.y = 425;
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

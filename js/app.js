// Record the player score
var score = 0;

// Enemies the frog must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Enemy position coordinates and enemy speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 70) + 40);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 550){
      this.x += this.speed * dt;
    }
    else{
      this.x = -2;
    }

    //If the player comes within 50px of an enemy, reset the game and decrease player score unless the score is already 0
    if(player.x >= this.x - 65 && player.x <= this.x + 65){
      if(player.y >= this.y - 65 && player.y <= this.y + 65){
        player.x = 200;
        player.y = 320;
        if (score > 0) {
          score--;
          }
            document.getElementById('score').innerHTML = 'Score: '+score;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Starting player position and character
var Player = function(){
    this.sprite = 'images/frog.png';
    this.x = 200;
    this.y = 320;
};

//Render function for the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Update function to handle player movements
Player.prototype.update = function(){
    //Move left unless out of bounds
    if(this.ctlKey === 'left' && this.x > 50){
        this.x = this.x - 85;
    //Move right unless out of bounds
    }else if(this.ctlKey === 'right' && this.x < 350){
        this.x = this.x + 85;
    //Move up
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 85;
    //Move down unless out of bounds
    }else if (this.ctlKey === 'down' && this.y < 400){
        this.y = this.y + 85;
    }
    this.ctlKey = null;

    //If the player reaches the water, reset player position and increase the score by 1
    if(this.y < 25){
        player.x = 200;
        player.y = 320;
        score++;
        document.getElementById('score').innerHTML = 'Score: '+score;
    }
};

//Input handler for player movement
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var enemy1 = new Enemy(0, 150);
allEnemies.push(enemy1);

var enemy2 = new Enemy(0, 70);
allEnemies.push(enemy2);

var enemy3 = new Enemy(0, 220);
allEnemies.push(enemy3);

var enemy4 = new Enemy(-200, 70);
allEnemies.push(enemy4);

var enemy5 = new Enemy(-300, 150);
allEnemies.push(enemy5);

var player = new Player();


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

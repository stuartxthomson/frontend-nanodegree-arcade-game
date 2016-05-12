var difficulty = 3;
var STARTX = 202.5;
var STARTY = 400;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function(xloc, yloc, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xloc;
    this.y = yloc;
    this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = 0; // go back to the start after hitting the end of the canvas
    }
    player.checkCollision(this);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(xloc, yloc, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = xloc;
    this.y = yloc;
    this.speed = speed;
};
Player.prototype.update = function() {};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    // Define the movement for each input key
    if (key == 'left') {
        this.x -= TILE_WIDTH;
    }
    if (key == 'up') {
        this.y -= TILE_HEIGHT;
    }
    if (key == 'right') {
        this.x += TILE_WIDTH;
    }
    if (key == 'down') {
        this.y += TILE_HEIGHT;
    }
    console.log('user input is ' + key);
    console.log(this.y, this.x, this.speed);
};
Player.prototype.checkCollision = function(enemy) {
    // check for collisions between enemy and player
    // got help on this from https://github.com/alexsales/frontend-nanodegree-arcade-game/blob/master/js/app.js

    if (this.y + 131 >= enemy.y + 90 && this.x + 25 <= enemy.x + 88 &&
        this.y + 73 <= enemy.y + 135 && this.x + 76 >= enemy.x + 11) {
        console.log('Collision!');
        this.reset();
    }
    // did the player make it?
    if (this.y + 63 <= 0) {
        this.reset();
        console.log('Boom!');
    }
    // keep the player on the canvas
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 425) {
        this.x = 425;
    }
    if (this.y >= 430) {
        this.y = 430;
    }
};
Player.prototype.reset = function() {
  //send the player back to the start
  this.x = STARTX;
  this.y = STARTY;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(STARTX, STARTY, 50);
var makeEnemies = function(anEnemy) {
    for (var i = 0; i < difficulty; i++) {
        var enemy = new Enemy(0, Math.random() * 200 + 50, Math.random() *
            200);
        allEnemies.push(enemy);
    }
};
makeEnemies();
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

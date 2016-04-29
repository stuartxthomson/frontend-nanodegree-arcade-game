// got help on the checkCollisions() function from https://github.com/alexsales/frontend-nanodegree-arcade-game/blob/master/js/app.js
var difficulty = 3;
var startx = 202.5;
var starty = 400;
// Enemies our player must avoid
var Enemy = function(xloc, yloc, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = xloc;
    this.y = yloc;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = 0; // go back to the start after hitting the end of the canvas
    }
    checkCollision(this);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(xloc, yloc, speed) {
    this.x = xloc;
    this.y = yloc;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function() {}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key) {
    // Define the movement for each input key
    if (key == 'left') {
        player.x -= player.speed;
    }
    if (key == 'up') {
        player.y -= player.speed;
    }
    if (key == 'right') {
        player.x += player.speed;
    }
    if (key == 'down') {
        player.y += player.speed;
    }
    console.log('user input is ' + key);
    console.log(player.y, player.x, player.speed);
}
var checkCollision = function(enemy) {
    // check for collisions between enemy and player
    if (player.y + 131 >= enemy.y + 90 && player.x + 25 <= enemy.x + 88 &&
        player.y + 73 <= enemy.y + 135 && player.x + 76 >= enemy.x + 11) {
        console.log('Collision!');
        player.x = startx;
        player.y = starty;
    }
    // did the player make it?
    if (player.y + 63 <= 0) {
        player.x = startx;
        player.y = starty;
        console.log('Boom!');
    }
    // keep the player on the canvas
    if (player.x <= 0) {
        player.x = 0;
    };
    if (player.x >= 425) {
        player.x = 425;
    };
    if (player.y >= 430) {
        player.y = 430;
    };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(startx, starty, 50);
var makeEnemies = function(anEnemy) {
    for (var i = 0; i < difficulty; i++) {
        var enemy = new Enemy(0, Math.random() * 200 + 50, Math.random() *
            200);
        allEnemies.push(enemy);
    }
}
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

// Setup the main game object
var game = new Phaser.Game(1024, 896, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// Setup game globals
var player;
var cursors;

function preload(){
	game.load.spritesheet('dude', 'assets/test-dude.png', 12, 12);
}

function create(){
	// Start arcade physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Initialize the player
	player = game.add.sprite(32, game.world.height - 150, 'dude');

	// Enable player physics
	game.physics.arcade.enable(player);

	// Physics properties
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	// Add animations
	player.animations.add('left', [0,], 10, true);
	player.animations.add('right', [0,], 10, true);

	// Initialize cursors
	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	player.body.velocity.x = 0;
 
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
 
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
 
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
 
        // player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

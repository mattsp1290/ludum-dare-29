// Setup the main game object
var game = new Phaser.Game(896, 504, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// old resolution 640 x 360
// 896 - 512 = 384
// 384 / 2 = 192
// sides are 192 x 448
// 504 -  448 = 56
// 56 / 2 = 28
// top / bottom are 896 x 28
// Setup game globals

// SNES Resolutiopn 2X is 512 x 448
var player;
var cursors;
var map;
var layer;

function preload(){
	game.load.spritesheet('dude', 'assets/test-dude.png', 12, 12);
	game.load.tilemap('test-map', 'assets/test-tiles.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('test-tiles', 'assets/test-tiles.png');
}

function create(){

	// Set the bounds inside the box
	game.world.setBounds(192, 28, 704, 476);


	// Start arcade physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Setup the map
	map = game.add.tilemap('test-map');
	map.addTilesetImage('Test', 'test-tiles');

	layer = map.createLayer('Tile Layer 1');
	layer.resizeWorld();

	// Initialize the player
	player = game.add.sprite(32, game.world.height - 150, 'dude');
	player.scale.setTo(2,2);

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

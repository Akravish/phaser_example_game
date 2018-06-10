export function create(game, platforms, player) {
  console.log('create() start');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, 0, 'sky');

  platforms = game.add.group();
  platforms.enableBody = true;

  let ground = platforms.create(0, game.world.height - 64, 'ground');
  //---Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 2);
  //---This stops it from falling away when you jump on it
  ground.body.immovable = true;

  createLedge(platforms, 400, 400, true);
  createLedge(platforms, -150, 250, true);

  createPlayer(game,player)
}

function createLedge(parent ,posX, posY, isImmovable) {
  let ledge = parent.create(posX, posY, 'ground');
  ledge.body.immovable = isImmovable;
}

function createPlayer(game, player) {
  //---PLAYER
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);
}
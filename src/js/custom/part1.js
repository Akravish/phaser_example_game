//---init game
let game = new Phaser.Game(800, 600, Phaser.AUTO, '');

//---GLOBAL VARS
let platforms,
    player,
    cursors,
    star,
    stars,
    scoreText,
    starCountLeftText;

let score = 0;
let starCountLeft = 0;
//---END GLOBAL VARS


let initState = {





  preload: ()=> {
    game.load.image('sky', 'src/img/sky.png');
    game.load.image('ground', 'src/img/platform.png');
    game.load.image('star', 'src/img/star.png');
    game.load.spritesheet('dude', 'src/img/dude.png', 32, 48);
  },
  create: ()=> {
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

    let ledge;
    ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    //---PLAYER
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.4;
    player.body.gravity.y = 200;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    cursors = game.input.keyboard.createCursorKeys();


    //--STARS
    stars = game.add.group();
    stars.enableBody = true;

    //---create 12 stars
    for (let i = 0; i < 12; i++)
    {
      //---create star
      let star = stars.create(i * 70, 0, 'star');

      //  Let gravity do its thing
      star.body.gravity.y = 500;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    starCountLeft = stars.length;

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '18px', fill: '#000' });
    starCountLeftText = game.add.text(16, 32, 'stars left: 0', { fontSize: '18px', fill: '#000' });
    starCountLeftText.text = 'stars left: ' + starCountLeft;
  },
  update: ()=> {
    // console.log('update() start');
    let hitPlatform = game.physics.arcade.collide(player, platforms);

    if (cursors.left.isDown)
    {
      player.body.velocity.x = -150;
      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      player.body.velocity.x = 150;
      player.animations.play('right');
    }
    else
    {
      player.body.velocity.x = 0;
      player.animations.stop();
      player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
      player.body.velocity.y = -350;
    }


    //-star
    game.physics.arcade.collide(stars, platforms);
    console.log('++=');
    game.physics.arcade.overlap(player, stars, _collectStar, null, this);
  },


};

function _collectStar(player, star) {
  console.log('%%%')
  // Removes the star from the screen
  star.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
  starCountLeft--;
  starCountLeftText.text = 'stars left: ' + starCountLeft;

  console.log('star size', stars.length);
  console.log('star size', star);
  if( starCountLeft <=11 ){
    _gameFinished();
  }
}


function _gameFinished() {
  // Removes the star from the screen
  console.log('game finished');
  game.state.start('finish');
}

let finishState = {


  create: ()=> {
    let finishText = game.add.text(80, 80, 'ny pzdc', {fontSize: '18px', fill: '#fff'});

    let startPoint = game.add.text(80, 180, 'press "W" to re-start', {fontSize: '18px', fill: '#fff'});

    let restartKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    restartKey.onDown.addOnce(start, this);
  }
};

function start() {
  game.state.start('init')
}

//---INIT STATE
game.state.add('init',initState);
game.state.add('finish',finishState);
//---END INIT STATE

game.state.start('init');





























































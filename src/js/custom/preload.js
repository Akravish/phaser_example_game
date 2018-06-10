export function preload(game) {
  console.log('preload() start');

  game.load.image('sky', 'src/img/sky.png');
  game.load.image('ground', 'src/img/platform.png');
  game.load.image('star', 'src/img/star.png');
  game.load.spritesheet('dude', 'src/img/dude.png', 32, 48);

}
// game.js
const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

// Create a diving suit sprite
const divingSuit = PIXI.Sprite.from('https://images.squarespace-cdn.com/content/v1/5420d068e4b09194f76b2af6/1524711893176-QGREAM6GIP3ZY9FSZVOZ/diving.wetsuit.png');
divingSuit.anchor.set(0.5);
divingSuit.x = app.screen.width / 2;
divingSuit.y = app.screen.height / 2;
app.stage.addChild(divingSuit);

// Create a crab sprite
const crab = PIXI.Sprite.from("https://pngimg.com/uploads/crab/crab_PNG15.png");
crab.anchor.set(0.5);
crab.x = app.screen.width / 2;
crab.y = app.screen.height / 2 - 100;
app.stage.addChild(crab);

// Add a simple movement for the diving suit
function animate() {
  divingSuit.x += 1;
  requestAnimationFrame(animate);
}
animate();
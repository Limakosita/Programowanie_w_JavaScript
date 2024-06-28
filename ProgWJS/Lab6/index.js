let ball = document.querySelector('.ball');
let hole = document.querySelector('.hole');
let ballRadius = 15; // radius of the ball
let holeRadius = 20; // radius of the hole

// Initial positions
let ballPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let holePosition = {
  x: Math.random() * (window.innerWidth - 2 * holeRadius),
  y: Math.random() * (window.innerHeight - 2 * holeRadius),
};

ball.style.left = `${ballPosition.x - ballRadius}px`;
ball.style.top = `${ballPosition.y - ballRadius}px`;
hole.style.left = `${holePosition.x}px`;
hole.style.top = `${holePosition.y}px`;

let alpha = 0, beta = 0, gamma = 0;
let speed = 0.5;

window.addEventListener('deviceorientation', (event) => {
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;
});

function animate() {
  ballPosition.x += gamma * speed;
  ballPosition.y += beta * speed;

  // Boundary conditions
  ballPosition.x = Math.max(ballRadius, Math.min(window.innerWidth - ballRadius, ballPosition.x));
  ballPosition.y = Math.max(ballRadius, Math.min(window.innerHeight - ballRadius, ballPosition.y));

  ball.style.left = `${ballPosition.x - ballRadius}px`;
  ball.style.top = `${ballPosition.y - ballRadius}px`;

  // Check if ball is in the hole
  let dx = ballPosition.x - (holePosition.x + holeRadius);
  let dy = ballPosition.y - (holePosition.y + holeRadius);
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < holeRadius) {
    alert('Ball in the hole!');
    resetGame();
  }

  requestAnimationFrame(animate);
}

function resetGame() {
  ballPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  holePosition = {
    x: Math.random() * (window.innerWidth - 2 * holeRadius),
    y: Math.random() * (window.innerHeight - 2 * holeRadius),
  };

  ball.style.left = `${ballPosition.x - ballRadius}px`;
  ball.style.top = `${ballPosition.y - ballRadius}px`;
  hole.style.left = `${holePosition.x}px`;
  hole.style.top = `${holePosition.y}px`;
}

requestAnimationFrame(animate);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

let mouse = {
  x: null,
  y: null,
  radius: 250
};

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("MOJA", 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      this.size = 3;
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

function init() {
  particlesArray = [];
  // for (let i = 0; i < 2000; i++) {
  //   let x = Math.random() * canvas.width;
  //   let y = Math.random() * canvas.height;
  //   particlesArray.push(new Particles(x, y));
  // }

  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let positionX = x;
        let positionY = y;
        particlesArray.push(new Particles(positionX * 10, positionY * 10));
      }
    }
  }
}

init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw();
    particlesArray[i].update();
  }
  requestAnimationFrame(animate);
}

animate();
// function drawImage() {
//   let imageWidth = png.width;
//   let imageHeight = png.height;
//   const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   class Particle {
//     constructor(x, y, color, size) {
//       this.x = x + canvas.width / 2 - png.width * 2;
//       this.y = y + canvas.height / 2 - png.height * 2;
//       this.color = color;
//       this.size = 2;
//       this.baseX = x + canvas.width / 2 - png.width * 2;
//       this.baseY = y + canvas.height / 2 - png.height * 2;
//       this.density = Math.random() * 10 + 3;
//     }

//     draw() {
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.closePath();
//       ctx.fill();
//     }

//     update() {
//       ctx.fillStyle = this.color;

//       let dx = mouse.x - this.x;
//       let dy = mouse.y - this.y;
//       let distance = Math.sqrt(dx * dx + dy * dy);
//       let forceDirectionX = dx / distance;
//       let forceDirectionY = dy / distance;

//       const maxDistance = 50;
//       let force = (maxDistance - distance) / maxDistance;
//       if (force < 0) force = 0;

//       let directionX = forceDirectionX * force * this.density * 0.6;
//       let directionY = forceDirectionY * force * this.density * 0.6;

//       if (distance < mouse.radius + this.size) {
//         this.x -= directionX;
//         this.y -= directionY;
//       } else {
//         if (this.x !== this.baseX) {
//           let dx = this.x - this.baseX;
//           this.x -= dx / 20;
//         }
//         if (this.y !== this.baseY) {
//           let dy = this.y - this.baseY;
//           this.y -= dy / 20;
//         }
//       }
//       this.draw();
//     }
//   }
//   function init() {
//     particlesArray = [];
//     for (let y = 0, y2 = data.height; y < y2; y++) {
//       for (let x = 0, x2 = data.width; x < x2; x++) {
//         if (data.data[y * 4 * data.width + x * 4 + 3] > 120) {
//           let positionX = x;
//           let positionY = y;
//           let color =
//             "rgb(" +
//             data.data[y * 4 * data.width + x * 4] +
//             "," +
//             data.data[y * 4 * data.width + x * 4 + 1] +
//             "," +
//             data.data[y * 4 * data.width + x * 4 + 2] +
//             ")";
//           particlesArray.push(
//             new Particle(positionX * 4, positionY * 4, color)
//           );
//         }
//       }
//     }
//   }

//   function animate() {
//     requestAnimationFrame(animate);

//     ctx.fillStyle = "rgba(0,0,0,.05)";
//     ctx.fillRect(0, 0, innerWidth, innerHeight);
//     for (let i = 0; i < particlesArray.length; i++) {
//       particlesArray[i].update();
//     }
//   }
//   init();
//   animate();
// }

// window.addEventListener("resize", function() {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
//   init();
// });

// const png = new Image();
// png.src =
//   "data:image/png;base64,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";

// window.addEventListener("load", () => {
//   ctx.drawImage(png, 0, 0);
//   drawImage();
// });

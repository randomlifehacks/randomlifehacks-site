// ===============================
// Canvas setup
// ===============================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Drawing state
let username = "";
let x = canvas.width / 2;
let y = canvas.height / 2;
const step = 5;

// Initial pen style
ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.strokeStyle = "#000";
ctx.beginPath();
ctx.moveTo(x, y);

// ===============================
// Start drawing (name prompt)
// ===============================
function start() {
  const input = document.getElementById("username").value.trim();
  if (!input) {
    alert("Please enter your name");
    return;
  }

  username = input;
  document.getElementById("nameBox").style.display = "none";
  document.getElementById("etchBox").style.display = "block";
}

// ===============================
// Keyboard drawing (Etch-A-Sketch)
// ===============================
document.addEventListener("keydown", (e) => {
  if (!username) return; // don't draw until started

  let moved = true;

  switch (e.key) {
    case "ArrowUp":
      y -= step;
      break;
    case "ArrowDown":
      y += step;
      break;
    case "ArrowLeft":
      x -= step;
      break;
    case "ArrowRight":
      x += step;
      break;
    default:
      moved = false;
  }

  if (!moved) return;

  // Keep drawing inside canvas
  x = Math.max(0, Math.min(canvas.width, x));
  y = Math.max(0, Math.min(canvas.height, y));

  ctx.lineTo(x, y);
  ctx.stroke();
});

// ===============================
// Submit drawing to Cloudflare Worker
// ===============================
function submitDrawing() {
  if (!username) {
    alert("Please start drawing first");
    return;
  }

  const imageData = canvas.toDataURL("image/png");

   fetch("https://etch-submit.packofsinsny.workers.dev", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: username,
    image: imageData
  })
})
.then(res => {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
})
.then(() => {
  alert("Drawing submitted!");
})
.catch(err => {
  console.error("Submit failed:", err);
  alert("Error submitting");
});

}



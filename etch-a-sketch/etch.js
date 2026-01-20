const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let username = "";
let x = canvas.width / 2;
let y = canvas.height / 2;

ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(x, y);

function start() {
  const input = document.getElementById("username").value.trim();
  if (!input) return alert("Enter your name");
  username = input;
  document.getElementById("nameBox").style.display = "none";
  document.getElementById("etchBox").style.display = "block";
}

document.addEventListener("keydown", e => {
  const step = 5;
  switch (e.key) {
    case "ArrowUp": y -= step; break;
    case "ArrowDown": y += step; break;
    case "ArrowLeft": x -= step; break;
    case "ArrowRight": x += step; break;
    default: return;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
});

function submitDrawing() {
  const data = canvas.toDataURL("image/png");

  fetch("https://YOUR-WORKER-URL/submit", {
    method: "POST",
    body: JSON.stringify({
      username,
      image: data
    })
  })
  .then(() => alert("Submitted!"))
  .catch(() => alert("Error submitting"));
}


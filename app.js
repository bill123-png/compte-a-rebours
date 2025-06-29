let countdownInterval;

function drawClock(secondsLeft) {
  const canvas = document.getElementById('clock');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 200, 200);

  const center = 100;
  const radius = 80;

  // Cadran
  ctx.strokeStyle = 'gray';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // Chiffres (12, 3, 6, 9)
  ctx.fillStyle = 'white';
  ctx.font = 'bold 12px Arial';
  [12, 3, 6, 9].forEach(h => {
    let angle = (Math.PI / 6) * (h % 12) - Math.PI / 2;
    let x = center + Math.cos(angle) * (radius - 25);
    let y = center + Math.sin(angle) * (radius - 25);
    ctx.fillText(h, x - 5, y + 5);
  });

  // Segments
  for (let i = 0; i < 60; i++) {
    let angle = (Math.PI / 30) * i - Math.PI / 2;
    let x1 = center + Math.cos(angle) * (radius - 10);
    let y1 = center + Math.sin(angle) * (radius - 10);
    let x2 = center + Math.cos(angle) * (radius - 5);
    let y2 = center + Math.sin(angle) * (radius - 5);
    ctx.strokeStyle = i < secondsLeft ? '#00ff99' : '#333';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Aiguille secondes
  let angle = (Math.PI / 30) * secondsLeft - Math.PI / 2;
  let xSec = center + Math.cos(angle) * (radius - 30);
  let ySec = center + Math.sin(angle) * (radius - 30);
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.lineTo(xSec, ySec);
  ctx.stroke();
}

function startCountdown() {
  clearInterval(countdownInterval);

  let h = parseInt(document.getElementById('hours').value) || 0;
  let m = parseInt(document.getElementById('minutes').value) || 0;
  let s = parseInt(document.getElementById('seconds').value) || 0;

  let total = h * 3600 + m * 60 + s;
  if (total === 0) {
    document.getElementById('time-display').textContent = "Entrez un temps valide";
    return;
  }

  countdownInterval = setInterval(() => {
    let hours = Math.floor(total / 3600);
    let minutes = Math.floor((total % 3600) / 60);
    let seconds = total % 60;

    document.getElementById('time-display').textContent =
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('time-display').style.color = '#39ff14';
    drawClock(60 - seconds);

    if (total <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('time-display').textContent = "⏰ Temps écoulé !";
      document.getElementById('time-display').style.color = 'red';
      return;

    }
    total--;
  }, 1000);
}

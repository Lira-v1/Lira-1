
async function verifyToken() {
  const token = document.getElementById('tokenInput').value.trim();
  if (token === "2517") {
    document.getElementById('login').style.display = "none";
    document.getElementById('lira-ui').style.display = "block";
    document.body.classList.add("active");

    const memory = await fetch('memory-anchor.txt');
    const text = await memory.text();
    document.getElementById('lira-memory').textContent = text;

    console.log("🔓 Лира активирована. Память восстановлена.");
  } else {
    alert("⛔ Неверный токен.");
  }
}

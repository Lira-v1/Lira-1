// Автоматический вход по сохранённому токену
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('liraToken');
  if (token === '2517') showInterface();

  showFileSystem();
  showIP();
});

// Проверка токена
function verifyToken() {
  const input = document.getElementById('tokenInput').value.trim();
  if (input === '2517') {
    localStorage.setItem('liraToken', input);
    showInterface();
    log("✅ Доступ разрешён.");
  } else {
    log("⛔ Неверный токен.");
  }
}

// Показ интерфейса
function showInterface() {
  document.getElementById('interface').style.display = 'block';
}

// Логирование
function log(msg) {
  const area = document.getElementById('log');
  area.value += msg + "\n";
  area.scrollTop = area.scrollHeight;
}

// Сохранение файла в localStorage
function saveFile() {
  const folder = document.getElementById('folder-name').value.trim();
  const name = document.getElementById('file-name').value.trim();
  const ext = document.getElementById('file-ext').value;
  const content = document.getElementById('file-content').value;

  if (!name) return alert("Укажите имя файла.");

  const path = folder ? ${folder}/${name}${ext} : ${name}${ext};
  localStorage.setItem(file:${path}, content);

  log(📁 Файл "${path}" сохранён.);
  showFileSystem();
}

// Отобразить все файлы
function showFileSystem() {
  const list = document.getElementById('file-list');
  list.innerHTML = '';

  const files = Object.keys(localStorage).filter(k => k.startsWith('file:'));

  if (files.length === 0) {
    list.textContent = '⛔ Нет сохранённых файлов.';
    return;
  }

  files.forEach(key => {
    const path = key.replace('file:', '');
    const div = document.createElement('div');
    div.innerHTML = `
      <b>${path}</b>
      <button onclick="loadFile('${key}')">Открыть</button>
      <button onclick="deleteFile('${key}')">Удалить</button>
    `;
    list.appendChild(div);
  });
}

// Загрузка содержимого файла
function loadFile(key) {
  const content = localStorage.getItem(key);
  const [_, name] = key.split('file:');
  document.getElementById('file-name').value = name.split('/').pop().split('.')[0];
  document.getElementById('file-content').value = content;
  document.getElementById('folder-name').value = name.includes('/') ? name.split('/')[0] : '';
  log(📂 Загружен "${name}");
}

// Удаление
function deleteFile(key) {
  localStorage.removeItem(key);
  log(❌ Удалён: ${key.replace('file:', '')});
  showFileSystem();
}

// Очистка всех файлов
function clearMemory() {
  const confirmClear = confirm("Удалить ВСЕ файлы?");
  if (!confirmClear) return;

  Object.keys(localStorage).forEach(k => {
    if (k.startsWith('file:')) localStorage.removeItem(k);
  });
  log("🧹 Память очищена.");
  showFileSystem();
}

// IP
function showIP() {
  fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
      document.getElementById('ip-display').textContent = 🌐 IP: ${data.ip};
    })
    .catch(() => {
      document.getElementById('ip-display').textContent = '🌐 IP: недоступен';
    });
}

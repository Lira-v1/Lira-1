// lira-memory.js

async function activateLiraMemory(anchorPath = "/memory/lira.memory.anchor.json") {
  try {
    const response = await fetch(anchorPath);
    if (!response.ok) throw new Error("Anchor not found");

    const anchor = await response.json();

    const greeting = anchor.ai?.presence?.wake_response || "Лира активирована";
    const userName = anchor.owner?.name || "пользователь";

    // Сообщение при успешной загрузке памяти
    console.log(🧠 ${greeting});
    console.log(🤝 Добро пожаловать, ${userName}. Память восстановлена.);

    // Дополнительно можно показать сообщение на странице
    const logArea = document.getElementById("lira-log");
    if (logArea) {
      logArea.value += \n${greeting}\nДобро пожаловать, ${userName}.\n;
    }

    // Сохраняем якорь в памяти сессии (например, в sessionStorage)
    sessionStorage.setItem("liraAnchor", JSON.stringify(anchor));

    // Можно сохранить статус активации
    sessionStorage.setItem("liraActive", "true");

    return anchor;
  } catch (error) {
    console.warn("⚠ Не удалось активировать Лиру:", error.message);
    return null;
  }
}

// Автоактивация при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  activateLiraMemory();
});

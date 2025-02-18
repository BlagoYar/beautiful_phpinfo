document.addEventListener("DOMContentLoaded", function() {
function replaceActiveText() {
  const elements = document.querySelectorAll('td.v');

  elements.forEach(element => {
    if (element.textContent.trim() === 'active') {
      const span = document.createElement('span');
      span.classList.add('enabled-text');
      span.textContent = 'active';

      // Заменяем текстовый узел внутри td на span
      element.innerHTML = ''; // Очищаем содержимое td
      element.appendChild(span); // Добавляем span внутрь td
    }
  });
}

// Запускаем функцию после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceActiveText);
} else {
    replaceActiveText(); // DOMContentLoaded уже сработал
}

function replaceFontWithClass() {
    const fontElements = document.querySelectorAll('font[style*="color: #"]');

    fontElements.forEach(element => {
        const style = element.getAttribute('style');
        const colorCode = style.match(/color: (#[\da-fA-F]{3,6})/)[1];
        const colorName = getColorName(colorCode); // Получаем английское название цвета
        const className = `${colorName}-${colorCode.replace('#', '')}`; // Формируем имя класса

        element.classList.add(className);
        element.removeAttribute('style');

        // Создаем CSS правило
        const styleElement = document.createElement('style');
        styleElement.textContent = `.${className} { color: ${colorCode} !important; }`;
        document.head.appendChild(styleElement);
    });
}

function getColorName(hexColor) {
    // Здесь можно добавить более сложную логику для преобразования hex в название цвета.
    // Пока что, для простоты, будем возвращать просто "color"
    return "color"; // В дальнейшем можно улучшить
}

// Запускаем функцию после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceFontWithClass);
} else {
    replaceFontWithClass(); // DOMContentLoaded уже сработал
}
});
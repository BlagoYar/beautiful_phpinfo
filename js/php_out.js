document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("td.e").forEach(function (cell) {
        cell.innerHTML = cell.innerHTML.replace(/_/g, "_<wbr>");
    });
// ---------------------------------
// Замена логотипа
const oldLogo = document.querySelector('img[src*="data:image/png;base64,"]');
if (oldLogo) {
    const newLogo = document.createElement('img');
    newLogo.src = '/imgs/phplogo.svg';
    newLogo.alt = 'PHP Logo';
    newLogo.className = 'custom-logo';
    newLogo.style.width = '15vw';
    newLogo.style.height = 'auto';

    const parent = oldLogo.parentElement;

    if (parent.tagName.toLowerCase() === 'a') {
        parent.replaceChild(newLogo, oldLogo);

        // Проверяем, есть ли уже ссылка, если нет — добавляем
        if (!parent.nextElementSibling || !parent.nextElementSibling.classList.contains('logo-text')) {
            const textLink = document.createElement('a');
            textLink.href = 'https://github.com/BlagoYar/beautiful_phpinfo';
            textLink.textContent = 'Designed by BlagoYar';
            textLink.className = 'logo-text';
            textLink.target = '_blank'; // Открывать в новой вкладке
            textLink.rel = 'noopener noreferrer';

            parent.parentElement.insertBefore(textLink, parent.nextSibling);
        }
    }
}


// ---------------------------------
// Замена слова active
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

// ---------------------------------
// Замена 0 и 1
const numberMappings = {
    "0": "disabled-int",
    "1": "enabled-int"
};

function replaceNumbersWithSpan(node) {
    const text = node.textContent;
    const regex = new RegExp(`(?:^|\\s)\\b(${Object.keys(numberMappings).join('|')})\\b(?:$|\\s)`, 'g');
    const newContent = text.replace(regex, (match, p1) => {
        const span = document.createElement('span');
        span.className = numberMappings[p1];
        span.textContent = p1;
        return span.outerHTML;
    });

    const parentNode = node.parentNode;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newContent;
    while (tempDiv.firstChild) {
        parentNode.insertBefore(tempDiv.firstChild, node);
    }
    parentNode.removeChild(node);
}

function traverseNodesForNumbers(node) {
    node.childNodes.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            traverseNodesForNumbers(child);
        } else if (child.nodeType === Node.TEXT_NODE) {
            replaceNumbersWithSpan(child);
        }
    });
}

traverseNodesForNumbers(document.body);

// ---------------------------------
// Замена слов
    const wordMappings = {
        "enabled": "enabled-text",
        "Enabled": "enabled-text",
        "disabled": "disabled-text",
        "Disabled": "disabled-text",
        "Off": "disabled-text",
        "On": "enabled-text",
        "no value": "no-text",
        "available": "available-text"
    };

    function replaceWordsWithSpan(node) {
        const text = node.textContent;
        // Улучшенное регулярное выражение:
        const regex = new RegExp(`\\b(?:enabled|Enabled|disabled|Disabled|Off|On|no value|available)\\b`, 'gi');

        const newContent = text.replace(regex, match => {
            const span = document.createElement('span');
            span.className = wordMappings[match];
            span.textContent = match;
            return span.outerHTML;
        });

        const parentNode = node.parentNode;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newContent;
        while (tempDiv.firstChild) {
            parentNode.insertBefore(tempDiv.firstChild, node);
        }
        parentNode.removeChild(node);
    }

    function traverseNodesForWords(node) {
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName !== 'TH') {
                    traverseNodesForWords(child);
                }
            } else if (child.nodeType === Node.TEXT_NODE) {
                replaceWordsWithSpan(child);
            }
        });
    }

    traverseNodesForWords(document.body);

    document.querySelectorAll("td.v").forEach(el => {
        el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace(/\bno\b/g, 'no');
            }
        });
        el.innerHTML = el.innerHTML.replace(/\bno\b(?!-)/g, '<span class="no-text">no</span>');
    });
});

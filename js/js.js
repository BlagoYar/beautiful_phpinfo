  document.addEventListener("DOMContentLoaded", function() {
    // Замена логотипа
    const oldLogo = document.querySelector('img[src*="data:image/png;base64,"]');
    if (oldLogo) {
        const newLogo = document.createElement('img');
        newLogo.src = 'phplogo.svg';
        newLogo.alt = 'PHP Logo';
        newLogo.className = 'custom-logo';
        newLogo.style.width = '150px';
        newLogo.style.height = 'auto';
        const parent = oldLogo.parentElement;
        parent.replaceChild(newLogo, oldLogo);
    }

    // Функция для создания элемента span с заданным классом
    // function createSpanWithText(text, className) {
    //   const span = document.createElement('span');
    //   span.className = className;
    //   span.textContent = text;
    //   return span;
    // }

    // Функция для замены текста в элементах
  //   function replaceText(node, searchValue, className) {
  //     if (node.nodeType === Node.TEXT_NODE) {
  //       const text = node.nodeValue;
  //       const regex = new RegExp(`(?:\\s|^)(${searchValue})(?:\\s|$)`, 'g');
  //       const fragments = text.split(regex);
  //       if (fragments.length > 1) {
  //         const fragment = document.createDocumentFragment();
  //         fragments.forEach((part, index) => {
  //           if (index % 2 === 1) {
  //             fragment.appendChild(createSpanWithText(part, className));
  //           } else {
  //             fragment.appendChild(document.createTextNode(part));
  //           }
  //         });
  //         node.parentNode.replaceChild(fragment, node);
  //       }
  //     } else {
  //       Array.from(node.childNodes).forEach(childNode => replaceText(childNode, searchValue, className));
  //     }
  //   }

  //   const tdElements = document.querySelectorAll('td.v, td.v i');
  //   tdElements.forEach(td => {
  //     replaceText(td, 'enabled', 'enabled-text');
  //     replaceText(td, 'Enabled', 'enabled-text');
  //     replaceText(td, 'active', 'enabled-text');
  //     replaceText(td, 'disabled', 'disabled-text');
  //     replaceText(td, 'Disabled', 'disabled-text');
  //     replaceText(td, 'Off', 'disabled-text');
  //     replaceText(td, 'On', 'enabled-text');
  //     replaceText(td, 'no value', 'no-text');
  //     replaceText(td, '\\bno\\b', 'no-text');
  //     replaceText(td, '\\b0\\b', 'disabled-int');
  //     replaceText(td, '\\b1\\b', 'enabled-int');
  //   });
  });
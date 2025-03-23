document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll("td.e").forEach(function (cell) {
        cell.innerHTML = cell.innerHTML.replace(/_/g, "_<wbr>");
    });

    // Замена логотипа
    const linkElement = document.querySelector('a[href="http://www.php.net/"]');
    const versionHeader = document.querySelector('h1.p');
    if (linkElement && versionHeader) {
        linkElement.setAttribute('target', '_blank');
        const newLogo = document.createElement('img');
        newLogo.src = '/res/imgs/phplogo.svg';
        newLogo.alt = 'PHP Logo';
        newLogo.className = 'php-logo';
        linkElement.appendChild(newLogo);
        const clonedHeader = versionHeader.cloneNode(true);
        linkElement.insertAdjacentElement('afterend', clonedHeader);
        versionHeader.remove();
    }

    // Theme Button
    // Создаем кнопку
    let button = document.createElement("button");
    button.id = "theme-toggle";
    button.setAttribute("aria-label", "Переключить тему");
    button.innerHTML = `
        <svg class="lightbulb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path class="bulb" d="M464,176c0,30.6-9.5,58.8-25.7,82.1-4.1,5.9-8.7,12.3-13.6,19-12.7,17.5-27.1,37.2-38,57.1-8.9,16.2-13.7,33.3-16.2,49.9h32.5c2.2-12,5.9-23.7,11.8-34.5,9.9-18,22.2-34.9,34.5-51.8h0c5.2-7.1,10.4-14.2,15.4-21.4,19.8-28.5,31.4-63,31.4-100.3C496,78.8,417.2,0,320,0s-176,78.8-176,176,11.6,71.9,31.4,100.3c5,7.2,10.2,14.3,15.4,21.4h0c12.3,16.8,24.6,33.7,34.5,51.8,5.9,10.8,9.6,22.5,11.8,34.5h32.4c-2.5-16.6-7.3-33.7-16.2-49.9-10.9-20-25.3-39.7-38-57.1h0c-4.9-6.7-9.5-13-13.6-19-16.2-23.2-25.7-51.4-25.7-82,0-79.5,64.5-144,144-144s144,64.5,144,144ZM240,176c0-44.2,35.8-80,80-80s16-7.2,16-16-7.2-16-16-16c-61.9,0-112,50.1-112,112s7.2,16,16,16,16-7.2,16-16ZM320,480c-20.9,0-38.7-13.4-45.3-32h90.5c-6.6,18.6-24.4,32-45.3,32h0ZM240,426.7v5.3c0,44.2,35.8,80,80,80s80-35.8,80-80v-5.3c0-5.9-4.8-10.7-10.7-10.7h-138.6c-5.9,0-10.7,4.8-10.7,10.7Z"/>
          <path class="base" d="M320,480c-20.9,0-38.7-13.4-45.3-32h90.5c-6.6,18.6-24.4,32-45.3,32h0ZM240,426.7v5.3c0,44.2,35.8,80,80,80s80-35.8,80-80v-5.3c0-5.9-4.8-10.7-10.7-10.7h-138.6c-5.9,0-10.7,4.8-10.7,10.7Z"/>
          <path class="filament" d="M240,176c0-44.2,35.8-80,80-80s16-7.2,16-16-7.2-16-16-16c-61.9,0-112,50.1-112,112s7.2,16,16,16,16-7.2,16-16Z"/>
        </svg>
    `;

    // Вставляем кнопку в div.center
    let centerDiv = document.querySelector(".center");
    centerDiv.appendChild(button);

    // Логика переключения темы
    let currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    button.addEventListener("click", function () {
        let newTheme = (document.documentElement.getAttribute("data-theme") === "light") ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // Мигание при первой загрузке
    if (!localStorage.getItem("theme-toggled-before")) {
        button.classList.add("blink");
        setTimeout(() => button.classList.remove("blink"), 3000);
        localStorage.setItem("theme-toggled-before", "true");
    }

    // Функция изменения размера кнопки
    function resizeButton() {
        if (!button) return;

        let size = Math.max(30, Math.min(window.innerWidth * 0.08, 70));
        button.style.width = `${size}px`;
        button.style.height = `${size}px`;
        button.style.visibility = "visible"; // Показываем кнопку после установки размера
    }

    // Слушаем события
    window.addEventListener("resize", resizeButton);
    window.addEventListener("load", resizeButton);
});

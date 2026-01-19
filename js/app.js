document.addEventListener('DOMContentLoaded', () => {
    const guidesData = {
        "Видео гайды": [
            {
                name: "Разбираемся с пресетами, параметрами моделей, токенами, настройками",
                description: "Гайд вышел длинный (прастити), но ответит на МНОГО вопросов касательно пресетов и настроек моделей в таверне. Разбираем буквально ВСЁ, что находится в самой первой вкладке \"AI Response\".",
                author: { name: "MaksSh", url: "https://t.me/Maks_Sh" },
                link: "https://t.me/btwiusesillytavern/4"
            },
            {
                name: "Гайд по настройке форматирования и \"рассуждений\" в некоторых пресетах",
                description: "Нейронка отвечает вам что-то непонятное вначале каждого сообщения? Каждое ваше сообщение это страшное полотно непонятного текста? Разбираемся как правильно настроить такие пресеты.",
                author: { name: "MaksSh", url: "https://t.me/Maks_Sh" },
                link: "https://t.me/btwiusesillytavern/5"
            }
        ],
        "Текстовые гайды": [
            {
                name: "Гайд на бесплатный Gemini",
                description: "Хотите получить бесплатный Gemini 2.5 Pro? Вам сюда! 😎 Сообщество \"Фрэнки || ИИ и Драма\" подготовило подробнейший гайд по получению халявной гемини. Гайд не простой и не для всех, внимательно ознакомьтесь со всеми предупреждениями на канале!",
                author: { name: "Фрэнки", url: "https://t.me/AIandDrama" },
                link: "https://t.me/AIandDrama/129"
            },
            {
                name: "Гайд по саммаризации (summary)",
                description: "Отличный и подробный гайд. 💪 Почему модели \"тупеют\" при длительной ролке? Как экономить контекст? Как правильно сделать саммари ролки? Всё это в данном гайде.",
                author: { name: "Динар", url: "https://t.me/decadence_in_romanticism" },
                link: "https://docs.google.com/document/d/1hNG9NN-wgsHj__zJtWmOxFjyFinG8tKhtYbM_hsWqiI/edit?tab=t.0"
            },
            {
                name: "Синхронизируем профили таверны между устройствами",
                description: "Хочешь синхронизировать профили таверны (чаты, карточки, настройки и т.д.) между разными устройствами? Тогда тебе в этот гайд 😉",
                author: { name: "MaksSh", url: "https://t.me/Maks_Sh" },
                link: "https://docs.google.com/document/d/1HuIMLniKrP_SILSjbfRg15vZXjcwghD1s24PUSa6DhU/edit?usp=sharing"
            }
        ],
        "Гайды для Android (Termux)": [
            {
                name: "Как найти папку таверны на Android",
                description: "Небольшой, но полезный текстовый гайд. Разбираемся, как найти все ваши файлы таверны (и не только) на андроиде.",
                author: { name: "Томирис", url: "https://t.me/tomchi_smm" },
                link: "https://teletype.in/@tomchirik/juZxICE9Aoq"
            }
        ],
        "Решение проблем": [
        ]
    };

    const categoryButtonsContainer = document.getElementById('category-buttons');
    const tableBody = document.getElementById('guides-table-body');
    const slugToButtonMap = new Map();

    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-а-я]+/g, '');
    }

    function renderTable(category) {
        tableBody.innerHTML = '';
        const guides = guidesData[category] || [];

        if (guides.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 4;
            td.textContent = 'В этой категории пока нет гайдов.';
            td.classList.add('text-center');
            tr.appendChild(td);
            tableBody.appendChild(tr);
            return;
        }
        
        guides.forEach(guide => {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            tdName.textContent = guide.name;
            tr.appendChild(tdName);

            const tdDesc = document.createElement('td');
            tdDesc.textContent = guide.description;
            tr.appendChild(tdDesc);

            const tdAuthor = document.createElement('td');
            if (guide.author.url) {
                const authorLink = document.createElement('a');
                authorLink.href = guide.author.url;
                authorLink.textContent = guide.author.name;
                authorLink.target = "_blank";
                authorLink.rel = "noopener noreferrer";
                tdAuthor.appendChild(authorLink);
            } else {
                tdAuthor.textContent = guide.author.name;
            }
            tr.appendChild(tdAuthor);
            
            const tdLink = document.createElement('td');
            const link = document.createElement('a');
            link.href = guide.link;
            link.textContent = 'Перейти';
            link.classList.add('btn', 'btn-primary', 'btn-sm');
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            tdLink.appendChild(link);
            tr.appendChild(tdLink);

            tableBody.appendChild(tr);
        });
    }

    function setActiveCategory(targetButton) {
        if (!targetButton) {
            targetButton = categoryButtonsContainer.querySelector('.btn');
        }
        if (!targetButton) return;

        const category = targetButton.dataset.category;
        
        const allButtons = categoryButtonsContainer.querySelectorAll('.btn');
        allButtons.forEach(btn => btn.classList.remove('active'));
        targetButton.classList.add('active');

        renderTable(category);
    }

    function handleCategoryClick(e) {
        const clickedButton = e.currentTarget;
        window.location.hash = clickedButton.dataset.slug;
    }
    
    function syncContentWithUrl() {
        const currentHash = decodeURIComponent(window.location.hash.substring(1));
        const targetButton = slugToButtonMap.get(currentHash);
        setActiveCategory(targetButton);
    }

    function initialize() {
        const categories = Object.keys(guidesData);
        categories.forEach(category => {
            const button = document.createElement('button');
            const slug = slugify(category);
            
            button.className = 'btn btn-outline-info';
            button.textContent = category;
            button.dataset.category = category;
            button.dataset.slug = slug;
            
            button.addEventListener('click', handleCategoryClick);
            
            categoryButtonsContainer.appendChild(button);
            slugToButtonMap.set(slug, button);
        });

        window.addEventListener('hashchange', syncContentWithUrl);

        syncContentWithUrl();
    }

    initialize();
});

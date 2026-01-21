document.addEventListener('DOMContentLoaded', () => {
    const guidesData = {
        "Видео гайды": [
            {
                name: "<i class=\"bi bi-fire\"></i> Установка и настройка таверны",
                description: "Основа основ. Самый главный гайд для новичка! Устанавливаем таверну, выполняем базовые настройки, подключаем провайдера и начинаем чатится",
                author: { name: "Фрэнки", url: "https://t.me/AIandDrama" },
                link: "https://youtu.be/gtCB5UCroRo"
            },
            {
                name: "Разбираемся с пресетами, параметрами моделей, токенами, настройками",
                description: "Гайд вышел длинный (прастити), но ответит на МНОГО вопросов касательно пресетов и настроек моделей в таверне. Разбираем буквально ВСЁ, что находится в самой первой вкладке \"AI Response\"",
                author: { name: "MaksSh", url: "https://t.me/Maks_Sh" },
                link: "https://t.me/btwiusesillytavern/4"
            },
            {
                name: "Гайд по настройке форматирования и \"рассуждений\" в некоторых пресетах",
                description: "Нейронка отвечает вам что-то непонятное вначале каждого сообщения? Каждое ваше сообщение это страшное полотно непонятного текста? Разбираемся как правильно настроить такие пресеты",
                author: { name: "MaksSh", url: "https://t.me/Maks_Sh" },
                link: "https://t.me/btwiusesillytavern/5"
            }
        ],
        "Текстовые гайды": [
            {
                name: "<i class=\"bi bi-plus-circle-dotted\"></i> Синхронизируем профили таверны между устройствами",
                description: "Хочешь синхронизировать профили таверны (чаты, карточки, настройки и т.д.) между разными устройствами? Тогда тебе в этот гайд 😉",
                author: { name: "MaksSh", url: "https://t.me/Maks_Sh" },
                link: "https://docs.google.com/document/d/1HuIMLniKrP_SILSjbfRg15vZXjcwghD1s24PUSa6DhU/edit?usp=sharing"
            },
            {
                name: "<i class=\"bi bi-fire\"></i> Гайд на бесплатный Gemini",
                description: "Хотите получить бесплатный Gemini 2.5 Pro? Вам сюда! 😎 Сообщество \"Фрэнки || ИИ и Драма\" подготовило подробнейший гайд по получению халявной гемини. Гайд не простой и не для всех, внимательно ознакомьтесь со всеми предупреждениями на канале!",
                author: { name: "Фрэнки", url: "https://t.me/AIandDrama" },
                link: "https://t.me/AIandDrama/129"
            },
            {
                name: "Методичка новобранца в SillyTavern",
                description: "Коротко, в текстовом формате разбирается установка, настройка API, карточки персонажей и другие моменты",
                author: { name: "HHS1e", url: "https://t.me/HHS1e" },
                link: "https://t.me/AIcozyChat/15/25756"
            },
            {
                name: "Гайд по саммаризации (summary)",
                description: "Отличный и подробный гайд. 💪 Почему модели \"тупеют\" при длительной ролке? Как экономить контекст? Как правильно сделать саммари ролки? Всё это в данном гайде",
                author: { name: "Динар", url: "https://t.me/decadence_in_romanticism" },
                link: "https://docs.google.com/document/d/1hNG9NN-wgsHj__zJtWmOxFjyFinG8tKhtYbM_hsWqiI/edit?tab=t.0"
            },
            {
                name: "Гайд по саммаризации от Ульяны",
                description: "Не такой подробный как гайд Динара, но в нем есть интересные промпты, команды и практические советы",
                author: { name: "Ульяна", url: "https://t.me/apresanteur" },
                link: "https://telegra.ph/Sammari-nemnozhko-sovetov-11-13"
            },
            {
                name: "Как получить закрытую карточку с JanitorAI",
                description: "Гайд с реддита, на английском. Гайд под плашкой 18+, для просмотра нужен аккаунт на реддите",
                author: { name: "Obvious-Protection-2", url: "https://www.reddit.com/user/Obvious-Protection-2/" },
                link: "https://www.reddit.com/r/SillyTavernAI/comments/1kudcfs/guide_how_to_get_janitorai_bots_with_hidden_desc/"
            },
            {
                name: "Как получить закрытую карточку с JanitorAI",
                description: "Ещё один гайд, тоже на английском. Лежит на GitHub, просмотр свободный",
                author: { name: "Ashu", url: "https://github.com/ashuotaku" },
                link: "https://docs.google.com/document/d/1hNG9NN-wgsHj__zJtWmOxFjyFinG8tKhtYbM_hsWqiI/edit?tab=t.0"
            },
            {
                name: "Как подключить векторизацию через Cobold",
                description: "Короткий и полезный гайд. Без лишних деталей рассказано и показано как запустить векторизацию через Cobold если у вас проблемы с Ollama",
                author: { name: "Ульяна", url: "https://t.me/apresanteur" },
                link: "https://telegra.ph/Kak-pobedit-Ollamu-12-05"
            }
        ],
        "Гайды для Android (Termux)": [
            {
                name: "Как найти папку таверны на Android",
                description: "Небольшой, но полезный текстовый гайд. Разбираемся, как найти все ваши файлы таверны (и не только) на андроиде",
                author: { name: "Томирис", url: "https://t.me/tomchi_smm" },
                link: "https://teletype.in/@tomchirik/juZxICE9Aoq"
            }
        ],
        "Решение проблем": [
            {
                name: "<i class=\"bi bi-plus-circle-dotted\"></i> Что делать если таверна занимает много места",
                description: "Коротенький гайд как очистить место если таверна стала слишком \"БОЛЬШОЙ\"",
                author: { name: "MaksSh", url: "https://t.me/Maks_Sh" },
                link: "https://docs.google.com/document/d/1H13hNU6XGcwlAQWmSCqCBbrWCm1FZy0I1lhFDbTfwL4/edit?usp=sharing"
            }
        ],
        "Ботодельство": [
        ],
        "Промпты": [
        ],
        "Пресеты": [
            {
                name: "Сборник пресетов от сообщества \"ИИ и Драма [18+]\"",
                description: "Большая коллекция пресетов. Самые разные, под разные модели и на любой вкус. <a href=\"https://t.me/HHS1e\" target=\"_blank\">HHS1e</a> и <a href=\"https://t.me/apresanteur\" target=\"_blank\">Ульяна</a> регулярно пополняют коллекцию",
                author: { name: "ИИ и Драма [18+]", url: "https://t.me/AIcozyChat" },
                link: "https://t.me/AIcozyChat/34423"
            }
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
            tdName.innerHTML = guide.name;
            tr.appendChild(tdName);

            const tdDesc = document.createElement('td');
            tdDesc.innerHTML = guide.description;
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
            if (guide.link) {
                const link = document.createElement('a');
                link.href = guide.link;
                link.textContent = 'Перейти';
                link.classList.add('btn', 'btn-primary', 'btn-sm');
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                tdLink.appendChild(link);
            }
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

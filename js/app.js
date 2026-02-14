document.addEventListener('DOMContentLoaded', () => {
    const categoryButtonsContainer = document.getElementById('category-buttons');
    const tableBody = document.getElementById('guides-table-body');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const slugToButtonMap = new Map();
    let guidesData = {};
    let categories = [];
    let currentCategory = '';

    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-а-я]+/g, '');
    }

    function renderError(message) {
        categoryButtonsContainer.innerHTML = '';
        tableBody.innerHTML = '';
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = message;
        td.classList.add('text-center');
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }

    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    function renderGuides(guides, query = '') {
        tableBody.innerHTML = '';

        if (guides.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 4;
            td.textContent = query ? 'По вашему запросу ничего не найдено.' : 'В этой категории пока нет гайдов.';
            td.classList.add('text-center');
            tr.appendChild(td);
            tableBody.appendChild(tr);
            return;
        }
        
        guides.forEach((guide, index) => {
            if (guide.type === 'separator') {
                const tr = document.createElement('tr');
                tr.classList.add('guide-separator', 'fade-in');
                tr.style.animationDelay = `${index * 0.05}s`;
                
                const td = document.createElement('td');
                td.colSpan = 4;
                td.textContent = guide.text || '';
                
                tr.appendChild(td);
                tableBody.appendChild(tr);
                return;
            }

            const tr = document.createElement('tr');
            tr.classList.add('fade-in');
            tr.style.animationDelay = `${index * 0.05}s`;
            
            const tdName = document.createElement('td');
            tdName.innerHTML = highlightText(guide.name || '—', query);
            tdName.dataset.label = 'Название';
            tr.appendChild(tdName);

            const tdDesc = document.createElement('td');
            tdDesc.innerHTML = highlightText(guide.description || '—', query);
            tdDesc.dataset.label = 'Описание';
            tr.appendChild(tdDesc);

            const tdAuthor = document.createElement('td');
            tdAuthor.dataset.label = 'Автор';
            const author = guide.author || {};
            if (author.url && author.name) {
                const authorLink = document.createElement('a');
                authorLink.href = author.url;
                authorLink.innerHTML = highlightText(author.name, query);
                authorLink.target = "_blank";
                authorLink.rel = "noopener noreferrer";
                tdAuthor.appendChild(authorLink);
            } else if (author.name) {
                tdAuthor.innerHTML = highlightText(author.name, query);
            } else {
                tdAuthor.textContent = '—';
            }
            tr.appendChild(tdAuthor);
            
            const tdLink = document.createElement('td');
            tdLink.dataset.label = 'Ссылка';
            if (guide.link) {
                const link = document.createElement('a');
                link.href = guide.link;
                link.innerHTML = '<i class="bi bi-box-arrow-up-right"></i>';
                link.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'btn-action-icon');
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                tdLink.appendChild(link);
            } else {
                tdLink.textContent = '—';
            }
            tr.appendChild(tdLink);

            tableBody.appendChild(tr);
        });
    }

    function renderTable(category) {
        currentCategory = category;
        const guides = guidesData[category] || [];
        renderGuides(guides);
    }

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            // Restore category view
            categoryButtonsContainer.querySelectorAll('.btn').forEach(btn => btn.classList.remove('disabled'));
            const activeBtn = categoryButtonsContainer.querySelector('.btn.active');
            if (activeBtn) {
                renderTable(activeBtn.dataset.category);
            }
            return;
        }

        // Disable category buttons during search to avoid confusion
        categoryButtonsContainer.querySelectorAll('.btn').forEach(btn => btn.classList.add('disabled'));

        const results = [];
        categories.forEach(category => {
            const items = guidesData[category] || [];
            items.forEach(item => {
                if (item.type === 'separator') return;
                
                const nameMatch = (item.name || '').toLowerCase().includes(query);
                const descMatch = (item.description || '').toLowerCase().includes(query);
                const authorMatch = (item.author?.name || '').toLowerCase().includes(query);

                if (nameMatch || descMatch || authorMatch) {
                    results.push(item);
                }
            });
        });

        renderGuides(results, query);
    }

    function setActiveCategory(targetButton) {
        if (!targetButton) {
            targetButton = categoryButtonsContainer.querySelector('.btn');
        }
        if (!targetButton) return;

        // Clear search when switching categories
        searchInput.value = '';
        categoryButtonsContainer.querySelectorAll('.btn').forEach(btn => btn.classList.remove('disabled'));

        const category = targetButton.dataset.category;
        
        const allButtons = categoryButtonsContainer.querySelectorAll('.btn');
        allButtons.forEach(btn => btn.classList.remove('active'));
        targetButton.classList.add('active');

        renderTable(category);
    }

    function handleCategoryClick(e) {
        const clickedButton = e.currentTarget;
        if (clickedButton.classList.contains('disabled')) return;
        window.location.hash = clickedButton.dataset.slug;
    }
    
    function syncContentWithUrl() {
        const currentHash = decodeURIComponent(window.location.hash.substring(1));
        const targetButton = slugToButtonMap.get(currentHash);
        setActiveCategory(targetButton);
    }

    function initialize() {
        if (categories.length === 0) {
            renderError('Список категорий пуст.');
            return;
        }

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

        searchInput.addEventListener('input', () => {
            handleSearch();
            if (searchInput.value.trim()) {
                clearSearchBtn.classList.remove('d-none');
            } else {
                clearSearchBtn.classList.add('d-none');
            }
        });

        clearSearchBtn.classList.add('d-none'); // Hide by default
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.classList.add('d-none');
            handleSearch();
        });

        window.addEventListener('hashchange', syncContentWithUrl);

        syncContentWithUrl();
    }

    async function loadGuidesData() {
        try {
            if (typeof jsyaml === 'undefined') {
                throw new Error('YAML parser not found.');
            }

            const response = await fetch('data/guides.yml', { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error(`Failed to load YAML: ${response.status}`);
            }

            const text = await response.text();
            const parsed = jsyaml.load(text);
            if (!Array.isArray(parsed)) {
                throw new Error('Unexpected YAML format.');
            }

            guidesData = {};
            categories = [];
            parsed.forEach(entry => {
                if (!entry || typeof entry.category !== 'string') {
                    return;
                }

                const items = Array.isArray(entry.items) ? entry.items : [];
                guidesData[entry.category] = items;
                categories.push(entry.category);
            });

            return true;
        } catch (error) {
            console.error('Failed to load guides data:', error);
            renderError('Не удалось загрузить список гайдов. Проверьте файл data/guides.yml.');
            return false;
        }
    }

    async function start() {
        const loaded = await loadGuidesData();
        if (!loaded) return;
        initialize();
    }

    start();
});

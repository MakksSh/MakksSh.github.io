document.addEventListener('DOMContentLoaded', () => {
    const registry = document.getElementById('proxy-registry');
    const sectionStyles = ['proxy-section-reliable', 'proxy-section-questionable', 'proxy-section-unavailable'];
    const warning = document.getElementById('proxy-warning');
    const warningPage = document.querySelector('.proxy-page');
    const warningAck = document.getElementById('proxy-warning-ack');
    const warningContinue = document.getElementById('proxy-warning-continue');
    const warningStorageKey = 'proxy-warning-acknowledged-at';
    const warningCooldown = 24 * 60 * 60 * 1000;
    const lastFocusedElement = document.activeElement;
    const pageRestoreTarget = lastFocusedElement instanceof HTMLElement && lastFocusedElement !== document.body
        ? lastFocusedElement
        : document.querySelector('.proxy-back-link');

    function closeWarning() {
        try {
            localStorage.setItem(warningStorageKey, String(Date.now()));
        } catch (error) {
            console.warn('Could not save proxy warning acknowledgement:', error);
        }
        warning.hidden = true;
        warningPage.inert = false;
        warningPage.removeAttribute('aria-hidden');
        document.body.classList.remove('proxy-warning-open');
        pageRestoreTarget?.focus();
    }

    function hasRecentWarningAcknowledgement() {
        try {
            const acknowledgedAt = Number(localStorage.getItem(warningStorageKey));
            const elapsed = Date.now() - acknowledgedAt;
            return Number.isFinite(acknowledgedAt) && elapsed >= 0 && elapsed < warningCooldown;
        } catch (error) {
            console.warn('Could not read proxy warning acknowledgement:', error);
            return false;
        }
    }

    function keepFocusInside(event) {
        if (event.key !== 'Tab') return;
        const focusable = warning.querySelectorAll('button:not([disabled]), input:not([disabled])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    warningAck.addEventListener('change', () => {
        warningContinue.disabled = !warningAck.checked;
    });
    warningContinue.addEventListener('click', closeWarning);
    warning.addEventListener('keydown', keepFocusInside);
    if (hasRecentWarningAcknowledgement()) {
        warning.hidden = true;
    } else {
        warning.hidden = false;
        warningPage.inert = true;
        warningPage.setAttribute('aria-hidden', 'true');
        document.body.classList.add('proxy-warning-open');
        requestAnimationFrame(() => warningAck.focus());
    }

    function createElement(tag, text, className) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function createField(label, value) {
        if (typeof value !== 'string' || !value.trim()) return null;
        const row = createElement('div', null, 'proxy-field');
        row.appendChild(createElement('dt', label));
        row.appendChild(createElement('dd', value.trim()));
        return row;
    }

    function createCard(item, index) {
        const card = createElement('article', null, 'proxy-card fade-in');
        card.style.animationDelay = `${index * 0.05}s`;
        const heading = createElement('div', null, 'proxy-card-heading');
        heading.appendChild(createElement('h3', item.name || 'Без названия', 'proxy-card-title'));

        if (typeof item.url === 'string' && /^https?:\/\//i.test(item.url.trim())) {
            const link = createElement('a', null, 'btn btn-outline-primary btn-sm proxy-open-link');
            link.href = item.url.trim();
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `Открыть ${item.name || 'ресурс'}`);
            link.innerHTML = '<i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>';
            heading.appendChild(link);
        }
        card.appendChild(heading);

        const fields = createElement('dl', null, 'proxy-fields');
        [['Регистрация', item.registration], ['Оплата', item.payment], ['Условия', item.conditions], ['Модели', item.models], ['Embeddings', item.embeddings], ['Стабильность', item.stability]]
            .forEach(([label, value]) => {
                const field = createField(label, value);
                if (field) fields.appendChild(field);
            });
        if (fields.children.length) card.appendChild(fields);
        if (typeof item.note === 'string' && item.note.trim()) {
            card.appendChild(createElement('p', item.note.trim(), 'proxy-note'));
        }
        return card;
    }

    function renderSections(data) {
        registry.innerHTML = '';
        if (!Array.isArray(data) || data.length === 0) {
            registry.appendChild(createElement('div', 'В реестре пока нет разделов.', 'proxy-state proxy-state-empty'));
            return;
        }

        data.forEach((section, index) => {
            if (!section || typeof section.category !== 'string') return;
            const wrapper = createElement('section', null, `proxy-section ${sectionStyles[index] || ''}`);
            const items = Array.isArray(section.items) ? section.items.filter(item => item && typeof item === 'object') : [];
            if (items.length === 0) {
                wrapper.appendChild(createElement('p', 'В этом разделе пока нет записей.', 'proxy-state proxy-state-empty'));
            } else {
                const grid = createElement('div', null, 'proxy-grid');
                items.forEach((item, itemIndex) => grid.appendChild(createCard(item, itemIndex)));
                wrapper.appendChild(grid);
            }
            registry.appendChild(wrapper);
        });
    }

    async function loadRegistry() {
        try {
            if (typeof jsyaml === 'undefined') throw new Error('YAML parser not found.');
            const response = await fetch('data/proxies.yml', { cache: 'no-cache' });
            if (!response.ok) throw new Error(`Failed to load YAML: ${response.status}`);
            const parsed = jsyaml.load(await response.text());
            if (!Array.isArray(parsed)) throw new Error('Unexpected YAML format.');
            renderSections(parsed);
        } catch (error) {
            console.error('Failed to load proxy registry:', error);
            registry.innerHTML = '';
            registry.appendChild(createElement('div', 'Не удалось загрузить реестр прокси. Проверьте файл data/proxies.yml.', 'proxy-state proxy-state-error'));
        }
    }

    loadRegistry();
});

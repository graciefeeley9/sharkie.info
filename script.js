const defaultSharks = [
    {
        id: 'shark-1',
        name: 'White Shark',
        species: 'Carcharodon carcharias',
        size: '15 ft',
        location: 'California coast',
        status: 'Vulnerable',
        image: 'images/whiteshark.jpg'
    },
    {
        id: 'shark-2',
        name: 'Hammerhead',
        species: 'Sphyrna mokarran',
        size: '13 ft',
        location: 'Tropical waters',
        status: 'Endangered',
        image: 'images/hammerhead.jpg'
    },
    {
        id: 'shark-3',
        name: 'Whale Shark',
        species: 'Rhincodon typus',
        size: '40 ft',
        location: 'Open ocean',
        status: 'Endangered'
    }
];

let sharks = [...defaultSharks];
let currentSearchQuery = '';

function init() {
    const searchInput = document.getElementById('search-input');
    const closeDetail = document.getElementById('close-detail');
    const openSearchButton = document.getElementById('open-search');
    const closeSearchButton = document.getElementById('close-search');

    searchInput.addEventListener('input', handleSearch);
    closeDetail.addEventListener('click', closeDetailPanel);
    openSearchButton.addEventListener('click', openSearchPanel);
    closeSearchButton.addEventListener('click', closeSearchPanel);

    renderDatabaseView(sharks);
}

function renderList(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (items.length === 0) {
        return;
    }

    items.forEach(shark => {
        const card = document.createElement('article');
        card.className = 'shark-card';
        card.innerHTML = `
            ${shark.image ? `<img src="${shark.image}" alt="${shark.name}" class="shark-image">` : ''}
            <div class="shark-card-body">
                <h3>${shark.name}</h3>
                <p><strong>Species:</strong> ${shark.species}</p>
                <button type="button" data-id="${shark.id}">View details</button>
            </div>
        `;

        const button = card.querySelector('button');
        button.addEventListener('click', () => showSharkDetails(shark));

        container.appendChild(card);
    });
}

function renderDatabaseView(items) {
    currentSearchQuery = '';
    document.getElementById('database-panel').hidden = false;
    document.getElementById('search-results').hidden = true;
    document.getElementById('shark-detail').hidden = true;
    document.getElementById('no-results').hidden = true;
    document.getElementById('search-query').textContent = '';

    renderList('database-list', items);
}

function openSearchPanel() {
    currentSearchQuery = '';
    document.getElementById('header-title').hidden = true;
    document.getElementById('open-search').hidden = true;
    document.getElementById('database-panel').hidden = true;
    document.getElementById('search-results').hidden = false;
    document.getElementById('shark-detail').hidden = true;
    document.getElementById('search-input').value = '';
    document.getElementById('search-query').textContent = 'Type a name or species to begin.';
    document.getElementById('no-results').hidden = true;
    renderList('search-list', []);
    document.getElementById('search-input').focus();
}

function closeSearchPanel() {
    document.getElementById('header-title').hidden = false;
    renderDatabaseView(sharks);
}

function renderSearchResults(items, query) {
    currentSearchQuery = query;
    document.getElementById('database-panel').hidden = true;
    document.getElementById('search-results').hidden = false;
    document.getElementById('shark-detail').hidden = true;
    document.getElementById('search-query').textContent = query ? `Showing results for “${query}”` : '';

    renderList('search-list', items);
    document.getElementById('no-results').hidden = items.length !== 0;
}

function showSharkDetails(shark) {
    document.getElementById('detail-name').textContent = shark.name;
    document.getElementById('detail-species').textContent = shark.species;
    document.getElementById('detail-size').textContent = shark.size || 'Unknown';
    document.getElementById('detail-location').textContent = shark.location || 'Unknown';
    document.getElementById('detail-status').textContent = shark.status || 'Unknown';
    const detailImage = document.getElementById('detail-image');
    detailImage.src = shark.image || '';
    detailImage.alt = shark.name;

    document.getElementById('database-panel').hidden = true;
    document.getElementById('search-results').hidden = true;
    document.getElementById('shark-detail').hidden = false;
}

function closeDetailPanel() {
    document.getElementById('shark-detail').hidden = true;
    if (currentSearchQuery) {
        document.getElementById('search-results').hidden = false;
    } else {
        document.getElementById('database-panel').hidden = false;
    }
}

function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();

    if (!query) {
        document.getElementById('search-query').textContent = 'Type a name or species to begin.';
        document.getElementById('search-list').innerHTML = '';
        document.getElementById('no-results').hidden = true;
        return;
    }

    const filtered = sharks.filter(shark => {
        return (
            shark.name.toLowerCase().includes(query) ||
            shark.species.toLowerCase().includes(query) ||
            shark.location.toLowerCase().includes(query) ||
            shark.status.toLowerCase().includes(query)
        );
    });

    renderSearchResults(filtered, query);
}

window.addEventListener('DOMContentLoaded', init);



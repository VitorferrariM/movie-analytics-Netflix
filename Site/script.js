// Global chart instances
let chartYear, chartGenre, chartScatter;

// Formatting helper
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initCharts();
    updateDashboard(); // initial render
    
    // Bind events
    document.getElementById('filter-year').addEventListener('change', updateDashboard);
    document.getElementById('filter-genre').addEventListener('change', updateDashboard);
    document.getElementById('filter-rating').addEventListener('change', updateDashboard);
});

function initFilters() {
    const yearSelect = document.getElementById('filter-year');
    const years = [...new Set(moviesData.map(m => m.year))].sort((a,b) => b - a);
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

function initCharts() {
    // Shared chart options for a clean look
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        }
    };

    // Year Chart (Line)
    const ctxYear = document.getElementById('chart-year').getContext('2d');
    chartYear = new Chart(ctxYear, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            ...commonOptions,
            scales: {
                x: { title: { display: true, text: 'Ano Lançamento' }, grid: { display: false } },
                y: { title: { display: true, text: 'Contagem' }, grid: { color: '#F0F0F0' }, beginAtZero: true }
            },
            elements: { line: { tension: 0.3, borderColor: '#85C1E9', borderWidth: 2 }, point: { radius: 0 } }
        }
    });

    // Genre Chart (Bar)
    const ctxGenre = document.getElementById('chart-genre').getContext('2d');
    chartGenre = new Chart(ctxGenre, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: {
            ...commonOptions,
            scales: {
                x: { title: { display: true, text: 'Generos' }, grid: { display: false } },
                y: { title: { display: true, text: 'Contagem' }, grid: { color: '#F0F0F0' }, beginAtZero: true }
            }
        }
    });

    // Scatter Chart
    const ctxScatter = document.getElementById('chart-scatter').getContext('2d');
    chartScatter = new Chart(ctxScatter, {
        type: 'scatter',
        data: { datasets: [] },
        options: {
            ...commonOptions,
            scales: {
                x: { title: { display: true, text: 'Num Ratings' }, grid: { color: '#F0F0F0' } },
                y: { title: { display: true, text: 'Avg Rating' }, grid: { color: '#F0F0F0' } }
            }
        }
    });
}

function updateDashboard() {
    const fYear = document.getElementById('filter-year').value;
    const fGenre = document.getElementById('filter-genre').value;
    const fRating = document.getElementById('filter-rating').value;

    // Filter Data
    const filteredData = moviesData.filter(m => {
        if (fYear !== 'all' && m.year !== parseInt(fYear)) return false;
        if (fGenre !== 'all' && m.genre !== fGenre) return false;
        if (fRating !== 'all' && m.rating < parseFloat(fRating)) return false;
        return true;
    });

    // Update KPIs
    updateKPIs(filteredData);
    
    // Update Charts
    updateYearChart(filteredData);
    updateGenreChart(filteredData);
    updateScatterChart(filteredData);
    updateTopMovies(filteredData);
}

function updateKPIs(data) {
    const totalMovies = data.length;
    const totalReviews = data.reduce((sum, m) => sum + m.review_count, 0);
    const totalUsers = data.reduce((sum, m) => sum + m.user_count, 0);

    document.getElementById('kpi-movies').textContent = formatNumber(totalMovies);
    document.getElementById('kpi-reviews').textContent = formatNumber(totalReviews);
    document.getElementById('kpi-users').textContent = formatNumber(totalUsers);
}

function updateYearChart(data) {
    const yearCounts = {};
    data.forEach(m => {
        yearCounts[m.year] = (yearCounts[m.year] || 0) + 1;
    });

    const sortedYears = Object.keys(yearCounts).map(Number).sort((a,b) => a - b);
    const counts = sortedYears.map(y => yearCounts[y]);

    chartYear.data.labels = sortedYears;
    chartYear.data.datasets = [{
        data: counts,
        backgroundColor: 'rgba(133, 193, 233, 0.2)',
        borderColor: '#85C1E9',
        borderWidth: 2,
        fill: true
    }];
    chartYear.update();
}

function updateGenreChart(data) {
    const genreCounts = {};
    data.forEach(m => {
        genreCounts[m.genre] = (genreCounts[m.genre] || 0) + 1;
    });

    const sortedGenres = Object.keys(genreCounts).sort((a,b) => genreCounts[b] - genreCounts[a]);
    const counts = sortedGenres.map(g => genreCounts[g]);

    chartGenre.data.labels = sortedGenres;
    chartGenre.data.datasets = [{
        data: counts,
        backgroundColor: '#F5B041',
        borderRadius: 4
    }];
    chartGenre.update();
}

function updateScatterChart(data) {
    const scatterPoints = data.map(m => ({
        x: m.review_count,
        y: m.rating
    }));

    chartScatter.data.datasets = [{
        data: scatterPoints,
        backgroundColor: 'rgba(93, 173, 226, 0.6)',
        borderColor: '#3498DB',
        pointRadius: 4,
        pointHoverRadius: 6
    }];
    chartScatter.update();
}

function updateTopMovies(data) {
    // Sort by rating then by popularity
    const top = [...data].sort((a, b) => {
        if (b.rating === a.rating) {
            return b.review_count - a.review_count;
        }
        return b.rating - a.rating;
    }).slice(0, 5);

    const tbody = document.getElementById('top-movies-tbody');
    tbody.innerHTML = '';

    top.forEach(m => {
        const tr = document.createElement('tr');
        
        const tdId = document.createElement('td');
        tdId.textContent = m.id.toLocaleString();
        tr.appendChild(tdId);

        const tdTitle = document.createElement('td');
        tdTitle.textContent = m.title;
        tr.appendChild(tdTitle);

        tbody.appendChild(tr);
    });
}

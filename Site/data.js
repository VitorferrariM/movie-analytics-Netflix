const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance'];
const movieTitles = ['The Great', 'Return of', 'Last', 'Secret of', 'Day of', 'Journey to', 'Rise of', 'Fall of', 'Attack of', 'Legend of'];
const movieNouns = ['King', 'Queen', 'Empire', 'Shadow', 'Light', 'Darkness', 'Hero', 'Villain', 'Alien', 'Ghost', 'Knight'];

function generateMockData(numRecords) {
    const data = [];
    for (let i = 0; i < numRecords; i++) {
        // Skew years to have more recent movies (power of 2)
        let yearBias = Math.random(); 
        let year = 1950 + Math.floor((yearBias * yearBias) * 74); 
        
        // Slightly skewed ratings
        let RatingBias = Math.random();
        let rating = 0.5 + Math.random() * 1.5 + (RatingBias * RatingBias) * 3; 
        if(rating > 5) rating = 5;
        
        // Popular movies tend to have higher ratings and exponentially more reviews
        let reviews = Math.floor(Math.random() * 500 * (rating)); 
        if (rating > 4) reviews += Math.floor(Math.random() * 5000);
        
        data.push({
            id: Math.floor(10000 + Math.random() * 900000),
            title: `${movieTitles[Math.floor(Math.random()*movieTitles.length)]} ${movieNouns[Math.floor(Math.random()*movieNouns.length)]} (${year})`,
            year: year,
            genre: genres[Math.floor(Math.random() * genres.length)],
            rating: Number(rating.toFixed(1)),
            review_count: reviews,
            user_count: Math.floor(reviews * (0.8 + Math.random() * 0.7)) // mock users
        });
    }
    return data;
}

// Generate 2000 mock movie records
const moviesData = generateMockData(2000);

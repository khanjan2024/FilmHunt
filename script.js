const apiKey = '675a58c2';  // Replace with your actual OMDb API key
const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const movieResults = document.getElementById('movieResults');
const spinner = document.getElementById('loadingSpinner');

searchButton.addEventListener('click', function() {
    const movieTitle = movieInput.value;

    // Show an alert if input is empty
    if (movieTitle.trim() === '') {
        alert('Please enter a movie name!');
        return;
    }

    // Show loading spinner
    spinner.style.display = 'block';
    
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Hide the spinner
            spinner.style.display = 'none';

            // Clear previous results
            movieResults.innerHTML = '';

            if (data.Response === "False") {
                movieResults.innerHTML = `<p>Movie not found: ${data.Error}</p>`;
            } else {
                movieResults.innerHTML = `
                    <h2>${data.Title} (${data.Year})</h2>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                `;
                
                if (data.Poster !== "N/A") {
                    movieResults.innerHTML += `<img src="${data.Poster}" alt="${data.Title} poster">`;
                } else {
                    movieResults.innerHTML += `<p>No poster available for this movie.</p>`;
                }
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            movieResults.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

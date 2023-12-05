const btn = document.getElementById('searchBtn');

btn.addEventListener('click', () => {
    const inputValue = document.getElementById('search').value;
    const apiKey = 'e6144c9ea38901cf729576cfb919b94a';
    // axios
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${apiKey}`)
        .then((response) => {
            const weatherData = response.data;
            //access to details
            // declaring lets for every data
            let temp = weatherData.main.temp;
            let icon = weatherData.weather[0].icon;
            let description = weatherData.weather[0].description;
            let name = weatherData.name;
            let humidity = weatherData.main.humidity;
            document.getElementById('container').innerHTML = `
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
            <h4>${name}</h4>
            <p>${description}</p>
            <p>${temp}&#8451; || ${humidity}%</p>
            `;
        })
        .catch((error) => console.log(error));
}); 
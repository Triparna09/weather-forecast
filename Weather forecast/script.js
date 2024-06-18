let appId = '71f6779186cc32448b4c412eea65b982';
/**/
let units = 'metric';
let searchMethod; // q means searching as a string.
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
        });
}

function init(resultFromServer) {
    let backgroundVideo = document.getElementById('backgroundVideo');
    let videoSource = '';

    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('clearPicture.jpg')";
            // videoSource = 'video/clearSky.mp4'; 
            //if you want you can add clear sky video based on your laptop sceen ratio then comment out the image part, your video will play automatically.
            break;

        case 'Clouds':
            videoSource = 'video/CloudsTimelapse.mp4';
            break;

        case 'Rain':
        case 'Drizzle':
            videoSource = 'video/RainSounds.mp4';
            break;

        case 'Mist':
            videoSource = 'video/mist.mp4';
            break;

        case 'Thunderstorm':
            videoSource = 'video/thunderStorm2.mp4';
            break;

        case 'Snow':
            videoSource = 'video/snowfall.mp4';
            break;
        case 'Smoke':
        case 'Haze':
            videoSource = 'video/Haze.mp4';
            break;

        default:
            break;
    }

    if (videoSource) {
        backgroundVideo.src = videoSource;
        backgroundVideo.style.display = 'block';
    } else {
        backgroundVideo.style.display = 'none';
    }


    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '°c';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' km/h';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity: ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
});
const input = document.querySelector('input')
const buttonWyslij = document.querySelector('.wyslij')
const buttonMojaLokalizacja = document.querySelector('.buttonMojaLokalizacja')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')


const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=abc742bc2dfbebd91a304bceb26fda90';
const API_UNITS = '&units=metric';

const API_LOC = 'https://ipinfo.io/89.78.122.187/json';
let API_IP = ''
const API_TOKEN = '?token=d0617c939be637';
let myLocation = "";

const getLocation = () => {
    const url = API_LOC + API_TOKEN;
    axios.get(url)
        .then(res => { myLocation = res.data.city; getWheather(); })
        .catch(err => console.error(err))
}
getLocation();

const getWheather = () => {
    const city = input.value || myLocation || 'New York';
    const URL = API_LINK + city + API_KEY + API_UNITS;

    axios.get(URL)
        .then(res => {
            // console.log(res.data);
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const name = res.data.name;
            // const weath = res.data.weather[0].main;
            const status = Object.assign({}, ...res.data.weather);



            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + " ℃";
            humidity.textContent = hum + " %";
            cityName.textContent = name;

            if (status.id >= 801 && status.id <= 804) {
                photo.setAttribute('src', './img/cloud.png')
            } else if (status.id === 800) {
                photo.setAttribute('src', './img/sun.png')
            } else if (status.id >= 500 && status.id <= 531) {
                photo.setAttribute('src', './img/rain.png')
            }
            else if (status.id >= 300 && status.id <= 321) {
                photo.setAttribute('src', './img/drizzle.png')
            }
            else if (status.id >= 701 && status.id <= 781) {
                photo.setAttribute('src', './img/fog.png')
            }
            else if (status.id >= 600 && status.id <= 622) {
                photo.setAttribute('src', './img/ice.png')
            }
            else if (status.id >= 200 && status.id <= 232) {
                photo.setAttribute('src', './img/thunderstorm.png')
            }
            input.value = ""
            warning.textContent = ""

        })
        .catch(err => warning.textContent = err)
}

const enterCheck = (e, status) => {
    if (e.key === "Enter") {
        getWheather();
    }
}

input.addEventListener('keydown', enterCheck)
buttonWyslij.addEventListener('click', getWheather);
buttonMojaLokalizacja.addEventListener('click', getLocation);
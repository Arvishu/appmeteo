const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
    "Fog": "wi wi-day-fog",
    "Haze": "wi wi-day-haze"
}
const windForceIcons = {
    "0": "wi wi-wind-beaufort-0",
    "1": "wi wi-wind-beaufort-1",
    "2": "wi wi-wind-beaufort-2",
    "3": "wi wi-wind-beaufort-3",
    "4": "wi wi-wind-beaufort-4",
    "5": "wi wi-wind-beaufort-5",
    "6": "wi wi-wind-beaufort-6",
    "7": "wi wi-wind-beaufort-7",
    "8": "wi wi-wind-beaufort-8",
    "9": "wi wi-wind-beaufort-9",
    "10": "wi wi-wind-beaufort-10",
    "11": "wi wi-wind-beaufort-11",
    "12": "wi wi-wind-beaufort-12",
}


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function main(withIp = true) {

    let ville;
    if (withIp) {


        //récupérer l'adresse ip du pc via api ipify
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then(json => json.ip)
        console.log("mon ip", ip)

        ville = await fetch(`https://api.ipstack.com/${ip}?access_key=2f5508a6ed2955cc128206339362e936&output=json`)
            .then(resultat => resultat.json())
            .then(json => json.city)
        console.log("ma ville", ville);

    } else {
        ville = document.querySelector('#ville').textContent;
    }

    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=defeafed2cc61f726191fd8cb1e462b1&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)

    console.log("ma meteo", meteo);
    displayMeteoInfos(meteo);
    displayWindInfos(meteo);
}

function displayMeteoInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;



    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#description').textContent = capitalize(description);
    document.querySelector('#conditions').className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();
}


function displayWindInfos(data) {
    const windFrom = data.wind.deg.toString();
    const windForce = Math.round(data.wind.speed).toString();
    const windSpeed = Math.round(3 * (Math.pow((data.wind.speed), 3 / 2)))
    
    document.querySelector('#windForce').className = windForceIcons[windForce];
    document.querySelector('#windSpeed').textContent = windSpeed + " Km/h";
    document.querySelector('#windFromIcons').className = windDirections(windFrom);
    console.log(windFrom)
    function windDirections(windFrom) {
        if (windFrom <45) {
            return windFromIcons = "wi wi-wind-direction wi-rotate-180";
        }else if(windFrom <135){
            return windFromIcons = "wi wi-wind-direction wi-rotate-270";
        } else if (windFrom <225){
            return windFromIcons = "wi wi-wind-direction wi-rotate-90";
        }else if (windFrom <=360){
            return windFromIcons = "wi wi-wind-direction wi-rotate-180";
        }else if(windFrom = ''){
            return windFromIcons = "wi wi-na";
        }else{
            return windFromIcons = "wi wi-na";
        }


    }
}


const ville = document.querySelector('#ville');
ville.addEventListener('click', () => {
    ville.contentEditable = true;
});
ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false);

    }
})

main();



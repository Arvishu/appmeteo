const weatherIcons= {
    "Rain" : "wi wi-day-rain",
    "Clouds" :"wi wi-day-cloudy",
    "Clear":"wi wi-day-sunny",
    "Snow":"wi wi-day-snow",
    "Mist":"wi wi-day-fog",
    "Drizzle":"wi wi-day-sleet",
    "Fog":"wi wi-day-fog",
}


function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function main(withIp = true){

let ville;
if(withIp){


//récupérer l'adresse ip du pc via api ipify
const ip =await fetch ('https://api.ipify.org?format=json')
.then(resultat => resultat.json())
.then(json => json.ip)
console.log("mon ip",ip)

ville = await fetch(`http://api.ipstack.com/${ip}?access_key=2f5508a6ed2955cc128206339362e936&output=json`)
.then (resultat => resultat.json())
.then(json => json.city)
console.log("ma ville",ville);

}else{
    ville = document.querySelector('#ville').textContent;
}

const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=defeafed2cc61f726191fd8cb1e462b1&lang=fr&units=metric`)
.then(resultat => resultat.json())
.then(json => json)

console.log("ma meteo",meteo);
displayMeteoInfos(meteo);
}

function displayMeteoInfos(data){
    const name =data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    


    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#description').textContent = capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();
}

const ville = document.querySelector('#ville');
ville.addEventListener('click', () => {
    ville.contentEditable = true;
});
ville.addEventListener('keydown',(e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable =false;
        main(false);

    }
})

main ()


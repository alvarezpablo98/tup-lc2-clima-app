const sectionWeatherResult = document.querySelector('#section-weather-result') // contenido clima tarjeta
const ciudadSeleccionada = document.querySelector('#seleccionar-ciudad') // select
const formulario = document.querySelector('#form-city-list') //formulario input + boton enviar


datos = {
  city: ''
}

ciudadSeleccionada.addEventListener('input', (e) => {
    // console.log(e.target.value)
    datos.city = e.target.value // el valor del options
    console.log(datos)
})


formulario.addEventListener('submit', (e) => {
    e.preventDefault() //para que no reinicie la pagina
    sectionWeatherResult.innerHTML = `<div class="spinner"></div>`
    const { city } = datos
    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=687d1099143cc3af1c1b50f25bbea436`
    fetch(url) //extraer de la url/api
        .then(response => {
            return response.json()})
        .then(data => {
            // console.log(data)
            //para iconos dinámicos
            let iconoAnimado
            console.log(data.weather[0].main)
            console.log(data)
            switch (data.weather[0].main) {
                case 'Thunderstorm':
                  iconoAnimado ='./animated/thunder.svg'
                  console.log('TORMENTA');
                  break;
                case 'Drizzle':
                  iconoAnimado ='./animated/rainy-2.svg'
                  console.log('LLOVIZNA');
                  break;
                case 'Rain':
                  iconoAnimado ='./animated/rainy-7.svg'
                  console.log('LLUVIA');
                  break;
                case 'Snow':
                  iconoAnimado ='./animated/snowy-6.svg'
                    console.log('NIEVE');
                  break;                        
                case 'Clear':
                    iconoAnimado ='./animated/day.svg'
                    console.log('LIMPIO');
                  break;
                case 'Atmosphere':
                  iconoAnimado ='./animated/weather.svg'
                    console.log('ATMOSFERA');
                    break;  
                case 'Clouds':
                    iconoAnimado ='./animated/cloudy-day-1.svg'
                    console.log('NUBES');
                    break;  
                default:
                  iconoAnimado ='./animated/cloudy-day-1.svg'
                  console.log('por defecto');
              }
            sectionWeatherResult.innerHTML = `<div class="card">
            <h3>${data.name}</h3>
            <img style="width: 85px", "height: 85px" src="${iconoAnimado}" alt="">
            <p>Temperatura: ${data.main.temp}° C</p>
            <p>Sensación térmica: ${data.main.feels_like}° C</p>
            <p>Humedad: ${data.main.humidity}°</p>
            <p>Velocidad del viento: ${data.wind.speed}km/h</p>
            <p>Presión: ${data.main.pressure} P</p>
        </div>`
        })
        .catch(error => console.log(error))
    
})


const AgregarCiudades = () => {
    const arrayCiudades = JSON.parse(localStorage.getItem('ciudad'))//de json lo paso a objeto
    console.log(arrayCiudades)
    if (arrayCiudades === null) {
        arrayCiudades = []
    } else {
        arrayCiudades.forEach((element) => { //recorre el array
          console.log(element)
          option = document.createElement('OPTION')
          option.value = `${element}`
          option.textContent = `${element}`
          console.log(option)
          ciudadSeleccionada.appendChild(option)// para meterlo
        });
    }


}

document.addEventListener('DOMContentLoaded', AgregarCiudades)





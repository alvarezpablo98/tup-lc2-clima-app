const formulario = document.querySelector('#form-city-list')  // formulario
const sectionWeatherResult = document.querySelector('#section-weather-result') // mensaje
const ciudadIngresada = document.querySelector('#ciudad-ingresada') // input


datos = {
    city:''
}

ciudadIngresada.addEventListener('input', (e) => {
    datos.city = e.target.value
    console.log(datos)
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    sectionWeatherResult.innerHTML = `<div class="spinner"></div>`
    const { city } = datos //desestructuro

    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=687d1099143cc3af1c1b50f25bbea436`

    fetch(url) //f asincrona
        .then(response => {
            return response.json()})
        .then(data => {
            console.log(data)
            if (data.message === 'city not found') {
                sectionWeatherResult.innerHTML = `<p class="error">Error: La ciudad ingresada no se encuentra en la API o se produjo un error al consultar</p>`
                setTimeout( () => {
                    sectionWeatherResult.innerHTML = ``
                }, 3000)
            } else {
                let flag = 0
                const arrayCities = getCitiesFromLocalStorage()
                console.log(arrayCities)
                arrayCities.forEach( element => {
                    if (element.toUpperCase() === city.toUpperCase()) {
                        console.log("entro en arraycity")
                        flag = 1
                        sectionWeatherResult.innerHTML = `<p class="full">La ciudad ingresada ya se encuentra almacenada</p>`
                        setTimeout( () => {
                            sectionWeatherResult.innerHTML = ``
                        }, 3000)
                    }
                })
                if (flag === 0) {
                    console.log("flag0")
                    addNewCityToLocalStorage(city)
                    sectionWeatherResult.innerHTML = `<p class="success">Ciudad agregada con éxito</p>`
                    setTimeout( () => {
                        sectionWeatherResult.innerHTML = ``
                    }, 3000)
                    
                }
                
            }
        })
        .catch(error => console.log(error))

})

function getCitiesFromLocalStorage() {
    let arrayCiudades = JSON.parse(localStorage.getItem('ciudad'))//de js lo paso a string
    if (arrayCiudades === null) {
        arrayCiudades = []
    }
    return arrayCiudades
}

function addNewCityToLocalStorage(city) {
    let arrayCiudades = getCitiesFromLocalStorage();
    arrayCiudades.push(city);
    localStorage.setItem("ciudad", JSON.stringify(arrayCiudades)); //Actualizar
}

document.addEventListener('DOMContentLoaded', getCitiesFromLocalStorage)


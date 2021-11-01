const axios = require('axios');


class Busquedas{
    historial = []

    constructor(){
        // TODO: leer DB si existe
    }

    async ciudad ( lugar = ''){
        //petición http
        try {
           
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
                    'limit':15,
                    'access_token':process.env.MAPBOX
                }
            })

            const resp = await intance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lat: lugar.center[0],
                long: lugar.center[1]
            }))

            
        } catch(e){
            throw e;
        }    
    }

    async climaLugar(lat, lon){
        try {
            


            const intance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params:{
                    'lat':lat,
                    'lon':lon,
                    'appid':process.env.CLIMA_KEY,
                    'units': 'imperial',
                    'lang': 'es'
                }

            })
            const resp = await intance.get();
            
            
            return {
                desc: resp.data.weather[0]['description'],
                min: resp.data.main['temp_min'],
                max: resp.data.main['temp_max'],
                temp: resp.data.main['temp']
            } 
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Busquedas;
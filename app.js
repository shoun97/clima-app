require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {

    const busquedas = new Busquedas();
    let opt;
    
    do {
        
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                //mostrar mensaje

                const lugar = await leerInput('Ciudad: ');

                //Buscar los lugares
                const lugares = await busquedas.ciudad(lugar);
               
                //Seleccionar el lugar
                const id = await listarLugares(lugares)
                const lugarSel = lugares.find(l => l.id === id);
                //Clima
                
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.long);

                

                //Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:      ', '',lugarSel.nombre.red);
                console.log('Lat:         ', lugarSel.lat);
                console.log('Long:        ', lugarSel.long);
                console.log('Temperatura: ', clima.temp.toString().blue,'Celsius'.magenta);
                console.log('Mínima:      ', clima.min.toString().cyan,'Celsius'.magenta);
                console.log('Máxima:      ', clima.max.toString().red,'Celsius'.magenta);
                console.log('El clima:    ', '',clima.desc.cyan)
            break;
        }

        if(opt !== 0) await pausa();
    } while (opt !== 0);



}

main();
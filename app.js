const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer')

const main = async () => {
    let opt;
    
    do {
        
        opt = await inquirerMenu()

        await pausa();


    } while (opt !== 0);
}

main();
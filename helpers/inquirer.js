const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desa hacer?',
        choices: [
            {
                value: 1,
                name: '1'.green + '. Buscar Ciudad'
            },
            {
                value: 2,
                name: '2'.green + '. Historial'
            },
            {
                value: 0,
                name: '0'.green + '. Salir'
            }
        ]
    }
]


const inquirerMenu = async() => {
    console.clear();
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX'.trap.yellow)
    console.log('  Clima app'.cyan.trap)
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX'.trap.yellow)
    
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para Continuar`
        }
        
    ]
    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc}= await inquirer.prompt(question)
    return desc;
}

const listadoTareasBorrar = async( tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.green + '. Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id
}

const confirmar = async(message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(preguntas);
    return ok;
}

const mostrarListadoChecklist = async( tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas);
    return ids
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
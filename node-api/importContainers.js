const containerCod = require('./container_cod.json')
const Container = require('./models/container')
const { v4: uuidv4 } = require('uuid');
const bd = require('./bd/ligacao');

const rotas = []

containerCod.forEach(item => {
    try {

        const string = item.ecopont_tipo.split('.')

        if ((string[1] + string[2]) === "C16" ||
            (string[1] + string[2]) === "C04" || (string[1] + string[2]) === "R16") {
            const _id = uuidv4();
            const newContainer = new Container({
                _id,
                container_cod: item.ecopont_tipo,
                gpsLocation: item.ecopont_coord_latitude + ";" + item.ecopont_coord_longitude,
                adress: "Viana",
            })

            rotas.push(newContainer)

        }
    } catch (error) {
        console.log(error)
    }


})




Container.insertMany(rotas, (err) => {
    console.log(err)
})
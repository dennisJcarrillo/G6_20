'use strict'

var VueloModel = require('../models/vuelo-model'),
VueloController = () =>{}

VueloController.getAll = (req, res, next) => {
    VueloModel.getAll((err, rows) => {
        if (err) 
        {
            let locals = {
                title: 'Error al consultar la base de datos',
                description: 'Error de Sintaxis SQL',
                error: err
            };
            res.render('error', locals)
        }
        else 
        {
            let locals = {
                title: 'Lista de Vuelos',
                data: rows
            }
            res.status(200).send(rows.rows)

        }
    })
}

VueloController.getOne = (req, res, next) => {
    VueloModel.getOne((err, rows) => {
        if (err) 
        {
            let locals = {
                title: 'Error al consultar la base de datos',
                description: 'Error de Sintaxis SQL',
                error: err
            };
            res.render('error', locals)
        }
        else 
        {
            let locals = {
                title: 'Lista de Vuelos',
                data: rows
            }
            res.status(200).send(rows.rows)

        }
    })
}

VueloController.post = (req, res, next) => {
    let vuelo = {
        codigo_vuelo : req.body.codigo_vuelo,
        ciudad_origen : req.body.ciudad_origen,
        ciudad_destino : req.body.ciudad_destino,
        fecha_vuelo: req.body.fecha_vuelo,
        cantidad_pasajeros : req.body.cantidad_pasajeros,
        tipo_avion : req.body.tipo_avion,
        distancia : req.body.distancia
    }

    console.log(vuelo)

    VueloModel.post(vuelo, (err) => {
        if (err) 
        {
            let locals = {
                title: `Error al salvar el registro con el id: ${vuelo.codigo_vuelo}`,
                description: 'Error de Sintaxis SQL',
                error: err
            }
            res.status(520).json(err);
        }
        else
        {
            res.send('Vuelo ingresado de forma correcta')
        }
        
    })
}




VueloController.put = (req, res, next) => {
    let vuelo = {
        codigo_vuelo : req.body.codigo_vuelo,
        ciudad_origen : req.body.ciudad_origen,
        ciudad_destino : req.body.ciudad_destino,
        fecha_vuelo: req.body.fecha_vuelo,
        cantidad_pasajeros : req.body.cantidad_pasajeros,
        tipo_avion : req.body.tipo_avion,
        distancia : req.body.distancia
    }

    console.log(vuelo)

    VueloModel.put(vuelo, (err) => {
        if (err) 
        {
            let locals = {
                title: `Error al actualizar el registro con el id: ${vuelo.codigo_vuelo}`,
                description: 'Error de Sintaxis SQL',
                error: err
            }
            res.status(520).json(err);
        }
        else
        {
            res.send('Vuelo actualizado de forma correcta')
        }
        
    })
}

VueloController.delete = (req, res, next) => {
    let p_codigo_vuelo = req.params.p_codigo_vuelo
    console.log(p_codigo_vuelo)

    VueloModel.delete(p_codigo_vuelo, (err, rows) => {
        console.log(err, '---', rows)
        if (err) {
            let locals = {
                title: `Error al eliminar el registro con el id: ${p_codigo_vuelo}`,
                description:"Error de Sintaxis SQL",
                error: err
            }
        }
        else
        {
            res.send('Vuelo Eliminado de Forma Correcta')
        }
    })
}


VueloController.addForm = (req, res, next) =>
res.render('add-vuelo', {title: 'Agregar Vuelo'})

VueloController.error404 = (req, res, next) => {
    let error = new error(),
        locals = {
            title: 'Error 404',
            description: 'Recurso No Encontrado',
            error: error
        }
    error.status = 404

    res.render('error', locals)

    next()
}


module.exports = VueloController
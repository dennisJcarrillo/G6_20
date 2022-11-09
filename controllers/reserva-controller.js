'use strict'

var ReservaModel = require('../models/reserva-model'),
ReservaController = () =>{}

ReservaController.getAll = (req, res, next) => {
    ReservaModel.getAll((err, rows) => {
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
                title: 'Lista de Reservas',
                data: rows
            }
            res.status(200).send(rows.rows)

        }
    })
}

ReservaController.getOne = (req, res, next) => {
    let p_numero_reservacion = req.params.numero_reservacion
    ReservaModel.getOne(p_numero_reservacion, (err, rows) => {
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
                title: 'Lista de Reservas',
                data: rows
            }
            res.status(200).send(rows.rows)

        }
    })
}

ReservaController.post = (req, res, next) => {
    let reserva = {
        numero_reservacion : req.body.numero_reservacion,
        codigo_vuelo : req.body.codigo_vuelo,
        codigo_pasajero : req.body.codigo_pasajero,
        nombre_pasajero: req.body.nombre_pasajero,
        ciudad_destino : req.body.ciudad_destino,
        fecha_vuelo : req.body.fecha_vuelo,
        precio_vuelo : req.body.precio_vuelo
    }

    console.log(reserva)

    ReservaModel.post(reserva, (err) => {
        if (err) 
        {
            let locals = {
                title: `Error al salvar el registro con el id: ${reserva.numero_reservacion}`,
                description: 'Error de Sintaxis SQL',
                error: err
            }
            res.status(520).json(err);
        }
        else
        {
            res.send('Reserva ingresada de forma correcta')
        }
        
    })
}




ReservaController.put = (req, res, next) => {
    let reserva = {
        numero_reservacion : req.body.numero_reservacion,
        codigo_vuelo : req.body.codigo_vuelo,
        codigo_pasajero : req.body.codigo_pasajero,
        nombre_pasajero: req.body.nombre_pasajero,
        ciudad_destino : req.body.ciudad_destino,
        fecha_vuelo : req.body.fecha_vuelo,
        precio_vuelo : req.body.precio_vuelo
    }

    console.log(reserva)

    ReservaModel.put(reserva, (err) => {
        if (err) 
        {
            let locals = {
                title: `Error al actualizar el registro con el id: ${reserva.numero_reservacion}`,
                description: 'Error de Sintaxis SQL',
                error: err
            }
            res.status(520).json(err);
        }
        else
        {
            res.send('Reserva actualizada de forma correcta')
        }
        
    })
}

ReservaController.delete = (req, res, next) => {
    let p_numero_reservacion = req.params.numero_reservacion
    console.log(p_numero_reservacion)

    ReservaModel.delete(p_numero_reservacion, (err, rows) => {
        console.log(err, '---', rows)
        if (err) {
            let locals = {
                title: `Error al eliminar el registro con el id: ${p_numero_reservacion}`,
                description:"Error de Sintaxis SQL",
                error: err
            }
        }
        else
        {
            res.send('Reserva Eliminada de Forma Correcta')
        }
    })
}


ReservaController.addForm = (req, res, next) =>
res.render('add-Reserva', {title: 'Agregar Reserva'})

ReservaController.error404 = (req, res, next) => {
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


module.exports = ReservaController
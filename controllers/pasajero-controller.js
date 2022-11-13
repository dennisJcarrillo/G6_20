'use strict'

var PasajeroModel = require('../models/pasajero-model'),
PasajeroController = () =>{}

PasajeroController.getAll = (req, res, next) => {
  PasajeroModel.getAll((err, rows) => {
    if (err) 
    {
      let locals = {
          title: 'Error al consultar la base de datos',
          description: 'Error de Sintaxis SQL',
          error: err
      };
      res.render('error', locals);
    }
    else 
    {
      let locals = {
          title: 'Lista de Pasajeros',
          data: rows
      }
      res.status(200).send(rows.rows);

    }
  });
}

PasajeroController.getOne = (req, res, next) => {
  let codigo_pasajero = req.body.codigo_pasajero;
  PasajeroModel.getOne(codigo_pasajero, (err, rows) => {
    if (err) 
    {
      let locals = {
          title: 'Error al consultar la base de datos',
          description: 'Error de Sintaxis SQL',
          error: err
      };
      res.render('error', locals);
    }
    else 
    {
      let locals = {
          title: 'Pasajero entontrado!',
          data: rows
      }
      res.status(200).send(rows.rows);
    }
  });
}

PasajeroController.post = (req, res, next) => {
  let pasajero = {
    p_codigo_pasajero : req.body.codigo_pasajero,
    p_nombres : req.body.nombres,
    p_apellidos : req.body.apellidos,
    p_fecha_registro: req.body.fecha_registro,
    p_nacionalidad : req.body.nacionalidad,
    p_numero_telefonico : req.body.numero_telefonico,
    p_email : req.body.email
  }
  console.log(pasajero);
  PasajeroModel.post(pasajero, (err) => {
      if (err) 
      {
          let locals = {
              title: `Error al salvar el registro con el id: ${pasajero.p_codigo_pasajero}`,
              description: 'Error de Sintaxis SQL',
              error: err
          }
          res.status(520).json(err);
      }
      else
      {
          res.send('Pasajero registrado de forma correcta');
      }
  });
}

PasajeroController.put = (req, res, next) => {
    let pasajero = {
        p_codigo_pasajero : req.body.codigo_pasajero,
        p_nombres : req.body.nombres,
        p_apellidos : req.body.apellidos,
        p_fecha_registro: req.body.fecha_registro,
        p_nacionalidad : req.body.nacionalidad,
        p_numero_telefonico : req.body.numero_telefonico,
        p_email : req.body.email
    }
    console.log(pasajero)
    PasajeroModel.put(pasajero, (err) => {
        if (err) 
        {
            let locals = {
                title: `Error al actualizar el registro con el id: ${pasajero.p_codigo_pasajero}`,
                description: 'Error de Sintaxis SQL',
                error: err
            }
            res.status(520).json(err);
        }
        else
        {
            res.send('Pasajero actualizado de forma correcta');
        }
    });
}

PasajeroController.delete = (req, res, next) => {
  let p_codigo_Pasajero = req.body.codigo_pasajero;
  console.log(p_codigo_Pasajero);
  PasajeroModel.delete(p_codigo_Pasajero, (err, rows) => {
    console.log(err, '---', rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${p_codigo_Pasajero}`,
        description:"Error de Sintaxis SQL",
        error: err
      }
    }
    else
    {
      res.send('Pasajero Eliminado de Forma Correcta');
    }
  });
}

PasajeroController.addForm = (req, res, next) =>
  res.render('add-pasajero', {title: 'Agregar Pasajero'})
  PasajeroController.error404 = (req, res, next) => {
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
module.exports = PasajeroController;
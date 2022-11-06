"use strict";

var conn = require('../config/db-connection'),
PasajeroModel = () => {};

PasajeroModel.getAll = (cb) => conn.query("SELECT * FROM PASAJERO ORDER BY codigo_pasajero;", cb);

PasajeroModel.getOne = (cod_pasajero, cb) => 
    conn.query("SELECT * FROM PASAJERO WHERE codigo_pasajero = $1", [cod_pasajero], cb);

PasajeroModel.post = (data, cb) =>
    conn.query("call public.sp_pasajero_insert($1, $2, $3, $4,$5, $6, $7)",
    [
        data.p_codigo_pasajero,
        data.p_nombres,
        data.p_apellidos,
        data.p_fecha_registro,
        data.p_nacionalidad,
        data.p_numero_telefonico,
        data.p_email
    ], cb);

PasajeroModel.put = (data, cb) =>
conn.query ("call public.sp_pasajero_update($1, $2, $3, $4, $5, $6, $7)",
[
    data.p_codigo_pasajero,
    data.p_nombres,
    data.p_apellidos,
    data.p_fecha_registro,
    data.p_nacionalidad,
    data.p_numero_telefonico,
    data.p_email
], cb);

PasajeroModel.delete = (cod_pasajero, cb) => conn.query ("call sp_pasajero_delete($1)", [cod_pasajero], cb);

module.exports = PasajeroModel;
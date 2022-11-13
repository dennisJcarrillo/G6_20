"use strict";

var conn = require('../config/db-connection'),
ReservaModel = () => {};


ReservaModel.getAll = (cb) => conn.query("SELECT * FROM RESERVA", cb);

ReservaModel.getOne = (numero_reservacion, cb) => 
    conn.query("SELECT * FROM RESERVA WHERE numero_reservacion= $1", [numero_reservacion], cb);

ReservaModel.post = (data, cb) =>
    conn.query("call public.sp_reserva_insert ($1,$2,$3,$4,$5,$6,$7)",
    [
        data.numero_reservacion,
        data.codigo_vuelo,
        data.codigo_pasajero,
        data.nombre_pasajero,
        data.ciudad_destino,
        data.fecha_vuelo,
        data.precio_vuelo
    ],
    cb);


ReservaModel.put = (data, cb) =>
conn.query("call public.sp_reserva_update ($1,$2,$3,$4,$5,$6,$7)",
[
    data.numero_reservacion,
    data.codigo_vuelo,
    data.codigo_pasajero,
    data.nombre_pasajero,
    data.ciudad_destino,
    data.fecha_vuelo,
    data.precio_vuelo
],
cb);

ReservaModel.delete = (numero_reservacion, cb) =>
    conn.query(
        "call public.sp_reserva_delete($1)", [numero_reservacion], cb
    );

module.exports = ReservaModel
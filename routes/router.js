"use strict";
//LAS RUTAS
var  PasajeroController = require("../controllers/pasajero-controller")
var  VueloController = require("../controllers/vuelo-controller"),
  express = require("express"),
  router = express.Router();

router
  //****ALUMNO EJEMPLO****
  .get("/vuelo/getall", VueloController.getAll)
  .get("/vuelo/getone/:codigo_vuelo", VueloController.getOne)
  .post("/vuelo/insertar/:codigo_vuelo", VueloController.post)
  .put("/vuelo/actualizar/:codigo_vuelo", VueloController.put)
  .delete("/vuelo/eliminar/:codigo_vuelo", VueloController.delete)

  //****RUTAS ENTIDAD PASAJERO****
  .get("/pasajero/getAll", PasajeroController.getAll)
  .get("/pasajero/getOne/:codigo_pasajero", PasajeroController.getOne)
  .post("/pasajero/insertar/:codigo_pasajero", PasajeroController.post)
  .put("/pasajero/actualizar/:codigo_pasajero", PasajeroController.put)
  .delete("/pasajero/eliminar/:codigo_pasajero", PasajeroController.delete)
  .use(PasajeroController.error404)
  .use(VueloController.error404);

module.exports = router;

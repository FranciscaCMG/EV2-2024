package cl.usach.ms_vehiculos.controllers;


import cl.usach.ms_vehiculos.entities.VehiculoEntity;
import cl.usach.ms_vehiculos.services.VehiculoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehiculo")
@CrossOrigin("*")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    @PostMapping("/guardar")
    public ResponseEntity<VehiculoEntity> guardarVehiculo(@RequestBody VehiculoEntity vehiculo) {
        VehiculoEntity vehiculoGuardado = vehiculoService.guardarVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculoGuardado);
    }

}

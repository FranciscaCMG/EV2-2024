package cl.usach.ms_reparaciones.controllers;

import cl.usach.ms_reparaciones.entities.ReparacionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cl.usach.ms_reparaciones.services.ReparacionService;

@RestController
@RequestMapping("/reparacion")
@CrossOrigin("*")
public class ReparacionController {
    @Autowired
    private ReparacionService reparacionService;

    @PostMapping("/guardar")
    public ResponseEntity<ReparacionEntity> guardarReparacion(@RequestBody ReparacionEntity reparacion) {
        ReparacionEntity reparacionGuardado = reparacionService.guardarReparacion(reparacion);
        return ResponseEntity.ok(reparacionGuardado);
    }
}

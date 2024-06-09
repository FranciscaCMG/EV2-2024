package cl.usach.ms_reparaciones.controllers;

import cl.usach.ms_reparaciones.entities.ReparacionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cl.usach.ms_reparaciones.services.ReparacionService;

import java.util.List;

@RestController
@RequestMapping("/reparacion")
@CrossOrigin("*")
public class ReparacionController {
    @Autowired
    private ReparacionService reparacionService;

    @GetMapping
    public ResponseEntity<List<ReparacionEntity>> getAll() {
        List<ReparacionEntity> reparaciones = reparacionService.getAll();
        if(reparaciones.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(reparaciones);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReparacionEntity> getById(@PathVariable ("id") int id) {
        ReparacionEntity reparacion = reparacionService.getReparacionById(id);
        if(reparacion == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(reparacion);
    }

    @PostMapping()
    public ResponseEntity<ReparacionEntity> save(@RequestBody ReparacionEntity reparacion) {
        ReparacionEntity reparacionNew = reparacionService.saveReparacion(reparacion);
        return ResponseEntity.ok(reparacionNew);
    }
}

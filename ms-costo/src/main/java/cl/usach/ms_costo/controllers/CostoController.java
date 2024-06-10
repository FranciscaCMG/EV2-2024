package cl.usach.ms_costo.controllers;

import cl.usach.ms_costo.entities.CostoEntity;
import cl.usach.ms_costo.model.Reparacion;
import cl.usach.ms_costo.model.Vehiculo;
import cl.usach.ms_costo.services.CostoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/costo")
@CrossOrigin("*")
public class CostoController {

    @Autowired
    private CostoService costoService;

    @GetMapping
    public ResponseEntity<List<CostoEntity>> getAll() {
        List<CostoEntity> costos = costoService.getAll();
        if (costos.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(costos);
    }

    @GetMapping("/{patente}")
    public ResponseEntity<CostoEntity> getById(@PathVariable("patente") String patente) {
        CostoEntity costo = costoService.getCostoById(patente);
        if (costo == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(costo);
    }

    @PostMapping()
    public ResponseEntity<CostoEntity> save(@RequestBody CostoEntity costo) {
        CostoEntity costoNew = costoService.saveCosto(costo);
        return ResponseEntity.ok(costoNew);
    }

    @PostMapping("/savevehiculo")
    public ResponseEntity<Vehiculo> saveVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo vehiculoNew = costoService.saveVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculoNew);
    }

    @PostMapping("/savereparacion")
    public ResponseEntity<Reparacion> saveReparacion(@RequestBody Reparacion reparacion) {
        Reparacion reparacionNew = costoService.saveReparacion(reparacion);
        return ResponseEntity.ok(reparacionNew);
    }

    @PostMapping("/descuentoRe/{patente}/{tipo_motor}")
    public ResponseEntity<Integer> saveDesc(@PathVariable String patente, @PathVariable("tipo_motor") String tipoMotor) {
        Integer descuento = costoService.saveReparacionDesc(patente, tipoMotor);
        return ResponseEntity.ok(descuento);
    }

    @PostMapping("/recargoVe")
    public ResponseEntity<Integer> costoTotal(@RequestBody Vehiculo vehiculo) {
        Integer recargo = costoService.recargoVe(vehiculo);
        return ResponseEntity.ok(recargo);
    }

    @PostMapping("/recargoRe")
    public ResponseEntity<Integer> costoTotal(@RequestBody Reparacion reparacion) {
        Integer recargo = costoService.recargoRe(reparacion);
        return ResponseEntity.ok(recargo);
    }

    @PostMapping("/descuentoDias")
    public ResponseEntity<Integer> descuentoRe(@RequestBody Reparacion reparacion) {
        Integer descuento = costoService.descuentoDias(reparacion);
        return ResponseEntity.ok(descuento);
    }



}

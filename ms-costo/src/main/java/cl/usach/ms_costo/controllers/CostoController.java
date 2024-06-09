package cl.usach.ms_costo.controllers;

import cl.usach.ms_costo.entities.CostoEntity;
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
        if(costos.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(costos);
    }

    @GetMapping("/{patente}")
    public ResponseEntity<CostoEntity> getById(@PathVariable("patente") String patente) {
        CostoEntity costo = costoService.getCostoById(patente);
        if(costo == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(costo);
    }

    @PostMapping()
    public ResponseEntity<CostoEntity> save(@RequestBody CostoEntity costo) {
        CostoEntity costoNew = costoService.saveCosto(costo);
        return ResponseEntity.ok(costoNew);
    }

    @PostMapping("/savevehiculo")
    public ResponseEntity<Vehiculo> saveVehiculo( @RequestBody Vehiculo vehiculo) {
        Vehiculo vehiculoNew = costoService.saveVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculoNew);
    }



}

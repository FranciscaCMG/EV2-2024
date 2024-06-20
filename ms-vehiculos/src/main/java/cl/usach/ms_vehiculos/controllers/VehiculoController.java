package cl.usach.ms_vehiculos.controllers;


import cl.usach.ms_vehiculos.entities.VehiculoEntity;
import cl.usach.ms_vehiculos.services.VehiculoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehiculo")
@CrossOrigin("*")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping
    public ResponseEntity<List<VehiculoEntity>> getAll() {
        List<VehiculoEntity> vehiculos = vehiculoService.getAll();
        if(vehiculos.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/{patente}")
    public ResponseEntity<VehiculoEntity> getById(@PathVariable ("patente") String patente) {
        VehiculoEntity vehiculo = vehiculoService.getVehiculoById(patente);
        if(vehiculo == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(vehiculo);
    }

    @PostMapping()
    public ResponseEntity<VehiculoEntity> save(@RequestBody VehiculoEntity vehiculo) {
        VehiculoEntity vehiculoNew = vehiculoService.saveVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculoNew);
    }

    @DeleteMapping("/eliminar/{patente}")
    public ResponseEntity<VehiculoEntity> eliminarVehiculoPorId(@PathVariable String patente) {
        VehiculoEntity vehiculoEliminado = vehiculoService.eliminarVehiculoPorId(patente);
        return ResponseEntity.ok(vehiculoEliminado);
    }

    @PostMapping("/descuentoBono/{activacion}/{patente}")
    public ResponseEntity<Integer> saveDesc(@PathVariable Boolean activacion, @PathVariable String patente) {
        Integer descuento = vehiculoService.descuentoBono(activacion, patente);
        return ResponseEntity.ok(descuento);
    }


}

package cl.usach.ms_costo.clients;

import cl.usach.ms_costo.model.Vehiculo;
import cl.usach.ms_vehiculos.entities.VehiculoEntity;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "ms-vehiculos", url = "http://localhost:8092")
public interface VehiculoFeignClient {

    @PostMapping("/vehiculo")
    Vehiculo save(@RequestBody Vehiculo vehiculo);
}

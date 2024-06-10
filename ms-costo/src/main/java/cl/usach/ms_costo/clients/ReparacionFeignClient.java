package cl.usach.ms_costo.clients;

import cl.usach.ms_costo.model.Reparacion;
import cl.usach.ms_costo.model.Vehiculo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(value = "ms-reparaciones", url = "http://localhost:8093")
public interface ReparacionFeignClient {
    @PostMapping("/reparacion")
    Reparacion save(@RequestBody Reparacion reparacion);

    @PostMapping("/reparaciones/reparaciondesc/{patente}/{tipo_motor}")
    Integer reparaciondesc(@PathVariable("patente") String patente, @PathVariable("tipo_motor") String tipoMotor);

}

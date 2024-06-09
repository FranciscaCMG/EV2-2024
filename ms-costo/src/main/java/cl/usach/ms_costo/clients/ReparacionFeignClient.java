package cl.usach.ms_costo.clients;

import cl.usach.ms_costo.model.Vehiculo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(value = "ms-reparaciones", url = "http://localhost:8093")
public interface ReparacionFeignClient {
    @PostMapping("/reparacion")
    Vehiculo save(@RequestBody Vehiculo vehiculo);
}

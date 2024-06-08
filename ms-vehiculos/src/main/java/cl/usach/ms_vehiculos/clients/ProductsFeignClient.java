package cl.usach.ms_vehiculos.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@FeignClient(value = "ms-products",
        path = "/products"
)
public interface ProductsFeignClient {
}
package cl.usach.ms_costo.services;

import cl.usach.ms_costo.clients.VehiculoFeignClient;
import cl.usach.ms_costo.entities.CostoEntity;
import cl.usach.ms_costo.model.Vehiculo;
import cl.usach.ms_costo.repositories.CostoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CostoService {

    @Autowired
    CostoRepository costoRepository;

    @Autowired
    VehiculoFeignClient vehiculoFeignClient;

    public List<CostoEntity> getAll() {
        return costoRepository.findAll();
    }

    public CostoEntity getCostoById(String id) {
        return costoRepository.findById(id).orElse(null);
    }

    public CostoEntity saveCosto(CostoEntity costo) {
        CostoEntity costoNew = costoRepository.save(costo);
        return costoNew;
    }

    public Vehiculo saveVehiculo( Vehiculo vehiculo) {

        // Verifica que n_patente esté asignado
        if (vehiculo.getN_patente() == null || vehiculo.getN_patente().isEmpty()) {
            throw new IllegalArgumentException("El campo n_patente no puede estar vacío.");
        }

        // Asigna el costoId al vehículo


        // Llama al cliente Feign para guardar el vehículo
        Vehiculo vehiculoNew = vehiculoFeignClient.save(vehiculo);

        // Retorna el vehículo guardado
        return vehiculoNew;
    }


}

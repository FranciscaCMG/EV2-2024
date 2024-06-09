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

    public Vehiculo saveVehiculo(int costoId, Vehiculo vehiculo) {
        vehiculo.setCostoId(costoId);
        Vehiculo vehiculoNew = vehiculoFeignClient.save(vehiculo);
        return vehiculoNew;
    }
}

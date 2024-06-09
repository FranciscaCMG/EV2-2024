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

    Integer anio_actual= 2024;
    Integer cantToyota = 5;
    Integer cantFord = 2;
    Integer cantHyundai = 1;
    Integer cantHonda = 7;

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
        if (vehiculo.getN_patente() == null || vehiculo.getN_patente().isEmpty()) {
            throw new IllegalArgumentException("El campo n_patente no puede estar vacío.");
        }
        Vehiculo vehiculoNew = vehiculoFeignClient.save(vehiculo);
        return vehiculoNew;
    }







}

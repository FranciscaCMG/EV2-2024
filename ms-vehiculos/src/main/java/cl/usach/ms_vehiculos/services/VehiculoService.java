package cl.usach.ms_vehiculos.services;


import cl.usach.ms_vehiculos.entities.VehiculoEntity;
import cl.usach.ms_vehiculos.repositories.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehiculoService {

    @Autowired
    VehiculoRepository vehiculoRepository;

    public List<VehiculoEntity> getAll() {
        return vehiculoRepository.findAll();
    }

    public VehiculoEntity getVehiculoById(String id) {
        return vehiculoRepository.findById(id).orElse(null);
    }

    public VehiculoEntity saveVehiculo(VehiculoEntity vehiculo) {
        VehiculoEntity vehiculoNew = vehiculoRepository.save(vehiculo);
        return vehiculoNew;
    }




    public ArrayList<VehiculoEntity> obtenerVehiculo() {
        return (ArrayList<VehiculoEntity>) vehiculoRepository.findAll();
    }

    public VehiculoEntity guardarVehiculo(VehiculoEntity vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }
}

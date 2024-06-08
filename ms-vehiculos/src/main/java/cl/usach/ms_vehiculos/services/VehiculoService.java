package cl.usach.ms_vehiculos.services;


import cl.usach.ms_vehiculos.entities.VehiculoEntity;
import cl.usach.ms_vehiculos.repositories.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehiculoService {

    @Autowired
    VehiculoRepository vehiculoRepository;

    public VehiculoEntity guardarVehiculo(VehiculoEntity vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }
}

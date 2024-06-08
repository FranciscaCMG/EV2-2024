package cl.usach.ms_reparaciones.services;

import cl.usach.ms_reparaciones.entities.ReparacionEntity;
import cl.usach.ms_reparaciones.repositories.ReparacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReparacionService {

    @Autowired
    ReparacionRepository reparacionRepository;

    public ReparacionEntity guardarReparacion(ReparacionEntity reparacion) {

        return reparacionRepository.save(reparacion);
    }
}

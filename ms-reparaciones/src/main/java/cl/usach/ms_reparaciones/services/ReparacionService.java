package cl.usach.ms_reparaciones.services;

import cl.usach.ms_reparaciones.entities.ReparacionEntity;
import cl.usach.ms_reparaciones.repositories.ReparacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReparacionService {

    @Autowired
    ReparacionRepository reparacionRepository;

    public List<ReparacionEntity> getAll() {
        return reparacionRepository.findAll();
    }

    public ReparacionEntity getReparacionById(int id) {
        return reparacionRepository.findById(String.valueOf(id)).orElse(null);
    }

    public ReparacionEntity saveReparacion(ReparacionEntity reparacion) {
        ReparacionEntity reparacionNew = reparacionRepository.save(reparacion);
        return reparacionNew;
    }



    public ReparacionEntity guardarReparacion(ReparacionEntity reparacion) {

        return reparacionRepository.save(reparacion);
    }
}

package cl.usach.ms_reparaciones.services;

import cl.usach.ms_reparaciones.entities.ReparacionEntity;
import cl.usach.ms_reparaciones.repositories.ReparacionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Integer obtenerReparacionPorPatente(String patente) {
        return reparacionRepository.findByPatente(patente);
    }


    public Integer reparaciondesc(String patente, String tipoMotor){
        int cantidad = obtenerReparacionPorPatente(patente);
        switch (tipoMotor){
            case "GASOLINA":
                if (cantidad>=1 && cantidad<=2){
                    return 5;
                }else if (cantidad>=3 && cantidad<=5){
                    return 10;

                }else if (cantidad>=6 && cantidad<=9) {
                    return 15;
                } else if (cantidad>=10) {
                    return 20;
                }else {
                    return 0;
                }
            case "DIESEL":
                if (cantidad>=1 && cantidad<=2){
                    return 7;
                }else if (cantidad>=3 && cantidad<=5){
                    return 12;

                }else if (cantidad>=6 && cantidad<=9) {
                    return 17;
                } else if (cantidad>=10) {
                    return 22;
                }else {
                    return 0;
                }
            case "HIBRIDO":
                if (cantidad>=1 && cantidad<=2){
                    return 10;
                }else if (cantidad>=3 && cantidad<=5){
                    return 15;

                }else if (cantidad>=6 && cantidad<=9) {
                    return 20;
                } else if (cantidad>=10) {
                    return 25;
                }else {
                    return 0;
                }
            case "ELECTRICO":
                if (cantidad>=1 && cantidad<=2){
                    return 8;
                }else if (cantidad>=3 && cantidad<=5){
                    return 13;

                }else if (cantidad>=6 && cantidad<=9) {
                    return 18;
                } else if (cantidad>=10) {
                    return 23;
                }else {
                    return 0;
                }
        }
        return -1;
    }

    public ReparacionEntity modificarReparacionSalida(String id, String fecha_salida, String hora_salida) {
        Optional<ReparacionEntity> reparacion = reparacionRepository.findById(id);
        if (reparacion.isPresent()) {
            ReparacionEntity reparacionEntity = reparacion.get();
            reparacionEntity.setFecha_sal_cli(fecha_salida);
            reparacionEntity.setHora_sal_cli(hora_salida);
            return reparacionRepository.save(reparacionEntity);
        } else {
            // Aquí puedes manejar el caso en que no se encuentra la reparación
            // Por ejemplo, puedes lanzar una excepción o retornar null
            throw new EntityNotFoundException("Reparación con id " + id + " no encontrada");
        }
    }

    public ReparacionEntity modificarReparacionListo(String id, String fecha_salida, String hora_salida) {
        Optional<ReparacionEntity> reparacion = reparacionRepository.findById(id);
        if (reparacion.isPresent()) {
            ReparacionEntity reparacionEntity = reparacion.get();
            reparacionEntity.setFecha_sal(fecha_salida);
            reparacionEntity.setHora_sal(hora_salida);
            return reparacionRepository.save(reparacionEntity);
        } else {
            return null;
        }
    }



}

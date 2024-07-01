package cl.usach.ms_vehiculos.services;


import cl.usach.ms_vehiculos.entities.VehiculoEntity;
import cl.usach.ms_vehiculos.repositories.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    VehiculoRepository vehiculoRepository;

    Integer cantToyota = 5;
    Integer cantFord = 2;
    Integer cantHyundai = 1;
    Integer cantHonda = 7;

    Integer bonoToyota = 70000;
    Integer bonoFord = 50000;
    Integer bonoHyundai = 30000;
    Integer bonoHonda = 40000;

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

    public VehiculoEntity eliminarVehiculoPorId(String patente) {
        Optional<VehiculoEntity> vehiculo = vehiculoRepository.findById(patente);
        if (vehiculo.isPresent()) {
            vehiculoRepository.delete(vehiculo.get());
            return vehiculo.get();
        }
        return null;

    }

    public ArrayList<VehiculoEntity> obtenerVehiculo() {
        return (ArrayList<VehiculoEntity>) vehiculoRepository.findAll();
    }

    public VehiculoEntity guardarVehiculo(VehiculoEntity vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public Integer descuentoBono(Boolean activacion, String patente ) {
        Optional<VehiculoEntity> vehiculo = vehiculoRepository.findById(patente);
        if (activacion) {
            if (vehiculo.get().getMarca().contains("TOYOTA")) {
                if (cantToyota > 0) {
                    cantToyota = cantToyota - 1;
                    return bonoToyota;
                } else {
                    return 100;
                }

            } else if (vehiculo.get().getMarca().contains("FORD")) {
                if (cantFord > 0) {
                    cantFord = cantFord - 1;
                    return bonoFord;
                } else {
                    return 101;
                }
            } else if (vehiculo.get().getMarca().contains("HYUNDAI")) {
                if (cantHyundai > 0) {
                    cantHyundai = cantHyundai - 1;
                    return bonoHyundai;
                } else {
                    return 102;
                }
            } else if (vehiculo.get().getMarca().contains("HONDA")) {
                if (cantHonda > 0) {
                    cantHonda = cantHonda - 1;
                    return bonoHonda;
                } else {
                    return 103;
                }
        }
        } else {
            return 0;
        }
        return 0;
    }
}

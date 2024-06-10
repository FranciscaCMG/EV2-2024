package cl.usach.ms_costo.services;

import cl.usach.ms_costo.clients.ReparacionFeignClient;
import cl.usach.ms_costo.clients.VehiculoFeignClient;
import cl.usach.ms_costo.entities.CostoEntity;
import cl.usach.ms_costo.model.Reparacion;
import cl.usach.ms_costo.model.Vehiculo;
import cl.usach.ms_costo.repositories.CostoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class CostoService {

    @Autowired
    CostoRepository costoRepository;

    @Autowired
    VehiculoFeignClient vehiculoFeignClient;

    @Autowired
    ReparacionFeignClient reparacionFeignClient;

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

    public Reparacion saveReparacion(Reparacion reparacion) {
        if (reparacion.getN_patente() == null || reparacion.getN_patente().isEmpty()) {
            throw new IllegalArgumentException("El campo patente no puede estar vacío.");
        }
        Reparacion reparacionNew = reparacionFeignClient.save(reparacion);
        return reparacionNew;
    }


    public Integer saveReparacionDesc(String patente, String tipoMotor) {
        return reparacionFeignClient.reparaciondesc(patente, tipoMotor);
    }

    public Integer costoKilometraje(Integer kilometraje, String tipoAuto) {

        switch (tipoAuto) {
            case "SEDAN":
                if (kilometraje >= 0 && kilometraje <= 5000) {
                    return (0);
                } else if (kilometraje >= 5001 && kilometraje <= 12000) {
                    return (3);
                } else if (kilometraje >= 12001 && kilometraje <= 25000) {
                    return (7);
                } else if (kilometraje >= 25001 && kilometraje <= 40000) {
                    return (12);
                } else if (kilometraje >= 40001) {
                    return (20);
                }
            case "HATCHBACK":
                if (kilometraje >= 0 && kilometraje <= 5000) {
                    return (0);
                } else if (kilometraje >= 5001 && kilometraje <= 12000) {
                    return (3);
                } else if (kilometraje >= 12001 && kilometraje <= 25000) {
                    return (7);
                } else if (kilometraje >= 25001 && kilometraje <= 40000) {
                    return (12);
                } else if (kilometraje >= 40001) {
                    return (20);
                }
            case "SUV":
                if (kilometraje >= 0 && kilometraje <= 5000) {
                    return (0);
                } else if (kilometraje >= 5001 && kilometraje <= 12000) {
                    return (5);
                } else if (kilometraje >= 12001 && kilometraje <= 25000) {
                    return (9);
                } else if (kilometraje >= 25001 && kilometraje <= 40000) {
                    return (12);
                } else if (kilometraje >= 40001) {
                    return (20);
                }
            case "PICKUP":
                if (kilometraje >= 0 && kilometraje <= 5000) {
                    return (0);
                } else if (kilometraje >= 5001 && kilometraje <= 12000) {
                    return (5);
                } else if (kilometraje >= 12001 && kilometraje <= 25000) {
                    return (9);
                } else if (kilometraje >= 25001 && kilometraje <= 40000) {
                    return (12);
                } else if (kilometraje >= 40001) {
                    return (20);
                }
            case "FURGONETA":
                if (kilometraje >= 0 && kilometraje <= 5000) {
                    return (0);
                } else if (kilometraje >= 5001 && kilometraje <= 12000) {
                    return (5);
                } else if (kilometraje >= 12001 && kilometraje <= 25000) {
                    return (9);
                } else if (kilometraje >= 25001 && kilometraje <= 40000) {
                    return (12);
                } else if (kilometraje >= 40001) {
                    return (20);
                }
        }
        return -1;
    }

    public Integer costoAntiguedad(String anio_fabricacion, String tipoAuto) {
        Integer anio_fabricacion_int = Integer.parseInt(anio_fabricacion);
        Integer antiguedad = anio_actual - anio_fabricacion_int;
        switch (tipoAuto) {
            case "SEDAN":
                if (antiguedad >= 0 && antiguedad <= 5) {
                    return (0);
                } else if (antiguedad >= 6 && antiguedad <= 10) {
                    return (5);
                } else if (antiguedad >= 11 && antiguedad <= 15) {
                    return (9);
                } else if (antiguedad >= 16 ) {
                    return (15);
                }
            case "HATCHBACK":
                if (antiguedad >= 0 && antiguedad <= 5) {
                    return (0);
                } else if (antiguedad >= 6 && antiguedad <= 10) {
                    return (5);
                } else if (antiguedad >= 11 && antiguedad <= 15) {
                    return (9);
                } else if (antiguedad >= 16 ) {
                    return (15);
                }
            case "SUV":
                if (antiguedad >= 0 && antiguedad <= 5) {
                    return (0);
                } else if (antiguedad >= 6 && antiguedad <= 10) {
                    return (7);
                } else if (antiguedad >= 11 && antiguedad <= 15) {
                    return (11);
                } else if (antiguedad >= 16 ) {
                    return (20);
                }
            case "PICKUP":
                if (antiguedad >= 0 && antiguedad <= 5) {
                    return (0);
                } else if (antiguedad >= 6 && antiguedad <= 10) {
                    return (7);
                } else if (antiguedad >= 11 && antiguedad <= 15) {
                    return (11);
                } else if (antiguedad >= 16 ) {
                    return (20);
                }
            case "FURGONETA":
                if (antiguedad >= 0 && antiguedad <= 5) {
                    return (0);
                } else if (antiguedad >= 6 && antiguedad <= 10) {
                    return (7);
                } else if (antiguedad >= 11 && antiguedad <= 15) {
                    return (11);
                } else if (antiguedad >= 16 ) {
                    return (20);
                }
        }
        return -1;
    }

    public static long calcularDiasTranscurridos(String fechaInicio, String fechaFin) {
        // Definir el formato de las fechas
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

        // Convertir las fechas de String a LocalDate
        LocalDate fechaInicial = LocalDate.parse(fechaInicio, formatter);
        LocalDate fechaFinal = LocalDate.parse(fechaFin, formatter);

        // Calcular la diferencia de días entre las dos fechas
        long diasTranscurridos = ChronoUnit.DAYS.between(fechaInicial, fechaFinal);

        // Retornar el número de días transcurridos
        return diasTranscurridos;
    }

    public Integer recargoRecogida(Reparacion reparacion){

        long dias_transcurridos = calcularDiasTranscurridos( reparacion.getFecha_sal(), reparacion.getFecha_sal_cli());
        long recargoRecogida= (dias_transcurridos * 5)/100;
        return (int) recargoRecogida;
    }

    public Integer descuentoDia(String fecha, String hora){
        //SABADO, 27-04-2024, 20:45:01
        //09:00 hrs y las 12:00 hrs.

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate fecha_ing = LocalDate.parse(fecha, formatter);
        String dia = fecha_ing.getDayOfWeek().toString();


        if ((dia.equals("LUNES") || dia.equals("JUEVES"))) {

            String[] partsHora = hora.split(":");
            String horaf = partsHora[0];
            String minutosf = partsHora[1];
            Integer hora_int = Integer.parseInt(horaf);
            Integer minutos_int = Integer.parseInt(minutosf);

            if ((hora_int >= 9 && hora_int <= 11) || (hora_int == 12 && minutos_int == 0)) {
                return 10;
            } else {
                return 0;
            }
        }else{
            return 0;
        }
    }

    public Integer descuentoDias(Reparacion reparacion){
        Integer descuentoDias = 0;

        descuentoDias = descuentoDia(reparacion.getFecha_ing(), reparacion.getHora_ing());

        return descuentoDias;
    }



    public Integer recargoVe(Vehiculo vehiculo){

        Integer porcentajeK = 0;
        Integer porcentajeA = 0;
        Integer recargoVe = 0;

        porcentajeK = costoKilometraje(vehiculo.getKilometraje(), vehiculo.getTipo_auto());
        porcentajeA = costoAntiguedad(vehiculo.getAnio_fabricacion(), vehiculo.getTipo_auto());
        recargoVe = porcentajeA + porcentajeK;

        return recargoVe;

    }

    public Integer recargoRe(Reparacion reparacion){
        Integer recargoRe = 0;
        recargoRe = recargoRecogida(reparacion);
        return recargoRe;
    }









}

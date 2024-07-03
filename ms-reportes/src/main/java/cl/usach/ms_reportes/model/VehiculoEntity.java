package cl.usach.ms_reportes.model;

import lombok.Data;
@Data
public class VehiculoEntity {
    private long id;
    private String npatente;
    private String marca;
    private String modelo;
    private String tipo_auto;
    private String anio_fabricacion;
    private String tipo_motor;
    private Integer n_asientos;
    private Integer kilometraje;
}

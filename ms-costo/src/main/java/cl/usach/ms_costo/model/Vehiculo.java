package cl.usach.ms_costo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehiculo {
    private String n_patente;
    private String marca;
    private String modelo;
    private String tipo_auto;
    private String anio_fabricacion;
    private String tipo_motor;
    private Integer n_asientos;
    private Integer kilometraje;



}

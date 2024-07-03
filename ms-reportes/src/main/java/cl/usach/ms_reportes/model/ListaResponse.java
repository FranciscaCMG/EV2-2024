package cl.usach.ms_reportes.model;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class ListaResponse {
    private String n_patente;
    private String marca;
    private String modelo;
    private String tipo_auto;
    private String anio_fabricacion;
    private String tipo_motor;
    private Integer n_asientos;
    private Integer kilometraje;

    private String fecha_ing;
    private String hora_ing;
    private Boolean bono;
    private Float monto_total_tiporep;
    private Float recargo;
    private Float descuento;
    private Float iva;
    private Float costo_total;
    private Timestamp fecha_sal;
    private String hora_sal;
    private String fecha_sal_cli;
    private String hora_sal_cli;
    private long tipo_reparacion;
}

package cl.usach.ms_reportes.entities;
import lombok.Data;

@Data
public class ReparacionEntity {
    private long id;

    private String n_patente;
    private String fecha_ing;
    private String hora_ing;
    private Boolean bono;
    private Float monto_total_tiporep;
    private Float recargo;
    private Float descuento;
    private Float iva;
    private Float costo_total;
    private String fecha_sal;
    private String hora_sal;
    private String fecha_sal_cli;
    private String hora_sal_cli;
}

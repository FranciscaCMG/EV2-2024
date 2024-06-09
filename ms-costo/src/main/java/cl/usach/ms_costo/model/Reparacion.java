package cl.usach.ms_costo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reparacion {
    private String n_patente;
    private String fecha_ing;
    private String hora_ing;
    private Float monto_total;
    private String fecha_sal;
    private String hora_sal;
    private String fecha_sal_cli;
    private String hora_sal_cli;
    private int costoId;
}

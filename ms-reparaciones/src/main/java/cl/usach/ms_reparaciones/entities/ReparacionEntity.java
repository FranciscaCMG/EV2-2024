package cl.usach.ms_reparaciones.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="reparacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReparacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    private String n_patente;
    private String fecha_ing;
    private String hora_ing;
    private Boolean bono;
    private String tipo_reparaciones;
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

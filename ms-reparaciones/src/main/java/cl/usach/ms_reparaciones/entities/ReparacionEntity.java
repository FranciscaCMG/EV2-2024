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
    private Integer id;

    private String n_patente;
    private String fecha_ing;
    private String hora_ing;
    private Float monto_total;
    private String fecha_sal;
    private String hora_sal;
    private String fecha_sal_cli;
    private String hora_sal_cli;
}

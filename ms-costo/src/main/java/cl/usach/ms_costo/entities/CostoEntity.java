package cl.usach.ms_costo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Costo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CostoEntity {
    @Id
    @Column(name = "n_patente", nullable = false)
    private String patente;

    private String tipo_rep;
    private String tipo_motor;
    private Integer kilometraje;
    private String tipo_auto;
    private String anio_fabricacion;
    private String marca;
    private String activacion;
    private String fechaCompleta;
}

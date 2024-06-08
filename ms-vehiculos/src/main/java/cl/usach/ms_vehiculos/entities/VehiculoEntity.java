package cl.usach.ms_vehiculos.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name="vehiculo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehiculoEntity {
    @Id
    @Column(name = "n_patente", nullable = false)
    private String n_patente;

    private String marca;
    private String modelo;
    private String tipo_auto;
    private String anio_fabricacion;
    private String tipo_motor;
    private Integer n_asientos;
    private Integer kilometraje;
}

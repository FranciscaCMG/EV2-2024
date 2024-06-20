package cl.usach.ms_vehiculos.repositories;

import cl.usach.ms_vehiculos.entities.VehiculoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehiculoRepository extends JpaRepository<VehiculoEntity, String> {

}

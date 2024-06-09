package cl.usach.ms_reparaciones.repositories;

import cl.usach.ms_reparaciones.entities.ReparacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReparacionRepository extends JpaRepository<ReparacionEntity, String> {

    @Query(value = "SELECT COUNT(*) FROM reparacion WHERE n_patente = :patente", nativeQuery = true)
    Integer findByPatente(@Param("patente") String patente);
}

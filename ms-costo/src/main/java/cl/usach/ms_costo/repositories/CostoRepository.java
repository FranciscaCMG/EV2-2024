package cl.usach.ms_costo.repositories;

import cl.usach.ms_costo.entities.CostoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CostoRepository extends JpaRepository<CostoEntity, String> {
}

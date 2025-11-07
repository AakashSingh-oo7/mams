package in.aakash.mams.repository;

import in.aakash.mams.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemREpository extends JpaRepository<ItemEntity,Long> {

    Optional<ItemEntity> findByItemId(String id);
    Integer countByCategoryId(Long id);
}

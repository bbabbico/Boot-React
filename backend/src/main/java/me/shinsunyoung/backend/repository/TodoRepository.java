package me.shinsunyoung.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import me.shinsunyoung.backend.domain.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}

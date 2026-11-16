package me.shinsunyoung.backend.service;

import me.shinsunyoung.backend.dto.PageRequestDTO;
import me.shinsunyoung.backend.dto.PageResponseDTO;
import me.shinsunyoung.backend.dto.TodoDTO;

public interface TodoService {

    Long register(TodoDTO todoDTO);

    TodoDTO get(Long tno);

    void modify(TodoDTO todoDTO);

    void remove(Long tno);

    PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO);
}

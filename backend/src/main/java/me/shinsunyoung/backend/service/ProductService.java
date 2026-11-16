package me.shinsunyoung.backend.service;

import org.springframework.transaction.annotation.Transactional;
import me.shinsunyoung.backend.dto.PageRequestDTO;
import me.shinsunyoung.backend.dto.PageResponseDTO;
import me.shinsunyoung.backend.dto.ProductDTO;

@Transactional
public interface ProductService {

    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    Long register(ProductDTO productDTO);

    ProductDTO get(Long pno);

    void modify(ProductDTO productDTO);

    void remove(Long pno);
}

package me.shinsunyoung.backend.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import me.shinsunyoung.backend.dto.CartItemDTO;
import me.shinsunyoung.backend.dto.CartItemListDTO;

@Transactional
public interface CartService {

    List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);

    List<CartItemListDTO> getCartItems(String email);

    List<CartItemListDTO> remove(Long cino, String email);
}

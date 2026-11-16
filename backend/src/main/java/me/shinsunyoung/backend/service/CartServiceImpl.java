package me.shinsunyoung.backend.service;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import me.shinsunyoung.backend.domain.Cart;
import me.shinsunyoung.backend.domain.CartItem;
import me.shinsunyoung.backend.domain.Member;
import me.shinsunyoung.backend.domain.Product;
import me.shinsunyoung.backend.dto.CartItemDTO;
import me.shinsunyoung.backend.dto.CartItemListDTO;
import me.shinsunyoung.backend.repository.CartItemRepository;
import me.shinsunyoung.backend.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    @Override
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {
        String email = cartItemDTO.getEmail();
        Long pno = cartItemDTO.getPno();
        int qty = cartItemDTO.getQty();
        Long cino = cartItemDTO.getCino();

        if (cino != null) {
            CartItem cartItem = getOwnedItem(cino, email);

            cartItem.changeQty(qty);

            cartItemRepository.save(cartItem);

            return getCartItems(email);
        }

        Cart cart = getCart(email);

        CartItem cartItem = cartItemRepository.getItemOfPno(email, pno);

        if (cartItem == null) {
            Product product = Product.builder().pno(pno).build();
            cartItem = CartItem.builder().product(product).cart(cart).qty(qty).build();
        } else {
            cartItem.changeQty(qty);
        }

        cartItemRepository.save(cartItem);

        return getCartItems(email);
    }

    private Cart getCart(String email) {
        return cartRepository.getCartOfMember(email).orElseGet(() -> {
            Member member = Member.builder().email(email).build();

            return cartRepository.save(Cart.builder().owner(member).build());
        });
    }

    private CartItem getOwnedItem(Long cino, String email) {
        CartItem cartItem = cartItemRepository.findById(cino).orElseThrow();

        if (!cartItem.getCart().getOwner().getEmail().equals(email)) {
            throw new AccessDeniedException("not owner");
        }

        return cartItem;
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long cino, String email) {
        CartItem cartItem = getOwnedItem(cino, email);

        Long cno = cartItem.getCart().getCno();

        cartItemRepository.delete(cartItem);

        return cartItemRepository.getItemsOfCartDTOByCart(cno);
    }
}

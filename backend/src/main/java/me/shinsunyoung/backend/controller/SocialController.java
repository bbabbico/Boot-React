package me.shinsunyoung.backend.controller;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import me.shinsunyoung.backend.dto.MemberDTO;
import me.shinsunyoung.backend.dto.MemberModifyDTO;
import me.shinsunyoung.backend.service.MemberService;
import me.shinsunyoung.backend.util.JWTUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {

    private final MemberService memberService;

    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken) {
        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);

        Map<String, Object> claims = memberDTO.getClaims();

        claims.put("accessToken", JWTUtil.generateToken(claims, 10));
        claims.put("refreshToken", JWTUtil.generateToken(claims, 60 * 24));

        return claims;
    }

    @PutMapping("/api/member/modify")
    public Map<String, String> modify(@RequestBody MemberModifyDTO memberModifyDTO, @AuthenticationPrincipal MemberDTO loginMember) {
        memberModifyDTO.setEmail(loginMember.getEmail());

        memberService.modifyMember(memberModifyDTO);

        return Map.of("result", "modified");
    }
}

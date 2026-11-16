package me.shinsunyoung.backend.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import me.shinsunyoung.backend.domain.Member;
import me.shinsunyoung.backend.domain.MemberRole;
import me.shinsunyoung.backend.dto.MemberDTO;
import me.shinsunyoung.backend.dto.MemberModifyDTO;
import me.shinsunyoung.backend.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);

        log.info("email: " + email);

        return memberRepository.findById(email)
                .map(this::entityToDTO)
                .orElseGet(() -> entityToDTO(memberRepository.save(makeSocialMember(email))));
    }

    private String getEmailFromKakaoAccessToken(String accessToken) {
        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        Map<String, Object> body = RestClient.create()
                .get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {});

        Object account = body == null ? null : body.get("kakao_account");

        if (!(account instanceof Map<?, ?> kakaoAccount) || kakaoAccount.get("email") == null) {
            throw new RuntimeException("Kakao email not found");
        }

        return (String) kakaoAccount.get("email");
    }

    private Member makeSocialMember(String email) {
        Member member = Member.builder()
                .email(email)
                .pw(passwordEncoder.encode(UUID.randomUUID().toString()))
                .nickname("소셜회원")
                .social(true)
                .build();

        member.addRole(MemberRole.USER);

        return member;
    }

    @Override
    public void modifyMember(MemberModifyDTO memberModifyDTO) {
        Member member = memberRepository.findById(memberModifyDTO.getEmail()).orElseThrow();

        member.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
        member.changeSocial(false);
        member.changeNickname(memberModifyDTO.getNickname());

        memberRepository.save(member);
    }
}

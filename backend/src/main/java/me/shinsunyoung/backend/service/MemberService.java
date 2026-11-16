package me.shinsunyoung.backend.service;

import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;
import me.shinsunyoung.backend.domain.Member;
import me.shinsunyoung.backend.dto.MemberDTO;
import me.shinsunyoung.backend.dto.MemberModifyDTO;

@Transactional
public interface MemberService {

    MemberDTO getKakaoMember(String accessToken);

    void modifyMember(MemberModifyDTO memberModifyDTO);

    default MemberDTO entityToDTO(Member member) {
        return new MemberDTO(
                member.getEmail(),
                member.getPw(),
                member.getNickname(),
                member.isSocial(),
                member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList()));
    }
}

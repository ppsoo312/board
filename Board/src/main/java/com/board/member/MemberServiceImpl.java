package com.board.member;

import java.awt.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("memberSerivce")
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberDAOImpl memberDao;
	
	public void setMemberDao(MemberDAOImpl memberDao) {
		this.memberDao = memberDao;
	}
	
	@Override
	public int join(MemberVO vo) {
		
		return memberDao.join(vo);
	}
	
	@Override
	public MemberVO login(MemberVO vo) {
		return memberDao.login(vo);
	}
	

	
	
}

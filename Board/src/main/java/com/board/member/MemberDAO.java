package com.board.member;

import java.util.List;

public interface MemberDAO {
	
	public int join(MemberVO vo);
	public MemberVO login(MemberVO vo);
}

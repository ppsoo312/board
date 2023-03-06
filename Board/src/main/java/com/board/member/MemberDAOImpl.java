package com.board.member;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository("memberDAO")
public class MemberDAOImpl implements MemberDAO{

	@Autowired
	private SqlSession sqlSession;
	
	public void setMemberDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	@Override
	public int join(MemberVO vo) {		
		return sqlSession.insert("member.join", vo);
	}
	@Override
	public MemberVO login(MemberVO vo) {
		return sqlSession.selectOne("member.login", vo);
	}
	


}

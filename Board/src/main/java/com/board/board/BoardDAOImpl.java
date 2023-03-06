package com.board.board;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("boardDAO")
public class BoardDAOImpl implements BoardDAO{
	
	@Autowired
	private SqlSession sqlSession;
	
	public void setBoardDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	
	@Override
	public int boardMInsert(MemberBoardVO vo) {
		return sqlSession.insert("board.boardMInsert", vo);
	}
	
	@Override
	public List<Map<String, Object>> boardMSelect(PagingVO pvo) {
		return sqlSession.selectList("board.boardMSelect", pvo);
	}
	
	@Override
	public Map<String, Object> selectDetail(int member_comm_seq) {
		return sqlSession.selectOne("board.selectDetail", member_comm_seq);
	}
	
	@Override
	public int totalBoard() {
		return sqlSession.selectOne("board.totalBoard");
	}
	
	@Override
	public int totalABoard() {
		return sqlSession.selectOne("board.totalABoard");
	}
	
	@Override
	public List<Map<String, Object>> boardASelect(PagingVO pvo) {
		return sqlSession.selectList("board.boardASelect", pvo);
	}
	
	@Override
	public int boardAInsert(AnonymBoardVO vo) {
		return sqlSession.insert("board.boardAInsert", vo);
	}
	
	@Override
	public Map<String, Object> selectDetail1(int anonym_comm_seq) {
		return sqlSession.selectOne("board.selectDetail1", anonym_comm_seq);
	}
	
	@Override
	public void passwordClear(PasswordClearVO vo) {
		sqlSession.selectOne("board.passwordClear", vo);
	}
	
	@Override
	public int changeA(AnonymBoardVO avo) {
		return sqlSession.update("board.changeA", avo);
	}
	
	@Override
	public int changeM(MemberBoardVO mvo) {
		return sqlSession.update("board.changeM", mvo);
	}
	
	@Override
	public int totalIdSel(String text) {
		return sqlSession.selectOne("board.totalIdSel", text);
	}
	
	@Override
	public List<Map<String, Object>> boardMIdSelect(PagingVO pvo) {
		return sqlSession.selectList("board.boardMIdSelect", pvo);
	}
	
	@Override
	public List<Map<String, Object>> boardMTitleSelect(PagingVO pvo) {
		return sqlSession.selectList("board.boardMTitleSelect", pvo);
	}
	
	@Override
	public List<Map<String, Object>> date(DateVO vo) {
		return sqlSession.selectList("board.dateSearch", vo);
	}
	
	@Override
	public int totalANameSel(String text) {
		return sqlSession.selectOne("board.totalANameSel", text);
	}
	
	@Override
	public List<Map<String, Object>> boardANameSelect(PagingVO pvo) {
		return sqlSession.selectList("board.boardANameSelect", pvo);
	}
	
	@Override
	public List<Map<String, Object>> boardATitleSelect(PagingVO pvo) {
		return sqlSession.selectList("board.boardATitleSelect", pvo);
	}
	
	@Override
	public List<Map<String, Object>> dateA(DateVO vo) {
		return sqlSession.selectList("board.dateASearch", vo);
	}
	
	@Override
	public void delete(int seq, int is) {
		
		if(is == 1) {
			sqlSession.selectOne("board.deleteM", seq);
		} else {
			sqlSession.selectOne("board.deleteA", seq);
		}
	}
	
	@Override
	public void memberDelete(int member_seq) {
		sqlSession.delete("board.memberDelete", member_seq);
	}
	
	@Override
	public int memberSeqDelete(int member_seq) {
		return sqlSession.delete("board.memberSeqDelete", member_seq);
	}

	
}

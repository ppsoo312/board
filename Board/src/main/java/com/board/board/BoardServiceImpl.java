package com.board.board;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.board.utils.PagingUtil;


@Service("boardService")
public class BoardServiceImpl implements BoardService{
	

	@Autowired
	private BoardDAOImpl boardDao;
	
	public void setBoardDao(BoardDAOImpl boardDao) {
		this.boardDao = boardDao;
	}
	
	
	@Override
	public int boardMInsert(MemberBoardVO vo) {	
		return boardDao.boardMInsert(vo);	
	}
	
	// 없앨 예정
	@Override
	public List<Map<String, Object>> boardMSelect(PagingVO pvo) {
		return boardDao.boardMSelect(pvo);
	}
	
	@Override
	public Map<String, Object> selectDetail(int member_comm_seq) {
		return boardDao.selectDetail(member_comm_seq);
	}
	
	@Override
	public int totalBoard() {
		return boardDao.totalBoard();
	}
	
	@Override
	public int totalABoard() {
		return boardDao.totalABoard();
	}
	
	@Override
	public List<Map<String, Object>> boardASelect(PagingVO pvo) {
		return boardDao.boardASelect(pvo);
	}
	
	@Override
	public int boardAInsert(AnonymBoardVO vo) {
		return boardDao.boardAInsert(vo);
	}
	
	@Override
	public Map<String, Object> selectDetail1(int anonym_comm_seq) {
		return boardDao.selectDetail1(anonym_comm_seq);
	}
	
	@Override
	public void passwordClear(PasswordClearVO vo) {
		boardDao.passwordClear(vo);
	}

	@Override
	public int changeA(AnonymBoardVO avo) {
		return boardDao.changeA(avo);
	}
	
	@Override
	public int changeM(MemberBoardVO mvo) {
		return boardDao.changeM(mvo);
	}
	
	@Override
	public int totalIdSel(String text) {
		return boardDao.totalIdSel(text);
	}
	
	@Override
	public List<Map<String, Object>> boardMIdSelect(PagingVO pvo) {
		return boardDao.boardMIdSelect(pvo);
	}
	
	@Override
	public List<Map<String, Object>> boardMTitleSelect(PagingVO pvo) {
		return boardDao.boardMTitleSelect(pvo);
	}
	
	@Override
	public List<Map<String, Object>> date(DateVO vo) {
		return boardDao.date(vo);
	}
	
	@Override
	public int totalANameSel(String text) {
		return boardDao.totalANameSel(text);
	}
	
	@Override
	public List<Map<String, Object>> boardANameSelect(PagingVO pvo) {
		return boardDao.boardANameSelect(pvo);
	}
	
	@Override
	public List<Map<String, Object>> boardATitleSelect(PagingVO pvo) {
		return boardDao.boardATitleSelect(pvo);
	}
	
	@Override
	public List<Map<String, Object>> dateA(DateVO vo) {
		return boardDao.dateA(vo);
	}
	
	@Override
	public void delete(int seq, int is) {
		boardDao.delete(seq, is);
	}
	
	@Override
	public void memberDelete(int member_seq) {
		boardDao.memberDelete(member_seq);
	}
	
	@Override
	public int memberSeqDelete(int member_seq) {	
		return boardDao.memberSeqDelete(member_seq);
	}
	
	@Override
	public int memberSeqSearch(int member_seq) {
		return boardDao.memberSeqSearch(member_seq);
	}
	

}

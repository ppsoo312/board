package com.board.board;

import java.util.List;
import java.util.Map;

public interface BoardDAO {
	
	public int boardMInsert(MemberBoardVO vo);
	public int boardAInsert(AnonymBoardVO vo);
	public List<Map<String, Object>> boardMSelect(PagingVO pvo);
	public List<Map<String, Object>> boardMIdSelect(PagingVO pvo);
	public List<Map<String, Object>> boardMTitleSelect(PagingVO pvo);
	public List<Map<String, Object>> boardASelect(PagingVO pvo);
	public Map<String, Object> selectDetail(int member_comm_seq);
	public Map<String, Object> selectDetail1(int anonym_comm_seq);
	public int totalBoard();
	public int totalABoard();
	public void passwordClear(PasswordClearVO vo);
	public int changeA(AnonymBoardVO avo);
	public int changeM(MemberBoardVO mvo);
	public int totalIdSel(String text);
	public List<Map<String, Object>> date(DateVO vo);
	public List<Map<String, Object>> dateA(DateVO vo);
	public int totalANameSel(String text);
	public List<Map<String, Object>> boardANameSelect(PagingVO pvo);
	public List<Map<String, Object>> boardATitleSelect(PagingVO pvo);
	public void delete(int seq, int is);
	public void memberDelete(int member_seq);
	public int memberSeqDelete(int member_seq);
}

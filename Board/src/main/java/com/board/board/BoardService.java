package com.board.board;

import java.util.List;
import java.util.Map;

public interface BoardService {
	
	// 멤버 보드 글쓰기
	public int boardMInsert(MemberBoardVO vo);
	// 익명 보드 글쓰기
	public int boardAInsert(AnonymBoardVO vo);
	// 멤버보드 페이징 리스트 검색
	public List<Map<String, Object>> boardMSelect(PagingVO pvo);
	// 멤버보드 페이징 이름 검색
	public List<Map<String, Object>> boardMIdSelect(PagingVO pvo);
	// 멤버보드 페이징 이름 검색
	public List<Map<String, Object>> boardMTitleSelect(PagingVO pvo);
	// 익명보드 페이징 리스트 검색
	public List<Map<String, Object>> boardASelect(PagingVO pvo);
	// 멤버 보드 자세히 보기 검색
	public Map<String, Object> selectDetail(int member_comm_seq);
	// 익명 보드 자세히 보기 검색
	public Map<String, Object> selectDetail1(int anonym_comm_seq);
	// 멤버 보드 총 개수
	public int totalBoard();
	// 익명 보드 총 개수
	public int totalABoard();
	// 익명 게시판 게시글 비밀번호 검사
	public void passwordClear(PasswordClearVO vo);
	// 익명 게시물 변경
	public int changeA(AnonymBoardVO avo);
	// 멤버 게시물 변경
	public int changeM(MemberBoardVO mvo);
	// 이름 전체 검색
	public int totalIdSel(String text);
	// 멤버 게시판 날짜검색
	public List<Map<String, Object>> date(DateVO vo);
	// 익명 게시판 날짜검색
	public List<Map<String, Object>> dateA(DateVO vo);
	// 익명 게시판 이름 전체 검색
	public int totalANameSel(String text);
	// 익명보드 페이징 이름 검색
	public List<Map<String, Object>> boardANameSelect(PagingVO pvo);
	// 익명보드 페이징 제목 검색
	public List<Map<String, Object>> boardATitleSelect(PagingVO pvo);
	// 게시글 삭제
	public void delete(int seq, int is);
	// 멤버 삭제
	public void memberDelete(int member_seq);
	// 멤버 삭제시 관련 멤버 게시물 삭제
	public int memberSeqDelete(int member_seq);
}

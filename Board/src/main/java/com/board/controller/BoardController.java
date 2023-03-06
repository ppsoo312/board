package com.board.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.board.board.AnonymBoardVO;
import com.board.board.BoardServiceImpl;
import com.board.board.DateVO;
import com.board.board.MemberBoardVO;
import com.board.board.PagingVO;
import com.board.board.PasswordClearVO;
import com.board.member.MemberVO;
import com.board.utils.PagingUtil;

import comm.ViewPath;

@EnableWebMvc
@Controller
public class BoardController {
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	@Autowired
	private BoardServiceImpl boardService;
	
	@RequestMapping("/boardC/boardM")
	public String boardM() {
		return ViewPath.MAIN + "home.jsp";
	}
	
	@RequestMapping("/boardC/boardAdd")
	@ResponseBody
	public MemberBoardVO boardAdd(@RequestBody MemberBoardVO vo) throws Exception{
		
		if(vo != null) {
			boardService.boardMInsert(vo);
		}

		return vo;
	}
	
	@RequestMapping("/boardC/detail")
	@ResponseBody
	public Map<String, Object> detail(@RequestParam(value="mcs", required=false) String mcs, @RequestParam(value="mcs1", required=false) 
		String mcs1, @RequestParam(value="is", defaultValue="1") String is, Map<String, Object> map, HttpSession session, HttpServletRequest request) throws Exception{
		
		int is1 = Integer.parseInt(is);
		
		if(is1 == 1) {
			
			int member_comm_seq = Integer.parseInt(mcs);

			map = boardService.selectDetail(member_comm_seq);
			
			MemberVO vo = (MemberVO) request.getSession().getAttribute("login");
			
			
			if(Integer.parseInt(map.get("MEMBER_SEQ").toString()) == vo.getMember_seq()) {
				map.put("EQUL", "EQUL");
			} else {
				map.put("EQUL", "NOTEQUL");
			}
			
		} else {
			
			int anonym_comm_seq = Integer.parseInt(mcs1);

			map = boardService.selectDetail1(anonym_comm_seq);
		}

		return map;
	}
	
	/** 페이징 처리 **/
	@RequestMapping(value="/boardC/paging", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> paging(HttpServletRequest request, @RequestParam(defaultValue = "1") int page, PagingVO pvo,
			@RequestParam(value="select", defaultValue = "1") int select, @RequestParam(value="text", required = false) String text) throws Exception {
		
		List<Map<String, Object>> mvo = null;
		int totalListCnt = 0;
		PagingUtil pagingUtil = null;
		int startIndex = 0;
		int pageSize = 0;
		
		if(select == 2) {
			
			totalListCnt = boardService.totalIdSel(text);
			pvo.setText(text);
			// 전체 리스트 개수와 현재 페이지
			pagingUtil = new PagingUtil(totalListCnt, page);
			
			// db 찾을 index
			startIndex = pagingUtil.getStartIndex();
			// 페이지 당 보여지는 게시글의 최대 개수
			pageSize = pagingUtil.getPageSize();
			
			pvo.setStartIndex(startIndex);
			pvo.setPageSize(pageSize);
			
			mvo = boardService.boardMIdSelect(pvo);

		} else if(select == 3) {
			
			totalListCnt = boardService.totalIdSel(text);
			pvo.setText(text);
			// 전체 리스트 개수와 현재 페이지
			pagingUtil = new PagingUtil(totalListCnt, page);
			
			// db 찾을 index
			startIndex = pagingUtil.getStartIndex();
			// 페이지 당 보여지는 게시글의 최대 개수
			pageSize = pagingUtil.getPageSize();
			
			pvo.setStartIndex(startIndex);
			pvo.setPageSize(pageSize);
			
			mvo = boardService.boardMTitleSelect(pvo);

			
		} else {
			
			totalListCnt = boardService.totalBoard();
			
			// 전체 리스트 개수와 현제 페이지 
			pagingUtil = new PagingUtil(totalListCnt, page);
			
			// db 찾을 index
			startIndex = pagingUtil.getStartIndex();
			// 페이지 당 보여지는 게시글의 최대 개수
			pageSize = pagingUtil.getPageSize();
			
			pvo.setStartIndex(startIndex);
			pvo.setPageSize(pageSize);
			
			mvo = boardService.boardMSelect(pvo);
			
		}
		
		request.setAttribute("mvo", mvo);
		request.setAttribute("pagingUtil", pagingUtil);
		return mvo;
	}
	
	@RequestMapping(value="/boardC/pagingA", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> pagingA(HttpServletRequest request, @RequestParam(defaultValue = "1") int page, PagingVO pvo,
			@RequestParam(value="select", defaultValue = "1") int select, @RequestParam(value="text", required = false) String text) throws Exception {
		
		List<Map<String, Object>> mvo = null;
		int totalListCnt = 0;
		PagingUtil pagingUtil = null;
		int startIndex = 0;
		int pageSize = 0;
		
		if(select == 2) {
			
			totalListCnt = boardService.totalANameSel(text);
			pvo.setText(text);
			// 전체 리스트 개수와 현재 페이지
			pagingUtil = new PagingUtil(totalListCnt, page);
			
			// db 찾을 index
			startIndex = pagingUtil.getStartIndex();
			// 페이지 당 보여지는 게시글의 최대 개수
			pageSize = pagingUtil.getPageSize();
			
			pvo.setStartIndex(startIndex);
			pvo.setPageSize(pageSize);
			
			mvo = boardService.boardANameSelect(pvo);

		} else if(select == 3) {
			
			totalListCnt = boardService.totalIdSel(text);
			pvo.setText(text);
			// 전체 리스트 개수와 현재 페이지
			pagingUtil = new PagingUtil(totalListCnt, page);
			
			// db 찾을 index
			startIndex = pagingUtil.getStartIndex();
			// 페이지 당 보여지는 게시글의 최대 개수
			pageSize = pagingUtil.getPageSize();
			
			pvo.setStartIndex(startIndex);
			pvo.setPageSize(pageSize);
			
			mvo = boardService.boardATitleSelect(pvo);

			
		} else {
			
			totalListCnt = boardService.totalABoard();
			
			// 전체 리스트 개수와 현제 페이지 
			pagingUtil = new PagingUtil(totalListCnt, page);
			
			// db 찾을 index
			startIndex = pagingUtil.getStartIndex();
			// 페이지 당 보여지는 게시글의 최대 개수
			pageSize = pagingUtil.getPageSize();
			
			pvo.setStartIndex(startIndex);
			pvo.setPageSize(pageSize);
			
			mvo = boardService.boardASelect(pvo);
			
		}
		
		request.setAttribute("mvo", mvo);
		request.setAttribute("pagingUtil", pagingUtil);
		return mvo;
	}
	
	/** 익명 게시판 글쓰기 **/
	@RequestMapping("/boardC/boardAdd1")
	@ResponseBody
	public AnonymBoardVO boardAdd1(@RequestBody AnonymBoardVO vo) {
		
		boardService.boardAInsert(vo);
		
		return vo;
	}
	
	@RequestMapping("/boardC/passClear")
	@ResponseBody
	public void passClear(@RequestBody PasswordClearVO vo)  throws Exception {

		boardService.passwordClear(vo);
	
	}
	
	@RequestMapping("/boardC/changeA")
	@ResponseBody
	public void changeA(@RequestBody AnonymBoardVO avo) {
		
		boardService.changeA(avo);
	}
	
	@RequestMapping("/boardC/changeM")
	@ResponseBody
	public void changeM(@RequestBody MemberBoardVO mvo) {
		
		boardService.changeM(mvo);
	}
	
	
	@RequestMapping("/boardC/date")
	@ResponseBody
	public List<Map<String, Object>> date(@RequestParam("start") String start, @RequestParam("end") String end, DateVO vo){
		
		vo.setStart(start);
		vo.setEnd(end);

		List<Map<String, Object>> map = boardService.date(vo);
		
		return map;
	}
	
	@RequestMapping("/boardC/dateA")
	@ResponseBody
	public List<Map<String, Object>> dateA(@RequestParam("start") String start, @RequestParam("end") String end, DateVO vo){
		
		vo.setStart(start);
		vo.setEnd(end);
		List<Map<String, Object>> map = boardService.dateA(vo);
		
		return map;
	}
	
	@RequestMapping("/boardC/delete")
	@ResponseBody
	public void delete(@RequestParam("seq") int seq, @RequestParam("is") int is) {
		

		if(is == 1) {
			boardService.delete(seq, is);
		} else {
			boardService.delete(seq, is);
		}
	}
	
	@RequestMapping("/boardC/memberDelete")
	@ResponseBody
	public void memberDelete(@RequestParam("member_seq") int member_seq) {
		
		int su = boardService.memberSeqDelete(member_seq);
		
		boardService.memberDelete(member_seq);			
		
	}
	
	
	
}





























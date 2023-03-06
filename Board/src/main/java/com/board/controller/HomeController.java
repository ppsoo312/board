package com.board.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.board.board.BoardServiceImpl;
import com.board.board.MemberBoardVO;
import com.board.board.PagingVO;
import com.board.member.MemberVO;
import com.board.utils.PagingUtil;

import comm.ViewPath;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private BoardServiceImpl boardService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpServletRequest request, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "1") int page1, PagingVO pvo, PagingVO pvo1) {
		
		MemberVO vo = (MemberVO) request.getSession().getAttribute("login");
		
		/** 멤버 보드 관련**/
		int totalListCnt = boardService.totalBoard();
		// 전체 리스트 개수와 현제 페이지 
		PagingUtil pagingUtil = new PagingUtil(totalListCnt, page);
		// db 찾을 index
	    int startIndex = pagingUtil.getStartIndex();
	    // 페이지 당 보여지는 게시글의 최대 개수
	    int pageSize = pagingUtil.getPageSize();
	    
	    pvo.setStartIndex(startIndex);
	    pvo.setPageSize(pageSize);
		
		List<Map<String, Object>> mvo = boardService.boardMSelect(pvo);
		
		/** 익명 보드 관련 **/
		int totalListCnt1 = boardService.totalABoard();
		PagingUtil pagingUtil1 = new PagingUtil(totalListCnt1, page1);
		int startIndex1 = pagingUtil.getStartIndex();
		int pageSize1 = pagingUtil.getPageSize();
		
		pvo1.setStartIndex(startIndex1);
		pvo1.setPageSize(pageSize1);
		
		List<Map<String, Object>> mvo1 = boardService.boardASelect(pvo1);
		
		
		request.setAttribute("mvo", mvo);
		request.setAttribute("mvo1", mvo1);
		request.setAttribute("vo", vo);
		request.setAttribute("pagingUtil", pagingUtil);
		request.setAttribute("pagingUtil1", pagingUtil1);
		
		return ViewPath.MAIN + "home.jsp";
	}
	
}

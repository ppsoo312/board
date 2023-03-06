package com.board.controller;

import java.io.Console;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.board.member.MemberServiceImpl;
import com.board.member.MemberVO;

import comm.ViewPath;

@Controller
public class MemberController {

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired
	private MemberServiceImpl memberService;
	
//	public MemberController() {
//		
//	}
//	public MemberController(MemberServiceImpl memberService) {
//		this.memberService = memberService;
//	}
	
	@RequestMapping("/member/join")
	public String join() {

		return ViewPath.MEMBER + "join.jsp";
	}
	
	
	@RequestMapping("/member/joinCheck")
	@ResponseBody
	public MemberVO joinCheck(@RequestBody MemberVO vo, Model model, HttpServletRequest request) throws Exception{
			
		int no = memberService.join(vo);
		
		return vo;
	}
	
//	@RequestMapping("/member/login")
//	public String login(HttpServletRequest request, @RequestParam(required=false) String id) {
//		
//		request.setAttribute("id", id);
//		
//		return "redirect:/";
//	}
	
	@RequestMapping("/member/loginOk")
	@ResponseBody
	public MemberVO loginOk(@RequestBody MemberVO vo, HttpSession session, HttpServletRequest request) {
		
		vo = memberService.login(vo);
		
		request.getSession().setAttribute("login", vo);
		
		return vo;
		
	}
	
	@RequestMapping("/member/logout")
	public String logout(HttpSession session) {
		
		session.removeAttribute("login");
		
		return "redirect:/";
	}
	
}



























package com.board.board;

import java.sql.Date;

public class MemberBoardVO {
	
	private int member_comm_seq;
	private int member_seq;
	private String title;
	private String content;
	private String current_date;
	
	public MemberBoardVO() {
		
	}
	
	public MemberBoardVO(int member_comm_seq, int member_seq, String title, String content, String current_date) {
		this.member_comm_seq = member_comm_seq;
		this.member_seq = member_seq;
		this.title = title;
		this.content = content;
		this.current_date = current_date;
	}

	public int getMember_comm_seq() {
		return member_comm_seq;
	}

	public void setMember_comm_seq(int member_comm_seq) {
		this.member_comm_seq = member_comm_seq;
	}

	public int getMember_seq() {
		return member_seq;
	}

	public void setMember_seq(int member_seq) {
		this.member_seq = member_seq;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCurrent_date() {
		return current_date;
	}

	public void setCurrent_date(String current_date) {
		this.current_date = current_date;
	}
	
}

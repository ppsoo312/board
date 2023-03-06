package com.board.board;

public class AnonymBoardVO {
	
	private int anonym_comm_seq;
	private String a_name;
	private String a_password;
	private String a_title;
	private String a_content;
	private String a_current_date;
	
	public AnonymBoardVO() {
		
	}
	
	public AnonymBoardVO(int anonym_comm_seq, String a_name, String a_password, String a_title, String a_content, String a_current_date) {
		this.anonym_comm_seq = anonym_comm_seq;
		this.a_name = a_name;
		this.a_password = a_password;
		this.a_title = a_title;
		this.a_content = a_content;
		this.a_current_date = a_current_date;
	}

	public int getAnonym_comm_seq() {
		return anonym_comm_seq;
	}

	public void setAnonym_comm_seq(int anonym_comm_seq) {
		this.anonym_comm_seq = anonym_comm_seq;
	}

	public String getA_name() {
		return a_name;
	}

	public void setA_name(String a_name) {
		this.a_name = a_name;
	}

	public String getA_password() {
		return a_password;
	}

	public void setA_password(String a_password) {
		this.a_password = a_password;
	}

	public String getA_title() {
		return a_title;
	}

	public void setA_title(String a_title) {
		this.a_title = a_title;
	}

	public String getA_content() {
		return a_content;
	}

	public void setA_content(String a_content) {
		this.a_content = a_content;
	}

	public String getA_current_date() {
		return a_current_date;
	}

	public void setA_current_date(String a_current_date) {
		this.a_current_date = a_current_date;
	}

}

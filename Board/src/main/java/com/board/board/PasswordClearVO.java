package com.board.board;

public class PasswordClearVO {
	
	// 익명 게시물 시퀀스 번호
	private String anonym_comm_seq;
	// 익명 게시글 비밀번호
	private String passwordClear;
	
	public PasswordClearVO() {
		
	}
	
	public PasswordClearVO(String anonym_comm_seq, String passwordClear) {
		this.anonym_comm_seq = anonym_comm_seq;
		this.passwordClear = passwordClear;
	}

	public String getAnonym_comm_seq() {
		return anonym_comm_seq;
	}

	public void setAnonym_comm_seq(String anonym_comm_seq) {
		this.anonym_comm_seq = anonym_comm_seq;
	}

	public String getPasswordClear() {
		return passwordClear;
	}

	public void setPasswordClear(String passwordClear) {
		this.passwordClear = passwordClear;
	}
	

}

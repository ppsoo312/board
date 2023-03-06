package com.board.member;

import java.io.Serializable;

public class MemberVO implements Serializable{
	
	private int member_seq;
	private String id;
	private String password;
	private String name;
	private String tel;
	
	
	public MemberVO() {
		
	}
	
	public MemberVO(int member_seq, String id, String password, String name, String tel) {
		this.member_seq = member_seq;
		this.id = id;
		this.password = password;
		this.name = name;
		this.tel = tel;
	}

	public int getMember_seq() {
		return member_seq;
	}

	public void setMember_seq(int member_seq) {
		this.member_seq = member_seq;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}
}

package com.board.board;

public class PagingVO {
	
	private int startIndex;
	private int pageSize;
	private String text;
	
	public PagingVO() {
		
	}
	
	public PagingVO(int startIndex, int pageSize, String text) {
		this.startIndex = startIndex;
		this.pageSize = pageSize;
		this.text = text;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	public String getText() {
		return  text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	

}

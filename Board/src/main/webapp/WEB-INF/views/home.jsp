<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/style1.css" media="screen">

<script src="https://kendo.cdn.telerik.com/2023.1.117/mjs/kendo.all.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.1.117/js/kendo.all.min.js"></script>
<style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/2023.1.117/styles/kendo.default-ocean-blue.min.css" />

<link rel="stylesheet" href="${ pageContext.request.contextPath }/resources/plugins/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }/resources/plugins/themify-icons/themify-icons.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }/resources/plugins/slick/slick.css">
<link rel="stylesheet" href="${ pageContext.request.contextPath }\resources\css\style.css" media="screen">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<!-- 부가적인 테마 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

<div>
	<div align="center" class="banner text-align">
		<div class="container">
			<h1><a onclick="location.href='/board'">게시판</a></h1>
		</div>
		<c:choose>
			<c:when test="${vo.getId() == null }">
				<input type="hidden" id="getId" value="${vo.getId() }">
				
				<input type="button" value="로그인" id="loginBtn">
				<input type="button" value="회원가입" id="joinBtn">
			</c:when>
			<c:otherwise>
				<input type="text" id="getId" value="${vo.getId() }">
				<input type="hidden" id="member_seq" value="${vo.getMember_seq() }">
				<input type="button" id="logout" value="로그아웃" onclick="location.href='${pageContext.request.contextPath}/member/logout'">
				<input type="button" value="회원탈퇴" id="memeber_delete">
				
			</c:otherwise>
		</c:choose>
	</div>
</div>

<%@ include file="/WEB-INF/views/member/join.jsp" %>
<%@ include file="/WEB-INF/views/member/login.jsp" %>

<!-- 게시판 부분 -->
<div id="tabstrip">
    <ul>
        <li id="boardM">회원 게시판</li>
        <li id="boardA">익명 게시판</li>
    </ul>
    <div>
    	<!-- 멤버게시판 -->
	<div class="body_boardM">
		<div class="boardM_menu">
			<input type="button" value="글쓰기" id="boardWrite">
			<!-- 최신, id, 제목 검색 -->
			<select id="select" name="selectType">
				<option value="1">최신순</option>
				<option value="2">ID 검색</option>
				<option value="3">제목 검색</option>
				<option value="4">날짜 검색</option>
			</select>
		</div>
		<!-- 멤버게시판 글 리스트 내역 -->
		<div class="boardM_list">
			<table class="boardStyle">
				<tr>
					<td class="wid60"><strong>글번호</strong></td>
					<td class="wid100"><strong>글쓴이</strong></td>
					<td class="wid180_left"><strong>제목</strong></td>
					<td class="wid350_left"><strong>내용</strong></td>
					<td class="wid180"><strong>작성일</strong></td>
				</tr>
				<c:forEach var="i" items="${mvo }" varStatus="status">
					<input type="hidden" value="${i.get('MEMBER_COMM_SEQ')}" id="member_comm_seq">
					<tr>
						<td class="wid60">
							${i.get('ROWNUM1') }
						</td>
						<td class="wid100">
							${i.get('ID') }
						</td>
						<td class="wid180">
							<div class="title_overflow">${i.get('TITLE') }</div>
						</td>
						<td class="wid350">
							<div class="text_overflow">${i.get('CONTENT') }</div>
						</td>
						<td class="wid180">
							${i.get('CURRENT_DATE') }
						</td>
						<td><button type="button" id="detail" name="detail" value="${i.get('MEMBER_COMM_SEQ')}">자세히보기...</button></td>
					</tr>
				</c:forEach>
			</table>
			<div class="su">
				<c:forEach var="j" begin="${pagingUtil.startPage}" end="${pagingUtil.endPage }" step="1">
					<a name="paging_btn">${j}</a>
				</c:forEach>
			</div>
		</div>
		<!-- 날짜 검색 폼 -->
		<div align="center" class="datePicker">
		
		</div>
		<!-- 멤버게시판 글쓰기 폼 -->
		<div align="center"  class="boardM_write">
			
		</div>
		
		<!-- 멤버게시판 자세히 보기 폼 -->
		<div align="center" class="boardM_detail">
			
		</div>
	</div>
    </div>
    <div>
    	<div class="body_boardA">
	    	<div class="boardA_menu">
				<input type="button" value="글쓰기" id="boardWrite1">				
				<!-- 최신, id, 제목 검색 -->
				<select id="select1" name="selectType1">
					<option value="1">최신순</option>
					<option value="2">이름 검색</option>
					<option value="3">제목 검색</option>
					<option value="4">날짜 검색</option>
				</select>
			</div>
				<!-- 익명게시판 글 리스트 내역 -->
		<div class="boardA_list">
			<table class="boardStyle1">
				<tr>
					<td class="wid60"><strong>글번호</strong></td>
					<td class="wid180"><strong>작성자</strong></td>
					<td class="wid180"><strong>제목</strong></td>
					<td class="wid350"><strong>내용</strong></td>
					<td class="wid180"><strong>작성일</strong></td>
				</tr>
				<c:forEach var="i" items="${mvo1 }" varStatus="status">
					<input type="hidden" value="${i.get('ANONYM_COMM_SEQ')}" id="anonym_comm_seq">
					<tr>
						<td class="wid60">
							${i.get('ROWNUM1') }
						</td>
						<td class="wid180_left">
							<div>${i.get('A_NAME') }</div>
						</td>
						<td class="wid180_left">
							<div class="title_overflow">${i.get('A_TITLE') }</div>
						</td>
						<td class="wid350">
							<div class="text_overflow">${i.get('A_CONTENT') }</div>
						</td>
						<td class="wid180">
							${i.get('A_CURRENT_DATE') }
						</td>
						<td><button type="button" id="detail1" name="detail1" value="${i.get('ANONYM_COMM_SEQ')}">자세히보기...</button></td>
					</tr>
				</c:forEach>
			</table>
			<div class="su1">
				<c:forEach var="j" begin="${pagingUtil1.startPage}" end="${pagingUtil1.endPage }" step="1">
					<a name="paging_btn1">${j}</a>
				</c:forEach>
			</div>
		</div>
		<!-- 익명게시판 글쓰기 폼 -->
		<div align="center"  class="boardA_write">
			
		</div>
		<!-- 비밀번호 입력 폼 -->
		<div align="center" class="boardA_password">
			
		</div>
		
		<!-- 익명게시판 자세히 보기 폼 -->
		<div align="center" class="boardA_detail">
			
		</div>
		
		<div align="center" class="datePicker1">
		
		</div>
	</div>
    </div>
</div>

<script src="${pageContext.request.contextPath }/resources/js/board.js"></script>
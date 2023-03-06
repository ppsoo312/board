<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script> -->
<%-- <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/style1.css" media="screen"> --%>

<div class="joinPage" align="center">
	<div class="header" align="center">
	</div>
	<%-- <form action="${pageContext.request.contextPath }/member/login" id = "input" name="input" method="post"> --%>
		<table>
			<tr class="trJ"><td>회원가입</td></tr>
			<tr class="trJ">
				<td>Id</td>
				<td><input type="text" id="id" name="id"></td>
			</tr>
			<tr class="trJ">
				<td>Password</td>
				<td><input type="password" id="password" name="password"></td>
			</tr>
			<tr class="trJ">
				<td>PasswordRe</td>
				<td><input type="password" id="passwordRe" name="passwordRe"></td>
			</tr>
			
			<tr class="trJ">
				<td>Name</td>
				<td><input type="text" id="name" name="name"></td>
			</tr>
			<tr class="trJ">
				<td>Tel</td>
				<td><input type="text" id="tel" name="tel" placeholder="-를 제외하고 입력해주세요"></td>
			</tr>
			<tr class="trJ">
				<td><input type="button" value="가입" class="reg" id="reg"></td>
				<td><input type="button" value="취소" onclick="location.href='${pageContext.request.contextPath }'"></td>
				
			</tr>
		</table>
<!-- 	</form> -->
</div>
<script src="${pageContext.request.contextPath }/resources/js/join.js"></script>

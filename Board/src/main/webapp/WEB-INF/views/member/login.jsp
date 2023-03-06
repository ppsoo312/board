<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script> -->
<%-- <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/style.css" media="screen"> --%>

<div class="loginPage" align="center">
	
	<div class="header" align="center">
	</div>
	<table>
		<tr class="tr">
			<td>Id</td>
			<c:choose>
				<c:when test="${id == null }">
					<td><input type="text" id="loginId" name="loginId"></td>
				</c:when>
				<c:otherwise>
					<td><input type="text" id="id" name="id" value="${id }"></td>	
				</c:otherwise>
			</c:choose>
		</tr>
		<tr class="tr">
			<td>Password </td>
			<td> <input type="password" id="loginPassword"></td>
		</tr>
		<tr class="tr">
			
			<td><input type="button" value="확인" id="login"></td>
			<td><input type="button" value="취소" onclick="location.href='${pageContext.request.contextPath }'"></td>
		</tr>
	</table>
</div>

<script src="${pageContext.request.contextPath }/resources/js/login.js"></script>
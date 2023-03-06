
$(document).ready(function(){
	
	//회원가입 부분
	$('#reg').on("click", function(){
		let id = $('#id').val();
		let password = $('#password').val();
		let passwordRe = $('#passwordRe').val();
		let name = $('#name').val();
		let tel = $('#tel').val();
		
		// 아이디 유효성 검사
		if(!checkId(id)){
			return false;
		}
		// 비밀번호 유효성 검사
		if(!checkPassword(password, passwordRe)){
			return false;
		}
		// 이름 유효성 검사
		if(!checkName(name)){
			return false;
		}
		// 전화번호 유효성 검사
		if(!checkTel(tel)){
			return false;
		}

		
		let data1 = {"id":id, "password":password, "name":name, "tel":tel}
		
		$.ajax({
			type : 'post',
			url : '/board/member/joinCheck',
			data : JSON.stringify(data1),
			contentType : "application/json;charset=UTF-8",
			success : function(result){
				 console.log("성공 여부" + result);	
				 console.log(result.id)
				 
				 $('#loginBtn').trigger("click");
				 
				 
			},
			error : function(request, status, error){
				 alert("이미 존재하는 아이디 또는 잘못된 아이디 입니다 다시 입력해주세요");
			}
			
		});

		
	});
	
});

// id 유호셩 검사
function checkId(id){
	
	if(!checkNullData("ID", id)) return false;
	
//	let idJ = /^[a-z]|[a-z0-9]{4,12}$/g;
//	
//	if(!idJ.test(id)){
//		alert("id는 영문 또는 숫자를 이용하여 4~12로 입력해주세요");
//		return false;
//	}
	return true;
}

// name 유효성 검사
function checkName(name){
	
	if(!checkNullData("NAME", name)) return false;
	
	return true;
}

// tel 유효성 검사
function checkTel(tel){
	
	if(!checkNullData("TEL", tel)) return false;
	
//	let telJ = /[0-9]{11}$/g;
//	
//	if(!telJ.test(tel)){
//		alert("전화번호는 11자리 숫자로만 입력해주세요");
//		return false;
//	}
	return true;
}

// 비밀번호 유효성 검사
function checkPassword(password, passwordRe){
	
	if(!checkNullData("PASSWORD", password)) return false;
	if(!checkNullData("PASSWORDRE", passwordRe)) return false;
	
	if(password != passwordRe){
		alert("비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
		return false;
	}
	
//	let passwordJ = /^[a-z]|[0-9]{4, 12}$/g;
//	
//	if(!passwordJ.test(password)){
//		alert("비밀번호는 4 ~ 11 자리 영문과 숫자를 조합해서 입력해주세요");
//		return false;
//	}
	
	return true;
}

// 빈 칸 검사
function checkNullData(name, nValue){
	if(nValue == ""){
		alert(name + "을 입력하세요");
		return false;
	}
	return true;
}

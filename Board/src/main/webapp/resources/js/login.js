
$(document).ready(function(){
	
	
	$(document).on("click", '#login', function(){

			let id = $('#loginId').val();
			let password = $('#loginPassword').val();
			
			// 아이디 유효성 검사
			if(!checkNullData("ID", id)){
				return false;
			}
			if(!checkNullData("PASSWORD", password)){
				return false;
			}
			let data1 = {"id":id, "password":password}

			$.ajax({
				type : 'post',
				url : '/board/member/loginOk',
				data : JSON.stringify(data1),
				contentType : "application/json;charset=UTF-8",
				success : function(result) {
					console.log("성공" + result.id);
					$('.header').show();
					$('#tabstrip').show();
					$('.loginPage').hide();
					if(result != ""){						
						location.reload();
					} else {
						alert("로그인 실패, 아이디 또는 비밀번호를 다시 확인해주세요");
						$('#loginBtn').trigger("click");
					}

				},
				error : function(request, status, error){
					 alert("빈칸은 입력하실 수 없습니다.");
				}
				
			});

		});
});

//빈 칸 검사
function checkNullData(name, nValue){
	if(nValue == ""){
		alert(name + "을 입력하세요");
		return false;
	}
	return true;
}

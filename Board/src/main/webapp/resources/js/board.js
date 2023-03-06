/** 게시판 관련**/

// 로그인, 비로그인 처리
// 메인, 익명 게시판 선택
if($('#getId').val() != "") {
	let tabToActivate = $("#boardM");
	$("#tabstrip").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);
} else {
    let tabToActivate = $("#boardA");
    $("#tabstrip").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);
}

$(document).ready(function(){
	// 로그인 부분
	$('.loginPage').hide();
	$('.joinPage').hide();
	
	$(document).on("click", "#loginBtn", function(){
		
		$('.banner').hide();
		$('#tabstrip').hide();
		$('.joinPage').hide();
		$('.loginPage').show();
	});
	
	$(document).on("click", "#joinBtn", function(){
		
		$('.banner').hide();
		$('#tabstrip').hide();
		$('.joinPage').show();
		
	});
	
	// 익명 게시판 부분
	$("#tabstrip").kendoTabStrip({
        animation:  {
            open: {
                effects: "fadeIn"
            }
        }
    });
	// 익명 게시물 글쓰기 버튼
	$("#boardWrite1").kendoButton({
        themeColor: "primary",
        enable: true
    });

	// 익명 게시글 글쓰기 버튼 클릭 시
	let boardA_write = $(".boardA_write"),
		boardWrite1 = $('#boardWrite1');
		boardA_list = $('.boardA_list');
	let con = "<table class='boardA_table'>" +
			"<tr><td><input type='hidden' id='anonymSeq'></td></tr>" + 
			"<tr><td>글 제목 : <input type='text' id='a_title'></td></tr>" +
			"<tr><td>작성자 : <input type='text' id='a_name'></td><td>글 열람 비밀번호 : <input type='text' id='a_password'></td></tr>" +
			"<tr><td>글 내용</td></tr>" +
			"<tr><td colspan='3'><textarea rows='19' cols='70' id='a_content'></textarea></td></tr>" +
			"<tr><td><button type='button' id='write1'>확인</button><button type='button' id='reset1'>취소</button></td></tr></table>"
	
	boardWrite1.click(function(){
		boardA_write.kendoDialog({
			width: "700px",
			height : "500px",
			title: "익명 게시글 글쓰기",
			modal: true,
			closable: true,
			content: con,
			
		});
		boardA_write.data("kendoDialog").open();

		
	});
	
	// 익명 게시판 작성하기 완료 버튼 클릭 시
	$(document).on("click", "#write1", function(){

		boardWrite1.fadeIn();
		
		
		let a_title = $('#a_title').val();
		let a_name = $('#a_name').val();
		let a_password = $('#a_password').val();
		let a_content = $('#a_content').val();
		
		let data1 = {"a_name":a_name, "a_password":a_password, "a_title":a_title, "a_content":a_content}
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/boardAdd1',
			data : JSON.stringify(data1),
			contentType : "application/json;charset=UTF-8",
			success : function(result){
				$('.boardA_write').data("kendoDialog").close();
				window.location.href='/board';
				location.reload();

			},
			error : function(request, status, error){
				alert("빈칸 없이 다시 입력하세요");
				
			}
			
		});
	});
    
	
	
	// 익명 게시물 글쓰기 버튼
	$("button[name=detail1]").kendoButton({
        themeColor: "primary",
        enable: true
    });
	
	let boardA_detail = $('.boardA_detail');
	
	let det = "<div align='center' class='boardA_detail'>" +
			"<table><tr><td><input type='hidden' id='asc'></td></tr>" +
			"<tr><td>글 제목 : <input type='text' id='detail_title1' readonly='readonly'/></td>" +
			"<td>작성자 : <input type='text' id='detail_id1' readonly='readonly'/></td></tr>" +
			"<tr><td>글 내용</td></tr>" +
			"<tr><td colspan='3'><textarea rows='15' cols='80' id='detail_content1' readonly='readonly'></textarea></td></tr>" +
			"<td><input type='hidden' id='memberBSeq1'></td></tr>" +
			"<tr><td><input type='button' value='수정' id='detail_update1'><button type='button' id='detail_delete1'>삭제</button><input type='button' value='취소' id='detail_reset1' onclick='" + "location.href='/board'></td></tr></table></div>"
			
	$(document).on("click", "button[name=detail1]", function(){
		
		$(".boardA_detail").kendoDialog({
			width: "700px",
			height : "500px",
			title: "자세히보기",
			modal: true,
			closable: true,
			content: det
		});
		
		let acs = $(this).val();

		
		let data2 = {"mcs1":acs, "is":"2"}

		$.ajax({
			type : 'post',
			url : '/board/boardC/detail',
			data : data2,
			success : function(result){
				$('.boardA_detail').show();
				$('#memberBSeq1').val(result["ANONYM_COMM_SEQ"]);
				$('#detail_title1').val(result["A_TITLE"]);
				$('#detail_id1').val(result["A_NAME"]);
				$('#detail_content1').val(result["A_CONTENT"]);
				$('#anonymSeq').val(result["ANONYM_COMM_SEQ"]);
				$('#asc').val(acs);
				
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
		boardA_detail.data("kendoDialog").open();
		
	});
	
	

	
	// 익명 게시물 디테일 수정
	$(document).on("click", '#detail_update1', function(){
		if($('#detail_update1').val() == "수정하기완료"){
			
			let anonym_comm_seq = $('#asc').val();
			let a_title = $('#detail_title1').val();
			let a_name = $('#detail_id1').val();
			let a_content = $('#detail_content1').val();
			let data1 = {"anonym_comm_seq":anonym_comm_seq, "a_title":a_title, "a_name":a_name, "a_content":a_content}
			// 수정한 게시물 내용 전달
			$.ajax({
				type : 'post',
				url : '/board/boardC/changeA',
				data : JSON.stringify(data1),
				contentType : "application/json;charset=UTF-8",
				success : function(){
					let aList = "<button type='button' id='detail_delete1'>삭제</button>";
					$('.boardA_detail input').attr("readonly", "readonly");
					$('.boardA_detail textarea').attr("readonly", "readonly");
					$('#detail_update1').attr("value", "수정");
					$('#detail_delete1').show();

					
				},
				error : function(request, status, error){
					alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
				
				
			});
			
		} else {
			
			let pass = "<table><tr><td>비밀 번호 입력 : <input type='text' id='passwordClear'></td>" +
			"<td><button type='button' id='passCheck'>확인</button></td>" +
			"<td><input type='button' id='passReset' value='취소'></td></tr></table>";
			
			let asc = $('#asc').val();
			boardA_detail.data("kendoDialog").close();
			$(".boardA_password").kendoDialog({
				width: "700px",
				height : "500px",
				title: "수정",
				modal: true,
				closable: true,
				content: pass
			});
			
			$(".boardA_password").data("kendoDialog").open();
			$('#passCheck').val(asc);
		}

	});
	
	// 익명 게시판 삭제하기
	$(document).on("click", "#detail_delete1", function(){
		
		let pass = "<table><tr><td>비밀 번호 입력 : <input type='text' id='passwordClear'></td>" +
		"<td><input type='hidden' value='1' id='ais'></td>" + 
		"<td><button type='button' id='passCheck'>확인</button></td>" +
		"<td><input type='button' id='passReset' value='취소'></td></tr></table>";
		
		let asc = $('#asc').val();
		boardA_detail.data("kendoDialog").close();
		$(".boardA_password").kendoDialog({
			width: "700px",
			height : "500px",
			title: "삭제",
			modal: true,
			closable: true,
			content: pass
		});
		
		$(".boardA_password").data("kendoDialog").open();
	});
	
	
	$(document).on("click", '#passCheck', function(){
		
		$(".boardA_password").data("kendoDialog").close();
		let anonym_comm_seq = $(this).val();
		// 비밀번호 검사
		let passwordClear = $('#passwordClear').val();
		
		
		let data1 = {"passwordClear": passwordClear, "anonym_comm_seq":anonym_comm_seq}
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/passClear',
			data : JSON.stringify(data1),
			contentType : "application/json;charset=UTF-8",
			success : function(){
				let ais = $('#ais').val();
				$('.boardA_password').data("kendoDialog").close;
				if(ais == 1){
					
					let memberBSeq1 = $('#memberBSeq1').val();
					
					$.ajax({
						type : 'post',
						url : '/board/boardC/delete',
						data : {"seq":memberBSeq1, "is":2},
						success : function(){
							
							location.reload();
						},
						error : function(request, status, error){
							alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
						}
					});
					
				} else {				
					$('.boardA_detail').show();
					$('.boardA_detail input').removeAttr("readonly");
					$('.boardA_detail textarea').removeAttr("readonly");
					$('#detail_update1').attr("value", "수정하기완료");
					$('#detail_delete1').hide();
					boardA_detail.data("kendoDialog").open();
				}
				
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});

	
	// 비밀번호 체크 취소
	$(document).on("click", '#passReset', function(){
		$(".boardA_password").data("kendoDialog").close();
	});
	// 수정하기 취소, 자세히 보기 취소
	$(document).on("click", '#detail_reset1', function(){
		boardA_detail.data("kendoDialog").close();
		location.reload();
	});
	
	let dateA = "<table><tr><td><label for='dateinput1'>Start date:</label><input id='start1'/></td>" +
	"<td><label for='end1'>End date:</label><input id='end1'/></td></tr>" +
	"<tr><td><button type='button' id='dateBtn1'>확인</button><button type='button' id='dateReset1'>취소</button>"
	
	
	
	
	$(document).on("change", '#select1', function(){
		
		$('#search1').remove();
		$('#searchBtn1').remove();
		
		let select = this.value;	
		
		if(select == "1"){
			location.reload();
		} else if(select == "4"){

			
			$('.datePicker1').kendoDialog({
				width: "700px",
				height : "500px",
				title: "날짜 선택",
				modal: true,
				content: dateA
			
			});
			
			$('.datePicker1').data("kendoDialog").open();
			
			function startChange() {
		        let startDate = start1.value(),
		        endDate = end1.value();

		        if (startDate) {
		            startDate = new Date(startDate);
		            startDate.setDate(startDate.getDate());
		            end1.min(startDate);
		        } else if (endDate) {
		            start1.max(new Date(endDate));
		        } else {
		            endDate = new Date();
		            start1.max(endDate);
		            end1.min(endDate);
		        }
		    }

		    function endChange() {
		        let endDate = end1.value(),
		        startDate = start1.value();

		        if (endDate) {
		            endDate = new Date(endDate);
		            endDate.setDate(endDate.getDate());
		            start1.max(endDate);
		        } else if (startDate) {
		            end1.min(new Date(startDate));
		        } else {
		            endDate = new Date();
		            start1.max(endDate);
		            end1.min(endDate);
		        }
		    }
			
			let start1 = $("#start1").kendoDatePicker({
                change: startChange
            }).data("kendoDatePicker");

			let end1 = $("#end1").kendoDatePicker({
                change: endChange
            }).data("kendoDatePicker");

            start1.max(end1.value());
            end1.min(start1.value());           
			
			
		} else {
		
			$('.boardA_menu').append("<input type='text' id='search1'>" +
					" <button type='button' id='searchBtn1'>검색</button>");
			
		}
	
	});
	
	
	// select 버튼 클릭 시
	$(document).on("click", '#searchBtn1', function(){
		
		let text = $('#search1').val();
		let select = $("#select1 option:selected").val();
		
		let data1 = {"text":text, "select":select}
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/pagingA',
			data : data1,
			success : function(result){
				
				$('.boardStyle1 tr').remove();

				let list;
				
				list = "<tr><td class='wid60'><strong>글번호</strong></td>" +
						"<td class='wid180'><strong>작성자</strong></td>" +
						"<td class='wid180'><strong>제목</strong></td>" +
						"<td class='wid350'><strong>내용</strong></td>" +
						"<td class='wid180'><strong>작성일</strong></td></tr>"
				

				$.each(result, function(index, value){
					list += 
							"<tr><td class='wid60'>" + value['ROWNUM1'] + "</td>" +
							"<td class='wid180'><div class='title_overflow'>" + value['A_NAME'] + "</div></td>" +
							"<td class='wid180'><div class='title_overflow'>" + value['A_TITLE'] + "</div></td>" +
							"<td class='wid350'><div class='text_overflow'>" + value['A_CONTENT'] + "</div></td>" +
							"<td class='wid180'>" + value['CURRENT_DATE'] + "</td>" +
							"<td><button type='button' id='detail1' name='detail1' value=" + value['ANONYM_COMM_SEQ'] + ">" +
							"자세히보기...</button></td></tr>"
				});
				
				$('.boardStyle1').append(list).trigger("create");
				
				$("button[name=detail1]").kendoButton({
					themeColor: "primary",
			        enable: true
				});
				
				$('.su1').remove();
				
				let page;
				
				let count = result.length / 10 + 1;
				$.each(count, function(index, value){
					page = "<a name='paging_btn1'>"+value+"</a>";
				});
				

				
				//$('.boardStyle').append(index).trigger("create");
				
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});
	
	
	// 날짜 선택 검색 취소
	$(document).on("click", "#dateReset1", function(){
		location.reload();
	});
	// 날짜 선택 검색 확인
	$(document).on("click", "#dateBtn1", function(){
		let start = $('#start1').val();
		let end = $('#end1').val();
		
		let word = start.split("/");
		let word1;
		
		word1 = word[2];
		word[2] = word[1];
		word[1] = word[0];
		word[0] = word1;
		
		if(word[1].length == 1){
			word[1] = "0" + word[1];
		}
		if(word[2].length == 1){
			word[2] = "0" + word[2];
		}
		start = word.join("-");
		
		word = end.split("/");
		word1 = word[2];
		word[2] = word[1];
		word[1] = word[0];
		word[0] = word1;
		if(word[1].length == 1){
			word[1] = "0" + word[1];
		}
		if(word[2].length == 1){
			word[2] = "0" + word[2];
		}

		end = word.join("-");

		$.ajax({
			type : 'post',
			url : '/board/boardC/dateA',
			data : {"start":start, "end":end},
			success : function(result){
				$('.boardStyle1 tr').remove();

				let list;
				
				list = "<tr><td class='wid60'><strong>글번호</strong></td>" +
						"<td class='wid180_left'><strong>제목</strong></td>" +
						"<td class='wid350_left'><strong>내용</strong></td>" +
						"<td class='wid180'<strong>작성일</strong></td></tr>"
				

				$.each(result, function(index, value){
					list += 
							"<tr><td class='wid60'>" + value['ROWNUM1'] + "</td>" +
							"<td class='wid180'><div class='title_overflow'>" + value['A_NAME'] + "</div></td>" +
							"<td class='wid180'><div class='title_overflow'>" + value['A_TITLE'] + "</div></td>" +
							"<td class='wid350'><div class='text_overflow'>" + value['A_CONTENT'] + "</div></td>" +
							"<td class='wid180'>" + value['CURRENT_DATE'] + "</td>" +
							"<td><button type='button' id='detail' name='detail1' value=" + value['ANONYM_COMM_SEQ'] + ">" +
							"자세히보기...</button></td></tr>"
				});
				$('.boardStyle1').append(list).trigger("create");
				
				$("button[name=detail1]").kendoButton({
					themeColor: "primary",
			        enable: true
				});
				$('.su1').remove();
				
				$('.datePicker1').data("kendoDialog").close();
				
				let page;
				
				let count = result.length / 10 + 1;
				
				$.each(count, function(index, value){
					page = "<a name='paging_btn1'>"+value+"</a>";
				});
				
				
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
			
		});
		
	});
	
	$("a[name=paging_btn1]").kendoButton({
		themeColor: "primary",
		enable: true
	});
	
	$(document).on("click", 'a[name=paging_btn1]', function(){
		
		let page = $(this).text();
		let data1 = {"page":page}
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/pagingA',
			data : data1,
			success : function(result){

				$('.boardStyle1 tr').remove();

				let list;
				
				list = "<tr><td class='wid60'><strong>글번호</strong></td>" +
						"<td class='wid180'><strong>작성자</strong></td>" +
						"<td class='wid180'><strong>제목</strong></td>" +
						"<td class='wid350'><strong>내용</strong></td>" +
						"<td class='wid180'<strong>작성일</strong></td></tr>"

				$.each(result, function(index, value){
					list += 
							"<tr><td class='wid60'>" + value['ROWNUM1'] + "</td>" +
							"<td class='wid180_left'><div>" + value['A_NAME'] + "</div></td>" +
							"<td class='wid180_left'><div class='title_overflow'>" + value['A_TITLE'] + "</div></td>" +
							"<td class='wid350'><div class='text_overflow'>" + value['A_CONTENT'] + "</div></td>" +
							"<td class='wid180'>" + value['A_CURRENT_DATE'] + "</td>" +
							"<td><button type='button' id='detail1' name='detail1' value=" + value['ANONYM_COMM_SEQ'] + ">" +
							"자세히보기...</button></td></tr>"
				});
				
				$('.boardStyle1').append(list).trigger("create");
				$("button[name=detail1]").kendoButton({
					themeColor: "primary",
					enable: true
				});
				
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}

		});
	});
	

	

	
	/** -------------------------------------------------------------------------------------------------------- **/
	// 멤버게시판 부분
	
	//  게시물 글쓰기 버튼
	$("#boardWrite").kendoButton({
        themeColor: "primary",
        enable: true
    });

	// 멤버게시판 익명 게시판 버튼 클릭 시
	$(document).on("click", '#boardM', function(){
		// 로그인
		if($('#getId').val() != ""){
			$('.body_boardM').show();
			$('.body_boardA').hide();
			location.href = "/board";
		// 비 로그인
		} else {
			alert("멤버 게시판은 로그인 후 이용 가능합니다.");
			$('#loginBtn').trigger("click");
		}
	});
	
	// 회원탈퇴
	$(document).on("click", "#memeber_delete", function(){
		let member_seq = $('#member_seq').val();
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/memberDelete',
			data : {"member_seq":member_seq},
			success : function(){
				alert("탈퇴성공");
				location.reload();
				$('#logout').trigger("click");
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});
	
	
	// 멤버 게시판 글쓰기 클릭
	$(document).on("click", '#boardWrite',function(){
		let id = $('#getId').val();
		let seq = $('#mem_seq').val();
		let write = "<input type='hidden' id='member_seq' value='"+ seq +"'>" +
		"<table class='boardM_table'><tr><td><strong>게시물 작성</strong></td><tr>" +
		"<tr><td>글 제목 : <input type='text' id='title'></td><td>작성자 : " + id + "</td></tr>" +
		"<tr><td>글 내용</td></tr>" +
		"<tr><td colspan='3'><textarea rows='15' cols='80' id='content'></textarea></td></tr>" +
		"<tr><td><input type='button' value='작성' id='write'><input type='button' value='취소' id='reset'></td></tr></table>"
		
		$('.boardM_write').kendoDialog({
			width: "700px",
			height : "500px",
			title: "멤버 게시물 글쓰기",
			modal: true,
			closable: true,
			content: write
		
		});
		
		$('.boardM_write').data("kendoDialog").open();

	});
	
		
	// 멤버 게시판 => 작성하기 클릭
	$(document).on("click", "#write", function(){
		
			let member_seq = $('#member_seq').val();
			let title = $('#title').val();
			let content = $('#content').val();
			
			let data1 = {"member_seq":member_seq, "title":title, "content":content}
			
			$.ajax({
				type : 'post',
				url : '/board/boardC/boardAdd',
				data : JSON.stringify(data1),
				contentType : "application/json;charset=UTF-8",
				success : function(result){
					$('.boardM_write').data("kendoDialog").close();
					window.location.href="/board"
				},
				error : function(request, status, error){
					
					console.log("code",request.status,"message",request.responseText,"error",error);
				}
				
				
			});
		
		
	});
	
	// 멤버 게시판 => 글쓰기 취소
	$(document).on("click", '#reset', function(){
		$('.boardM_write').data("kendoDialog").close();
	});
	
			
	
	// 자세히 보기 클릭 부분
	$("button[name=detail]").kendoButton({
		themeColor: "primary",
        enable: true
	});
	
	let detM = "<table><tr><td>글 제목 : <input type='text' id='detail_title' readonly='readonly'/></td>" +
	"<td>작성자 : <input type='text' id='detail_id' readonly='readonly'/></td></tr>" +
	"<tr><td>글 내용</td></tr>" +
	"<tr><td colspan='3'><textarea rows='15' cols='80' id='detail_content' readonly='readonly'></textarea></td>" +
	"<td><input type='hidden' id='memberBSeq'></td></tr>" +
	"<tr><td><input type='button' value='수정' id='detail_update'>" +
	"<input type='button' value='삭제' id='detail_delete'>" +
	"<input type='button' value='취소' id='detail_reset'></td></tr></table>";
	
	
	$(document).on("click", "button[name=detail]", function(){

		$(".boardM_detail").kendoDialog({	
			width: "700px",
			height : "500px",
			title: "자세히보기",
			modal: true,
			closable: true,
			content: detM
		});
		
		$('.boardM_detail').data("kendoDialog").open();
		
		let mcs = $(this).val();
		let data1 = {"mcs":mcs}
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/detail',
			data : data1,
			success : function(result){
				$('#memberBSeq').val(result["MEMBER_COMM_SEQ"]);
				$('#detail_title').val(result["TITLE"]);
				$('#detail_id').val(result["ID"]);
				$('#detail_content').val(result["CONTENT"]);
				
				if(result["EQUL"] == "EQUL"){
					$('#detail_update').show();
					$('#detail_delete').show();
				} else {
					$('#detail_update').hide();
					$('#detail_delete').hide();
				}
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
			
		});
		

	});
	
	$(document).on("click", "#detail_reset", function(){
		window.location.href='/board';
	});
	
	// 수정하기 버튼 클릭 시
	$(document).on("click", "#detail_update", function(){
		
		if($('#detail_update').val() != "수정하기완료"){
			$('.boardM_detail input').removeAttr("readonly");
			$('.boardM_detail textarea').removeAttr("readonly");
			$('#detail_update').attr("value", "수정하기완료");
			
		} else {
			
			let memberBSeq = $('#memberBSeq').val();
			let title = $('#detail_title').val();
			let content = $('#detail_content').val();
			
			let data1 = {"member_comm_seq":memberBSeq, "title":title, "content":content}
			
			$.ajax({
				type : 'post',
				url : '/board/boardC/changeM',
				data : JSON.stringify(data1),
				contentType : "application/json;charset=UTF-8",
				success : function(){
					$('#detail_update').attr("value", "수정");
				},
				error : function(request, status, error){
					alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
				
			});
		}
	});
	
	// 멤버 게시글 삭제하기 버튼 클릭 시
	$(document).on("click", "#detail_delete", function(){
		
		let memberBSeq = $('#memberBSeq').val();
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/delete',
			data : {"seq":memberBSeq, "is":1},
			success : function(){
				
				location.reload();
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
			
		});
	});
	
	$("a[name=paging_btn]").kendoButton({
		themeColor: "primary",
		enable: true
	});

	// 페이징버튼 클릭 시
	$(document).on("click", 'a[name=paging_btn]', function(){
		
		let page = $(this).text();
		
		let data1 = {"page":page}
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/paging',
			data : data1,
			success : function(result){

				$('.boardStyle tr').remove();

				let list;
				
				list = "<tr><td class='wid60'><strong>글번호</strong></td>" +
						"<td class='wid100'><strong>글쓴이</strong></td>" +
						"<td class='wid180_left'><strong>제목</strong></td>" +
						"<td class='wid350_left'><strong>내용</strong></td>" +
						"<td class='wid180'<strong>작성일</strong></td></tr>"
				

				$.each(result, function(index, value){
					list += 
							"<tr><td class='wid60'>" + value['ROWNUM1'] + "</td>" +
							"<td class='wid100'>" + value['ID'] + "</td>" +
							"<td class='wid180'><div class='title_overflow'>" + value['TITLE'] + "</div></td>" +
							"<td class='wid350'><div class='text_overflow'>" + value['CONTENT'] + "</div></td>" +
							"<td class='wid180'>" + value['CURRENT_DATE'] + "</td>" +
							"<td><button type='button' id='detail' name='detail' value=" + value['MEMBER_COMM_SEQ'] + ">" +
							"자세히보기...</button></td></tr>"
				});
				
				$('.boardStyle').append(list).trigger("create");
				$("button[name=detail]").kendoButton({
					themeColor: "primary",
					enable: true
				});
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}

		});
	});
	
	let date = "<table><tr><td><label for='dateinput'>Start date:</label><input id='start'/></td>" +
			"<td><label for='end'>End date:</label><input id='end'/></td></tr>" +
			"<tr><td><button type='button' id='dateBtn'>확인</button><button type='button' id='dateReset'>취소</button>"

	// 최신, 이름, 제목 클릭 시
	$(document).on("change", '#select', function(){
		
		$('#search').remove();
		$('#searchBtn').remove();
		
		let select = this.value;	
		
		if(select == "1"){
			$('#boardM').trigger("click");
		} else if(select == "4"){
			
			$('.datePicker').kendoDialog({
				width: "700px",
				height : "500px",
				title: "날짜 선택",
				modal: true,
				content: date
			
			});
			
			function startChange() {
		        let startDate = start.value(),
		        endDate = end.value();

		        if (startDate) {
		            startDate = new Date(startDate);
		            startDate.setDate(startDate.getDate());
		            end.min(startDate);
		        } else if (endDate) {
		            start.max(new Date(endDate));
		        } else {
		            endDate = new Date();
		            start.max(endDate);
		            end.min(endDate);
		        }
		    }

		    function endChange() {
		        let endDate = end.value(),
		        startDate = start.value();

		        if (endDate) {
		            endDate = new Date(endDate);
		            endDate.setDate(endDate.getDate());
		            start.max(endDate);
		        } else if (startDate) {
		            end.min(new Date(startDate));
		        } else {
		            endDate = new Date();
		            start.max(endDate);
		            end.min(endDate);
		        }
		    }
			
			let start = $("#start").kendoDatePicker({
                change: startChange
            }).data("kendoDatePicker");

			let end = $("#end").kendoDatePicker({
                change: endChange
            }).data("kendoDatePicker");

            start.max(end.value());
            end.min(start.value());           
			
			
		} else {
		
			$('.boardM_menu').append("<input type='text' id='search'>" +
					" <button type='button' id='searchBtn'>검색</button>");
			
		}
	
	});
	// 날짜 선택 검색 취소
	$(document).on("click", "#dateReset", function(){
		location.href='/board';
	});
	// 날짜 선택 검색 확인
	$(document).on("click", "#dateBtn", function(){
		let start = $('#start').val();
		let end = $('#end').val();
		
		let word = start.split("/");
		let word1;
		
		word1 = word[2];
		word[2] = word[1];
		word[1] = word[0];
		word[0] = word1;
		
		if(word[1].length == 1){
			word[1] = "0" + word[1];
		}
		if(word[2].length == 1){
			word[2] = "0" + word[2];
		}
		start = word.join("-");
		
		word = end.split("/");
		word1 = word[2];
		word[2] = word[1];
		word[1] = word[0];
		word[0] = word1;
		if(word[1].length == 1){
			word[1] = "0" + word[1];
		}
		if(word[2].length == 1){
			word[2] = "0" + word[2];
		}

		end = word.join("-");

		$.ajax({
			type : 'post',
			url : '/board/boardC/date',
			data : {"start":start, "end":end},
			success : function(result){
				$('.boardStyle tr').remove();

				let list;
				
				list = "<tr><td class='wid60'><strong>글번호</strong></td>" +
						"<td class='wid100'><strong>글쓴이</strong></td>" +
						"<td class='wid180'><strong>제목</strong></td>" +
						"<td class='wid350'><strong>내용</strong></td>" +
						"<td class='wid180'<strong>작성일</strong></td></tr>"
				

				$.each(result, function(index, value){
					list += 
							"<tr><td class='wid60'>" + value['ROWNUM1'] + "</td>" +
							"<td class='wid100'>" + value['ID'] + "</td>" +
							"<td class='wid180'><div class='title_overflow'>" + value['TITLE'] + "</div></td>" +
							"<td class='wid350'><div class='text_overflow'>" + value['CONTENT'] + "</div></td>" +
							"<td class='wid180'>" + value['CURRENT_DATE'] + "</td>" +
							"<td><button type='button' id='detail' name='detail' value=" + value['MEMBER_COMM_SEQ'] + ">" +
							"자세히보기...</button></td></tr>"
				});
				
				$('.boardStyle').append(list).trigger("create");
				$("button[name=detail]").kendoButton({
					themeColor: "primary",
			        enable: true
				});
				$('.su').remove();
				
				$('.datePicker1').data("kendoDialog").close();
				
				let page;
				
				let count = result.length / 10 + 1;
				
				$.each(count, function(index, value){
					page = "<a name='paging_btn'>"+value+"</a>";
				});
				
				$("button[name=detail]").kendoButton({
					themeColor: "primary",
			        enable: true
				});
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
			
		});
		
	});
	
	
	
	
	// select 버튼 클릭 시
	$(document).on("click", '#searchBtn', function(){
		
		let text = $('#search').val();
		let select = $("#select option:selected").val();
		
		let data1 = {"text":text, "select":select}
		
		$.ajax({
			type : 'post',
			url : '/board/boardC/paging',
			data : data1,
			success : function(result){
				
				$('.boardStyle tr').remove();

				let list;
				
				list = "<tr><td class='wid60'><strong>글번호</strong></td>" +
						"<td class='wid100'><strong>글쓴이</strong></td>" +
						"<td class='wid180_left'><strong>제목</strong></td>" +
						"<td class='wid350_left'><strong>내용</strong></td>" +
						"<td class='wid180'<strong>작성일</strong></td></tr>"
				

				$.each(result, function(index, value){
					list += 
							"<tr><td class='wid60'>" + value['ROWNUM1'] + "</td>" +
							"<td class='wid100'>" + value['ID'] + "</td>" +
							"<td class='wid180'><div class='title_overflow'>" + value['TITLE'] + "</div></td>" +
							"<td class='wid350'><div class='text_overflow'>" + value['CONTENT'] + "</div></td>" +
							"<td class='wid180'>" + value['CURRENT_DATE'] + "</td>" +
							"<td><button type='button' id='detail' name='detail' value=" + value['MEMBER_COMM_SEQ'] + ">" +
							"자세히보기...</button></td></tr>"
				});
				
				$("button[name=detail]").kendoButton({
					themeColor: "primary",
					enable: true
				});
				$('.boardStyle').append(list).trigger("create");
				
				
				$('.su').remove();
				
				let page;
				
				let count = result.length / 10 + 1;
				$.each(count, function(index, value){
					page = "<a name='paging_btn'>"+value+"</a>";
				});
				

				
				//$('.boardStyle').append(index).trigger("create");
				
			},
			error : function(request, status, error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});
	
	
});



















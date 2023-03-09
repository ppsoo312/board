<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<div class="section-sm"></div>
<div class="container">
	<div id="tabstrip">
	    <ul>
	        <li id="boardM">인기요리사</li>
	        <li id="boardA">익명 게시판</li>
	    </ul>		 
    	<div>
    	<section class="section-sm1">
     		<div class="col-lg-8 mb-5 mb-lg-0">
        	<div class="col-12 mb-5 mb-lg-0">
  			<div class="row">
  			<c:forEach var="i" items="${pChef }" varStatus="status">   
				<div class="col-lg-4 col-sm-6">
	      		<article class="card mb-4">
	       		<div class="post-slider slider-sm">
	          		<img src="resources/images/about-me.jpg" class="card-img-top" alt="post-thumb">
	   		    </div>
	       		<div class="card-body">
	         		<ul class="card-meta list-inline">
		            	<li class="list-inline-item">
		              		<a href="author-single.html" class="card-meta-author">
		                		<img src="images/kate-stone.jpg" alt="Kate Stone">
		                		<span>Kate Stone</span>
		              		</a>
		            	</li>
		            	<li class="list-inline-item">
		             		<i class="ti-timer"></i>2 Min To Read
		            	</li>
		            	<li class="list-inline-item">
		              		<i class="ti-calendar"></i>14 jan, 2020
		            	</li>
		            	<li class="list-inline-item">
		              		<ul class="card-meta-tag list-inline">
		                		<li class="list-inline-item"><a href="tags.html">Wow</a></li>
		                		<li class="list-inline-item"><a href="tags.html">Tasty</a></li>
		              		</ul>
		            	</li>
	          		</ul>
	        	</div>
	      		</article>
	   			</div>
   			</c:forEach>
  			</div>
			</div>
      		</div>
			</section>
			</div>
    	<div>2</div>

	</div>
</div>





<script src="${pageContext.request.contextPath }/resources/js/popularChef.js"></script>

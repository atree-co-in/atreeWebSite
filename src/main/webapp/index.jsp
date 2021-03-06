<!DOCTYPE html>
<html lang="en">
<head>
<title>Atree</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="resources/css/atree-common.css">
<link rel="shortcut icon" href="resources/AtreeIcon.jpg" />
<script src="resources/js/jquery.min.js"></script>
<script src="resources/js/atree.mainpage.js"></script>
</head>
<body>
<%@include file="header.jsp" %>
	<div id="atree-body atree-row" class="abody">

		<div id="atreeItemContainer">
			<div id="atreeDesc" class="atreeItemDesc">
				<div style="padding:3px;"><span class="paraTitle">What is Atree?</span></div>
				<div style="padding:3px;">Atree is place where developers share their thought, vision,
					idea and code in the form of utility/framework/tool which can be reused by
					others to make development process faster. </div>
			</div>
		</div>

		<div class="atree-products">
			<div class=" atree-col atree-product" id="atreeGrid" href="atreeGrid.jsp">
				<h4>Atree Grid</h4>
				<a href="https://atree.co.in/atreeGrid.jsp">
				<img src="resources/atreeGrid.png"
					style="width: 150px; height: 90px;"></img></a>
				<p>HTML table plugin to enble search, sort, column shuffle,
					hide/show column, custom query for bigger tables. Plugin is created
					in Jquery. This plugin also helps to store users table profile.</p>
			</div>
			<div class="atree-col atree-product">
				<h4>Atree TAAS</h4>
				<p></p>
			</div>
			<div class="atree-col atree-product">
				<h4>Atree Auto Code Generator</h4>
				<p>Coming soon</p>
			</div>
		</div>

	</div>

</body>
</html>
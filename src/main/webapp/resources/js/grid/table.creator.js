$(document)
		.ready(
				function() {
					ajaxTablePlugIn("getTableData.do","", "#example");
					setTableHgt("#example","400px");
				});

function createTableBody(json, tableId, theadInit, initialize) {
	 var headerList = [];
	 var showColList = [];// [ "STOCKNAME" ];// [];
	 var hideColList = [];
	 var showColsDisList;
	 var hideColsDisList;
	 if (tableId in showColsMap) {
	 showColList = showColsMap[tableId];
	 }
/*	 if (tableId in hideColsMap) {
	 hideColList = hideColsMap[tableId];
	 }*/

	 if (tableId in listOfHeaders) {
	 headerList = listOfHeaders[tableId];
	 }
	 table = $(tableId);
	 if (!table.find('thead').length || theadInit) {
	 var thText = "";
	 headerList = [];
	 table.find('thead').remove();
	 if (showColList.length == 0 && hideColList.length == 0) {
	 for (th in json[0]) {
	 headerNmTy = json[0][th].split(",");
	 thText = thText + '<th id="' + th
	 + '_header" class="grid_header tbl_' + th
	 + '" fieldTy="' + headerNmTy[1] + '" fieldNm="'
	 + headerNmTy[0] + '"><div style="overflow:hidden;">'
	 + th.toUpperCase() + '</div></th>';
	 headerList[headerList.length] = th;
	 showColList.push(th);
	 showColsDisList = showColsDisList
	 + '<option class="col-selection-checkbox" type="checkBox" name="'
	 + th + '" id="' + tableId.replace("#", "")
	 + "_op_" + th + '" value="' + th
	 + '" >' + th.toUpperCase() + '</option>';
	 }
	 } else {
	 for (th1 in showColList) {
	 headerNmTy = json[0][showColList[th1]].split(",");
	 th=showColList[th1];

	 thText = thText + '<th id="' + th
	 + '_header" class="grid_header tbl_' + th
	 + '" fieldTy="' + headerNmTy[1] + '" fieldNm="'
	 + headerNmTy[0] + '"><div style="overflow:hidden;">'
	 + th.toUpperCase() + '</div></th>';
	 headerList[headerList.length] = th;
	 showColsDisList = showColsDisList
	 + '<option class="col-selection-checkbox" type="checkBox" name="'
	 + th + '" id="' + tableId.replace("#", "")
	 + "_op_" + th + '" value="' + th
	 + '" >' + th.toUpperCase() + '</option>';
	 }
	 for (th in json[0]) {
	 headerNmTy = json[0][th].split(",");
	 if (jQuery.inArray(th, showColList) == -1) {
	 hideColList.push(th);
	 hideColsDisList = hideColsDisList
	 + '<option class="col-selection-checkbox" type="checkBox" name="'
	 + th + '" id="'
	 + tableId.replace("#", "") + "_op_" + th
	 + '"value="' + th + '" >'
	 + th.toUpperCase() + '</option>';
	 }
	 }
	 }
	 table.append('<thead><tr>' + thText + '</tr></thead>');
	 showColsDisMap[tableId] = showColsDisList;
	 hideColsDisMap[tableId] = hideColsDisList;
	 listOfHeaders[tableId] = headerList;
	 showColsMap[tableId] = showColList;
	 }
	 if (initialize) {
	 table.find('tbody').remove();
	 table.parent('div').attr("pagesDisplayed", 1);
	 table.append('<tbody></tbody>');
	 }
	 var trText = "";
	 for (indx in json) {
	 if (indx != 0) {
	 var tdText = "";
	 var i;

	 for (i = 0; i < headerList.length; i++) {
	 td = headerList[i];
	 tdText = tdText + '<td class="tbl_' + td + '" id="' + td + '_'
	 + indx + '">' + json[indx][td] + '</td>';
	 }
	 trText = trText + '<tr row="' + indx + '">' + tdText + '</tr>';
	 }
	 }
	 table.find('tbody').append(trText);
	 itemdis = $("#tableWrap_" + tableId.replace("#", "")).attr("itemDis");
	 itemdis = parseInt(itemdis) + parseInt(indx);
	 $("#tableWrap_" + tableId.replace("#", "")).attr("itemDis", itemdis);
	 pagedivid = "rowcnt_" + tableId.replace("#", "");
	 data = $("#tableWrap_" + tableId.replace("#", "")).attr("tolCnt");
	 $("#" + pagedivid).text("");
	 $("#" + pagedivid).text('Showing 1 to ' + itemdis + ' of ' + data + ' entries');
	 $("#iframeloading").hide();
	 }
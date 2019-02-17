// atree data grid plugin :: Author: Amaprdeep Pawar
var tableId = "";
var root_div_id = "";
var pgNum = "";
var totalPgs = "";
var table;
var pgsToDis = 10;
var items = 50;
var ajaxNotInProg = true;
var listOfHeaders = {};
var listOfHiddenCol = {};
var showColsMap = {};
var tablesNHeight = {};
var hideColsMap = {};
var showColsDisMap = {};
var hideColsDisMap = {};
var showColsList = "";
var filterColList = "";
var whereCls = "";
var orderby = "";
var orderType = "";
var curStateShow = "";
var curStatehide = "";
var curShowList = [];
var curHideList = [];
var rtctgridtableList = [];
var showNmKeyNm = {};
var prevScrolPos = "";

$(document).ready(
		function($) {

			var hiddenColSheet = document.createElement('style');
			document.body.appendChild(hiddenColSheet);

			$('body').on(
					'click',
					'.close-HideShow-div',
					function() {
						tableId = $(this).attr("tableId");
						$(".showHide-col").hide();
						$(tableId + '_showHide_List').find('.hide-col-dis')
								.empty();
						$(tableId + '_showHide_List').find('.show-col-dis')
								.empty();
						$(tableId + '_showHide_List').find('.show-col-dis')
								.append(curStateShow);
						$(tableId + '_showHide_List').find('.hide-col-dis')
								.append(curStateHide);
						showColsMap[tableId] = curShowList;
						hideColsMap[tableId] = curHideList;
					});

			$('body').on(
					'click',
					'.showHide-Can-btn',
					function() {
						tableId = $(this).attr("tableId");
						$(".showHide-col").hide();
						$(tableId + '_showHide_List').find('.hide-col-dis')
								.empty();
						$(tableId + '_showHide_List').find('.show-col-dis')
								.empty();
						$(tableId + '_showHide_List').find('.show-col-dis')
								.append(curStateShow);
						$(tableId + '_showHide_List').find('.hide-col-dis')
								.append(curStateHide);
						showColsMap[tableId] = curShowList;
						hideColsMap[tableId] = curHideList;
					});

			$('body').on(
					'click',
					'.showHide-Ok-btn',
					function() {
						tableId = $(this).attr("tableId");
						var root_div_id = tableId + "-table-root-div";
						var url = $('#tableWrap_' + tableId.replace("#", ""))
								.attr("url");
						counturl = $('#tableWrap_' + tableId.replace("#", ""))
								.attr("counturl");
						$(root_div_id).empty();
						$(root_div_id).append(
								'<table id="' + tableId.replace("#", "")
										+ '" />');
						var ajaxNotInProg = true;
						ajaxTablePlugIn(url, cnturl, tableId);

						$(".showHide-col").hide();
						if (tableId in showColsMap) {
							showColList = showColsMap[tableId];
							if (showColList.length > 0) {
								setupUserGridProfile(tableId, showColList);
							}
						}
					});

			$('body').on(
					'click',
					'.all-In-hidden',
					function() {
						tableId = $(this).attr("tableId");
						// alert($(tableId +
						// '_showHide_List').find('.show-col-dis
						// option:selected').val());
						showColList = [];// [ "STOCKNAME" ];// [];
						hideColList = [];
						showColsDisList = "";
						hideColsDisList = "";
						if (tableId in showColsMap) {
							showColList = showColsMap[tableId];
						}
						if (tableId in hideColsMap) {
							hideColList = hideColsMap[tableId];
						}
						$.merge(hideColList, showColList);
						showColsMap[tableId] = [];
						hideColsMap[tableId] = hideColList;
						$(tableId + '_showHide_List').find('.hide-col-dis')
								.append(
										$(tableId + '_showHide_List').find(
												'.show-col-dis option'));
						var el = document.getElementById(
								tableId.replace("#", "") + '_showHide_List')
								.getElementsByClassName("show-col-dis")[0];
						// alert(getSelectValues(el));
					});

			$('body').on(
					'click',
					'.all-In-shown',
					function() {
						tableId = $(this).attr("tableId");
						// alert($(tableId +
						// '_showHide_List').find('.show-col-dis
						// option:selected').val());
						showColList = [];// [ "STOCKNAME" ];// [];
						hideColList = [];
						showColsDisList = "";
						hideColsDisList = "";
						if (tableId in showColsMap) {
							showColList = showColsMap[tableId];
						}
						if (tableId in hideColsMap) {
							hideColList = hideColsMap[tableId];
						}
						$.merge(showColList, hideColList);
						showColsMap[tableId] = showColList;
						hideColsMap[tableId] = [];
						$(tableId + '_showHide_List').find('.show-col-dis')
								.append(
										$(tableId + '_showHide_List').find(
												'.hide-col-dis option'));
						var el = document.getElementById(
								tableId.replace("#", "") + '_showHide_List')
								.getElementsByClassName("show-col-dis")[0];
					});

			$('body').on(
					'click',
					'.selected-In-hidden',
					function() {
						tableId = $(this).attr("tableId");
						showColList = [];
						hideColList = [];
						showColsDisList = "";
						hideColsDisList = "";
						if (tableId in showColsMap) {
							showColList = showColsMap[tableId];
						}
						if (tableId in hideColsMap) {
							hideColList = hideColsMap[tableId];
						}
						var el = document.getElementById(
								tableId.replace("#", "") + '_showHide_List')
								.getElementsByClassName("show-col-dis")[0];
						selElmAry = getSelectValues(el);
						$.merge(hideColList, selElmAry);
						$.each(selElmAry, function(index, value) {
							eleId = tableId + "_op_" + value;
							$(tableId + '_showHide_List').find('.hide-col-dis')
									.append(
											$(tableId + '_showHide_List').find(
													eleId));
							showColList
									.splice($.inArray(value, showColList), 1);
						});
						showColsMap[tableId] = showColList;
						hideColsMap[tableId] = hideColList;
					});

			$('body').on(
					'click',
					'.selected-In-shown',
					function() {
						tableId = $(this).attr("tableId");
						showColList = [];
						hideColList = [];
						showColsDisList = "";
						hideColsDisList = "";
						if (tableId in showColsMap) {
							showColList = showColsMap[tableId];
						}
						if (tableId in hideColsMap) {
							hideColList = hideColsMap[tableId];
						}
						var el = document.getElementById(
								tableId.replace("#", "") + '_showHide_List')
								.getElementsByClassName("hide-col-dis")[0];
						selElmAry = getSelectValues(el);
						$.merge(showColList, selElmAry);
						$.each(selElmAry, function(index, value) {
							eleId = tableId + "_op_" + value;
							$(tableId + '_showHide_List').find('.show-col-dis')
									.append(
											$(tableId + '_showHide_List').find(
													eleId));
							hideColList
									.splice($.inArray(value, hideColList), 1);
						});
						showColsMap[tableId] = showColList;
						hideColsMap[tableId] = hideColList;
					});

			$('body').on(
					'click',
					'.selected-moveup',
					function() {
						tableId = $(this).attr("tableId");
						showColList = [];
						if (tableId in showColsMap) {
							showColList = showColsMap[tableId];
						}
						var el = document.getElementById(
								tableId.replace("#", "") + '_showHide_List')
								.getElementsByClassName("show-col-dis")[0];
						selElmAry = getSelectValues(el);
						if (selElmAry.length == 1) {
							var options = $(tableId + '_showHide_List').find(
									'.show-col-dis option');
							index = jQuery.inArray(selElmAry[0], showColList);
							indexMnOne = parseInt(index) - 1;
							$(options[index]).insertBefore(
									$(options[indexMnOne]));
							temp = showColList[index];
							showColList[index] = showColList[indexMnOne];
							showColList[indexMnOne] = temp;
						}
						showColsMap[tableId] = showColList;
					});

			$('body').on(
					'click',
					'.selected-moveDown',
					function() {
						tableId = $(this).attr("tableId");
						showColList = [];
						if (tableId in showColsMap) {
							showColList = showColsMap[tableId];
						}
						var el = document.getElementById(
								tableId.replace("#", "") + '_showHide_List')
								.getElementsByClassName("show-col-dis")[0];
						selElmAry = getSelectValues(el);
						if (selElmAry.length == 1) {
							var options = $(tableId + '_showHide_List').find(
									'.show-col-dis option');
							index = jQuery.inArray(selElmAry[0], showColList);
							indexMnOne = parseInt(index) + 1;
							$(options[index]).insertAfter(
									$(options[indexMnOne]));
							temp = showColList[index];
							showColList[index] = showColList[indexMnOne];
							showColList[indexMnOne] = temp;
						}
						showColsMap[tableId] = showColList;
					});

			$('body').on(
					'focusout',
					'.col-filter .grid_header div input',
					function() {
						tableid = ($(this).closest('table').parent('div')
								.attr('tableid'));
						var query = "";
						$("#tableWrap_" + tableId.replace("#", "")).attr(
								"itemDis", 0);
						$("#tableWrap_" + tableid.replace("#", ""))
								.scrollTop(0);

						$(tableid).parent('div').attr('pagesdisplayed', 0);

						$(this).closest("tr").find('th')
								.each(
										function(i) {
											val = $.trim($(this).find(
													'div input').val());
											if (val != "") {
												fieldNm = $(this).closest('th')
														.attr('fieldNm');

												fieldty = $(this).closest('th')
														.attr('fieldty');

												if (fieldty != "NUMBER"
														&& fieldty != "DATE") {
													val = "UPPER(" + fieldNm
															+ ") Like '%25"
															+ val.toUpperCase()
															+ "%25'";
												} else if (fieldty == "DATE") {
													val = fieldNm + " = '"
															+ val + "' ";
												} else {
													val = fieldNm + " IN ("
															+ val + ")";
												}
												if (query == "") {
													query = val;
												} else {
													query = query + " AND "
															+ val;
												}
											}

										});
						$("#tableWrap_" + tableid.replace("#", "")).attr(
								"itemDis", "0");
						ajaxNotInProg = true;
						$(tableid).parent('div').attr('where', query);
						$("#tableWrap_" + tableid.replace("#", "")).attr(
								"itemDis", "0");
						tableLoadAjax(tableid, true);
						getAndSetRowcnt(tableid, false);
						if (tableid in showColsMap) {
							showColList = showColsMap[tableid];
							if (showColList.length > 0) {
								setupUserGridProfile(tableid, showColList);
							}
						}
					});

			$('body').on(
					'click',
					'.vertual-header .grid_header',
					function() {

						tableId = $(this).closest('div').attr('tableId');
						$("#tableWrap_" + tableId.replace("#", "")).attr(
								"itemDis", 0);

						fieldNm = $(this).attr('fieldNm');
						$(tableId).parent('div').attr('orderby', fieldNm);
						$(tableId).parent('div').attr('pagesdisplayed', 0);
						orderTy = $(tableId).parent('div').attr('orderType');
						$(tableId).parent('div').scrollTop(0);
						$('.ascDesc').css('border-bottom', '');
						$('.ascDesc').css('border-top', '');
						if (orderTy == "" || orderTy == "DESC") {
							$(tableId).parent('div').attr('orderType', 'ASC');
							$(this).find('.ascDesc').css('border-bottom',
									'8px solid #800080');
						} else {
							$(tableId).parent('div').attr('orderType', 'DESC');
							$(this).find('.ascDesc').css('border-top',
									'10px solid #800080');
						}
						$("#tableWrap_" + tableId.replace("#", "")).attr(
								"itemDis", "0");
						ajaxNotInProg = true;
						tableLoadAjax(tableId, true);
					});

			$('body').on(
					'click',
					'.tableColDisBtn',
					function() {

						tableId = $(this).attr('tableId');
						listId = tableId + "_showHide_List";
						curStateShow = $(tableId + '_showHide_List').find(
								'.show-col-dis option');
						curStateHide = $(tableId + '_showHide_List').find(
								'.hide-col-dis option');
						if (tableId in showColsMap) {
							curShowList = showColsMap[tableId];
						}
						if (tableId in hideColsMap) {
							curHideList = hideColsMap[tableId];
						}

						leftPos = $(this).offset().left + $(this).width();
						topPos = $(this).offset().top + $(this).height();

						$(listId).css("top", topPos + "px");
						$(listId).css("left", leftPos + "px");

						$(listId).show();
						// $(listId).empty();
						// $(listId).append(showColsMap[tableId]);
						$(listId).css("z-index", "3");

					});

/*			$('body').on(
					'click',
					'.col-selection-checkbox',
					function() {
						tableId = $(this).parent('li').parent('ul').attr(
								'tableId');
						colName = $(this).attr("name");
						var hiddenList = [];
						if (tableId in listOfHiddenCol) {
							hiddenList = listOfHiddenCol[tableId];
						}
						if (this.checked) {
							hiddenList.splice(hiddenList.indexOf(colName), 1);
						} else {
							hiddenList[hiddenList.length] = colName;
						}
						listOfHiddenCol[tableId] = hiddenList;
						hiddenColSheet.innerHTML = "";
						var sheetString = "";
						for (col in hiddenList) {
							sheetString = sheetString + tableId
									+ "-table-root-div .tbl_" + hiddenList[col]
									+ "{display:none} \n";
						}
						hiddenColSheet.innerHTML = sheetString;
						adjustHeaderWidth(tableId);
						adjustHeaderWidth(tableId);
					});*/
			// ajaxGetTableRowCnTAndDesc("url", "#table id");
		});

/*
 * document.onclick = function(e) { if (e.target.className !== 'showHide-col' &&
 * e.target.className !== 'tableColDisBtn' && e.target.className !==
 * 'col-selection-checkbox') { $(".showHide-col").hide(); } };
 */

/*
 * $('body').on( 'click', '.page-button', function() { tableId =
 * $(this).closest('.pagination').attr( 'tableId'); table = $(tableId);
 * root_div_id = tableId + "-table-root-div"; // root_div_id="#"+root_div;
 * $(this).closest('.pagination').find( '.page-button').removeClass("active");
 * $(this).addClass("active"); pgNum = $(root_div_id + ' .pagination .active')
 * .attr("value");
 * 
 * items = $( root_div_id + ' .pagination .filter-show .display-num')
 * .attr("value");
 * 
 * alert(pgNum + " " + items); });
 */

/*
 * $('body').on( 'click', '.pagination .count-down', function() { dec =
 * $(this).attr("decadeNbr"); tableId = $(this).attr("tableId"); if (dec > 0) {
 * $(this).parent('.pagination').empty(); decade = dec - 1;
 * addPgsToPagination(decade, pgsToDis, tableId) $(this).parent('.pagination
 * div:eq(0)') .remove(); } });
 */

/*
 * $('body') .on( 'click', '.pagination .count-up', function() { dec =
 * parseInt($(this) .attr("decadeNbr")); tableId = $(this).attr("tableId");
 * maxDec = parseInt($(this).parent( '.pagination') .attr('decadeCnt'));
 * getRecordCnt = parseInt($(this).parent( '.pagination').attr('totalrec'));
 * sngPgItem = $( root_div_id + ' .filter-show .display-num option:selected')
 * .text(); totalPgs = Math.ceil(getRecordCnt / sngPgItem); decade = dec + 1; if
 * (decade < maxDec) { $(this).parent('.pagination') .empty(); if (decade ==
 * (maxDec - 1)) { pgdis = totalPgs % pgsToDis; addPgsToPagination(decade,
 * pgdis, tableId) } else { addPgsToPagination(decade, pgsToDis, tableId) } }
 * });
 */

function loadTableData(thisid) {

	tableId = $(thisid).attr("tableid");
	if ($(thisid).scrollTop() > $(thisid).prop('scrollHeight') / 4) {
		/*
		 * url = $(thisid).attr("url"); orderby=$(thisid).attr("orderBy");
		 * orderType=$(thisid).attr("orderType");
		 * whereCls=$(thisid).attr("where"); pageDisplayed =
		 * $(thisid).attr("pagesDisplayed"); nextPage = parseInt(pageDisplayed) +
		 * 1; if (ajaxNotInProg) { ajaxNotInProg = false; $.ajax({ url : url +
		 * "?page=" + nextPage + "&items=" + items +
		 * "&where="+whereCls+"&orderBy="+orderby+"&orderType="+orderType,
		 * success : function(result) { json = JSON.parse(result);
		 * createTableBody(json, tableId, false); ajaxNotInProg = true; } });
		 * $(thisid).attr("pagesDisplayed", nextPage);
		 * adjustHeaderWidth(tableId); adjustHeaderWidth(tableId); }
		 */
		if (prevScrolPos != $(thisid).scrollTop()) {
			tableLoadAjax(tableId, false);
			prevScrolPos = $(thisid).scrollTop();
		}

	}
	tableftPos = $(thisid).position().left;
	$(thisid).parent('div').find('.vertual-header table').css({
		top : '0px',
		left : $(tableId).position().left - tableftPos,
		position : 'relative'
	});
	$(thisid).parent('div').find('.col-filter table').css({
		top : '0px',
		left : $(tableId).position().left - tableftPos,
		position : 'relative'
	});
	// $(thisid).parent('div').find('.col-filter table').css({top: '0px', left:
	// $(tableId).position().left - tableftPos, position:'relative'});
}

function tableLoadAjax(tableId, flg) {
	thisid = $(tableId).parent('div');
	url = $(thisid).attr("url");
	orderby = $(thisid).attr("orderBy");
	orderType = $(thisid).attr("orderType");
	whereCls = $(thisid).attr("where");
	pageDisplayed = $(thisid).attr("pagesDisplayed");
	nextPage = parseInt(pageDisplayed) + 1;
	if (ajaxNotInProg) {
		ajaxNotInProg = false;
		itemdis = $("#tableWrap_" + tableId.replace("#", "")).attr("itemDis");
	
		tolCnt = $("#tableWrap_" + tableId.replace("#", "")).attr("tolCnt");
		if (itemdis != tolCnt) {
			$("#iframeloading").show();
			$.ajax({
				url : url + "&page=" + nextPage + "&items=" + items + "&where="
						+ whereCls + "&orderBy=" + orderby + "&orderType="
						+ orderType,
				cache : false,
				success : function(data) {
					// data = data.replace(/:"null"/g, ":\"\"");
					// data = data.replace(/:null/g, ":\"\"");
				    json = JSON.parse(data);
					createTableBody(json, tableId, false, flg);
					ajaxNotInProg = true;
					adjustHeaderWidth(tableId);
					$(thisid).attr("pagesDisplayed", nextPage);
				}
			});
		}

	}
}

/*
 * function displayPagination(getRecordCnt, tableId) { table = $(tableId); var
 * root_div_id = tableId + "-table-root-div"; // root_div_id="#"+root_div; var
 * sngPgItem = $( root_div_id + ' .filter-show .display-num
 * option:selected').text(); $(root_div_id + ' .pagination').empty(); totalPgs =
 * Math.ceil(getRecordCnt / sngPgItem); decadeCnt = Math.ceil(totalPgs /
 * pgsToDis); $(root_div_id + ' .pagination').attr('decadeCnt', decadeCnt); if
 * (totalPgs > 1) { if (totalPgs > pgsToDis) { addPgsToPagination(0, pgsToDis,
 * tableId); } else { addPgsToPagination(0, totalPgs, tableId); } } }
 */

/*
 * function addPgsToPagination(decade, pgDis, tableId) { table = $(tableId); var
 * root_div_id = tableId + "-table-root-div"; // root_div_id="#"+root_div;
 * $(root_div_id + ' .pagination') .append( '<a href="#" style="margin:1px"
 * class="count-down" decadeNbr="' + decade + '" tableId="' + tableId +
 * '">&laquo;</a><div currentDec="' + decade + '" style="display: inline;"
 * class="pages-div" width="80%"/>'); var ind; for (i = 1; i <= pgDis; i++) {
 * ind = (decade * pgsToDis) + i; $(root_div_id + ' .pagination
 * .pages-div').append( '<a href="#" style="margin:1px" class="page-button"
 * value="' + ind + '">' + ind + '</a>'); } $(root_div_id + '
 * .pagination').append( '<a href="#" style="margin:1px" tableId="' + tableId + '"
 * decadeNbr="' + decade + '" class="count-up">&raquo;</a>'); $(root_div_id + '
 * .pagination .pages-div a:eq(0)').addClass("active"); }
 */
/*
 function createTableBody(json, tableId, theadInit, initialize) {
 var headerList = [];
 var showColList = [];// [ "STOCKNAME" ];// [];
 var hideColList = [];
 var showColsDisList;
 var hideColsDisList;
 if (tableId in showColsMap) {
 showColList = showColsMap[tableId];
 }
 if (tableId in hideColsMap) {
 hideColList = hideColsMap[tableId];
 }
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
 }*/

function getSelectValues(select) {
	var result = [];
	var options = select && select.options;
	var opt;
	for (var i = 0, iLen = options.length; i < iLen; i++) {
		opt = options[i];
		if (opt.selected) {
			result.push(opt.value || opt.text);
		}
	}
	return result;
}

function ajaxTablePlugIn(url, cnturl, tableId) {
	rtctgridtableList.push(tableId);
	
    if (!(tableId in showColsMap)) {
		//getUserGridProfile(tableId);
	}

	if (url.indexOf("?") == -1) {
		url = url + "?"
	} else {
		url = url + "&"
	}

	if (cnturl.indexOf("?") == -1) {
		cnturl = cnturl + "?&"
	} else {
		cnturl = cnturl + "&"
	}
	
	if (typeof $(tableId).parent('div').attr("where") !== typeof undifined
			&& $(tableId).parent('div').attr("where") !== false)
		{
	    	wherecls = $(tableId).parent('div').attr("where");
		}
	else if (typeof $(tableId).attr("where") !== typeof undifined
			&& $(tableId).attr("where") !== false) {
		wherecls = $(tableId).attr("where");
	} else {
		wherecls = "";
	}

	/*	thisid = $(tableId).parent('div');
	 url = $(thisid).attr("url");
	 orderby = $(thisid).attr("orderBy");
	 orderType = $(thisid).attr("orderType");
	 whereCls = $(thisid).attr("where");
	 pageDisplayed = $(thisid).attr("pagesDisplayed");
	 nextPage = parseInt(pageDisplayed) + 1;*/

	$("#iframeloading").show();
	$.ajax({
		type : "GET",
		cache : false,
		url : url + "page=1&items=" + items + "&where=" + wherecls
				+ "&orderBy=&orderType=", // "http://localhost:8082/scanModule/getScanRecord?test_id=&itg_number=101034&page=1&item=350&where=&orderBy=&orderType=",
		success : function(data) {
			// data = data.replace(/:"null"/g, ":\"\"");
			// data = data.replace(/:null/g, ":\"\"");
			json = JSON.parse(data);			
			ajaxTable(url, cnturl, tableId, json);
		},
		error : function(x, status, error) {
			alert(error);
		}

	});
}

function ajaxTable(url, cnturl, tableId, json) {
	table = $(tableId);
	$(tableId).addClass("rtct-table-actual");

	createTableBody(json, tableId, true, true);
	var root_div_id = tableId + "-table-root-div";
	var root_div = root_div_id.replace("#", "");
	if(tablesNHeight[tableId] != null)
		{
		  tblhght=tablesNHeight[tableId];
		}
	else
		{
		  tblhght="600px";
		}
	
	if (!$(root_div_id).length) {
		table
				.wrap('<div id="'
						+ root_div
						+ '" tableId="'
						+ tableId
						+ '" class="rtct-table-root-div" style="padding:0px;margin-right:0px;width:100%"/>');
	}
	wraperid = '#tableWrap_' + tableId.replace("#", "");
	
	$(tableId + ' thead tr th div .orderTypeInd').remove();

	$(tableId + ' thead tr th div')
			.append(
					'<div class="orderTypeInd blank"></div><div class="orderTypeInd ascDesc"></div>');
	
	if (!$(wraperid).length) {
		$(root_div_id).prepend(
				'<div class="col-filter" tableId="' + tableId
						+ '"><table/></div>');
		$(root_div_id).prepend(
				'<div class="vertual-header" tableId="' + tableId
						+ '"><table/></div>');

		$(root_div_id)
				.prepend(
						'<div  style="width:100%;"><button class="tableColDisBtn" tableId="'
								+ tableId
								+ '" style="border: none;background-color:rgb(248, 249, 250);font-weight:bold">&equiv;</button><div class="col-display-list"></div></div>');

		$(root_div_id).append(
				'<p class="rowcnt-dis" id="rowcnt_' + tableId.replace("#", "")
						+ '"></p>');

		whereCls = "";
		wherearray = [];
		whereMap = {};
		if (typeof $(tableId).attr("where") != typeof undifined
				&& $(tableId).attr("where") != false) {
			whereCls = $(tableId).attr("where");
			wherearray = whereCls.split("AND");
			for (i = 0; i < wherearray.length; i++) {
				if (wherearray[i].indexOf("IN") == -1) {
					whereKey = wherearray[i].split("Like")[0].replace("UPPER",
							"").replace("(", "").replace(")", "").trim();
					whereval = wherearray[i].split("Like")[1].replace(/%25/g,
							"").replace(/'/g, "").trim();
				} else {
					whereKey = wherearray[i].split("IN")[0].trim();
					whereval = wherearray[i].split("IN")[1].replace("(", "")
							.replace(")", "").trim();
				}
				whereMap[whereKey] = whereval;
				$(tableId).removeAttr("where");
			}
		} else if(typeof $(tableId).parent('div').attr("where") !== typeof undifined)
		{
			whereCls = $(tableId).parent('div').attr("where");
		}
		else {
			whereCls = "";
		}

		table
				.wrap('<div class="htmlTableDiv" onscroll="loadTableData(this)" id="tableWrap_'
						+ tableId.replace("#", "")
						+ '" url="'
						+ url
						+ '"  where="'
						+ whereCls
						+ '" orderBy="'
						+ orderby
						+ '" orderType="'
						+ orderType
						+ '" pagesDisplayed="1" tolCnt="" tableId="'
						+ tableId
						+ '" counturl="' + cnturl + '" style="height:' 
						+ tblhght + ';" />');


		$(tableId + ' thead').clone().appendTo(
				root_div_id + ' .vertual-header table');
		$(tableId + ' thead').clone().appendTo(
				root_div_id + ' .col-filter table');
		//$(root_div_id + ' .col-filter table thead tr th').css("background-color", "white");
		$(root_div_id + ' .col-filter table thead tr th').css("color", "black");
		$(root_div_id + ' .col-filter table thead tr th').css("font-weight",
				"normal");
		$(root_div_id + ' .col-filter table thead tr th div')
				.replaceWith(
						'<div><input  style="height:27px;" type="text" placeholder=".." class="filterOnCol form-control"></div>');

		$(root_div_id + " .vertual-header").css(
				"background-color",
				$(root_div_id + " .vertual-header table thead").css(
						"background-color"));

		$(root_div_id + " .vertual-header").css(
				"background-color",
				$(root_div_id + " .vertual-header table thead").css(
						"background-color"));

		$(root_div_id + " .vertual-header table").css("width",
				$(root_div_id + " .htmlTableDiv table").css("width"));
		$(root_div_id + " .col-filter table").css("width",
				$(root_div_id + " .htmlTableDiv table").css("width"));
		// $(root_div_id).css( "width", $(root_div_id + " .htmlTableDiv").css(

		// "width"));	

		$(root_div_id + " .col-filter table").find('th').each(
				function(i) {
					if ($(this).attr("fieldnm") in whereMap) {
						$.trim($(this).find('div input').val(
								whereMap[$(this).attr("fieldnm")]));
					}
				});

		$('body')
				.append(
						'<div id="'
								+ tableId.replace("#", "")
								+ '_showHide_List" tableId="'
								+ tableId
								+ '" style="min-height:200px;border-radius: 7px 7px 0px 0px;display:none;font-weight:bold;border:1px solid;border-color: rgb(169, 169, 169);background-color:#f0f0f0;position:absolute;top:0px;left:0px" class="showHide-col showHide-col-dis">'
								+ '<div width="100%" style="padding:5px;height:40px;"><button class="close-HideShow-div" style="float:right">&#215</button></div>'
								+ '<div style="padding:5px;background-color:white;"><div style="width:250px;display: inline-block;">Shown Columns<select class="show-col-dis" style="height:250px;width:250px" multiple>'
								+ showColsDisMap[tableId]
								+ '</select></div>'
								+ '<div align="center" style="width:40px;padding-top:25px; vertical-align:top;display: inline-block;">'
								+ '<button class="all-In-hidden hideShow-btns" tableId="'
								+ tableId
								+ '">&#187</button><button class="all-In-shown hideShow-btns" tableId="'
								+ tableId
								+ '">&#171</button><button class="selected-In-hidden hideShow-btns" tableId="'
								+ tableId
								+ '">&#155</button><button class="selected-In-shown hideShow-btns" tableId="'
								+ tableId
								+ '">&#139</button><button class="selected-moveup hideShow-btns" tableId="'
								+ tableId
								+ '">&#94</button><button class="selected-moveDown rotate hideShow-btns" tableId="'
								+ tableId
								+ '">&#94</button></div>'
								+ '<div style="width:250px;display: inline-block;">Hidden Columns<select class="hide-col-dis" style="height:250px;width:250px" multiple>'
								+ hideColsDisMap[tableId]
								+ '</select></div></div>'
								+ '<div width="100%" style="background-color:white;height:40px;padding:5px"><button class="showHide-Can-btn showHide-okCan-btn" tableId="'
								+ tableId
								+ '" style="float:right">cancel</button><button tableId="'
								+ tableId
								+ '" class="showHide-Ok-btn showHide-okCan-btn" style="float:right">ok</button></div></div>');

	} else {
		var wrapid = "#tableWrap_" + tableId.replace("#", "");
		if (typeof $(wrapid).attr("where") == typeof undifined
				&& $(wrapid).attr("where") == false) {
			$(wrapid).attr("where", "");
		}
		$(wrapid).attr("orderBy", "");
		$(wrapid).attr("orderType", "");
		$(wrapid).attr("pagesDisplayed", "1");
		$(wrapid).attr("counturl", cnturl);
		$(wrapid).attr("tolCnt", "");
		$(wrapid).attr("url", url);
	}

	getAndSetRowcnt(tableId, true);
	$(root_div_id + " .col-filter table").find(".action_class").empty();
	adjustHeaderWidth(tableId);
	adjustHeaderWidth(tableId);
}

function getAndSetRowcnt(tableId, chgflg) {
	thisid = $(tableId).parent('div');
	cnturl = $(thisid).attr("counturl");
	whereCls = $(thisid).attr("where");
    if(cnturl != null && cnturl != "?&")
    {
	$.ajax({
		type : "GET",
		cache : false,
		url : cnturl + "&where=" + whereCls, // "http://localhost:8082/scanModule/getScanRecord?test_id=&itg_number=101034&page=1&item=350&where=&orderBy=&orderType=",
		success : function(data) {
			var pagedivid = "rowcnt_" + tableId.replace("#", "");
			fromCnt=1;
			if (data < items) {
				itemdis = data;
			} else {
				itemdis = items;
			}
			if(itemdis == 0)
			{
				fromCnt=0;
			}
			$("#" + pagedivid).text(
					'Showing '+fromCnt+' to ' + itemdis + ' of ' + data + ' entries');
	
			$("#tableWrap_" + tableId.replace("#", "")).attr("tolCnt", data);
			if (chgflg) {
				$("#tableWrap_" + tableId.replace("#", "")).attr("itemDis",
						itemdis);
			}

		},
		error : function(x, status, error) {
			alert(error);
		}

	});
    	}

}

function setTableHgt(tableId, height) {
	$(tableId).parent().css("height",height);
	tablesNHeight[tableId] = height;	
}

function setupUserGridProfile(tableId, showColList) {
	thisid = $(tableId).parent('div');
	var whereCls = $(thisid).attr("where");
	var pageName = window.location.pathname;
	var setProfUrl = "setGridProfile.do";
	var param = new Object();
	param.pageNm = pageName;
	param.tableNm = tableId;
	param.filter = whereCls;
	param.colOrder = showColList.toString();
	postData = JSON.stringify(param);
	$.ajax({
		type : "POST",
		cache : false,
		contentType : 'application/json',
		url : setProfUrl,
		data : postData,
		success : function(data) {

		},
		error : function(x, status, error) {
			alert(error);
		}
	});
}

function getUserGridProfile(tableId) {
	var pageName = window.location.pathname;
	var setProfUrl = "getGridProfile.do";
	var param = new Object();
	param.pageNm = pageName;
	param.tableNm = tableId;
	postData = JSON.stringify(param);
	$.ajax({
		type : "POST",
		cache : false,
		contentType : 'application/json',
		url : setProfUrl,
		data : postData,
		async : false,
		success : function(data) {
			if (data[0]['filter'] != null)
				{
				 $(tableId).attr("where", data[0]['filter']);
				}
			if (data[0]['colOrder'] != null) {
				showColsMap[tableId] = data[0]['colOrder'].split(",");
			}
		},
		error : function(x, status, error) {
			alert(error);
		}
	});
}


function setWidthOfHeader(tableId)
{
	table = $(tableId);
	var root_div_id = tableId + "-table-root-div";
	var colIndx = 0;
	$(root_div_id + ' .vertual-header table').css('width',
			$(tableId).css('width'));
	$(root_div_id + ' .col-filter table').css('width', $(tableId).css('width'));
	$(tableId + ' thead tr:first')
			.find('th')
			.each(
					function() {
						thWidth = $(this).css("width");

						$(this).find('div').css("height", "0px");
						$(
								root_div_id
										+ ' .vertual-header table thead tr:first th:eq('
										+ colIndx + ')').css('width', thWidth);
						$(
								root_div_id
										+ ' .col-filter table thead tr:first th:eq('
										+ colIndx + ')').css('width', thWidth);
						colIndx++;
					})
}

function adjustHeaderWidth(tableId) {
	setTimeout(function(){ setWidthOfHeader(tableId); }, 50);
}

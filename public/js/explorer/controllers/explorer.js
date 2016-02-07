/**
 * @ngdoc function
 * @name openDataHubApp.controller:ExplorerctrlCtrl
 * @description
 * # ExplorerctrlCtrl
 * Controller of the openDataHubApp
 */
angular.module('openDataHubApp').controller('ExplorerCtrl', [
  "$scope",
  "ExplorerService",
  "$http",
  "$mdToast",
  "$mdSidenav",
  function($scope, ExplorerService, $http, $mdToast, $mdSidenav) {
    /**
     * Public attributes
     */
    $scope.data   = {
      'headers': [],
      'rows': []
    };
    $scope.search = {
      'collection': '',
      'group_by': 'minute',
      'num_rows': '50',
      'fields': [],
      'selected_fields': []
    };

    /**
     * Public methods
     */
    $scope.previewDatasetData = function(collection='user_event') {
      $scope.search.collection = collection;
      ExplorerService.previewDatasetData($scope.search).then(function(res) {
        try {
          if (res.status !== 200) throw res.statusText;
          $scope.data.headers = res.data.headers;
          $scope.data.rows    = res.data.rows;
        } catch (e) {
          alert(e);
        };
        hideExplorerSideNav();
      });
    };

    function hideExplorerSideNav() {
      $mdSidenav('left-nav').close();
    }

    // preview data on page load
    $scope.previewDatasetData();
  }]);

// var site_url 	= $('#site-url').data('site_url');
// /*
//  *	Dialog que possibilita a adicao de campos e filtros
//  *	de pesquisa sobre os dados dos datasets
//  */
// $('#data-consult-form-dialog-js').dialog({
// 	title: 'Customize your data',
// 	modal: true,
// 	autoOpen: false,
// 	width: 800,
// 	resizable: false,
// 	minHeight: 350,
// 	position:['middle', 50],
// 	open: function() {
// 		$(this).css("maxHeight", 500);
// 	},
// 	buttons: {
// 		'Submit': function(){
// 			previewDatasetData();
// 			//$(this).dialog('close');
// 		}
// 	}
// });
//
// $('.datasets-picker-js li a').on('click', function(){
// 	$('.datasets-picker-js li a').each(function(){
// 		$(this).removeClass('active');
// 	});
//
// 	// reset number of consulted pages
// 	$('.list-records-js').data('page', '0');
//
// 	$(this).addClass('active');
// 	var element 	= $('.datasets-picker-js li .active').closest('li');
// 	$('#data-consult-form-dialog-js').load(site_url+'/datasetExplorer/queryData', { 'dataset': element.data('option') }, function( response ){
// 		previewDatasetData();
// 	});
// });
//
// $(document).on('click','.operation-opts .filter-js', function(){
// 	$('#data-consult-form-dialog-js').dialog('open');
// });
//
// $(document).on('click','.operation-opts .download-js', function(){
// 	downloadDatasetData('js');
// });
//
// $(document).on('click','.operation-opts .download-csv-js', function(){
// 	downloadDatasetData('csv');
// });
//
// $(document).on('click','.operation-opts .chart-js', function(){
// 	$('.datasets-container-js').data('context', 'chart');
// 	previewDatasetData();
// });
//
// $(document).on('click','.operation-opts .listing-js', function(){
// 	$('.datasets-container-js').data('context', 'listing');
// 	previewDatasetData();
// });
//
//
// $(document).on('click','.fields-select-js .option-js .option-title', function(){
// 	var site_url 	= $('#site-url').data('site_url');
// 	var parent 		= $(this).closest('.option-js');
//
// 	$(this).toggleClass('selected');
//
// 	var status = true;
// 	$('.filters-container-js .field-filters-js').each(function(){
// 		if( $(this).data('field') == parent.data('field') ){
// 			$(this).remove();
// 			status = false;
// 		}
// 	});
//
// 	if( $('.filters-container-js .field-filters-js').length == 0 )
// 			$('.filters-container-js .title').hide();
//
// 	if( !status )
// 		return;
//
// 	var data = {'field':  parent.data('field'), 'type':  parent.data('type'), 'description':  parent.data('description')}
// 	$.post(site_url+'/datasetExplorer/addFilter', data, function( response ){
// 		$('.filters-container-js').append( response );
//
// 		$('.filters-container-js .title').show();
// 	});
// });
//
// function previewDatasetData(){
// 	var site_url 	= $('#site-url').data('site_url');
// 	var data 		= serializeSearchDatasetForm();
// 	data.context 	= $('.datasets-container-js').data('context');
// 	$.ajax({
// 		type: 'POST',
// 		contentType: "application/json; charset=utf-8",
//   		data: JSON.stringify(data),
//   		url: site_url+'/datasetExplorer/searchDatasetData',
//   		success: function(response){
//   			$('.main-container .content').html( response );
//   		}
// 	});
// }
//
// function downloadDatasetData( file_extension ){
// 	var site_url 		= $('#site-url').data('site_url');
// 	var data 			= serializeSearchDatasetForm();
// 	data.action 		= 'download';
// 	data.file_extension	= file_extension;
// 	$.ajax({
// 		type: 'POST',
// 		contentType: "application/json; charset=utf-8",
//   		data: JSON.stringify(data),
//   		dataType: 'json',
//   		url: site_url+'/datasetExplorer/searchDatasetData',
//   		success: function(response){
//   			window.open(site_url+"/datasetExplorer/downloadDatasetFile?file="+response.file,'_blank');
//   		}
// 	});
// }
//
// function serializeSearchDatasetForm(){
// 	var form 		= $('#data-consult-form');
// 	var data 		= { collection: $("#collection").val(), fields: [], selected_fields: [] };
// 	var element		= null;
// 	$('.field-filters-js').each(function(){
// 		var filters	= [];
// 		$(this).find(':input').each(function(){
// 			filters.push( { name: $(this).attr('name'), value: $(this).val() } );
// 		});
// 		element = { field: $(this).data('field'), type: $(this).data('data_type'), filters: filters };
// 		data.fields.push( element );
// 	});
//
// 	// get selected fields to show on results
// 	data.selected_fields 	= getFieldsForDisplay();
// 	data.group_by = $('.field-group-js .group-by-js').val();
// 	data.num_rows = $('.field-num-results-js .num-results-js').val();
//
// 	return data;
// }
//
// function getFieldsForDisplay() {
// 	var selected_fields = [];
// 	var parent			= null;
// 	$('.fields-select-js .selector-js:checked').each(function(){
// 		parent = $(this).closest('.option-js');
//
// 		selected_fields.push( {field: parent.data('field'), description: parent.data('description')} );
// 	});
// 	return selected_fields;
// }
//
// $(document).on('change', '#data-consult-form .fields-container .main-selector-js', function(){
// 	var checked = $('.main-selector-js').is(':checked');
// 	$('.fields-select-js .selector-js').each(function(){
// 		$(this).prop('checked', checked);
// 	});
// });
//
// function moreResults () {
// 	var site_url 	= $('#site-url').data('site_url');
// 	var data 		= serializeSearchDatasetForm();
// 	var element 	= $('.main-container .content .list-records-js');
// 	var page 		= element.data('page');
// 	data.page 		= page;
// 	element.data('page', ++page);
// 	$.ajax({
// 		type: 'POST',
// 		contentType: "application/json; charset=utf-8",
// 			data: JSON.stringify(data),
// 			url: site_url+'/datasetExplorer/searchDatasetData',
// 			success: function(response){
// 				$('.main-container .content .list-records-js tbody').append( response );
// 			}
// 	});
// }
//
// function buildGraph (records) {
// 	var datasets 	= [];
// 	var keys 		= [];
// 	var label 		= null;
// 	var labels 		= [];
// 	jQuery.each(records[0], function(key, val) {
// 		var data 	= [];
// 		labels 	= [];
// 		jQuery.each(records, function(index, item) {
// 			jQuery.each(item, function(sub_key, sub_val) {
// 				if (sub_key == key && key != 'tmstp' && key != 'Pavg' && key != 'Qavg' && key != 'Vavg') {
// 					if (sub_val == null)
// 						sub_val = 0;
// 					else if (typeof sub_val !== 'number')
// 						return;
//
// 					data.push(sub_val);
// 				}
// 			});
//
// 			labels.push(item.tmstp);
// 		});
//
// 		if (data.length == 0)
// 			return;
//
// 		var color = getRandomColor();
//
// 		var json = {
// 						label: label,
// 						fillColor: color.alpha(0.6).toRgbaString(),
// 						strokeColor: color.alpha(1).toRgbaString(),
// 						pointColor: color.alpha(0.2).toRgbaString(),
// 						pointStrokeColor: "#fff",
// 						pointHighlightFill: "#fff",
// 						pointHighlightStroke: "rgba(220,220,220,1)",
// 						data: data
// 					};
//
// 		datasets.push(json);
// 	});
//
// 	var data = { 	labels: labels,
// 					datasets: datasets
// 				};
//
// 	var ctx = document.getElementById("myChart").getContext("2d");
// 	var myLineChart = new Chart(ctx).Line(data);
// }
//
// function getRandomColor() {
// 	// 30 random hues with step of 12 degrees
// 	var hue = Math.floor(Math.random() * 30) * 12;
//
// 	return $.Color({
// 		hue: hue,
// 		saturation: 0.3,
// 		lightness: 0.6,
// 		alpha: 0.5,
// 	});
// }
//
// $(function(){
// 	var site_url 	= $('#site-url').data('site_url');
// 	var element 	= $('.datasets-picker-js li .active').closest('li');
// 	$('#data-consult-form-dialog-js').load(site_url+'/datasetExplorer/queryData', { 'dataset': element.data('option') }, function( response ){
// 		previewDatasetData();
// 	});
// });
//
// module.exports = {
// 	buildGraph: buildGraph
// }

/*
 *	Dialog que possibilita a adicao de campos e filtros
 *	de pesquisa sobre os dados dos datasets
 */
$(function(){
	var site_url = $('#site-url').data('site_url');
	
	$('#data-consult-form-dialog-js').dialog({
		title: 'Data Consult',
		modal: true,
		autoOpen: false,
		width: 800,
		resizable: false,
		minHeight: 350,
		position:['middle', 50],
		open: function() {
			$(this).css("maxHeight", 500);        
		},
		buttons: {
			'Submit': function(){
				previewDatasetData();
				$(this).dialog('close');
			}
		}
	});
 
	$('.datasets-picker-js li a').on('click', function(){
		$('.datasets-picker-js li a').each(function(){
			$(this).removeClass('active');
		});

		$(this).addClass('active');
		var element 	= $('.datasets-picker-js li .active').closest('li');
		$('#data-consult-form-dialog-js').load(site_url+'/datasetExplorer/queryData', { 'dataset': element.data('option') }, function( response ){
			// Activity log for data consult
			newActivityLog (3, 'Data consult on '+element.data('option')+' dataset');
			previewDatasetData();
		});
		
	});
});

$(document).on('click','.operation-opts .filter-js', function(){
	$('#data-consult-form-dialog-js').dialog('open');
});

$(document).on('click','.operation-opts .download-js', function(){
	// Activity log for data download (json)
	newActivityLog (4, 'Data consult on '+element.data('option')+' dataset');
	
	downloadDatasetData('js');
});

$(document).on('click','.operation-opts .download-csv', function(){
	// Activity log for data download (csv)
	newActivityLog (5, 'Data consult on '+element.data('option')+' dataset');
	
	downloadDatasetData('csv');
});


$(document).on('click','.fields-select-js .option-js .option-title', function(){
	var site_url 	= $('#site-url').data('site_url');
	var parent 		= $(this).closest('.option-js');
	
	$(this).toggleClass('selected');
	
	var status = true;
	$('.filters-container-js .field-filters-js').each(function(){
		if( $(this).data('field') == parent.data('field') ){
			$(this).remove();
			status = false;
		}
	});

	if( $('.filters-container-js .field-filters-js').length == 0 )
			$('.filters-container-js .title').hide();

	if( !status )
		return;
	
	var data = {'field':  parent.data('field'), 'type':  parent.data('type'), 'description':  parent.data('description')}
	$.post(site_url+'/datasetExplorer/addFilter', data, function( response ){
		$('.filters-container-js').append( response );

		$('.filters-container-js .title').show();
	});
});

function previewDatasetData(){
	var site_url 	= $('#site-url').data('site_url');
	var data 		= serializeSearchDatasetForm();
	$.ajax({
		type: 'POST',
		contentType: "application/json; charset=utf-8",
  		data: JSON.stringify(data),
  		url: site_url+'/datasetExplorer/searchDatasetData',
  		success: function(response){
  			$('.main-container .content').html( response );
  		}
	});
}

function downloadDatasetData( file_extension ){
	var site_url 		= $('#site-url').data('site_url');
	var data 			= serializeSearchDatasetForm();
	data.action 		= 'download';
	data.file_extension	= file_extension;
	$.ajax({
		type: 'POST',
		contentType: "application/json; charset=utf-8",
  		data: JSON.stringify(data),
  		dataType: 'json',
  		url: site_url+'/datasetExplorer/searchDatasetData',
  		success: function(response){
  			window.open(site_url+"/datasetExplorer/downloadDatasetFile?file="+response.file,'_blank');
  		}
	});
}

function serializeSearchDatasetForm(){
	var form 		= $('#data-consult-form');
	var data 		= { collection: $("#collection").val(), fields: [], selected_fields: [] };
	var element		= null;
	$('.field-filters-js').each(function(){
		var filters	= [];
		$(this).find(':input').each(function(){
			filters.push( { name: $(this).attr('name'), value: $(this).val() } );
		});
		element = { field: $(this).data('field'), type: $(this).data('data_type'), filters: filters };
		data.fields.push( element );
	});

	// get selected fields to show on results
	data.selected_fields 	= getFieldsForDisplay();
	
	return data;
}

function getFieldsForDisplay() {
	var selected_fields = [];
	var parent			= null;
	$('.fields-select-js .selector-js:checked').each(function(){
		parent = $(this).closest('.option-js');

		selected_fields.push( {field: parent.data('field'), description: parent.data('description')} );
	});
	return selected_fields;
}

$(document).on('change', '#data-consult-form .fields-container .main-selector-js', function(){
	var checked = $('.main-selector-js').is(':checked');
	$('.fields-select-js .selector-js').each(function(){
		$(this).prop('checked', checked);
	});
});
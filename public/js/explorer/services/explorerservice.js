/**
 * @ngdoc service
 * @name explorerApp.ExplorerService
 * @description
 * # ExplorerService
 * Service in the explorerApp.
 */
angular.module('openDataHubApp')
  .service('ExplorerService', ["$http", function ($http) {
    console.log("HERE");

    function serializeSearchDatasetForm(){
    	var form    = $('#data-consult-form');
    	var data    = { collection: $("#collection").val(), fields: [], selected_fields: [] };
    	var element = null;
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
    	data.group_by = $('.field-group-js .group-by-js').val();
    	data.num_rows = $('.field-num-results-js .num-results-js').val();

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

    function previewDatasetData() {
      let site_url = $('#site-url').data('site_url');
      let data     = {
        collection: "user_event",
        group_by: "minute",
        num_rows: "50",
        fields: [],
        selected_fields: [
          {field: "iid", description: "Monitored home unique identifier"},
          {field: "tmstp", description: "Date and time of the measurement"},
          {field: "deploy", description: "Deployment"},
          {field: "type_id", description: "Identifier of the type of interactions"},
          {field: "type_name", description: "Type of interaction"},
          {field: "view_id", description: "Identifier of the visualized screen"},
          {field: "view_name", description: "Name of visualized screen"},
        ]
      };

      let url = `${site_url}/datasetExplorer/searchDatasetData`;
      return $http.post(url, data);
    }


    return {
      previewDatasetData
    }
  }]);


  // function previewDatasetData(target) {
  //   var site_url    = $('#site-url').data('site_url');
  //   // var data        = serializeSearchDatasetForm();
  //   // data.collection = target;
  //   // data.context    = $('.datasets-container-js').data('context');
  //   var data = {
  //     collection: "user_event",
  //     group_by: "minute",
  //     num_rows: "50",
  //     fields: [],
  //     selected_fields: [
  //       {field: "iid", description: "Monitored home unique identifier"},
  //       {field: "tmstp", description: "Date and time of the measurement"},
  //       {field: "deploy", description: "Deployment"},
  //       {field: "type_id", description: "Identifier of the type of interactions"},
  //       {field: "type_name", description: "Type of interaction"},
  //       {field: "view_id", description: "Identifier of the visualized screen"},
  //       {field: "view_name", description: "Name of visualized screen"},
  //     ]
  //   };
  //
  //   $.ajax({
  //     type: 'POST',
  //     contentType: "application/json; charset=utf-8",
  //     data: JSON.stringify(data),
  //     url: site_url+'/datasetExplorer/searchDatasetData',
  //     success: function(response){
  //       $('.main-container .content').html( response );
  //     }
  //   });
  // }

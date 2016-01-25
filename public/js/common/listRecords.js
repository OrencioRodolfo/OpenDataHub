var $ = require('jquery');

$('.operation-opts-js .separator-js').show();
$('.operation-opts-js .download-csv-js').show();
$('.operation-opts-js .download-js').show();

$(document).ready(function() {
  var loading  	= false; //to prevents multiple ajax loads
  var site_url 	= $('#site-url').data('site_url');
  var element 	= $('.main-container .content .list-records-js');
  var page 		= element.data('page');

  $(window).scroll(function() { //detect page scroll
    if($(window).scrollTop() + $(window).height() == $(document).height()) { //user scrolled to bottom of the page?
      if(loading==false) { //there's more data to load
        loading = true; //prevent further ajax loading
        $('.animation-image').show(); //show loading image
        var data 	= serializeSearchDatasetForm();
        data.page 	= page;
        element.data('page', ++page);
        $.ajax({
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          url: site_url+'/datasetExplorer/searchDatasetData',
          global: false,
          success: function(response){
            $('.main-container .content .list-records-js tbody').append(response);
            $('.animation-image').hide(); //hide loading image
          }
        });
      }
    }
  });
});

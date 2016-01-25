var $ = require('jquery');

$('.dataset-table-js').on('click', function(){
  $(this).closest('div').children('.table-js').slideToggle('medium');
});

(function($){ $.fn.text_cloud = function(text, timeout){
  
    $('#text_cloud').remove();
  
    $('<div/>', {
      id: 'text_cloud'
    })
    .appendTo(this)
    .append('<div/>')
    .append('<span/>');
    
    $('#text_cloud')
    .find('span')
    .text(text);
    
    setTimeout(function() {
    
      $('#text_cloud').fadeOut(200, function() {
      
        $('#text_cloud').remove();
      
      });
    
    }, timeout);

}})(jQuery);
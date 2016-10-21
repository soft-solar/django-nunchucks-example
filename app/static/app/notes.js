$(function(){
  $('.setlang').api({
    action: 'set lang',
    method: 'POST',
    beforeSend: function(settings) {
      if( !$(this).data('language') ) {
        return false;
      }
      settings.data.language = $(this).data('language');
      return settings;
    },
    beforeXHR: function(xhr) {
      xhr.setRequestHeader("X-CSRFToken", csrf_token);
    },
    onResponse: function(response) {
      location.reload();
    },
  });

  var removeAPI = {
    action: 'remove note',
    method : 'DELETE',
    onResponse: function(response) {
      if (!response.detail) {
        return {
          success: true
        }
      };
    },
    onSuccess: function(response) {
      $("#noteList .note[data-id="+ $(this).data("id") +"]").remove();
    },
  };

  $('.button.remove').api(removeAPI);

  var validation = {
    text: {
      identifier  : 'text',
      rules: [
        {
          type   : 'empty',
          prompt : gettext('Please enter note description')
        },
      ]
    }
  };
  $('.ui.form').api({
      action: 'add note',
      method : 'POST',
      serializeForm: true,
      beforeSend: function(settings) {
        if (!$(this).form("is valid")){
          return false;
        }
        return settings;
      },
      onResponse: function(response) {
        if (response.id) {
          return {
            data: response,
            success: true
          }
        };
        return response;
      },
      onSuccess: function(response) {
        $(this).form('clear');
        $("#noteList").prepend(
          nunjucks.render('note_detail.html', {object: response.data})
        );
        var note = $("#noteList .note[data-id="+ response.data.id +"]");
        $('.button.remove', note).api(removeAPI);
      },
    })
    .form({fields:validation})
  ;
});

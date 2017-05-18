$(document).ready(function(){
  $('#add').on('click', function(e){
      e.preventDefault();
    var name = $('#name').val();
    var surname = $('#surname').val();
    var number = $('#number').val();

    if(!checkAvailable(number)){
      postError(1);
      return;
    }
    if(name.trim() == '' || surname.trim() == '' || number.trim() == ''){
      postError(0);
      return;
    }
    var bookmark = {
      name: name,
      surname: surname,
      number: number
    }

    if(localStorage.getItem('bookmarks') === null){
     var bookmarks = [];
     bookmarks.push(bookmark);
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   } else {
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     bookmarks.push(bookmark);
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }

   document.getElementById('success').innerHTML = '<div class="alert alert-success alert-dismissible fade in" role="alert">'+
'<button type="button" class="close fade in" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'<strong>Success!</strong>   You have successfully added this contact to your list!'+
        '</div>';

        postClear();

  });
});

function postClear(){
  $('#name').val('');
  $('#surname').val('');
  $('#number').val('');
}

function postError(choice){
  if(choice == 0){
  document.getElementById('success').innerHTML = '<div class="alert alert-danger alert-dismissible fade in" role="alert">'+
'<button type="button" class="close fade in" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'<strong>Error!</strong>   Your input is invalid.'+
       '</div>';
        postClear();
     }
     else if(choice == 1){
       document.getElementById('success').innerHTML = '<div class="alert alert-danger alert-dismissible fade in" role="alert">'+
     '<button type="button" class="close fade in" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
     '<strong>Error!</strong>   This number already exists! Please check your contacts...'+
            '</div>';
     }

}

function checkAvailable(number){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if(bookmarks == null || bookmarks.length == 0){
    return true;
  }
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].number == number){
      return false;
    }
   }
return true;
}

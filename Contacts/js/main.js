$(document).ready(function(){
  fetchBookmarks();

  $('#searchbar').keyup(function(e){
      var searchKey = e.target.value;
      searchFor(searchKey.trim());
  });


  $('#searchbutton').on('click',function(){
    var searchKey = $('#searchbar').val();
    searchFor(searchKey.trim());
  });



});



function fetchBookmarks(){
  var bookmarksResults = document.getElementById('index');
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if(bookmarks == null || bookmarks.length == 0){
      bookmarksResults.innerHTML = '<div class="alert alert-danger alert-dismissible fade in" role="alert">'+
   '<button type="button" class="close fade in" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
   '<strong>Warning!</strong>   Your contact list is empty!'+
           '</div>';
  }else{
  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var surname = bookmarks[i].surname;
    var number = bookmarks[i].number;

  bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+' '+surname+
                                  ' <a class="btn btn-default contact-btn" target="_blank" href="#">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+number+'\')" class="btn btn-danger contact-btn" href="#">Delete</a> ' +
                                  '</h3>'+'<br><h4>'+number+'</h4>'+
                                  '</div>';

  }
}

}

function deleteBookmark(number){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].number == number){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

function searchFor(searchKey){
  if(searchKey.trim() == ''){
    fetchBookmarks();
    return;
  }
  var bookmarksResults = document.getElementById('index');
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  if(bookmarks.length == 0){
      bookmarksResults.innerHTML = '<div class="alert alert-danger alert-dismissible fade in" role="alert">'+
   '<button type="button" class="close fade in" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
   '<strong>Warning!</strong>   Your contact list is empty!'+
           '</div>';
  }else{
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var surname = bookmarks[i].surname;
    var number = bookmarks[i].number;
    console.log(bookmarks[i].name+' '+ bookmarks[i].surname+ ' '+ bookmarks[i].number);
    if(name == searchKey || surname == searchKey || number == searchKey ){
      bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+' '+surname+
                                      ' <a class="btn btn-default contact-btn" target="_blank" href="#">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+number+'\')" class="btn btn-danger contact-btn" href="#">Delete</a> ' +
                                      '</h3>'+'<br><h4>'+number+'</h4>'+
                                      '</div>';
     }
   }
 }
}

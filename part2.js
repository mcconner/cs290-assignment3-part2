var settings = null;


function searchGists() {
  var i, url, numResults, python, json, javascript, sql, gistData;
  //document.getElementById("searchResults").innerHTML = "";

var xmlHttp;
  if(window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }else{
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  if (!xmlHttp)
    alert("Can't create that object");

  url = 'https://api.github.com/gists';
 
  //Set variable to number of pages to display
  numResults = document.getElementsByName('numResults')[0].value;
  
  //Set variables to true if checked, otherwise false 
  python = document.getElementsByName('language-python')[0].checked;
  json = document.getElementsByName('language-json')[0].checked;
  javascript = document.getElementsByName('language-javascript')[0].checked;
  sql = document.getElementsByName('language-sql')[0].checked;
  

  /*alert("numResults = " + numResults);
  alert("sql = " + sql);
  alert("python = " + python);
  alert("json = " + json);
  alert("javascript = " + javascript);*/
 
 //url += '?pages=' + numResults;
 alert("URL = " + url);
 
  xmlHttp.onreadystatechange = function () {
	 //alert("In on ready state change");
	 //alert("Ready State = " + xmlHttp.readyState);
     //alert("Status = " + xmlHttp.status);
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
	  alert("Ready!");
	  var gistArray = JSON.parse(this.responseText);
      //document.getElementById("searchResults").innerHTML = "";
	  
	  //for(i = 1; i <= numResults; i++){

	  //document.getElementById("searchResults").innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>';
	  document.getElementById('searchResults');
	  var ul = document.createElement('ul');
	  for ( var i = 0; i < numResults; i++ ) {
		  console.log(gistArray[i].description);
	      console.log(gistArray[i].html_url);
          var listItem = document.createElement('li');
	      var divURL = document.createElement('div');
	      divURL.innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>';
	      listItem.appendChild(divURL);
	  //var gistDescription = "No Description";
		}
	  
    //}  
	}
	//makeGistList(document.getElementById('searchResults'), description);
	};

    xmlHttp.open('GET', url);
    xmlHttp.send();
}

//window.onload = function(){
//	var savedList = localStorage.getItem('list');
//	if(list ===null){
//		savedList = {gists:[]};
//		localStorage.setItem('list', JSON.stringify(savedList));
//	} else{
//		savedList = JSON.parse(localStorage.getItem('list'));
//	}
//}



function makeGistList (gistArray) {
	var gistList = document.getElementById('searchResults');
	var ul = document.createElement('ul');
	
	return gistList;
}



//function addToFavorites() {
// alert("Add to Favorites");
// console.log(document.getElementsByName('demo-input')[0].value);
//}

//function removeFromFavorites() {
// alert("Remove from Favorites");
// console.log("Remove from Favorites");
//}

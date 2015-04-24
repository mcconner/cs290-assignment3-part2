var settings = null;

var gistArray = [];

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
	  gistArray = JSON.parse(this.responseText);
      //document.getElementById("searchResults").innerHTML = "";
	  
	  //for(i = 1; i <= numResults; i++){

	  //document.getElementById("searchResults").innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>';
	  var list = document.getElementById('searchResults');
	  var ul = document.createElement('ul');
	  for ( var i = 0; i <= numResults*30; i++ ) {
		  console.log(gistArray[i].description);
	      console.log(gistArray[i].html_url);
          var listItem = document.createElement('li');
		  ul.appendChild(listItem);
		  document.getElementById('searchResults').appendChild(ul);
	      var divURL = document.createElement('div');
	      divURL.innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>';
	      listItem.appendChild(divURL);
		  
		  //adds a favorites button 
		  var button = document.createElement("input");
		  button.type = "button";
		  ul.appendChild(button);
		  button.value = "+";
		  button.onclick = function () {
			  alert("Button click");
		  }
		  }

		//}
	  
    //}  
	}
	//makeGistList(document.getElementById('searchResults'), description);
	//makeGistList(gistArray);
	document.getElementById('searchResults').appendChild(makeGistList(gistArray[0]));
	};

    xmlHttp.open('GET', url);
    xmlHttp.send();
}



function makeGistList (array) {
	var gistList = document.getElementById('searchResults');
	var ul = document.createElement('ul');
	for(i = 0; i < array.length; i++) {
		var listItem = document.createElement("li");
		listItem.appendChild(document.createTextNode(array[i].description));
		ul.appendChild(listItem);
	}
	return ul;
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


//function addToFavorites() {
// alert("Add to Favorites");
// console.log(document.getElementsByName('demo-input')[0].value);
//}

//function removeFromFavorites() {
// alert("Remove from Favorites");
// console.log("Remove from Favorites");
//}

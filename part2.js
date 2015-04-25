//var savedList = null;
var settings = null;

var gistArray = [];

function searchGists() {
  var i, url, numResults, python, json, javascript, sql, gistData, gitId;
  document.getElementById("searchResults").innerHTML = "";

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

 
  xmlHttp.onreadystatechange = function () {

    if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
	  //alert("Ready!");
	  gistArray = JSON.parse(this.responseText);
	  //console.log(gistArray);
      //document.getElementById("searchResults").innerHTML = "";


	  //document.getElementById("searchResults").innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>';
	  var list = document.getElementById('searchResults');
	  var ul = document.createElement('ul');
	  for ( var i = 0; i <= gistArray.length; i++ ) {
		  //console.log(gistArray[i].description);
	      //console.log(gistArray[i].html_url);

          var listItem = document.createElement('li');
		  ul.appendChild(listItem);
		  document.getElementById('searchResults').appendChild(ul);
		  if(gistArray[i].description === "" || gistArray[i].description === null){
			  gistArray[i].description = "No description provided";
		  }
	      listItem.innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>&nbsp;';
		  gistDescription = gistArray[i].description;
		  gistId = gistArray[i].id;
		  gistUrl = gistArray[i].html_url;
		  
		  //adds a favorites button 
		  var btnAddToFav = document.createElement("input");
		  btnAddToFav.type = "button";
		  listItem.appendChild(btnAddToFav);
		  btnAddToFav.innerHTML = "+";
		  btnAddToFav.value = "+";
		  btnAddToFav.setAttribute("gistId", gistId);
		  btnAddToFav.onclick = function () {
			var gistId = this.getAttribute("gistId");
			console.log("Gist id= " + gistId);
			var toBeFavoredGist = findById(gistId);
			console.log("to be favored Gist= " + toBeFavoredGist);
			console.log("to be favored Gist description = " + toBeFavoredGist.description);
			//localStorage.setItem('userList', JSON.stringify(this.parentNode.textContent));
			//var itemToAdd = new Favorite(toBeFavoredGist.id, toBeFavoredGist.description, toBeFavoredGist.html_url);
			//addFavorite(settings, itemToAdd);
			//localStorage.setItem('userList', JSON.stringify(this.parentNode.textContent));
			//localStorage.setItem('userList', toBeFavoredGist.description);
			localStorage.setItem('userList', JSON.stringify({
				lsId : toBeFavoredGist.id,
				lsDesc : toBeFavoredGist.description,
				lsUrl : toBeFavoredGist.html_url }))
			//var name = localStorage.getItem('name');
			//console.log(name);
			//document.getElementById('showFavorites').appendChild(ul);
	        //btnAddToFav.parentNode.style.display='none';
	        showFavorites();
		  };
		  
		  
		  }

		//}
	  
    //}  
	}
	//makeGistList(document.getElementById('searchResults'), description);
	//makeGistList(gistArray);
	//document.getElementById('searchResults').appendChild(makeGistList(gistArray[0]));
	};

	//for(i=1; i<=numResults; i++ )
	//{
	//	tempUrl = url + "?page=" + numResults;
	//	console.log("TempUrl = " + tempUrl);
	//	xmlHttp.open('GET', tempUrl);
	//	xmlHttp.send();
	//}

		xmlHttp.open('GET', url);
		xmlHttp.send();
}

function Favorite(fId, fDesc, fUrl) {
	this.fId = fId;
	this.fDesc = fDesc;
	this.fUrl = fUrl;
}

function addFavorite(settings, favorite) {
	if(favorite instanceof Favorite) {
		settings.gists.push(favorite);
		localStorage.setItem('userList', JSON.stringify(settings));
		return true;
	}
	console.error('Attempted to add non-favorite.');
	return false;
}

function findById(gId) {
	for(i = 0; i<gistArray.length; i++){
		if(gistArray[i].id === gId)
			return gistArray[i];
	}
}

window.onload = function(){
	var savedList = localStorage.getItem('userList');
	console.log("SavedList = " + savedList);
	if(savedList ===null){
		settings = {'gists':[]};
		localStorage.setItem('userList', JSON.stringify(settings));
	} else{
		//settings = JSON.parse(localStorage.getItem('userList'));
		settings = localStorage.getItem('userList');
	}
	showFavorites();
}

function showFavorites() {
  var list = document.getElementById('showFavorites');
  var ul = document.createElement('ul');
  for ( var key in localStorage ) {
	  //console.log("Saved List = " + savedList);

		var favItem = document.createElement('li');
		//listItem.innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>&nbsp;';
		var fav = JSON.parse(localStorage.getItem('userList'));
		favItem.innerHTML = '<a href="'+ fav.lsUrl + '">' + fav.lsDesc + '</a>&nbsp;';
	    //favItem.innerHTML = localStorage[key];
  console.log("localStorage[key] = " + localStorage[key]);
	var deleteButton = document.createElement("input");
	deleteButton.type = "button";
	ul.appendChild(deleteButton);
	document.getElementById('showFavorites').appendChild(ul);
	deleteButton.value = "Remove";
	deleteButton.onclick = function () {
		localStorage.removeItem(key);
		//localStorage.clear();
		showFavorites();
	}
	
	favItem.appendChild(deleteButton);
	ul.appendChild(favItem);
	list.appendChild(ul);
  }
  return list; 
}


function makeGistList(){
	
}


//function makeGistList (array) {
//	var gistList = document.getElementById('searchResults');
//	var ul = document.createElement('ul');
//	for(i = 0; i < array.length; i++) {
//		var listItem = document.createElement("li");
//		listItem.appendChild(document.createTextNode(array[i].description));
//		ul.appendChild(listItem);
//	}
//	return ul;
//}


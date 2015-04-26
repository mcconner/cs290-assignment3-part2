/*Rachael McConnell
  CS290 Spring 2015 */

var settings = null;
var gistArray = [];

function searchGists() {
  var i, url, numResults, python, json, javascript, sql;
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
 
  //NOTE: Language filtering and pagination do not work 
 
  //Set variable to number of pages to display
  numResults = document.getElementsByName('numResults')[0].value;
  
  //Set variables to true if checked, otherwise false 
  python = document.getElementsByName('language-python')[0].checked;
  json = document.getElementsByName('language-json')[0].checked;
  javascript = document.getElementsByName('language-javascript')[0].checked;
  sql = document.getElementsByName('language-sql')[0].checked;
 
  xmlHttp.onreadystatechange = function () 
  {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200) 
	{
	  gistArray = JSON.parse(this.responseText);

	  var list = document.getElementById('searchResults');
	  var ul = document.createElement('ul');
	  
	  for ( var i = 0; i < gistArray.length; i++ ) 
	  {
		if(localStorage.getItem(gistArray[i].id) === null)
		{
		  var listItem = document.createElement('li');
		  ul.appendChild(listItem);
		  document.getElementById('searchResults').appendChild(ul);
		  if(gistArray[i].description === "" || gistArray[i].description === null)
		  {
		    gistArray[i].description = "No description provided";
		  }
		  listItem.innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>&nbsp;';
		
		
	      //listItem.innerHTML = '<a href="'+ gistArray[i].html_url + '">' + gistArray[i].description + '</a>&nbsp;';
		  gistId = gistArray[i].id;
		  
		  //adds a favorites button to each search result item
		  var btnAddToFav = document.createElement("input");
		  btnAddToFav.type = "button";
		  listItem.appendChild(btnAddToFav);
		  btnAddToFav.innerHTML = "+";
		  btnAddToFav.value = "+";
		  btnAddToFav.setAttribute("gistId", gistId);
		  btnAddToFav.onclick = function () 
		 {
		  var gistId = this.getAttribute("gistId");
		  console.log("Gist id= " + gistId);
		  var toBeFavoredGist = findById(gistId);
			
		  //adds favorited item to local storage 
		  var myFav = new Object ();
		  myFav.url = toBeFavoredGist.html_url;
		  myFav.desc = toBeFavoredGist.description;
		  myFav.id = toBeFavoredGist.id;
		  localStorage.setItem(myFav.id, JSON.stringify(myFav));

		  document.getElementById('showFavorites').innerHTML = "";
	      showFavorites();
		};	
		}

	  }
	}
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

function Favorite(fId, fDesc, fUrl) 
{
	this.fId = fId;
	this.fDesc = fDesc;
	this.fUrl = fUrl;
}

function addFavorite(settings, favorite) 
{
	if(favorite instanceof Favorite) 
	{
		settings.gists.push(favorite);
		localStorage.setItem('userList', JSON.stringify(settings));
		return true;
	}
	console.error('Attempted to add non-favorite.');
	return false;
}

//searches gistArray to find id's that match 
function findById(gId) 
{
	for(i = 0; i<gistArray.length; i++)
	{
		if(gistArray[i].id === gId)
			return gistArray[i];
	}
}

//calls showFavorites function upon page load to show saved favorites 
window.onload = function(){
	showFavorites();
}

//displays favorites to the screen 
function showFavorites() 
{
  var list = document.getElementById('showFavorites');
  var ul = document.createElement('ul');
  for ( var key in localStorage ) 
  {
	var favItem = document.createElement('li');
	var myId = key;
	var myFav = JSON.parse(localStorage.getItem(myId));
		
	favItem.innerHTML = '<a href="'+ myFav.url + '">' + myFav.desc + '</a>&nbsp;';
	gistDeleteId = myId;
		
	var deleteButton = document.createElement("input");
	deleteButton.type = "button";
	favItem.appendChild(deleteButton);
	document.getElementById('showFavorites').appendChild(ul);
	deleteButton.value = "Remove";
	deleteButton.setAttribute("gistDeleteId", gistDeleteId);
	deleteButton.onclick = function () 
	{
		var gistDeleteId = this.getAttribute("gistDeleteId");
		localStorage.removeItem(gistDeleteId);
		document.getElementById('showFavorites').innerHTML = "";
		showFavorites();
	}
	
	ul.appendChild(favItem);
	list.appendChild(ul);
  }
  return list; 
}




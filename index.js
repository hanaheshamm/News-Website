// const API_KEY = "a47412db5aa74f8e881e620e50c5cd60" ; //original keyy
const API_KEY = "baf97ffe58e847de98839e3c4f6c1b32" ;
const url = "https://newsapi.org/v2/everything?q=";
// const url2 ="https://newsapi.org/v2/everything?";

window.addEventListener("load" , () => fetchNews("Egypt"));

function reload(){
    window.location.reload();
}

window.addEventListener("load", () => onNavItemClick("Egypt"));

// async function fetchNews(query , sortByPram= 'publishedAt'){
 
//    const res = await fetch(`${url}${query}&sortBy=${sortByPram}&apikey=${API_KEY}`);
//    const data = await res.json();
// //    console.log(data);
// bindData(data.articles);

// }

async function fetchNews(query){
 
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
 //    console.log(data);
 bindData(data.articles);
 }

// async function fetchNews2(sortByPram){
//     const res = await fetch(`${url2}sortBy=${sortByPram}&apikey=${API_KEY}`);
//     const data = await res.json();
//  //    console.log(data);
//  bindData(data.articles);
// }

async function fetchNews2(query , sortByPram){
 
   const res = await fetch(`${url}${query}&sortBy=${sortByPram}&apikey=${API_KEY}`);
   const data = await res.json();
//    console.log(data);
bindData(data.articles);

}


function bindData(articles){

const gridContainer = document.getElementById("grid-container-total");

const gridTemplate = document.getElementById("grid-template");
// const gridTemplate = document.getElementsByClassName("grid-container");
gridContainer.innerHTML="";

articles.forEach(article => {
    if(! article.urlToImage) return;
    const gridClone = gridTemplate.content.cloneNode(true);
    fillDataInGrid(gridClone, article);

    gridContainer.appendChild(gridClone);

});

}
  
  

function  fillDataInGrid(gridClone, article){
    const newsImg =gridClone.getElementById("news-img");
    const newsTitle = gridClone.getElementById("news-title");
    const newsDate = gridClone.getElementById("news-date");
    const newsDesc = gridClone.getElementById("news-description");

    newsImg.src =article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {timeZone: "Egypt"});
newsDate.innerHTML= `${article.source.name} . ${date}`;

gridClone.firstElementChild.addEventListener("click", () => 
{window.open(article.url , "_blank")});

}



// // new added

// // Get the dropdown menu element
const sortByDropdown = document.getElementById('sort-by-dropdown');

// // Get the option element for "Date Published (Newest First)"
// const dateDescOption = document.getElementById("date-desc");
// const sortByRelevancy = document.getElementById("relevancyyy");
// dateDescOption.addEventListener("click" ,fetchNews(query , 'publishedAt'));
// sortByRelevancy.addEventListener("click" , fetchNews(query , 'relevancy'));


let cursorSelected = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    cursorSelected?.classList.remove('active');
    cursorSelected= navItem;
    cursorSelected.classList.add('active');
    sortByDropdown.value = "notChoosen";


sortByDropdown.addEventListener("change" ,function() {
if (this.value =="date-desc"){
    fetchNews2(cursorSelected.id ,'publishedAt');
}

if(this.value == "relevancy"){
    fetchNews2(cursorSelected.id ,'relevancy');
}

if(this.value == "popularity"){
    fetchNews2(cursorSelected.id ,'popularity');
}

if(this.value == "notChoosen"){
    fetchNews(cursorSelected.id );
}

})
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click" , () =>{
    const query = searchText.value ;
    if(!query) return;
    fetchNews(query);
    cursorSelected?.classList.remove("active");
    cursorSelected=null;

    sortByDropdown.value = "notChoosen";


    sortByDropdown.addEventListener("change" ,function() {
    if (this.value =="date-desc"){
        fetchNews2(query ,'publishedAt');
    }
    
    if(this.value == "relevancy"){
        fetchNews2(query ,'relevancy');
    }
    
    if(this.value == "popularity"){
        fetchNews2(query,'popularity');
    }
    
    if(this.value == "notChoosen"){
        fetchNews(query );
    }
    
    })

})

// when pressing ENTER , search button is activated
// Get the input field
var input = document.getElementById("search-text");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-button").click();
  }
});







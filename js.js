"use strict"
class MovieService{
  search(title, type, page){
    let url = `http://www.omdbapi.com/?s=${title}&page=${page}&type=${type}&apikey=c19387c6`
    return fetch(url).
  	then(data => {
    	let responseData = data.json();
    	if(data.ok){
    		return responseData;
    	}
    	return responseData.then(error =>{
    		let er = new Error('Что-то пошло не так');
    		er.data = error;
    		throw er;
    	})
    })
  }
  getMovie(movieID){
    let url = `http://www.omdbapi.com/?i=${movieID}&apikey=c19387c6`
    return fetch(url).
    then(data => {
      let responseData = data.json();
      if(data.ok){
        return responseData;
      }
      return responseData.then(error =>{
        let er = new Error('Что-то пошло не так');
        er.data = error;
        throw er;
      })
    })
  }
}
let searchMovie = new MovieService();


function reset(){
  inf.innerHTML="";
	res.innerHTML ="";
	movieInfo.innerHTML="";
	inftitle.innerHTML = "";
	pagination.innerHTML="";
}
function searchMovies(title, type, page){
  setTimeout(()=>{
    searchMovie.search(title, type, page).then(data =>{
      inf.innerHTML = "Films:";
      res.innerHTML = "";
      res.classList.remove("load")
      for(let i = 0; i < data.Search.length; i++){
        res.innerHTML += `<div class="movieBlock"><img src="${data.Search[i].Poster}"><div class="content"><p>${data.Search[i].Type}</p><br><h3>${data.Search[i].Title}</h3><br><p>${data.Search[i].Year}</p><button value="${data.Search[i].imdbID}" class="details">Details</button></div></div>`
      }
      more.innerHTML = "<button id='moreBtn'>More</button>"
      console.log(data)
    })
  }, 2000)
}
function movieDetails(value){
  setTimeout(()=>{
    searchMovie.getMovie(value).then(data2 =>{
      console.log(data2)
      movieInfo.classList.remove("load")
      inftitle.innerHTML = "Film Info:"
      movieInfo.innerHTML = `<div class="movieInfoContainer"><img src="${data2.Poster}"><div class="movieInfoBlock"><div><p>Title:&nbsp;&nbsp;</p><p>${data2.Title}</p></div><div><p>Genre:&nbsp;&nbsp;</p><p>${data2.Genre}</p></div><div><p>Released:&nbsp;&nbsp;</p><p>${data2.Released}</p></div><div><p>Country:&nbsp;&nbsp;</p><p>${data2.Country}</p></div><div><p>Director:&nbsp;&nbsp;</p><p>${data2.Director}</p></div><div><p>Writer:&nbsp;&nbsp;</p><p>${data2.Writer}</p></div><div><p>Actors:&nbsp;&nbsp;</p><p>${data2.Actors}</p></div><div><p>Awards:&nbsp;&nbsp;</p><p>${data2.Awards}</p></div></div></div>`
    })
  }, 2000)
}
function aboutMovie(){
  let details = document.querySelectorAll(".details");
  let overlay = document.querySelector("#overlay-modal");
  let closeBtn = document.querySelector("#close")
  let modalElem = document.querySelector(".modal")
  details.forEach(item => {
    item.addEventListener("click", function(){
      modalElem.classList.add('activeModal');
      overlay.classList.add('activeModal');
      movieInfo.innerHTML = "";
      movieInfo.classList.add("load");
      movieDetails(item.value);
      closeBtn.addEventListener("click", function(){
        modalElem.classList.remove('activeModal');
        overlay.classList.remove('activeModal');
      })
    })
  })
}
function nextPage(title, type, page){
  setTimeout(()=>{
    searchMovie.search(title, type, page).then(data =>{
      inf.innerHTML = "Films:";
      pagination.classList.remove("load")
      for(let i = 0; i < data.Search.length; i++){
        res.innerHTML += `<div class="movieBlock"><img src="${data.Search[i].Poster}"><div class="content"><p>${data.Search[i].Type}</p><br><h3>${data.Search[i].Title}</h3><br><p>${data.Search[i].Year}</p><button value="${data.Search[i].imdbID}" class="details">Details</button></div></div>`
      }
      more.innerHTML = "<button id='moreBtn'>More</button>"
      moreBtn.removeAttribute("disabled", "disabled")
    })
  }, 2000)
}

searchBtn.addEventListener("click", function(){
  reset();
  let title = document.querySelector("#title").value;
  let type = document.querySelector("#type").value;
  res.classList.add("load")
  searchMovies(title, type, "1");
  setTimeout(aboutMovie, 2100)
  let j = 1
  more.addEventListener("click", function(){
    j++;
    pagination.classList.add("load")
    moreBtn.setAttribute("disabled", "disabled")
    nextPage(title, type, j);
    setTimeout(aboutMovie, 2100)
  })

})

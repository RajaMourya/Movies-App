 const comingSoon="http://localhost:3000/movies-coming";
 const moviesInTheatres="http://localhost:3000/movies-in-theaters";
 const topRatedIndian="http://localhost:3000/top-rated-india";
 const topRatedMovies="http://localhost:3000/top-rated-movies";
 const favourites="http://localhost:3000/favourit";

const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');
const b3 = document.querySelector('#b3');
const b4 = document.querySelector('#b4');
const b5 = document.querySelector('#b5');

b1.onclick = function(e){
    e.preventDefault();
    path = comingSoon;
    get(path,false)
}
b2.onclick = function(e){
    e.preventDefault();
    path = moviesInTheatres;
    get(path,false)
}
b3.onclick = function(e){
    e.preventDefault();
    path = topRatedIndian
    get(path,false)
}
b4.onclick = function(e){
    e.preventDefault();
    path = topRatedMovies
    get(path,false)
}
b5.onclick = function(e){
    e.preventDefault();
    path = favourites
    get(path,true)
}
function get(path,fav){
    fetch(path)
    .then((res)=>res.json())
    .then( movies => displayMovies(movies,fav))
    .catch();
}

//----------To display movies---------//
function displayMovies(movies,fav){
    var container = document.getElementById("movies-container");
    container.innerHTML="";
    console.log(container)
    movies.forEach( (movie) => {
        
        //-------------CARD-------------------//
        const card = document.createElement("div");
        card.setAttribute("class", "card");
            //-----------poster-----------------//
            const poster = document.createElement("img");
            poster.setAttribute("src", movie.posterurl);
            poster.setAttribute("class", "poster");

            //------------------ To Show Details of a movie-----//
            poster.onclick = function(event){
                event.preventDefault();
                let title = document.createElement("h3");
                title.innerText = "TITLE :" + movie.title;
                let year = document.createElement("h4");
                year.innerText = "YEAR :" + movie.year;
                let  genres = document.createElement("h3");
                genres.innerText = "GENRES :"+ movie.genres;
                let  story_line = document.createElement("h4");
                story_line.innerText = "STORY LINE :" + movie.storyline;

                let desc = document.getElementById("desc")
                desc.innerHTML="";
                desc.appendChild(title);
                desc.appendChild(year);
                desc.appendChild(genres);
                desc.appendChild(story_line);
                if(desc.style.display== "none"){
                    desc.style.display = "block";
                }else{
                    desc.style.display = "none";
                }

            }

            //----------details-------------//
            const details = document.createElement("div");
            details.setAttribute("class", "details");
                //---------inside details---------//
                const title = document.createElement("h3");
                title.innerText = movie.title;
                const year = document.createElement("h4");
                year.innerText = movie.year;

                //---add to favourite button----//
                const button = document.createElement("BUTTON");
                if(fav==true){
                    var t = document.createTextNode("Delete from favourite");
                }else{
                    var t = document.createTextNode("Add to favourite");
                }
                button.appendChild(t);
                button.setAttribute("class", "add-favourite");
                button.onclick = function(e){
                    e.preventDefault();
                    if(fav==false){
                        console.log("adding...")
                        addFavourite(movie);
                    }else{
                        console.log("deleting...")
                        deleteFavourite(movie);
                    }
                }

                details.appendChild(title);
                details.appendChild(year);
                details.appendChild(button);            

            card.appendChild(poster);
            card.appendChild(details)
        container.appendChild(card);
    })
}

//--------------to add movie to favourite-----------//
function addFavourite(movie){
    fetch(favourites, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json'
      },  
      redirect: "manual",  
      body: JSON.stringify({
        "genres" : movie.genres,
        "title" : movie.title,
         "year" : movie.year ,
         "storyline" : movie.storyline,
         "posterurl":movie.posterurl
    })
    });
  }
  
//-----------to delete from Favourite------------//
function deleteFavourite(movie){ 
    fetch(favourites+"/"+movie.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "genres" : movie.genres,
          "title" : movie.title,
           "year" : movie.year ,
           "storyline" : movie.storyline,
           "posterurl":movie.posterurl
      })
    });
  }


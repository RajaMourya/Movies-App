

 const MOVIEScoming="http://localhost:3000/movies-coming";
 const MOVIESintheaters="http://localhost:3000/movies-in-theaters";
 const MOVIESindiatop="http://localhost:3000/top-rated-india"
 const MOVIES="http://localhost:3000/top-rated-movies"
 const MOVIESfavourit="http://localhost:3000/favourit"




const buttonElement=document.querySelector('#search');
const inputElement=document.querySelector('#inputValue');
const movieSelector=document.querySelector('movieselect');



function movieSelection(movies){
    var img=document.createElement("img:")
    return movies.map((movie) =>{
        return`
        <img src=${movie.poster} data-movie-id=${movie.id}/>
        `;
    })
}



function createMovieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');

    const movieTemplate=`
          <section class="section">
          ${ movieSelection(movies)}
          </section>
          <div class="content">
            <p id="contentclose">x</p>
          </div>
    `;

    movieElement.innerHTML= movieTemplate;
    return movieElement;
}
 
buttonElement.onclick=function(event){
    event.preventDefault();
    const value=inputElement.value;
    fetch(MOVIEScoming)
    .then((res)=> res.json())
    .then((data)=>{
        // console.log('data:',data);
        // const movies = data[0].title;
        //  console.log('data:',movies);
        // const movieBlock =createMovieContainer(data);
     var ele = document.getElementById("movieselect");
     ele.setAttribute('class','imagesection')

         data.forEach(element => {
           var di=document.createElement("img");
           di.setAttribute("src",element.posterurl);
           di.setAttribute('class', 'imageContainer');
           ele.append(di);
         });
        // // movieSelector.appendChild(movieBlock);

    


    })
    .catch();   
}
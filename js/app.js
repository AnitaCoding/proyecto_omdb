const apiKeyValue = '43dd9755'

const titleInput = document.getElementById('title-input')
const searchBtn = document.getElementById('search-button')
const moviesGrid = document.getElementById('movies-grid')
const yearInput = document.getElementById('year-input')

function show_search_results(data){
    let cards = '';
    data['Search'].forEach(element => {
        cards += `<div class="cell" id = ${element.imdbID}>
                <div class="card" >
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img
                            src="${element.Poster}"
                            alt="Placeholder image"
                        />
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">${element.Title}</p>
                                <p class="subtitle is-6">${element.Year}</p>
                            </div>
                        </div>
                        <button onclick="searchById('tt1201607')">ver más</button>
                    </div>
                </div>
            </div>`
    });
    //Insertar la categoría cargada dentro del selection
    moviesGrid.innerHTML = cards;  
}

searchBtn.addEventListener('click', get_movies_by_search)

function get_movies_by_search(){
    const url = set_url()
    fetch(url)
    .then(response => response.json())
    .then(data =>
        show_search_results(data)
    ).catch(error=> console.log("Error al cargar los datos: ", error))
}

//Una función que controle si hay año o no. Si hay año, que lo añada a la búsqueda. 
function set_url(){
    let searchUrl = ''
    if(yearInput.value.length == 0){
        searchUrl = `http://127.0.0.1:8000/movies/${titleInput.value}/{apikey}?apiKey=${apiKeyValue}`
    }else{
        searchUrl = `http://127.0.0.1:8000/movies/${titleInput.value}/${yearInput.value}/{apikey}?apiKey=${apiKeyValue}`
    }
    return searchUrl
}

function searchById(id){
    const url = `http://localhost:8000/movies/${id}?apiKey=${apiKeyValue}`;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data =>
        console.log(data)
    ).catch(error=> console.log("Error al cargar los datos: ", error))
}

function get_movie_by_id(){
    const allMoviesCards = moviesGrid.querySelectorAll('*')
    for (let i = 0; i < allMoviesCards.length; i++){
        //acceso a recorrido del contenido de tabla por posición con función onclick
        //rows es una propiedad de la etiqueta table, que a su vez, tiene la propiedad onclick
        //onclick es un método que se puede asociar a cualquier elemento
        allMoviesCards[i].onclick = function(){
            let id = allMoviesCards[i].id;
            
        
            searchById(id)
        moviesGrid.innerHTML = 'mostrandopeli'
        }
    }
}

moviesGrid.addEventListener('click', get_movie_by_id)


function hello(){
    console.log('hello')
}

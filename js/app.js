const MOVIES_URL = 'http://localhost:8000/movies'

const TITLE_INPUT = document.getElementById('title-input')
const YEAR_INPUT = document.getElementById('year-input')
const SEARCH_BTN = document.getElementById('search-button')
const MOVIES_LIST = document.getElementById('movies-list')

//Muestra los resultados de la búsqueda
function showSearchResults(data){
    let movieBox = `<h2 class="subtitle is-2">Resultados para '${TITLE_INPUT.value}'</h2>`;
        data['Search'].forEach(element => {            
            movieBox += `<div class="box" id =${element.imdbID}>
                        <article class="media">
                            <div class="media-left">
                                <figure class="image poster">
                                    <img src=${element.Poster} alt="Cartel de ${element.Title}" />
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <p class="title is-4">${element.Title}</p>
                                    <p class="subtitle is-6">${element.Year}</p>
                                </div>
                            </div>
                        </article>
                    </div>`
        });

    MOVIES_LIST.innerHTML = movieBox;  
}

SEARCH_BTN.addEventListener('click', getMoviesBySearch)

//Realiza la búsqueda.
//Si encuentra, lanza resultados. Si no, informa al usuario
function getMoviesBySearch(){
    const URL = setUrl()
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        if(data['Response'] == 'False'){
            MOVIES_LIST.innerHTML = `<div class="notification is-danger is-light">
                                        <p>Sin resultados. Prueba a buscar otro título.</p>
                                    </div>`
        }else{
            showSearchResults(data)
        }  
    }).catch(error=> {
        console.log("Error al cargar los datos: ", error)
        MOVIES_LIST.innerHTML = `<div class="notification is-danger is-light">
                                        <p>Error al cargar los datos</p>
                                    </div>`
    })
}

//Setea URL según si hay año o no en la búsqueda
function setUrl(){
    let searchUrl = ''
    if(YEAR_INPUT.value.length == 0){
        searchUrl = `${MOVIES_URL}/${TITLE_INPUT.value}`

    }else{
        searchUrl = `${MOVIES_URL}/${TITLE_INPUT.value}/${YEAR_INPUT.value}`
    }
    return searchUrl
}

//Captura el id de la película seleccionada
function getMovieId(){
    const ALL_MOVIES_CARDS = MOVIES_LIST.querySelectorAll('div.box')
    for (let i = 0; i < ALL_MOVIES_CARDS.length; i++){
        ALL_MOVIES_CARDS[i].onclick = function(){
            let id = ALL_MOVIES_CARDS[i].id;
            goToMovieCard(id)
        }
    }
}

MOVIES_LIST.addEventListener('click', getMovieId)

//Navega al documento movie_card.html
function goToMovieCard(imdbID){
    const PARAMS = new URLSearchParams({imdbID});

  // Navegamos a la página 2 con los parámetros en la URL
     window.location.href = `movie_card.html?${PARAMS.toString()}`;
}


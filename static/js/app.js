const MOVIES_URL = 'http://localhost:8000/movies'

const INDEX_PARAMS = new URLSearchParams(window.location.search)
const TITLE_INPUT = document.getElementById('title-input')
const YEAR_INPUT = document.getElementById('year-input')
const SEARCH_BTN = document.getElementById('search-button')
const MOVIES_LIST = document.getElementById('movies-list')

let title_url = ''
let year_url = ''

//Muestra los resultados de la búsqueda
function showSearchResults(data, title){
    let movieBox = `<h2 class="subtitle is-2">Resultados para '${title}'</h2>`;
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

//Setea URL según si hay año o no en la búsqueda
function setUrl(title, year){
    let searchUrl = ''
    if(YEAR_INPUT.value.length == 0){
        searchUrl = `${MOVIES_URL}/${title}`

    }else{
        searchUrl = `${MOVIES_URL}/${TITLE_INPUT.value}/${year}`
    }
    return searchUrl
}

//Informa de lo ocurrido cuando algo falla
function notificationSomethingWasWrong(element, text){
    element.innerHTML = `<div class="notification is-danger is-light">
                            <span class="icon">
                                <i class="fa-solid fa-skull-crossbones"></i>
                            </span>
                            <p>${text}</p>
                        </div>`

}

//Realiza la búsqueda.
//Si encuentra, lanza resultados. Si no, informa al usuario
function getMoviesBySearch(title, year){
    if(title.length == 0){
        notificationSomethingWasWrong(MOVIES_LIST, 'Es obligatorio introducir al menos una palabra en el campo "título"')
    }else{    
        const URL = setUrl(title, year)
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            if(data['Response'] == 'False' || data['detail'] == 'Not Found'){
                notificationSomethingWasWrong(MOVIES_LIST, 'Sin resultados. Prueba a buscar otro título.')

            }else{
                showSearchResults(data, title)
            }  
        }).catch(error=> {
            console.log("Error al cargar los datos: ", error)
            notificationSomethingWasWrong(MOVIES_LIST, 'Error al cargar los datos')
        })
    }
}

//Encapsulo getMoviesBySearch en arrow function para poder pasarle parámetros y que
//no salte el listener al cargar la página.
//De esta manera, los input quedan limpios si el usuario pincha en resultados en movie_card
SEARCH_BTN.addEventListener('click', () => getMoviesBySearch(TITLE_INPUT.value, YEAR_INPUT.value))

if (INDEX_PARAMS.has('title')){
    title_url = INDEX_PARAMS.get('title')
    if(INDEX_PARAMS.has('year')){
        year_url = INDEX_PARAMS.get('year')
    }
    getMoviesBySearch(title_url, year_url)
}

//Captura el id de la película seleccionada
function getMovieId(){
    const ALL_MOVIES_CARDS = MOVIES_LIST.querySelectorAll('div.box')
    for (let i = 0; i < ALL_MOVIES_CARDS.length; i++){
        ALL_MOVIES_CARDS[i].onclick = function(){
            let id = ALL_MOVIES_CARDS[i].id;
            goToMovieCard(id, TITLE_INPUT.value, YEAR_INPUT.value)
        }
    }
}

MOVIES_LIST.addEventListener('click', getMovieId)

//Navega al documento movie_card.html
function goToMovieCard(imdbID, title, year){
    const PARAMS = new URLSearchParams({imdbID, title, year});
    if (year.length == 0){
        PARAMS.delete('year')
    }

  // Navegamos a la página 2 con los parámetros en la URL
     window.location.href = `movie_card.html?${PARAMS.toString()}`;
}


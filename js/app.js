const APIKEY_VALUE = '43dd9755'

const MOVIES_URL = 'http://localhost:8000/movies'

const TITLE_INPUT = document.getElementById('title-input')
const YEAR_INPUT = document.getElementById('year-input')
const SEARCH_BTN = document.getElementById('search-button')
const MOVIES_LIST = document.getElementById('movies-list')

function showSearchResults(data){
    let movieBox = '';
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

function getMoviesBySearch(){
    const URL = set_url()
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
    }).catch(error=> console.log("Error al cargar los datos: ", error))
}

//Una función que controle si hay año o no. Si hay año, que lo añada a la búsqueda. 
function set_url(){
    let searchUrl = ''
    if(YEAR_INPUT.value.length == 0){
        searchUrl = `${MOVIES_URL}/${TITLE_INPUT.value}/${APIKEY_VALUE}`

    }else{
        searchUrl = `${MOVIES_URL}/${TITLE_INPUT.value}/${YEAR_INPUT.value}/?apiKey=APIKEY_VALUE`
    }
    return searchUrl
}

//Una función que setee la palabra buscada en sesion storage para que si le da a atrás, 
function getMovieById(){
    const ALL_MOVIES_CARDS = MOVIES_LIST.querySelectorAll('div.box')
    for (let i = 0; i < ALL_MOVIES_CARDS.length; i++){
        //acceso a recorrido del contenido de tabla por posición con función onclick
        //rows es una propiedad de la etiqueta table, que a su vez, tiene la propiedad onclick
        //onclick es un método que se puede asociar a cualquier elemento
        ALL_MOVIES_CARDS[i].onclick = function(){
            let id = ALL_MOVIES_CARDS[i].id;
            //searchById(id)
           // getComments(id)
           goToMovieCard(id)
        }
    }
}

MOVIES_LIST.addEventListener('click', getMovieById)

function goToMovieCard(imdbID){
    const PARAMS = new URLSearchParams({imdbID});

  // Navegamos a la página 2 con los parámetros en la URL
     window.location.href = `movie_card.html?${PARAMS.toString()}`;
}


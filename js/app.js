const APIKEY_VALUE = '43dd9755'

const MOVIES_URL = 'http://localhost:8000/movies'

const TITLE_INPUT = document.getElementById('title-input')
const SEARCH_BTN = document.getElementById('search-button')
const MOVIES_LIST = document.getElementById('movies-list')
const YEAR_INPUT = document.getElementById('year-input')

function showSearchResults(data){
    let cards = '';

        data['Search'].forEach(element => {
            
            cards += `<div class="box" id =${element.imdbID}>
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

        //Insertar la categoría cargada dentro del selec
    MOVIES_LIST.innerHTML = cards;  
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

/*function showForm(){
    let formElement = document.getElementById('opinion-form')
    let form = `<h3 class="title is-3">Comparte tu reseña</h3>
                <div class="field">
                    <label class="label">Nombre</label>
                    <div class="control">
                        <input id="nombre" class="input" type="text" placeholder="Nombre">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Mensaje</label>
                    <div class="control">
                        <textarea id="message" class="textarea" placeholder="Escribe tu opinión"></textarea>
                    </div>
                </div>
                <div class="control">
                    <button id="send-button" class="button is-primary" type="button">
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-paper-plane"></i>
                        </span>
                        <span>
                            Enviar
                        </span>
                    </button>
                </div>`
    formElement.innerHTML = form

    const SEND_BUTTON = document.getElementById('send-button')
    SEND_BUTTON.addEventListener('click', createComment)
}

function getGenres(data){
    let genres = data.split(',')
    let result = []
    for (i = 0; i < genres.length; i++){
        result.push(genres[i].trim())
    }
     return result
}

function showGenres(genres){
    let genresArray = getGenres(genres)
    let genresTags = '<div class="tags">'
    for(i = 0; i < genresArray.length ; i++){
        genresTags += `<span class="tag is-dark">${genresArray[i]}</span>`
    }
    genresTags += '</div>'

    return genresTags
}

function getRatings(imdb_id){
    //Seleccionamos el cuerpo de la tabla
    let result = ''
    //Petición http GET usando FetchAPI
    fetch(`${RATINGS_URL}/${imdb_id}`)
    .then(response => response.json())
    .then(data => data[0].media)
    .catch(error=> console.log("Error al cargar los datos: ", error))

}

function showMovie(data){
    let card = '';
    let genresTags = showGenres(data['Genre'])
    let rating = ''
    card = `<div class="cell" id = ${data.imdbID}>
            <div class="card" >
                <div class="card-image">
                    <figure>
                        <img
                            src="${data.Poster}"
                            alt="${data.Title}"
                        />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${data.Title}</p>
                            <p class="subtitle is-6">${data.Year} · ${data.Runtime} · ${data.Rated}</p>
                            ${genresTags}
                            <div class="icon-text">
                                <span class="icon has-text-warning">
                                    <i class="fa-solid fa-star"></i>
                                </span>
                                <span id='span-rating'></span>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <p class="p-card-content">Fecha de estreno: ${data.Released}</p>
                        <p class="p-card-content">${data.Plot}</p>
                        <p class="p-card-content">Dirección: ${data.Director}</p>
                        <p class="p-card-content">Guión: ${data.Writer}</p>
                        <p class="p-card-content">Reparto: ${data.Actors}</p>
                        <p class="p-card-content">Premios: ${data.Awards}</p>
                    </div>
                </div>  
            </div>
        </div>`
    //Insertar la card
    MOVIES_LIST.innerHTML = card;
    console.log(getRatings(data.imdbID))
}

function searchById(id){
    const URL = `${MOVIES_URL}/${id}?apiKey=${APIKEY_VALUE}`;
    fetch(URL)
    .then(response => response.json())
    .then(data =>{
        showMovie(data)
        showForm()
    }).catch(error=> console.log("Error al cargar los datos: ", error))
}
*/

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

/*
function getComments(imdb_id){
    //Seleccionamos el cuerpo de la tabla
    const DIV_COMMENT = document.getElementById('div-comment')
    //Petición http GET usando FetchAPI
    fetch(`${COMMENTS_URL}/${imdb_id}`)
    .then(response => response.json())
    .then(data =>{
        let comments = '<h3 id="title-comments-list" class="title is-3">Reseñas</h3>';
        if(data.length != 0){
            data.forEach(element => {
                comments += `             
                    <div class='comment-container'>
                        <div class = 'comment-header'>
                            <div class='div-comment-header'>
                                <span class="icon is-small is-left">
                                    <i class="fa-solid fa-user"></i>
                                </span>
                                <span>
                                    <p class='comment-username'>${element.persona}</p>
                                </span>
                            </div>
                            <div class='div-comment-header'>
                                <span class="icon is-small is-left">
                                    <i class="fa-regular fa-calendar-days"></i>
                                </span>
                                <span>
                                    <p>${element.fecha.split('-').reverse().join('-')}</p>
                                </span>
                            </div>
                        </div>
                        <p>${element.comentario}</p>
                    </div>`            
            });
        }else{
            comments += `<div class="notification is-warning is-light">
                                        <p>Todavía no hay comentarios para esta película, se el primero en comentar.</p>
                                    </div>`
        }
        DIV_COMMENT.innerHTML = comments    
    }).catch(error=> console.log("Error al cargar los datos: ", error))
}

function createComment(){
    //Capturar datos
    let imdbId = document.querySelector('div.cell').id
    let name = document.getElementById('nombre').value
    let message = document.getElementById('message').value
    let date = new Date().toISOString().split('T')[0];

    fetch(`${COMMENTS_URL}`,
        {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    //La key tiene que ser el nombre que le damos en fastapi
                    //El value el que le damos en js
                    id_pelicula: imdbId,
                    name: name,
                    comment: message,
                    date: date
                }
            )
        })
    .then(response => {
        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`)
        }
        alert('Su comentario ha quedado registrado.')
    })
    .catch(
        error=>{
            alert('No se ha podido registrar el comentario')
            console.log('Detalle error: ', error)
        }
    );
}
*/

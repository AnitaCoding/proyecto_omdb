const PARAMS = new URLSearchParams(window.location.search);
const SELECTED_MOVIE_ID = PARAMS.get('imdbID')

const APIKEY_VALUE = '43dd9755'

const MOVIES_URL = 'http://localhost:8000/movies'
const COMMENTS_URL = 'http://localhost:8000/comments'
const RATINGS_URL = 'http://localhost:8000/califications'

const PRUEBA = document.getElementById('id-prueba')

searchById(SELECTED_MOVIE_ID)
getComments(SELECTED_MOVIE_ID)

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
    PRUEBA.innerHTML = card;
    console.log(getRatings(data.imdbID))
}

function searchById(id){
    const URL = `${MOVIES_URL}/${id}?apiKey=${APIKEY_VALUE}`;
    fetch(URL)
    .then(response => response.json())
    .then(data =>{
        showMovie(data)
    }).catch(error=> console.log("Error al cargar los datos: ", error))
}

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
    let imdbId = SELECTED_MOVIE_ID
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

const SEND_BUTTON = document.getElementById('send-button')
SEND_BUTTON.addEventListener('click', createComment)
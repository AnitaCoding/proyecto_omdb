const PARAMS = new URLSearchParams(window.location.search);
const SELECTED_MOVIE_ID = PARAMS.get('imdbID') //Obtiene la id de la URL

const MOVIES_URL = 'http://localhost:8000/movies/id'
const COMMENTS_URL = 'http://localhost:8000/comments'
const RATINGS_URL = 'http://localhost:8000/califications'

//Busca la película por su id
function searchById(id){
    const URL = `${MOVIES_URL}/${id}`;
    fetch(URL)
    .then(response => response.json())
    .then(data =>{
        showMovie(data)
    }).catch(error=> {
        const MOVIE_CARD = document.getElementById('movie-card')
        MOVIE_CARD.innerHTML = `<div class="notification is-danger is-light">
                                        <p>Error al cargar los datos</p>
                                    </div>`
        console.log("Error al cargar los datos: ", error)
    })
}

//Muestra los datos de la película
function showMovie(data){
    const MOVIE_POSTER = document.getElementById('movie-poster')
    const MOVIE_TITLE = document.getElementById('movie-title')
    const MOVIE_INFO = document.getElementById('movie-info')
    const MOVIE_RELEASED = document.getElementById('movie-released')
    const MOVIE_PLOT = document.getElementById('movie-plot')
    const MOVIE_DIRECTION = document.getElementById('movie-direction')
    const MOVIE_WRITER = document.getElementById('movie-writer')
    const MOVIE_ACTORS = document.getElementById('movie-actors')
    const MOVIE_AWARDS = document.getElementById('movie-awards')
    
    MOVIE_POSTER.setAttribute('src', data.Poster)
    MOVIE_POSTER.setAttribute('alt', data.Title)
    MOVIE_TITLE.textContent = data.Title
    MOVIE_INFO.innerHTML = `${data.Year} · ${data.Runtime} · ${data.Rated}`
    MOVIE_RELEASED.innerHTML = `<strong>Fecha de estreno:</strong> ${data.Released}`
    MOVIE_PLOT.textContent = data.Plot
    MOVIE_DIRECTION.innerHTML = `<strong>Dirección:</strong> ${data.Director}`
    MOVIE_WRITER.innerHTML = `<strong>Guión:</strong> ${data.Writer}`
    MOVIE_ACTORS.innerHTML = `<strong>Reparto:</strong> ${data.Actors}`
    MOVIE_AWARDS.innerHTML = `<strong>Premios:</strong> ${data.Awards}`
    
    if(data['Genre'] != null && data['Genre'].length != 0){
        showGenres(data['Genre'])
    }
    getRatings(SELECTED_MOVIE_ID)
}

//Muestra los géneros
function showGenres(genres){
    let genresArray = getGenres(genres)
    const GENRES_TAGS = document.getElementById('genres-tags')
    let genresSpan = ''
    for(i = 0; i < genresArray.length ; i++){
        genresSpan += `<span class="tag is-dark">${genresArray[i]}</span>`
    }
    GENRES_TAGS.innerHTML = genresSpan
}

//Obtiene los géneros
function getGenres(data){
    let genres = data.split(',')
    let result = []
    for (i = 0; i < genres.length; i++){
        result.push(genres[i].trim())
    }
    return result
}

//Obtiene las calificaciones
function getRatings(imdb_id){
    const SPAN_RATING = document.getElementById('span-rating')
    fetch(`${RATINGS_URL}/${imdb_id}`)
    .then(response => response.json())
    .then(data => {
        if(data[0].media == null || data[0].media == 0){
            SPAN_RATING.textContent = `Esta película todavía no tiene calificaciones`
        }else{
            SPAN_RATING.textContent = `${data[0].media.toFixed(2)}`
        }
    })
    .catch(error=> {
        console.log("Error al cargar los datos: ", error)
        SPAN_RATING.innerHTML = `<div class="notification is-danger is-light">
                                        <p>Error al cargar los datos</p>
                                    </div>`
    })
}

//Obtiene los comentarios
function getComments(imdb_id){
    const DIV_COMMENT = document.getElementById('div-comment')
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
                                        <p>Todavía no hay reseñas para esta película, se el primero en comentar.</p>
                                    </div>`
        }
        DIV_COMMENT.innerHTML = comments    
    }).catch(error=> {
        DIV_COMMENT.innerHTML = `<div class="notification is-danger is-light">
                                        <p>Error al cargar las reseñas</p>
                                    </div>`
        console.log("Error al cargar los datos: ", error)
    })
}

searchById(SELECTED_MOVIE_ID)
getComments(SELECTED_MOVIE_ID)

//Crea un comentario
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
            alert('Su reseña se ha registrado.')
            /*Swal.fire({
                title: 'Éxito!',
                text: 'Su comentario ha quedado registrado.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })*/
        })
        .catch(
            error=>{
                /*Swal.fire({
                    title: 'Error!',
                    text: 'Su comentario no se ha guardado.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })*/
                alert('No se ha podido registrar su reseña')
                console.log('Detalle error: ', error)
            }
        );
    createRating(name, date)
}

//Crea una calificación
function createRating(name, date){
    const RATING_STAR = document.querySelector('input[name="rating"]:checked')
    console.log(RATING_STAR)
    if (RATING_STAR != null){
        fetch(`${RATINGS_URL}`,
        {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    //La key tiene que ser el nombre que le damos en fastapi
                    //El value el que le damos en js
                    id_pelicula: SELECTED_MOVIE_ID,
                    name: name,
                    calification: Number(RATING_STAR.value),
                    date: date
                }
            )
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`Error HTTP: ${response.status}`)
            }
            alert('Su calificación se ha registrado.')
        })
        .catch(
            error=>{
                alert('No se ha podido registrar la calificación')
                console.log('Detalle error: ', error)
            }
        );
    }   
}

const SEND_BUTTON = document.getElementById('send-button')
SEND_BUTTON.addEventListener('click', createComment)


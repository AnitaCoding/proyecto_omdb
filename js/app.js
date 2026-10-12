const apiKeyValue = '43dd9755'

const titleInput = document.getElementById('title-input')
const searchBtn = document.getElementById('search-button')
const moviesList = document.getElementById('movies-list')
const yearInput = document.getElementById('year-input')

function show_search_results(data){
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
    moviesList.innerHTML = cards;  
}

searchBtn.addEventListener('click', get_movies_by_search)

function get_movies_by_search(){
    const url = set_url()
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data['Response'] == 'False'){
            moviesList.innerHTML = `<div class="notification is-danger is-light">
                                        <p>Sin resultados. Prueba a buscar otro título.</p>
                                    </div>`
        }else{
            show_search_results(data)

        }  
    }).catch(error=> console.log("Error al cargar los datos: ", error))
}

//Una función que controle si hay año o no. Si hay año, que lo añada a la búsqueda. 
function set_url(){
    let searchUrl = ''
    if(yearInput.value.length == 0){
        searchUrl = `http://localhost:8000/movies/${titleInput.value}/${apiKeyValue}`

    }else{
        searchUrl = `http://localhost:8000/movies/${titleInput.value}/${yearInput.value}/?apiKey=43dd9755`
    }
    return searchUrl
}

function show_form(){
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

    const sendButton = document.getElementById('send-button')
    sendButton.addEventListener('click', createComment)
}

function show_movie(data){
    let card = '';
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
    //Insertar la categoría cargada dentro del grid
    moviesList.innerHTML = card;
    console.log(document.querySelector('div.cell').id)
    
}

function searchById(id){
    const url = `http://localhost:8000/movies/${id}?apiKey=${apiKeyValue}`;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        show_movie(data)
        show_form()
    }).catch(error=> console.log("Error al cargar los datos: ", error))
}

function get_movie_by_id(){
    const allMoviesCards = moviesList.querySelectorAll('div.box')
    for (let i = 0; i < allMoviesCards.length; i++){
        //acceso a recorrido del contenido de tabla por posición con función onclick
        //rows es una propiedad de la etiqueta table, que a su vez, tiene la propiedad onclick
        //onclick es un método que se puede asociar a cualquier elemento
        allMoviesCards[i].onclick = function(){
            let id = allMoviesCards[i].id;
            searchById(id)
            getComments(id)
        }
    }
}

moviesList.addEventListener('click', get_movie_by_id)

function getComments(imdb_id){
    //Seleccionamos el cuerpo de la tabla
    const divComment = document.getElementById('div-comment')
    //Petición http GET usando FetchAPI
    fetch(`http://localhost:8000/comments/${imdb_id}`)
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
        divComment.innerHTML = comments

         
    }).catch(error=> console.log("Error al cargar los datos: ", error))

}

function createComment(){
    //Capturar datos
    let imdb_id = document.querySelector('div.cell').id
    let name = document.getElementById('nombre').value
    let message = document.getElementById('message').value
    let date = new Date().toISOString().split('T')[0];

    fetch(`http://localhost:8000/comments`,
        {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    //La key tiene que ser el nombre que le damos en fastapi
                    //El value el que le damos en js
                    id_pelicula: imdb_id,
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
            alert('No se ha podido registrar el movimiento')
            console.log('Detalle error: ', error)
        }
    );
}
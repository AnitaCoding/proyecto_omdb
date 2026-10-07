const apiKeyValue = '43dd9755'

const titleInput = document.getElementById('title-input')
const searchBtn = document.getElementById('search-button')
const moviesGrid = document.getElementById('movies-grid')
const yearInput = document.getElementById('year-input')

function show_search_results(data){
    let cards = '';
    data['Search'].forEach(element => {
        //cards += `<button id=${element.imdbID}>${element.Title}</button>`
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
                                <button onclick="get_movie_by_id(${element.id})">ver más</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

    });
    //Insertar la categoría cargada dentro del selec
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
        searchUrl = `http://localhost:8000/movies/${titleInput.value}/${apiKeyValue}`

    }else{
        searchUrl = `http://localhost:8000/movies/${titleInput.value}/${yearInput.value}/?apiKey=43dd9755`
    }
    return searchUrl
}

function show_form(){
    let formElement = document.getElementById('opinion-form')
    let form =  `<div class="field">
                    <label class="label">Nombre</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nombre">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Mensaje</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Escribe tu opinión"></textarea>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-primary">Enviar</button>
                    </div>
                </div>`

    formElement.innerHTML = form
}

function show_movie(data){
    let card = '';
    card = `<div class="cell" id = ${data.imdbID}>
            <div class="card" >
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img
                        src="${data.Poster}"
                        alt="Placeholder image"
                    />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${data.Title}</p>
                            <p class="subtitle is-6">${data.Released}</p>
                        </div>
                    </div>
                </div>

                <div class="content">
                ${data.Plot}
                </div>
            </div>
        </div>`
    //Insertar la categoría cargada dentro del grid
    moviesGrid.innerHTML = card;  
    
}

function searchById(id){
    const url = `http://localhost:8000/movies/${id}?apiKey=${apiKeyValue}`;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data =>
        show_movie(data),
        show_form()
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
        }
    }
}

moviesGrid.addEventListener('click', get_movie_by_id)


/*        cards += `<div class="cell" id = ${element.imdbID}>
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
                                <button onclick="get_movie_by_id(${element.id})">ver más</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`*/
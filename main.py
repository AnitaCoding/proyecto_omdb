from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from consultas_api import *
from consultas_bd import *
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Permite cualquier origen (dominio)
    allow_credentials=False,  # ¡ATENCIÓN! Debe ser False si usas "" en origins, si usa usuario y contraseña, tendrá que ser true
    allow_methods=["*"],      # Permite todos los métodos HTTP (GET, POST, PUT, etc.)
    allow_headers=["*"],      # Permite todas las cabeceras HTTP
)

class ModelDB(BaseModel):
    id_pelicula: str
    name: str
    date: str

class ModelComments(ModelDB):
    comment: str

class ModelCalifications(ModelDB):
    calification: int
'''
class ModelComments(BaseModel):
    id_pelicula: str
    name: str
    comment: str
    date: str

class ModelCalifications(BaseModel):
    id_pelicula: str
    name: str
    calification: int
    date: str
'''
#Getters API


@app.get("/movies/{title}/{apiKey}", tags=['Movies'])
def index(title:str, apiKey:str):
    return get_movies(title, apiKey)
    
@app.get("/movies/{title}/{year}/", tags=['Movies'])
def select_movies_year(title:str, year:str, apiKey:str):
    return get_movies_by_year(title, year, apiKey)

@app.get("/movies/{imdb_id}", tags=['Movies'])
def select_movie_by_id(imdb_id: str, apiKey:str):
    return get_movie_by_id(imdb_id, apiKey)

#Getters BD

@app.get("/comments/{imdb_id}", tags=['Comments'])
def get_comments(imdb_id:str):
    return select_by_id(imdb_id)


#Setters BD comments

@app.post('/comments', tags=['Comments'])
def post_comment(body: ModelComments):
    try:
        insert_data([body.id_pelicula, body.name, body.comment, body.date],'comentarios_db.db', 'comentarios', 'comentario')
        return {'registro': 'correcto'}

    except Exception as ex:
        print(ex)
        return {'error': 'ha fallado el registro del comentario'}

#Get BD calificacion

@app.get('/califications/{id}', tags = ['Califications'])
def get_average_by_id(id: str):
    return get_average_calification(id)

#Set BD Calificacion

@app.post('/califications', tags=['Califications'])
def post_calification(body: ModelCalifications):
    try:
        insert_data([body.id_pelicula, body.name, body.calification, body.date],'calificacion_db.db', 'calificacion', 'calificacion')
        return {'registro': 'correcto'}

    except Exception as ex:
        print(ex)
        return {'error': 'ha fallado el registro de la calificación'}
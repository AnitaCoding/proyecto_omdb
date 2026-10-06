from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import requests as consulta


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Permite cualquier origen (dominio)
    allow_credentials=False,  # ¡ATENCIÓN! Debe ser False si usas "" en origins, si usa usuario y contraseña, tendrá que ser true
    allow_methods=["*"],      # Permite todos los métodos HTTP (GET, POST, PUT, etc.)
    allow_headers=["*"],      # Permite todas las cabeceras HTTP
)

#Getters API

def get_movies(title, apiKey):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

def get_movies_by_year(title, year, apiKey):
    movies = consulta.get(f"http://www.omdbapi.com/?s={title}&type=movie&y={year}&apikey={apiKey}")
    movies_list = movies.json()
    return movies_list

def get_movie_by_id(imdb_id, apiKey):
    movie = consulta.get(f"http://www.omdbapi.com/?i={imdb_id}&apikey={apiKey}")
    selected_movie = movie.json()
    return selected_movie

@app.get("/movies/{title}/{apikey}", tags=['Movies'])
def index(title:str, apiKey:str):
    return get_movies(title, apiKey)
    
@app.get("/movies/{title}/{year}/{apikey}", tags=['Movies'])
def select_movies_year(title:str, year:str, apiKey:str):
    return get_movies_by_year(title, year, apiKey)

@app.get("/movies/{imdb_id}", tags=['Movies'])
def select_movie_by_id(imdb_id: str, apiKey:str):
    return get_movie_by_id(imdb_id, apiKey)

#Getters BD

#Setters BD
from conexion import Conexion
import sqlite3

DB_COMENTARIOS = "comentarios_db.db"
DB_CALIFICACIONES = "calificacion_db.db"

def formato(response):
    result = []
    for elt in response.fetchall():
        result.append(dict(elt))
    return(result)

#Consultas a BD Comentarios

def select_by_id(id: str):
    #Usamos consulta parametrizada al buscar un string y no un integer
    conexion_select_by = Conexion(DB_COMENTARIOS, f'SELECT * FROM comentarios WHERE id_pelicula = ?', (id,))
    response = conexion_select_by.res
    result = formato(response)
    conexion_select_by.con.close()
    return result


def insert_data(data: list):
    try:
        conexion_insert = Conexion(DB_COMENTARIOS, 'INSERT INTO comentarios(id_pelicula, persona, comentario, fecha) VALUES (?,?,?,?);', data)          
        conexion_insert.res
        conexion_insert.con.commit()#para confirmar guardado
    except sqlite3.Error as error:
        print(error)
    conexion_insert.con.close()

#Consultas a BD Calificaciones

def get_average_calification(id: str):
    conexion_get_avg = Conexion(DB_CALIFICACIONES, 'SELECT SUM(calificacion) / COUNT(calificacion) FROM calificacion WHERE id_pelicula = ?', (id,))
    response = conexion_get_avg.res
    result = formato(response)
    conexion_get_avg.con.close()
    return result
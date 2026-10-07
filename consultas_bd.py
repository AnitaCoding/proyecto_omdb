from conexion_comentarios import Conexion
import sqlite3

def formato(response):
    result = []
    for elt in response.fetchall():
        result.append(dict(elt))
    return(result)

def select_by_id(id: str):
    #Usamos consulta parametrizada al buscar un string y no un integer
    conexion_select_by = Conexion(f'SELECT * FROM comentarios WHERE id_pelicula = ?', (id,))
    response = conexion_select_by.res
    result = formato(response)
    conexion_select_by.con.close()
    return result


def insert_data(data: list):
    try:
        conexion_insert = Conexion('INSERT INTO comentarios(id_pelicula, persona, comentario, fecha) VALUES (?,?,?,?);', data)          
        conexion_insert.res
        conexion_insert.con.commit()#para confirmar guardado
    except sqlite3.Error as error:
        print(error)
    conexion_insert.con.close()
import sqlite3

class Conexion:
    def __init__(self, db_name, sql_query, param = []):
        self.con = sqlite3.connect(db_name)
        self.con.row_factory = sqlite3.Row
        self.cur = self.con.cursor()
        self.res = self.cur.execute(sql_query, param)
        
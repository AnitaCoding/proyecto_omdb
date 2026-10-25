# Buscador de películas OMDb

Aplicación web para buscar películas mediante la API de OMDb, consultar su ficha y compartir reseñas y calificaciones. Se trata del proyecto final del Bootcamp Aprende a programar desde cero con Python de Keepcoding.

## Funcionalidades

- Buscar películas por título y, opcionalmente, por año.
- Ver detalles de una película, como sinopsis, reparto, dirección, géneros y premios.
- Consultar reseñas y la calificación media.
- Enviar una reseña y una calificación por estrellas.
- Volver a los resultados de búsqueda o a la página de inicio desde la ficha de una película.

## Tecnologías

- Frontend: HTML, CSS y JavaScript.
- Estilos: Bulma y CSS propio.
- Iconos: Font Awesome.
- Backend: Python, FastAPI y Uvicorn.
- Datos: SQLite.
- Información de películas: OMDb API.

## Arquitectura MVC

El proyecto toma MVC como referencia para separar la interfaz, la coordinación de las peticiones y el acceso a los datos. La separación es práctica, no estricta: algunas responsabilidades del frontend todavía conviven en los mismos archivos JavaScript.

- **Vista (View):** `index.html` y `movie_card.html` definen las páginas. Los archivos JavaScript de `static/js/` actualizan el DOM y muestran los resultados, los detalles, las reseñas y las calificaciones.
- **Controlador (Controller):** `controller.py` define los endpoints de FastAPI, recibe las peticiones y coordina las operaciones necesarias.
- **Modelo y acceso a datos (Model):** los modelos Pydantic de `controller.py` describen y validan los datos de reseñas y calificaciones. `consultas_api.py` obtiene datos de OMDb; `consultas_bd.py` consulta SQLite; y `conexion.py` gestiona la conexión con la base de datos.

## Principios de diseño de la interfaz

La interfaz toma como referencia principios de diseño centrado en las personas. Se indican ejemplos presentes en la aplicación; los principios también sirven como criterios para detectar posibles mejoras:

- **Metáforas:** los carteles y las fichas representan convenciones familiares del cine; las estrellas representan calificaciones.
- **Affordance:** campos, botones, tarjetas y estrellas sugieren las acciones disponibles mediante su forma y presentación.
- **Visibilidad:** las etiquetas nombran los campos; se indica que el título es obligatorio y el año opcional; la ficha muestra información y calificación, y las migas de pan ayudan a orientarse.
- **Restricciones:** la búsqueda requiere un título y el formulario comprueba que haya nombre y texto; el año y la calificación son opcionales.
- **Mapeo:** las cinco estrellas se corresponden con los cinco niveles posibles de calificación; las migas de pan enlazan con las páginas anteriores.
- **Retroalimentación:** se muestran avisos ante búsquedas vacías, ausencia de resultados y errores, además de confirmaciones al enviar reseñas o calificaciones.
- **Consistencia y estándares:** la interfaz reutiliza componentes de Bulma y patrones web conocidos, como botones, campos etiquetados y navegación mediante migas de pan.
- **Modelo conceptual:** el recorrido buscador → resultados → ficha permite entender cómo localizar una película y consultar o aportar información sobre ella.

## Heurísticas de usabilidad de Nielsen

Las diez heurísticas se consideran una guía para evaluar la usabilidad del proyecto, no una afirmación de que todas estén cubiertas por completo:

1. **Visibilidad del estado del sistema:** los avisos comunican resultados vacíos y errores; se puede mejorar indicando estados de carga mientras se esperan las peticiones.
2. **Correspondencia entre el sistema y el mundo real:** se emplean términos familiares como película, año, reseña y calificación, además de carteles y estrellas.
3. **Control y libertad del usuario:** las migas de pan permiten volver al buscador o a los resultados desde una ficha.
4. **Consistencia y estándares:** se reutilizan estilos y componentes de Bulma y convenciones habituales de formularios y navegación.
5. **Prevención de errores:** el título es obligatorio y se valida que el nombre y el texto de la reseña no estén vacíos antes de enviarlos.
6. **Reconocimiento antes que recuerdo:** las etiquetas visibles, los placeholders y las estrellas hacen reconocibles los datos y acciones sin tener que memorizarlos.
7. **Flexibilidad y eficiencia de uso:** se puede buscar solo por título o acotar por año; la URL conserva los criterios para volver a los resultados.
8. **Diseño estético y minimalista:** las páginas se centran en la búsqueda y en la información relevante de cada película, usando Bulma para mantener una presentación clara.
9. **Ayudar a reconocer, diagnosticar y recuperarse de errores:** los mensajes informan cuando no hay resultados o falla la carga o el envío; pueden ampliarse con indicaciones para resolver el problema.
10. **Ayuda y documentación:** este README explica cómo instalar, ejecutar y configurar la aplicación, así como sus endpoints principales.

## Estructura del proyecto

```text
omdb_api/
├── index.html                 # Buscador y resultados
├── movie_card.html            # Ficha de la película y formulario de reseña
├── main.py                    # Punto de entrada
├── controller.py              # Aplicación FastAPI y endpoints
├── consultas_api.py            # Consultas a OMDb
├── consultas_bd.py             # Consultas a las bases de datos SQLite
├── conexion.py                 # Conexión a SQLite
├── requirements.txt            # Dependencias de Python
├── comentarios_db.db           # Base de datos de reseñas
├── calificacion_db.db          # Base de datos de calificaciones
└── static/
    ├── js/
    │   ├── app.js              #Comportamiento de index.html
    │   └── movie_card.js       #Comportamiento de movie_card.html
    └── styles/
        ├── styles.css          #Estilos globales
        ├── search_results.css  #Estilos de resultados de búsqueda
        └── movie_card.css      #Estilos de movie-card
```

## Requisitos

- Python 3.13 (versión utilizada durante el desarrollo) y `pip`.
- Una clave de API de OMDb.
- Un navegador web.

## Configuración e instalación

Clona el repositorio y entra en la carpeta del proyecto:

```powershell
git clone https://github.com/AnitaCoding/proyecto_omdb.git
cd proyecto_omdb
```

Crea y activa un entorno virtual en PowerShell:

```powershell
python -m venv entorno
.\entorno\Scripts\Activate.ps1
```

Instala las dependencias:

```powershell
python -m pip install -r requirements.txt
```

Solicita una clave en [OMDb API](https://www.omdbapi.com/apikey.aspx) y crea en la raíz del proyecto un archivo local llamado `apikey.py`:

```python
APIKEY = "tu_clave_de_OMDb"
```

Este archivo está excluido del control de versiones.

## Ejecución local

Abre una terminal en la raíz del proyecto, activa el entorno virtual y arranca el backend:

```powershell
.\entorno\Scripts\Activate
fastapi dev main.py
```

El backend debe estar en ejecución para que estén disponibles todas las funcionalidades de la aplicación, como las búsquedas, la carga de fichas y la gestión de reseñas y calificaciones. La API estará disponible en `http://localhost:8000`. Puedes consultar y probar sus endpoints en `http://localhost:8000/docs`.

En una segunda terminal, desde la misma raíz del proyecto, sirve el frontend:

```powershell
py -m http.server 5500
```

Abre `http://localhost:5500` en el navegador. También puedes usar la extensión Live Server de Visual Studio Code. Recuerda ejecutarlo desde index.html

Ejecuta el backend desde la raíz del proyecto para que encuentre los módulos y los archivos SQLite mediante sus rutas relativas. Conserva los archivos `.db` si quieres mantener las reseñas y calificaciones locales.

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/movies/{title}` | Busca películas por título. |
| `GET` | `/movies/{title}/{year}/` | Busca películas por título y año. |
| `GET` | `/movies/id/{imdb_id}` | Obtiene la ficha de una película. |
| `GET` | `/comments/{imdb_id}` | Obtiene las reseñas de una película. |
| `POST` | `/comments` | Guarda una reseña. |
| `GET` | `/califications/{id}` | Obtiene la calificación media de una película. |
| `POST` | `/califications` | Guarda una calificación. |

Ejemplo del cuerpo JSON para crear una reseña:

```json
{
  "id_pelicula": "tt0133093",
  "name": "Ana",
  "comment": "Una película que recomiendo.",
  "date": "2026-10-23"
}
```

Ejemplo del cuerpo JSON para enviar una calificación:

```json
{
  "id_pelicula": "tt0133093",
  "name": "Ana",
  "calification": 5,
  "date": "2026-10-23"
}
```

## Despliegue

El frontend y la API pueden desplegarse por separado. Antes de publicar la aplicación, configura el frontend para que use la URL pública HTTPS del backend en lugar de `localhost`, configura CORS para permitir el dominio del frontend y proporciona la clave de OMDb mediante configuración privada del servicio. Las bases SQLite locales no se transfieren automáticamente al desplegar.

# 🎵 Tienda de Música — E-commerce con Django

Sistema web de comercio electrónico para la venta de música en formato **digital y físico**, desarrollado con **Django y PostgreSQL**.

---

## 🚀 Características principales

- Catálogo de productos (álbumes, singles, vinilos, etc.)
- Imágenes de portada para cada producto  
- Administración con Django Admin  
- Base de datos PostgreSQL  
- Frontend con React y Bootstrap
- Arquitectura MVC (MTV) de Django  
- Preparado para futura integración de carrito de compras y pagos

---

## 🛠️ Tecnologías utilizadas

- **Python 3.11+**
- **Django 4.x**
- **PostgreSQL**
- **Git & GitHub**
- **React & Bootstrap**
- (Opcional a futuro) HTML, CSS

---

## 📁 Estructura del proyecto (resumen)


E-comerce de venta de musica

MARTES 10 DE FEBRERO 2026

1.Se creo el proyecto con django usando el comnado:

"django-admin startproject tienda_musica"

con el sigueinte comando se inicia el server

"python manage.py runserver"


2.Despues se instalo el conector para poder usar postgres

pip install psycopg2-binary

En tienda_musica/settings.py configuro la base de datos

3. Hacer la migracion de la base de datos

python manage.py migrate (Explicar mejor)

4.Ahora con un comando de django se crea la app de la tienda

python manage.py startapp tienda

Despues de hacer este comnando se tiene que registrar en la confing de la app(tienda_musica_config/settings)

5.Ahora se crea el primer modelo (Producto) en tienda_app/models, aqui se va a crear una tabla llamada productos con sus atributos 

En este modulo se crea un atributo llamado imagen, para que este funcione se tiene que installar pillow (Explicar que es pillow), y en los setting al final hay que declarar donde se guardaran los archivos

MEDIA_URL = "/media/" "cómo acceder a ellos desde el navegador"
MEDIA_ROOT = os.path.join(BASE_DIR, "media") "dónde guardar archivos en tu computador"

Ahora hay que permitir que Django muestre imágenes en desarrollo

Para que este modelo se cree en la base de datos hay que correr los siguientes comandos:

python manage.py makemigrations
python manage.py migrate

6.Ahora se crea una pagina de inicio en tienda_app, para eso se crea un archivo llamado urls.py donde se crea la pagina de home. Y esta se tiene que declarar en el settings.py

7. Para finalizar el dia, se crea un archivo .gitignore para que cuando se haga el commit al main no tenga errores.


## Miercoles 11 de Febrero: estructura del frontend ## 

Se instala react para empezar el frontend, en este se instala bootstrap para que la pagina se vea bonita. Se crea una carpeta llamada **Components** donde se va a almzazenar todos los componentes reutilizables de la pagina, ahi se crea el **HomePage** de la tienda y se declara en **App.js** que es el archivo encargado de que se vean las cosas, como se muestra en el sigueinte grafico 

| Archivo / Carpeta | Qué es                  |
| ----------------- | ----------------------- |
| **index.js**      | Arranca React           |
| **App.js**        | Controla qué se muestra |
| **components/**   | Guarda piezas visuales  |
| **HomePage.js**   | Tu página de inicio     |





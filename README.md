# E-comerce musica
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

7.Para finalizar el dia de hoy se crea un archivo de .gitignore para que cuando se haga el push al main este no tenga errores







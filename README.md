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

Ahora vamos a conectar el frontend con el backend

|                                                             |
|React (frontend)   <--HTTP-->   Django (backend + PostgreSQL)|
|      3000                           8000                    |
|                                                             |

**Antes**: Django servía páginas por sí solo.

**Ahora**: Django = servidor de datos (API + PostgreSQL)

**React** = interfaz visual (cliente que pide datos)

Lo que se hizo con la instalacion de **djangorestframework** fue convertirlo en una API
declarandolo en **settings.py** como **restframework** 

👉 Django dejó de ser solo un “generador de páginas web” y pasó a ser un servidor de datos en formato JSON.

| Antes                    | Ahora                              |
| ------------------------ | ---------------------------------- |
| Django devolvía HTML     | Django devuelve **JSON (datos)**   |
|                          |                                    |
| Pensado para navegadores | Pensado para React, apps y móviles |

## Creamos un traductor de modelos → JSON (Serializer) ##

class ProductoSerializer(serializers.ModelSerializer):

Toma tu modelo de PostgreSQL y lo convierte en algo que React puede entender.

## React dejó de ser estático → pasó a ser dinámico ##

Antes tu HomePage solo mostraba texto fijo. Ahora React vaya a buscar datos a Django automáticamente cuando carga la página.

|useEffect(() => {                              |
|  fetch("http://127.0.0.1:8000/api/productos/")|
|    .then(response => response.json())         |   
|    .then(data => setProductos(data));         |
|}, []);                                        |

Esto significa:

“Cuando la página se abra, ve a Django y tráeme los productos”.

## Creamos un “estado” en React ## 

Con esto: **const [productos, setProductos] = useState([]);** 👉 “Guarda aquí los productos que vengan del backend”.

## Dibujamos tarjetas automáticamente ##

Este código: {productos.map(prod => (
  <div key={prod.id} className="col-md-4 mb-4">

Ahora la estructura quedo asi: 

PostgreSQL
     ↓
Django Models (Producto)
     ↓
Django REST API (/api/productos/)
     ↓
React (fetch)
     ↓
Pantalla con tarjetas Bootstrap

## Añadir css a la pagina ## 

Se creo en **components** el archivo **HomePage.css** donde se hizo mas bonita la pagina

Se arreglo el problema de que no se veian los productos

cuando de error de node-module se escribe la siguiente linea de comando para que se reinstale el archivo 

Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm start

## Jueves 12 de febrero: Corregir home page y agregar navbar ##

Se corrige con css las tarjetas de catalogo haciendolas vintage y con un boton de **ver detalle**

## Navbar ## 

Se crea un archivo nuevo en **components** llamado **navbar.js y navbar.css** donde se va a crear el header de la pagina y donde estarian todos los links y el logo de la pagina, ademas se hace responsive para que la gente que ve la pagina en celulares pueda verla sin problemas 

## Creacion de usuarios ## 

Se craa una nueva app en la raiz del programa llamada user con el siguiente comando 

-> python manage.py startapp users

Despues se declara la creacion de una nueva app en el setting.py

En la carpeta de user se crea el archivo de **serializers.py** donde.....y vamos a explicar el codigo linea por linea:

--> **from django.contrib.auth.models import User** --> Importa el modelo de usuario de django que ya viene preparado con usuario, email y contraseña encriptada 

--> **from rest_framework import serializers** --> Se importan los serializer que son el puente entre tu frontend y tu base de datos
                
                  |  Convertir datos JSON a Python   |
                  |         Validar datos            |
                  |  Convertir objetos Python A Json |

--> **class RegisterSerializer(serializers.ModelSerializer)** --> Estamos creando un serializer basado en un modelo. Es como decir: "Hazme un formulario basado en el modelo User"

--> **class Meta:**
    **model = User**
    **fields = ['username', 'email', 'password']** --> Usa el modelo User y Solo incluye estos campos

--> **extra_kwargs =**
    **'password': {'write_only': True}** --> El campo password se puede enviar (POST) Pero nunca se devuelve en la respuesta JSON

--> **def create(self, validated_data):**
    **user = User.objects.create_user(**validated_data)
    **return user** --> El serializer valida los datos. Si todo está bien, llama a create(). Aquí es donde realmente se guarda el usuario.


                    from django.contrib.auth.models import User
                    from rest_framework import serializers

                    class RegisterSerializer(serializers.ModelSerializer):
                    class Meta:
                         model = User
                         fields = ['username', 'email', 'password']
                         extra_kwargs = {
                              'password': {'write_only': True}
                         }

                    def create(self, validated_data):
                         user = User.objects.create_user(**validated_data)
                         return user








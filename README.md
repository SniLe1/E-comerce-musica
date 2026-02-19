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

## CODIGO EN VIEWS.PY ##

                    class RegisterView(generics.CreateAPIView):
                         queryset = User.objects.all()
                    serializer_class = RegisterSerializer

--> **¿Qué es generics.CreateAPIView?*

Es una vista genérica que ya viene programada para:

             °  Aceptar requests POST

             ° Validar datos con un serializer

             °  Crear un objeto en la base de datos

             ° Devolver una respuesta JSON

--> **queryset = User.objects.all()**

     “Voy a trabajar con el modelo User”

--> **serializer_class = RegisterSerializer**

     “Cuando recibas datos, usa este serializer para validarlos y guardarlos.”

## Viernes 13 de febrero: arreglar el navbar ##

Se corrige error del navbar que aparecen como si fueran links

## Sabado 14 de febrero: Mejorar el registro de usuario y el login ##

Se añade css a la pagina del registro de usuario.

Se crea una validacion de contraseña que obliga al usuario a ponerle seguridad a la contraseña. Esta se crea en el serializer con el siguiente condigo:

--> **Validacion de contraseña** 

     def validate_password(self, value):
          if len(value) < 8:
               raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres.")
          if not re.search(r'[A-Z]', value):
               raise serializers.ValidationError("Debe contener al menos una mayúscula.")
          if not re.search(r'[0-9]', value):
               raise serializers.ValidationError("Debe contener al menos un número.")
          if not re.search(r'[!@#$%^&*(),.?":{}|<>_-]', value):
               raise serializers.ValidationError("Debe contener al menos un símbolo.")
          return value

Aqui se hace un **if** con cada una de las validaciones que debe tener la contraseña 

-->**Setting.py**

En esta carpeta tambien se tiene que hacer un cabmio, en el codigo de **AUTH_PASSWORD_VALIDATORS**
se tiene que añadir en **django.contrib.auth.password_validation.MinimumLengthValidato** el largo minimo de la contraseña: **min_length': 8**

-->**Register.js**

Ahora para que el mensaje se muestre se tiene que ajustar un poco el **register.js** con el siguiente codigo: 

-->**Extraccionde mensaje del backend**


  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(null);

         if (response.ok) {
      setNotification({
        type: "success",
        text: "Usuario creado correctamente 🎉"
      });

      setUsername("");
      setEmail("");
      setPassword("");

    } else {

      // 👇 Extraer mensaje real del backend
      const firstKey = Object.keys(data)[0];
      const backendMessage = data[firstKey][0];

      setNotification({
        type: "validation",
        text: backendMessage
      });
    }


    // Ocultar después de 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);

  } catch (error) {
    setNotification({ type: "connection", text: "Error de conexión con el servidor ❌" });

Aqui se crean dos constantes, una para la **notificacion** y otra para el **mensaje**:

     const [message, setMessage] = useState("");
     const [notification, setNotification] = useState(null);

Despues se hacen **if else** para determinar que mensaje sale en cada caso. Si el usuario registra conrrectamente su usuario, sale el mensaje correcto, Si no este se dirije al else donde sale una de los 4 distintos mensajes de error. Si el servidor esta caido sale un mensaje de error de servidor

Ademas se agrego una animacion con css para corroborar que el usuario a sido creado

Cuando un usuario es creado, a este se le genera un token, que es el que lo identifica pero no es unico y se va actualizando cada vez que inicia sesion como lo muestra los sigueintes **end point**

-->**Obteiene el token**   path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
-->**Actualiza el token**    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

Para esto se esta usando una app llamada **rest_framework_simplejwt'** que genera estos tokens

## Obtener el token ## 

Para obtener el token hay que crea un serializer que lo obtenga, el sigueiente codigo:

     class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
     @classmethod
     def get_token(cls, user):
          token = super().get_token(user)
          token['username'] = user.username
          return token

Al obtener el token es que podemos identificar al usuario y despues mostralo. 


## Creacion del Login ##

Se creo en **Pages** un nuevo archivo llamado **login.js** y **login.css**, usando el mismo css de **register.css**, En este login se usa la misma formula de mensajes de inicio de sesion exitoso y error en la contraseña. ademas cuando un usuario se loguea, la pagina lo redirige al home donde hay un mensaje en el navbar de bienvenido con sun nombre de usuario. Para lograr lo anterior se usa el siguiente codigo:

     <li><Link to="/register">Registro</Link></li>
          {!username ? (
              <li >
                <Link to="/login">
                  Iniciar sesión
                </Link>
              </li>
            ) : (
              <>
                <li >
                  <span >
                    ¡Hola, {username}! 👋
                  </span>
                </li>

                <li >
                  <button  onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}     

Asi podemos mostrar el usuario logueado en la pagina. Ademas se corrigieron errores de padding del navbar


## Domingo 15 de febrero, confirmacion de correo ##

Para hacer una confirmacion de correo de usuario, primero tenemso que cuando se cree un usuario este no este activado, para eso cambiarmos el serializer del user por esto

     def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        user.is_active = False
        user.save()
        
        return user

--> **user.is_active = False** Esta linea de codigo hace que el usuario creado este en estado de inactivo 

Ahora hay que generar un link unico, y que este se envie por correo al usuario para que active su cuenta. Esto lo haremos modificando el archivo de **views.py**

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        activation_link = f"http://localhost:8000/api/users/activate/{uid}/{token}/"

        print("LINK DE ACTIVACIÓN:")
        print(activation_link)

-->Aqui lo que estamos haciendo es crear el usuario, crear un **ID codificado**, generar un **Token seugro**, despues construir un link unico y para asegurarse que funcione imprimirlo en consola 

Con el siguiente codigo vamos a poder ver si el usuario entro al link para poder confirmar su cuenta: 

User = get_user_model()

def activate_account(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except:
        return HttpResponse("Link inválido ❌")

    if default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse("Cuenta activada correctamente 🎉")
    else:
        return HttpResponse("Token inválido o expirado ❌")

Ahora lo que vamos a hacer es enviar un email real al usuario para que acceda al link con el token y se genere un mesnaje en el registro que diga que se envio un correo

## Catalogo de productos ##

Para esta pagina se crea un nuevo archivo en **pages** llamado **Products.js** para la pagina y **Products.css** para el diseño 

En esta pagina se ve la cantidad de productos que tenemos para los usuarios, y cada vez que se añaden mas a la base de datos, estos aparecen en la pagina de productos

## Miercoles 18 de febrero ## 

Se modifico el modelo de productos, cambiando el atributo de formato volviendolo un choiceopciton, para que el administrador no tenga que escribir cada vez el formato del producto, se hizo con el siguiente codigo:

     formato = models.CharField(
        max_length=10,
        choices=FORMATO_CHOICES
    )

     FORMATO_CHOICES = [
        ('vinilo', 'Vinilo'),
        ('cd', 'CD'),
        ('digital', 'Digital'),
    ]

Ademas se agrego un nuevo atributo llamado slug que se encarga de crear el nombre del producto pero con **-**, para asi hacer mas facil un link personalizado con para cada producto: 

     slug = models.SlugField(unique=True, blank=True, null=True)

Este se genera automaticamente con esta funcion:

     def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.titulo)
            slug = base_slug
            counter = 1
            while Producto.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

## Migracion API_VIEW ##

Primero se empezo con este codigo el cual no era eficiente para el trabajo que estoy realizando: 

     @api_view(['GET'])
     def lista_productos(request):

Eso es una Function Based View. 

    |  Funciona bien para:  |      Pero necesito   |
    |                       |                      |
    |   APIs pequeñas       |         Filtro       |
    |   Solo GET            |        Busqueda      |
    |   Cosas simples       |          Slug        |
    |                       |        Carrito       |
    |                       |         Ordenes      |

Se hizo la migracion porque: 

| Antes               | Ahora         |
| ------------------- | ------------- |
| Solo GET            | CRUD completo |
| Manual              | Automático    |
| Poco escalable      | Escalable     |
| Más código repetido | Más limpio    |

Con **ModelViewSet** obtienes gratis:

               list()
               retrieve()
               create()
               update()
               destroy()

🔥 Error #1 — Router duplicó la URL

     {
  "productos": "http://localhost:8000/api/productos/productos/"
     }

--> Eso pasó porque el router y tu urls.py estaban creando una ruta duplicada. Solucion:

Dejamos el **urls.py** principal así:

     path('api/', include('tienda_app.urls')),

Y el **router** asi: 

     path('api/', include('tienda_app.urls')),

🔥 Error #2 — basename y queryset

Django lanzó: AssertionError: basename argument not specified

El router necesita saber qué modelo está usando para generar rutas automáticamente.

Solucion --> queryset = Producto.objects.all()

🔥Error #3 — React .map is not a function

Solucion: Proteger el **fetch**

          if (Array.isArray(data)) {
          setProductos(data);
          } else if (data.results) {
          setProductos(data.results);
          }


🔥 Error #4 — Las imágenes no cargaban

El backend estaba devolviendo: http://localhost:8000/media/imagen.jpg
Y yo estaba haciendo: src={`http://localhost:8000${producto.imagen}`}

Entonces hacia: http://localhost:8000http://localhost:8000/media/...

-->Solucion: src={producto.imagen}

## Filtros ## 

Se agrego un filtro por busqueda y por formato a la izquierda de la pagina.
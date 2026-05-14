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
- **Js y CSS**
- **Node.js**

---


## 🛠️ Instalaciones

- **python -m pip install django-cors-headers**
- **pip install djangorestframework**
- **pip install djangorestframework-simplejwt**
- **pip install psycopg2**
- **python -m pip install Pillow**
- **pip install python-dotenv**

---

## 🔐 Variables de entorno (seguridad)

Este proyecto usa `python-dotenv` para manejar credenciales sensibles.

1. **Crear archivo `.env`** dentro de `tienda_musica/`:
   ```
   tienda_musica/
   └── .env
   ```

2. **Agregar las siguientes variables**:
   ```env
   DJANGO_SECRET_KEY=<tu-clave-secreta>
   DB_PASSWORD=<tu-contraseña-postgresql>
   EMAIL_HOST_PASSWORD=<tu-contraseña-gmail>
   ```

3. **Nunca subir `.env` al repositorio** (ya está en `.gitignore`)

> 💡 Existe un archivo `.env.example` en `tienda_musica/` como plantilla. Cópialo a `.env` y rellena los valores reales.

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
Remove-Item pnpm-lock.yaml
corepack pnpm install
corepack pnpm start

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

## Jueves 19 de febrero ## 

Se agrego el footer de la tienda y un carrusel de imagenes en el homepage

## Sabado 21 de Febrero ##

Se ajusto el carrusel de imagenes para que sea un slide hacia la izquierda. Se hizo con este codigo: 

useEffect(() => {
     const carouselElement = document.querySelector('#heroCarousel');
     if (!carouselElement) return;

     const carousel = new Carousel(carouselElement, {
     interval: false, // Desactivar auto-slide
     wrap: true
     });

     // Siempre ir hacia la derecha (prev)
     const intervalId = setInterval(() => {
     carousel.next();
     }, 5000);

     return () => {
     clearInterval(intervalId);
     carousel.dispose();
     };
}, []);

## Lunes 23 de febrero ## 

Se creo la pagina de cada producto, creando un archivo en pages llamado **ProcutDetail.js** y **PorductDetail.css** y para que en el link se viera el slug se uso el siguiente codigo: 

function ProductDetail() {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/productos/${slug}/`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!producto) return <p className="text-center mt-5">Cargando producto...</p>

Se añadio css a la pagina de detalle.

## Martes 24 de febrero ## 

Se configuro la pagina de catalogo para que esos productos tambien vayan a su detalle

Se corrigio el error en el carrusel en el modo responsive que no sea veian bien las imagenes y el texto no estaba dentro

## Miercoles 25 de febrero ##

Se implementa el carrito de compra manejandolo desde el backend porque: 

     Permite persistencia real: el carrito se guarda en la base de datos y no se pierde al recargar o cambiar de dispositivo.

     Se integra con usuarios registrados: cada usuario puede tener su carrito asociado.

     Facilita la transición a checkout con Webpay u otro sistema de pago, porque el backend controla el flujo y la seguridad.

     Evita inconsistencias entre frontend y backend (ejemplo: stock, precios actualizados).

--> Se crearon dos modelos nuevos uno llamado **cart** donde se manejara todo lo que es el carrito de compra y el otro llamado **order** que mas adelante se usara para manejar las ordenes de los usuarios

## model, serializer, view y urls ##

se creo el modelo de carrito de compra que es el siguiente: 

class CarritoItem(models.Model):
    carrito = models.ForeignKey(
        Carrito,
        related_name="items",
        on_delete=models.CASCADE
    )
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def subtotal(self):
        return self.producto.precio * self.cantidad

    def __str__(self):
        return f"{self.cantidad} x {self.producto.titulo}"

--> Se creo el serializer: 

## Domingo 01 de Marzo ##

Se creo la pagina de carrito de compra, donde se veran todos los productos

Para que esta funcione se creo un **axiosConfig.js** en **src** apuntando al backend. En este se configuro un receptor de request  --> Antes de que cada peticion salga revisa si en el **localstorage** existe un **accestoken**. Si este existe se exporta esa instancia como **api**

Por qué es importante:

--> Así no tienes que repetir headers en cada función.

-->Garantiza que todas las llamadas al backend se hagan con el token JWT correcto.

-->El backend recibe el token, valida al usuario y permite acceder a endpoints protegidos (como el carrito).

Se creo el **CartContext.js** aqui se guardo el estado del carrito (Items y total) y se definieron las funciones que tendra 

--> **fetchCart**: obtiene el carrito actual del usuario.

--> **addToCart**: agrega un producto al carrito.

--> **removeFromCart**: elimina un producto del carrito.

--> **updateQuantity**: actualiza la cantidad de un producto en el carrito.

Cada función usa api.get o api.post. Como api ya tiene el interceptor, el token se envía automáticamente.

## Lunes 2 de Marzo ##

-->**Refresh del token**

1. Cuando el usuario inicia sesion, el backend le entrega un **acces token**, este token tiene una fecha de expiracion 
2. Si el token expira, el backend yo no lo acepta 
3. Para que el usuario no tenga que iniciar sesion otra vez se usa **refresh token**
4. Dura mas tiempo y pide un token nuevo automaticamente

--> El sigueinte codigo lo explica

//Interceptor de respuestas: intenta reshelear el token si es necesario
api.interceptors.response.use(
    (response) => response,
    async (error) => {  
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:8000/api/token/refresh/', 
                    { refresh: refreshToken });
                const newAccessToken = response.data.access;
                localStorage.setItem('accessToken', newAccessToken);

                // Actualiza el token en el header de la solicitud original
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error al refrescar el token:', refreshError);
                // Si el refresh falla, limpia los tokens y redirige al login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Redirige al login
            }
        }
        return Promise.reject(error);
    }
);

--> **Explicaion**

1. Si una peticion devuelve **401 Unauthorized**, el interceptor intenta usar el **refreshToken** para pedir un nuevo **accesToken**
2. Si lo consigue, guarda el nuevo token en local storage
3. Si falla, significa que el refresh tambien expiro --> El usuario debe volver a iniciar sesion

--> **Error de imagen en carrito de compra**

Se arreglo un erro que no aparecia la imagen del producto en el carrito de compra. Se arreglo agregando estos codigos: 

--> **cart/serializer.py**


class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(use_url=True) <-- **Se agrego esta linea**
    
    class Meta:
        model = Producto
        fields = ['id', 'titulo', 'artista', 'formato', 'precio', 'imagen', 'slug']

1. Lo que se hizo fue agregar en la clase de productos que imagen usara la url base

--> **cart/vews.py**

class CarritoViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        carrito, created = Carrito.objects.get_or_create(usuario=request.user)
        serializer = CarritoSerializer(carrito, context={'request': request})  <-- Se agrego esto
        return Response(serializer.data)

1. Se agrego que el serializer usara context de request

--> **Añadir y quitar productos**

Se arreglo la funcion para aumentar o disminuir la cantidad de productos en el carrito de compra con el siguiente codigo:

--> **CartContext**

const updateQuantity = async (productoId, cantidad) => {
     try {
          const res = await api.post('/api/cart/carrito/update_quantity/', {
          producto_id: productoId,
          cantidad,
     });
     setCart(res.data);
     } catch (error) {
          console.error('Error al actualizar cantidad:', error);
     }
};   

-->**Diagrama de flujo del carrito9**

          Usuario en CartPage
               │
               ▼
          Hace clic en botón (+ / - / Eliminar)
               │
               ▼
          CartContext llama a función correspondiente:
          - addToCart(productoId, cantidad)
          - updateQuantity(productoId, cantidad)
          - removeFromCart(productoId)
               │
               ▼
          Axios envía request al backend con token:
          - POST /api/cart/carrito/add/
          - POST /api/cart/carrito/update_quantity/
          - POST /api/cart/carrito/remove/
               │
               ▼
          CarritoViewSet recibe la petición:
          - add → busca producto y crea/actualiza CarritoItem
          - update_quantity → ajusta cantidad o elimina si es 0
          - remove → elimina CarritoItem
               │
               ▼
          CarritoSerializer serializa el carrito actualizado
               │
               ▼
          Backend responde con JSON del carrito
               │
               ▼
          CartContext actualiza estado `cart` con setCart()
               │
               ▼
          CartPage re-renderiza:
          - Muestra nueva cantidad
          - Muestra subtotal actualizado
          - Muestra total actualizado


## Martes 03 de Marzo ##

--> Cambio en la pagian de carrito de compra 

1. Concepto:

En vez de tener una ruta /cart con su propia página, el carrito será un componente global.

Se renderiza como un overlay lateral (un panel que aparece desde la derecha).

Se controla con un estado global (ej. en el CartContext) que indica si el carrito está abierto o cerrado.

El ícono del carrito en el navbar dispara ese estado.

-->**Nuevo Sidebar**

Para esto se eiliminaron los archivos de **cart.js** y **cart.css**, los cuales eran la pagina de carrito de compras, para asi hacer un componente nuevo llamado **CartSidebar.js y .css**. El cual es igual a la pagina de carrito pero esta vez se abre desde el navbar, en el icono de carrito y se abre desde la derecha de la pantall.

-->**Bug de imagenes**

Se arreglo el bug de que cuando se agregaba un producto al carrito, este no mostraba las imagenes de los productos ingresado, y se tenia que actualizar la pagina para que se mostraran de nuevo. Para esto se uso el sigueinte codigo:

-->**CartContex.js**

    const addToCart = async (productoId, cantidad = 1) => {
        try {
            await api.post('/api/cart/carrito/add/', {
            producto_id: productoId,
            cantidad,
        });
        await fetchCart(); // 👈 vuelve a traer el carrito completo con imágenes
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };

Se cambio el **setCart(res.data)** por **await fetchCart();** para que asi se llame a la funcion de fetch y traiga de nuevo las imagenes de los productos.

## Miercoles 04 de Marzo ##

--> Notificaion cuando se agrega un prodcuto

Para hacer esto se crearon dos archivos nuevos **Toast.js y css** El cual se encargara de crear una notificacion en la esquina inferior derecha de que se agrego un producto. Se hizo usando este codigo: 

--> **Toast.js**

          function Toast({ message, show }) {
          return (
          <div className={`toast ${show ? "show" : ""}`}>
               <span className="toast-icon">🛒</span>
               {message}
          </div>
          );
          }

-->**App.js**

     {/* 👇 aquí va el toast */}
          <Toast message="Producto añadido al carrito" show={toastVisible} />

--> Al agregar producto al carrito, este se abre automaticamente y aparece el producto con una animacion

Para esto se hicieron modificaciones en diferentes archivos. Aqui esta el codigo:

-->1- **App.js**

Agregamos un estado de **isCartOpen** y lo pasamos al **CartSidebar**

               <Route 
                  path="/products/:slug" 
                  element={<ProductDetail onOpenCart={() => setIsCartOpen(true)}
                  onShowToast={showToast}
                />} 

               <CartSidebar
                 isOpen={isCartOpen}
                 onClose={() => setIsCartOpen(false)}
               />

--> 2 **ProductDetail.js** --> Abrir el carro al agregar

Usa la prop onOpenCart que recibes desde App.js:

     const handleAddToCart = async () => {
          if (producto) {
               await addToCart(producto.id, 1) // Agrega el producto al carrito con cantidad 1
               onOpenCart();
               onShowToast();
          }
     };

--> **Animacion de eliminar un prodcuto**

Se añadio una anumacion de elimacion de prodcuto que va hacia la derecha 


--> Se actualizo el diseño del navbar

Se modifico el navbar para que el logo este al centro y los links a su alrededor, ademas se arreglo el modo responsive del navbar.

--> **Responsive catalogo**

Se arreglo el modo responsive del catalogo de producos cambiando el filtro haciendolo como un menu desplegable.

## Jueves 05 de Marzo ##

-->**ProductoClick**

Se va a crear una nueva classe en la app de prodcuto para poder llevar la cuenta de cuantos clicks resive cada prodcuto, clicks por usuario y tendecias en el tiempo, para asi hacer analisis avanzado. para eso se usara el siguiente codigo:


class ProductClick(models.Model):
     producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
     usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
     fecha = models.DateTimeField(auto_now_add=True)
     ip = models.GenericIPAddressField(null=True, blank=True)


-->**Views.py**

    @action(detail=True, methods=['post'])
    def click(self, request, pk=None):
        producto = self.get_object()
        ProductoClick.objects.create(
            producto=producto,
            usuario=request.user if request.user.is_authenticated else None,
            ip=request.META.get('REMOTE_ADDR')
        )
        return Response({"status": "ok"})


## Viernes 06 de Marzo ##

--> **Navbar admin**

Se creo en el navbar una funcion para que cuando el usuario del admin se logee, el icono del carrito de compra se cambie por un engranaje que redirijira a la pagina del administrador, donde estara un **CRUD**. Para eso se utilizo el siguiente codigo:

-->**Login.js** Aqui se hizo la diferenciasion de usuarios, si es admin o no

        // 👑 Decodificar token y guardar si es admin
        const decoded = jwtDecode(data.access);
        localStorage.setItem("isAdmin", decoded.is_staff); 

-->**Navbar.js** Aqui se modifico el handlelogout para que cuando el usuario cierre su sesion, la pagina se actualize 

          const handleLogout = () => {
               localStorage.removeItem("accessToken");
               localStorage.removeItem("refreshToken");
               localStorage.removeItem("isAdmin"); // 👈 importante
               setUsername(null);
               setIsAdmin(false)
               navigate("/");
               window.location.reload();
          };

--> Aqui se creo el codigo del icono dinamico

            {isAdmin ? (
              <div className="admin-icon">
                <Link to="/admin" className="admin-link">
                  <span className="admin-symbol">⚙️</span>
                </Link>
              </div>
            ) : (

--> **Pagina del admin**

Se creo la pagina del admin, y para hacerla que solo el admin pueda ingresa a ella se crearon validaciones en **app.js**

     // 👇 Aquí defines el wrapper de ruta privada
     function PrivateAdminRoute({ children }) {
     const isAdmin = localStorage.getItem("isAdmin") === "true";
     return isAdmin ? children : <HomePage />;
}

            <Route
              path="/admin"
              element={
                <PrivateAdminRoute>
                  <AdminPage />
                </PrivateAdminRoute>
              }
            />

--> **Estructura del crud**

     React (Admin Panel)
          ↓
     API Django REST
          ↓
     Base de datos


     home_crud/
 ├── models.py
 ├── serializers.py
 ├── views.py
 ├── urls.py

 --> **View.py**

     | Endpoint                      | Acción         |
     | ----------------------------- | -------------- |
     | GET `/api/home/`              | obtener config |
     | PUT `/api/home/`              | actualizar     |
     | GET `/api/home/images/`       | ver carrusel   |
     | POST `/api/home/images/`      | subir imagen   |
     | DELETE `/api/home/images/:id` | borrar         |




## Lunes 25 de Marzo ##

Se hizo la pagina del crud para editar prodcutos y se arreglo el bug del modal que no aparecia

-->**Bug modal**

Este bug consistia de que tenia un **form estilo modal** para editar el prodcuto, pero este no aparecia pero si cargaban los datos, yo tenia el css del modal asi:

                    <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>


 Pero no se veia nada dentro de la **clase modal**, pero si dento de la clase **modal overlay**

 Para corregir este error se tubo que cambiar el nombre de la clase a **pico** para que funcionara

 La clase modal aparentemente tiene atributos propios que no dejaban que se mostrara en el form                    

 ## Miercoles 25 de Marzo ## 

 -->**Error al editar producto**

 Se corrigio el error al no poder editar productos, se cambio el metodo de **POST** a **PATCH**


         const res = await fetch(
            `http://localhost:8000/api/tienda/productos/${editingProduct.id}/`,
            {
            method: "PATCH", <-- Metodo que se cambio
            body: formData
            }
        );

-->**Notificacion en admin productos**

Se añadio un toast de notificacion para cuando se añada o edite un producto exitosamente o fallidamente

    const [notification, setNotification] = useState(null);

    let timeout1;
    let timeout2;

    const showNotification = (message, type = "success") => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);

        setNotification({ message, type, visible: true });

        timeout1 = setTimeout(() => {
            setNotification({ message, type, visible: false });
        }, 2500);

        timeout2 = setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

-->**Notificacion en admin home**

Se añadieron las mismas notificaicones al admin de home


## Jueves 26 de Marzo ## 


-->**Correccion al editar producto(Slug)**

Cuando se editaba el titulo del producto, el slug que se genera no se edita tambien, para corregir esto se hizo el siguiente codigo en **serializer.py**

     def update(self, instance, validated_data):
        instance.titulo = validated_data.get('titulo', instance.titulo)
        
        #Actualiza slug si el título ha cambiado
        instance.slug = slugify(instance.titulo)
        
        instance.artista = validated_data.get("artista", instance.artista)
        instance.descripcion = validated_data.get("descripcion", instance.descripcion)
        instance.formato = validated_data.get("formato", instance.formato)
        instance.precio = validated_data.get("precio", instance.precio)
        instance.stock = validated_data.get("stock", instance.stock)
        
        instance.save()
        return instance

Al usar **method: "PATCH"** django hacia esto automaticamente: 

     def update(self, instance, validated_data):
          # actualiza SOLO lo que viene en la request

Esto cambiaba el titulo pero no el slug, ya que django no sabe que cuando se edita el titulo tambien el slug. Al agregar **instance.slug = slugify(instance.titulo)**
le estamos diciendo a django "Cada vez que actualices el tutlo, actualiza tambien el slug".


## Martes 14 de Abril ## 

Se hizo la pagina de **Nosotros** y la de **Contactos**

En la pagian de contactos se realizo una funcion para enviar preguntas al correo de la empresa, para eso se realizo el siguuiente codigo:


-->**Modelo**

     class Contacto(models.Model):
          nombre = models.CharField(max_length=100)
          email = models.EmailField()
          mensaje = models.TextField()

          leido = models.BooleanField(default=False)
          respondido = models.BooleanField(default=False)

          creado_en = models.DateTimeField(auto_now_add=True)

-->**POST**

     @api_view(["POST"])
          def enviar_contacto(request):
          nombre = request.data.get("nombre")
          email = request.data.get("email")
          mensaje = request.data.get("mensaje")

          if not nombre or not email or not mensaje:
               return Response({"error": "Faltan datos"}, status=400)

          # 🔥 Guardar en DB
          Contacto.objects.create(
               nombre=nombre,
               email=email,
               mensaje=mensaje
          )

          # 📩 Enviar correo
          send_mail(
               subject=f"Nuevo mensaje de {nombre}",
               message=mensaje,
               from_email=email,
               recipient_list=["gonzaandres1251@gmail.com"],
          )

          return Response({"success": "Mensaje enviado"})

Para la siguiente version se va mejorar como se ve el mensaje en el correo y en el admin se podran ver los mensajes de los usuarios y responderlos.


## Viernes 17 de Abril ## 

Se creo la pagina de **AdminContact** donde se podra revisar los mensajes de los usuarios y responderlos, ademas de creear una carpeta de admin donde se dejaran todas las paginas de administrador para hacerlo todo mas ordenado.

## Miércoles 6 de Mayo ##

### 🔐 Variables de entorno (.env)
Se eliminaron las credenciales hardcoded de `settings.py` (SECRET_KEY, DB_PASSWORD, EMAIL_HOST_PASSWORD) y se migraron a variables de entorno usando `python-dotenv`.
- Se creó el archivo `.env` con las credenciales reales (ignorado por git).
- Se creó `.env.example` como plantilla para otros desarrolladores.
- Se añadió `.gitignore` en `tienda_musica/` para asegurar que `.env` nunca se commitee.

### 🎨 Rediseño de tarjetas de mensajes (AdminContact)
Se mejoró la interfaz de mensajes de contacto con un estilo tipo bandeja de entrada moderna:
- Avatar circular con la inicial del nombre del remitente.
- Vista previa del mensaje truncada a 2 líneas.
- Fecha de envío en formato localizado.
- Indicador visual para mensajes no leídos (borde verde + punto luminoso).
- Badges elegantes para "Nuevo" y "Respondido".
- Modal rediseñado con animaciones, blur de fondo y botón de cerrar estilizado.
- Corrección de conflictos con clases CSS de Bootstrap (`.btn-close`).

### 📧 Respuesta a mensajes desde el panel admin
Se habilitó la funcionalidad de responder mensajes directamente desde el modal de AdminContact:
- **Backend**: Corregido el endpoint `responder_contacto` (faltaba el decorador `@api_view`), ahora envía emails con formato HTML profesional al cliente.
- **Frontend**: Añadido un **textarea** en el modal para escribir la respuesta. Al enviar, hace POST a `/api/contacto/responder/<id>/`, marca el mensaje como respondido y cierra el modal.
- **UX**: Si el mensaje ya fue respondido, el textarea se oculta y se muestra "Ya respondido". El botón cambia a "Enviando..." mientras se procesa.
- **Validación**: No permite enviar respuestas vacías y maneja errores con notificaciones toast.

## Jueves 14 de Mayo ##

### 🗑️ Eliminación de mensajes desde el modal
Se añadió un botón **"Eliminar"** (rojo) en el modal de cada mensaje que permite borrar mensajes de contacto permanentemente:
- **Backend**: usa el método `DELETE` del `ModelViewSet` ya existente en `/api/contacto/<id>/`
- **Frontend**: pide confirmación con `window.confirm()` antes de borrar, remueve el mensaje del estado y cierra el modal automáticamente.
- **UX**: notificación toast de éxito o error, botón con estilo rojo transparente que oscurece al hover.

### 🔍 Filtros en AdminContact
Se añadió una barra de filtros sobre la bandeja de entrada de mensajes:
- **Orden**: botones "Más recientes" (por defecto) y "Más antiguos" que ordenan por fecha sin recargar.
- **Fecha específica**: input `date` que filtra mensajes de un día concreto; incluye botón "×" para limpiar el filtro.
- **Todo client-side**: usa `useMemo` para filtrar/ordenar sobre los datos ya cargados, sin llamadas extra al backend.

### 🎨 Mejora visual de AdminHomePage
Se rediseñó el editor del Home para que coincida visualmente con el estilo de AdminContact:
- **Movido** de `pages/AdminHomePage.js` a `admin/AdminHomePage.js` para unificar todas las páginas de administración.
- **CSS reescrito** con el mismo lenguaje visual: inputs con fondo oscuro y borde teal, cards con bordes y hover, botones con gradient, títulos con borde inferior decorativo.
- **Toast unificado** usando la misma clase `custom-toast` que AdminContact.
- **Nuevo layout**: Hero y Carrusel en grid de 2 columnas lado a lado, Features abajo a ancho completo.

### 🎨 Mejora visual de AdminProductsPage
Se rediseñó el catálogo de productos del panel admin:
- **Movido** de `pages/AdminProductsPage.js` a `admin/AdminProductsPage.js`.
- **Nuevo layout**: grid de 2 columnas — productos a la izquierda (grilla responsive), formulario de creación a la derecha (panel fijo sticky).
- **Modal de edición**: reemplazado el modal antiguo por el mismo estilo que AdminContact (overlay con blur, animación slideUp, inputs oscuros con borde teal, botones gradient).
- **CSS reescrito** con el mismo lenguaje visual: cards con bordes y hover, inputs/selects oscuros, botones con gradient, toast unificado `custom-toast`.
- **Responsive**: en pantallas estrechas el layout se apila verticalmente.
- **Filtro de orden**: barra con botones "Más recientes" / "Más antiguos" que ordena los productos por ID (nuevo = ID más alto) usando `useMemo` client-side, sin llamadas al backend.



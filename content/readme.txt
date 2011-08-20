>> Iniciacion de javascript.

El tag body tiene un data-page para que el js sepa que codigo usar, ahi hay que poner:

home: para cuando esta en el home
site: para cuando esta en las paginas que necesita la animacion del sidebar
company: para la pagina de la empresa
gallery: para cuando esta en la galeria

>> Llamada de archivos

La llamada de archivos se hace de manera asincronica con head.js
El archivo que tiene las llamadas es myhead.js, si algun archivo js no carga aqui deben revisar.

>> Galeria de imagenes

Hay que usar 2 imagenes por imagen. Una grande y una thumb.
El nombre de archivo debe ser imagen.jpg para la grande, e imagen-thumb.jpg para el thumb.


>> Alto de los sidebar.

El alto de los sidebar siempre sera igual al alto del contenido principal.
Si hay mas contenido en el sidebar que en el contenido, habra que repensar el css.


>> Imagenes

En la carpeta images estan todas las imagenes usadas a modo de historico
El archivo main-sprite.png es el sprite
El archivo main-sprite source.png es el archivo fuente, es un png de fireworks.

>> Slide del header y del footer

Son la lineas

	setInterval( "slideSwitch('#header .tagline')", 6000 );
	setInterval( "slideSwitch('#clients-slide')", 5000 );
	
el segundo parametro que se pasa es la cantidad de milisegundos entre una imagen/texto y otro.
Si quieren mas/menos tiempo deben cambiar alli.
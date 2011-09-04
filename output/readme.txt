<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie ie6" lang="es"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie ie7" lang="es"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie ie8" lang="es"> <![endif]-->
<!--[if IE 9 ]>    <html class="no-js ie ie9" lang="es"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html class="no-js" lang="es"><!--<![endif]-->
	<head>
				<meta charset="utf-8" />
		
		<title>DAS Branding & Design - </title>
		<meta name="description" content="">
		<meta name="author" content="">
		
		<link rel="shortcut icon" href="/favicon.ico">
		<link rel="apple-touch-icon" href="/apple-touch-icon.png">
		
		
		<link rel="stylesheet" type="text/css" media="all" href="css/reset.css" />
		<link rel="stylesheet" type="text/css" media="all" href="css/style.css" />
		<link rel="stylesheet" type="text/css" media="all" href="css/pikachoose.css" />
		
		<!--[if IE ]>
			<link rel="stylesheet" href="css/ie.css" type="text/css" media="all"/>
		<![endif]-->
		
				
		
		<script src="js/libs/head-min.js" type="text/javascript"></script>
	</head>
	
	<body id="" class=" " data-page="">
		<div id="wrapper">
			<header id="header" class="has-banner">
	<div class="wrapper">
		<a href="index.html" class="logo">DAS</a>
		<div class="tagline">
			<p class="active">Soluciones en <span>imagen de marca</span></p>
			<p>Creaciones de <span>logos para ti</span></p>
		</div>
		<nav>
			<ul class="clearfix">
				<li ><a href="index.html">Inicio</a></li>
				<li ><a  href="nosotros.html">Nosotros</a></li>
				<li ><a  href="servicios.html">Servicios</a></li>
				<li ><a  href="trabajos.html">Trabajos</a></li>
				<li  ><a href="clientes.html">Clientes</a></li>
				<li ><a  href="contacto.html">Contacto</a></li>
			</ul>
		</nav>
		<ul id="languaje-selector">
			<li class="selected"><a href="#">español</a></li>
			<li><a href="#">english</a></li>
		</ul>
	</div>
	<div class="bg"></div>
</header>
			
			
				<section id="banner" role="banner" class="wrapper">

	
		<figure>
			<img src="images/banner/.jpg" width="930" height="382" />
		</figure>
	

	<footer>
	
	</footer>
	<div class="bg"></div>
</section>
			
	
			<section id="container" class="wrapper clearfix">
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

>> Bloques del sidebar

Cada section/div/tag-principal debe tener la clase "block".
El primer bloque debe tener la clase "block-first" tambien.
			</section>
	
			

<footer id="footer">
	<div class="bg"></div>
	<section class="top">
		<div class="wrapper">
			<section class="subcribe">
				<h2>Dasnews</h2>
				<a class="" href="#">Ver Dasnews online</a> | <a href="#">Subscribirme</a>				
			</section>
			<section class="brochure">
				<h2>Brochure</h2>
				<a class="pdf" href="#">PDF</a><a class="issuu" href="#">issue</a>				
			</section>
			<section class="clients">
				<h2>Clientes</h2>
				<ul id="clients-slide">
					
					<li class="active"><a href="clients.html"><img src="images/clients/sony.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/3m.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/ag.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/hp.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/burkool.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/mapfre.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/personal.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/psa.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/silfab.jpg" width="133" height="60" /></a></li>
					
					
					<li ><a href="clients.html"><img src="images/clients/penn.jpg" width="133" height="60" /></a></li>
					
					
				</ul>	
			</section>						
		</div>
	</section>
	
	<section class="bottom">
		<div class="wrapper">
			<div class="bg"></div>
			<section class="follow-us">
				<h2>Siganos</h2>
				<ul class="clearfix">
					<li><a class="twitter" href="#">Twitter</a></li>
					<li><a class="linkdin" href="#">Linkdin</a></li>
					<li><a class="facebook" href="#">Facebook</a></li>
				</ul>
			</section>
			
			<section class="contact-us">
				<p>Ramón Castro 1515  &middot;  Piso 2</p>
				<p>[ B1636EUA ] &middot; Olivos</p>
				<p>Buenos Aires &middot; Argentina</p>
				<p>Tel: [0054 11]  4799 3998 &middot; Int 107</p>
				<p class="mail-to clearfix"><a href="mailto:info@dabranding.com">info@dabranding.com</a></p>
			</section>
			
			<section class="sitemap clearfix">
				<header>Mapa web: <span>usted esta en: </span></header>
				<ul class="clearfix">
					<li class="home"><a href="index.html">Inicio</a></li>
					<li class="us">
						<a href="nosotros.html">Nosotros</a>
						<ul>
							<li><a href="nosotros.html">Enfoque</a></li>
							<li><a href="nosotros.html">Porque Elegirnos</a></li>
							<li><a href="nosotros.html">Metodoligas</a></li>
						</ul>
					</li>
					<li class="services">
						<a href="servicios.html">Servicios</a>
						<ul>
							<li><a href="nosotros.html">Enfoque</a></li>
							<li><a href="nosotros.html">Porque Elegirnos</a></li>
							<li><a href="nosotros.html">Metodoligas</a></li>
						</ul>
					</li>
					<li class="works">
						<a href="trabajos.html">Trabajos</a>
						<ul>
							<li><a href="nosotros.html">Enfoque</a></li>
							<li><a href="nosotros.html">Porque Elegirnos</a></li>
							<li><a href="nosotros.html">Metodoligas</a></li>
						</ul>						
					</li>
					<li class="clients"><a href="clientes.html">Clientes</a></li>
					<li class="contact"><a href="contacto.html">Contacto</a></li>
				</ul>
			</section>
			
			<section class="legal">© DAS Branding & Design 2011 - Todos los derechos reservados</section>
		</div>	
	</section>
</footer>
		</div>
			<!-- Google Analitic first please -->
	
	<script type="text/javascript" charset="utf-8">
	
		head.js("js/myhead-dev.js");
	</script>	
	</body>
</html>
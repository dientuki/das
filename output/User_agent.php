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
		  <p class="active">Gestión estratégica de marcas<span>y diseño multidisciplinario</span></p>
			<p>Innovación y creatividad<span>para su marca</span></p>
      <p>Soluciones en <span>imagen de marca</span></p>			
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
				<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP 5.1.6 or newer
 *
 * @package		CodeIgniter
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2008 - 2011, EllisLab, Inc.
 * @license		http://codeigniter.com/user_guide/license.html
 * @link		http://codeigniter.com
 * @since		Version 1.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * User Agent Class
 *
 * Identifies the platform, browser, robot, or mobile devise of the browsing agent
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	User Agent
 * @author		ExpressionEngine Dev Team
 * @link		http://codeigniter.com/user_guide/libraries/user_agent.html
 */
class CI_User_agent {

	var $agent		= NULL;

	var $is_browser	= FALSE;
	var $is_robot	= FALSE;
	var $is_mobile	= FALSE;

	var $languages	= array();
	var $charsets	= array();

	var $platforms	= array();
	var $browsers	= array();
	var $mobiles	= array();
	var $robots		= array();

	var $platform	= '';
	var $browser	= '';
	var $version	= '';
	var $mobile		= '';
	var $robot		= '';

	/**
	 * Constructor
	 *
	 * Sets the User Agent and runs the compilation routine
	 *
	 * @access	public
	 * @return	void
	 */
	public function __construct()
	{
		if (isset($_SERVER['HTTP_USER_AGENT']))
		{
			$this->agent = trim($_SERVER['HTTP_USER_AGENT']);
		}

		if ( ! is_null($this->agent))
		{
			if ($this->_load_agent_file())
			{
				$this->_compile_data();
			}
		}

		log_message('debug', "User Agent Class Initialized");
	}

	// --------------------------------------------------------------------

	/**
	 * Compile the User Agent Data
	 *
	 * @access	private
	 * @return	bool
	 */
	private function _load_agent_file()
	{
		if (defined('ENVIRONMENT') AND is_file(APPPATH.'config/'.ENVIRONMENT.'/user_agents.php'))
		{
			include(APPPATH.'config/'.ENVIRONMENT.'/user_agents.php');
		}
		elseif (is_file(APPPATH.'config/user_agents.php'))
		{
			include(APPPATH.'config/user_agents.php');
		}
		else
		{
			return FALSE;
		}

		$return = FALSE;

		if (isset($platforms))
		{
			$this->platforms = $platforms;
			unset($platforms);
			$return = TRUE;
		}

		if (isset($browsers))
		{
			$this->browsers = $browsers;
			unset($browsers);
			$return = TRUE;
		}

		if (isset($mobiles))
		{
			$this->mobiles = $mobiles;
			unset($mobiles);
			$return = TRUE;
		}

		if (isset($robots))
		{
			$this->robots = $robots;
			unset($robots);
			$return = TRUE;
		}

		return $return;
	}

	// --------------------------------------------------------------------

	/**
	 * Compile the User Agent Data
	 *
	 * @access	private
	 * @return	bool
	 */
	private function _compile_data()
	{
		$this->_set_platform();

		foreach (array('_set_browser', '_set_robot', '_set_mobile') as $function)
		{
			if ($this->$function() === TRUE)
			{
				break;
			}
		}
	}

	// --------------------------------------------------------------------

	/**
	 * Set the Platform
	 *
	 * @access	private
	 * @return	mixed
	 */
	private function _set_platform()
	{
		if (is_array($this->platforms) AND count($this->platforms) > 0)
		{
			foreach ($this->platforms as $key => $val)
			{
				if (preg_match("|".preg_quote($key)."|i", $this->agent))
				{
					$this->platform = $val;
					return TRUE;
				}
			}
		}
		$this->platform = 'Unknown Platform';
	}

	// --------------------------------------------------------------------

	/**
	 * Set the Browser
	 *
	 * @access	private
	 * @return	bool
	 */
	private function _set_browser()
	{
		if (is_array($this->browsers) AND count($this->browsers) > 0)
		{
			foreach ($this->browsers as $key => $val)
			{
				if (preg_match("|".preg_quote($key).".*?([0-9\.]+)|i", $this->agent, $match))
				{
					$this->is_browser = TRUE;
					$this->version = $match[1];
					$this->browser = $val;
					$this->_set_mobile();
					return TRUE;
				}
			}
		}
		return FALSE;
	}

	// --------------------------------------------------------------------

	/**
	 * Set the Robot
	 *
	 * @access	private
	 * @return	bool
	 */
	private function _set_robot()
	{
		if (is_array($this->robots) AND count($this->robots) > 0)
		{
			foreach ($this->robots as $key => $val)
			{
				if (preg_match("|".preg_quote($key)."|i", $this->agent))
				{
					$this->is_robot = TRUE;
					$this->robot = $val;
					return TRUE;
				}
			}
		}
		return FALSE;
	}

	// --------------------------------------------------------------------

	/**
	 * Set the Mobile Device
	 *
	 * @access	private
	 * @return	bool
	 */
	private function _set_mobile()
	{
		if (is_array($this->mobiles) AND count($this->mobiles) > 0)
		{
			foreach ($this->mobiles as $key => $val)
			{
				if (FALSE !== (strpos(strtolower($this->agent), $key)))
				{
					$this->is_mobile = TRUE;
					$this->mobile = $val;
					return TRUE;
				}
			}
		}
		return FALSE;
	}

	// --------------------------------------------------------------------

	/**
	 * Set the accepted languages
	 *
	 * @access	private
	 * @return	void
	 */
	private function _set_languages()
	{
		if ((count($this->languages) == 0) AND isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) AND $_SERVER['HTTP_ACCEPT_LANGUAGE'] != '')
		{
			$languages = preg_replace('/(;q=[0-9\.]+)/i', '', strtolower(trim($_SERVER['HTTP_ACCEPT_LANGUAGE'])));

			$this->languages = explode(',', $languages);
		}

		if (count($this->languages) == 0)
		{
			$this->languages = array('Undefined');
		}
	}

	// --------------------------------------------------------------------

	/**
	 * Set the accepted character sets
	 *
	 * @access	private
	 * @return	void
	 */
	private function _set_charsets()
	{
		if ((count($this->charsets) == 0) AND isset($_SERVER['HTTP_ACCEPT_CHARSET']) AND $_SERVER['HTTP_ACCEPT_CHARSET'] != '')
		{
			$charsets = preg_replace('/(;q=.+)/i', '', strtolower(trim($_SERVER['HTTP_ACCEPT_CHARSET'])));

			$this->charsets = explode(',', $charsets);
		}

		if (count($this->charsets) == 0)
		{
			$this->charsets = array('Undefined');
		}
	}

	// --------------------------------------------------------------------

	/**
	 * Is Browser
	 *
	 * @access	public
	 * @return	bool
	 */
	public function is_browser($key = NULL)
	{
		if ( ! $this->is_browser)
		{
			return FALSE;
		}

		// No need to be specific, it's a browser
		if ($key === NULL)
		{
			return TRUE;
		}

		// Check for a specific browser
		return array_key_exists($key, $this->browsers) AND $this->browser === $this->browsers[$key];
	}

	// --------------------------------------------------------------------

	/**
	 * Is Robot
	 *
	 * @access	public
	 * @return	bool
	 */
	public function is_robot($key = NULL)
	{
		if ( ! $this->is_robot)
		{
			return FALSE;
		}

		// No need to be specific, it's a robot
		if ($key === NULL)
		{
			return TRUE;
		}

		// Check for a specific robot
		return array_key_exists($key, $this->robots) AND $this->robot === $this->robots[$key];
	}

	// --------------------------------------------------------------------

	/**
	 * Is Mobile
	 *
	 * @access	public
	 * @return	bool
	 */
	public function is_mobile($key = NULL)
	{
		if ( ! $this->is_mobile)
		{
			return FALSE;
		}

		// No need to be specific, it's a mobile
		if ($key === NULL)
		{
			return TRUE;
		}

		// Check for a specific robot
		return array_key_exists($key, $this->mobiles) AND $this->mobile === $this->mobiles[$key];
	}

	// --------------------------------------------------------------------

	/**
	 * Is this a referral from another site?
	 *
	 * @access	public
	 * @return	bool
	 */
	public function is_referral()
	{
		if ( ! isset($_SERVER['HTTP_REFERER']) OR $_SERVER['HTTP_REFERER'] == '')
		{
			return FALSE;
		}
		return TRUE;
	}

	// --------------------------------------------------------------------

	/**
	 * Agent String
	 *
	 * @access	public
	 * @return	string
	 */
	public function agent_string()
	{
		return $this->agent;
	}

	// --------------------------------------------------------------------

	/**
	 * Get Platform
	 *
	 * @access	public
	 * @return	string
	 */
	public function platform()
	{
		return $this->platform;
	}

	// --------------------------------------------------------------------

	/**
	 * Get Browser Name
	 *
	 * @access	public
	 * @return	string
	 */
	public function browser()
	{
		return $this->browser;
	}

	// --------------------------------------------------------------------

	/**
	 * Get the Browser Version
	 *
	 * @access	public
	 * @return	string
	 */
	public function version()
	{
		return $this->version;
	}

	// --------------------------------------------------------------------

	/**
	 * Get The Robot Name
	 *
	 * @access	public
	 * @return	string
	 */
	public function robot()
	{
		return $this->robot;
	}
	// --------------------------------------------------------------------

	/**
	 * Get the Mobile Device
	 *
	 * @access	public
	 * @return	string
	 */
	public function mobile()
	{
		return $this->mobile;
	}

	// --------------------------------------------------------------------

	/**
	 * Get the referrer
	 *
	 * @access	public
	 * @return	bool
	 */
	public function referrer()
	{
		return ( ! isset($_SERVER['HTTP_REFERER']) OR $_SERVER['HTTP_REFERER'] == '') ? '' : trim($_SERVER['HTTP_REFERER']);
	}

	// --------------------------------------------------------------------

	/**
	 * Get the accepted languages
	 *
	 * @access	public
	 * @return	array
	 */
	public function languages()
	{
		if (count($this->languages) == 0)
		{
			$this->_set_languages();
		}

		return $this->languages;
	}

	// --------------------------------------------------------------------

	/**
	 * Get the accepted Character Sets
	 *
	 * @access	public
	 * @return	array
	 */
	public function charsets()
	{
		if (count($this->charsets) == 0)
		{
			$this->_set_charsets();
		}

		return $this->charsets;
	}

	// --------------------------------------------------------------------

	/**
	 * Test for a particular language
	 *
	 * @access	public
	 * @return	bool
	 */
	public function accept_lang($lang = 'en')
	{
		return (in_array(strtolower($lang), $this->languages(), TRUE));
	}

	// --------------------------------------------------------------------

	/**
	 * Test for a particular character set
	 *
	 * @access	public
	 * @return	bool
	 */
	public function accept_charset($charset = 'utf-8')
	{
		return (in_array(strtolower($charset), $this->charsets(), TRUE));
	}

}


/* End of file User_agent.php */
/* Location: ./system/libraries/User_agent.php */
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
				<a class="pdf" href="#">PDF</a><a class="issuu" href="http://issuu.com/das_branding/docs/das_branding_general_3?mode=embed">issue</a>				
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
					<li><a class="twitter" href="http://twitter.com/#!/DASBranding">Twitter</a></li>
					<li><a class="linkdin" href="http://www.linkedin.com/company/das-branding-&-design">Linkedin</a></li>
					<li><a class="facebook" href="http://www.facebook.com/pages/DAS-Branding-Design/273586335280">Facebook</a></li>
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
<?php
/**
 * op-module-webpack:/action.php
 *
 * @created   2019-05-09  Separate from index.php.
 * @version   1.0
 * @package   op-module-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** namespace
 *
 * @created   2019-02-25
 */
namespace OP;

/** Used class
 *
 */
use function OP\ConvertPath;

/* @var $app UNIT\App */
/* @var $ext string   */

//	Switch work by extension.
switch( $ext ){
	case 'js':
	case 'css':
		//	...
		$app_path = __DIR__."/{$ext}/action.php";

		//	...
		if( $app->Layout() ){
			$layout_path = ConvertPath("layout:/$ext/action.php");
			$layout_path = realpath($layout_path);
			if(!$io = file_exists($layout_path) ){
				\OP\Notice::Set("This file path has not been exists. ({$layout_path})");
			};
		};

		//	...
		if( $io ?? null ){
			$list = array_merge( include($app_path), include($layout_path) );
		}else{
			$list = include($app_path);
		};

		//	...
		break;

	default:
		$list = [];
}

//	...
return $list;
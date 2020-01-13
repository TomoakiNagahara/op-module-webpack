<?php
/**
 * app-skeleton-webpack:/action.php
 *
 * @creation  2019-05-09  Separate from index.php.
 * @version   1.0
 * @package   app-skeleton-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** namespace
 *
 * @creation  2019-02-25
 */
namespace OP;

/** Used class
 *
 */
use function OP\ConvertPath;

/* @var $ext    string */

//	Get layout name.
$layout = UNIT\App::Layout();

//	Security check.
if( strpos($layout, '..') !== false ){
	Notice::Set("Security incident. ($layout)");
	return;
};

//	Encode string.
$layout = Encode($layout);

//	Switch work by extension.
switch( $ext ){
	case 'js':
	case 'css':
		//	...
		$app_path = __DIR__."/{$ext}/action.php";

		//	...
		if( $layout ?? null ){
			$layout_path = ConvertPath("layout:/../$layout/$ext/action.php");
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


/**
 * app-skeleton-webpack:/js/op/action.php
 *
 * @created   2019-04-27
 * @version   1.0
 * @package   app-skeleton-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

//	...
(function(){
	/** Env
	 *
	 * @created  2019-04-27
	 */
	$OP.Env= {};

	/** Is localhost.
	 *
	 *  Return value is string.
	 *
	 * @created  2019-04-27
	 * @return   string
	 */
	$OP.Env.isLocalhost = function(){
		return '<?= \OP\Env::isLocalhost() ? 1: 0; ?>';
	};

	/** Is admin.
	 *
	 *  Return value is string.
	 *
	 * @created  2019-04-27
	 * @return   string
	 */
	$OP.Env.isAdmin = function(){
		return '<?= \OP\Env::isAdmin() ? 1: 0; ?>';
	};
})();

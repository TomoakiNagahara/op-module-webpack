/**
 * app-skeleton-webpack:/js/op/url.js
 *
 * @created   2017-06-08
 * @version   1.0
 * @package   app-skeleton-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
if(!$OP ){
	$OP = {};
}

//	...
(function(){
	/** Rebuild.
	 *
	 * @created  2019-04-26
	 */
	$OP._URL = {};
})();

//	...
(function(){
	/** Store meta url label and real url.
	 *
	 * <pre>
	 * // meta url label and real url.
	 * __meta = {
	 *   'app' = '/op/7/app'
	 * }
	 * </pre>
	 *
	 * @created  2018-11-01
	 */
	var __meta = {};
		__meta.app = "<?= $app->URL('app:/'); ?>";
		__meta.cdn = "<?= $app->CDN('app:/'); ?>";

	/** Set meta url label and real url.
	 *
	 * <pre>
	 * $OP.Meta('testcase', '/op/7/app/testcase/');
	 * </pre>
	 *
	 * @created  2018-11-01
	 */
	$OP.Meta = function(meta, path){
		__meta[meta] = path;
	};

	/** Convert to real url from meta url.
	 *
	 * <pre>
	 * $OP.Meta('test', '/op/7/app/testcase/');
	 * $OP.URL('test:/api'); --> /op/7/app/testcase/api/
	 * </pre>
	 *
	 * @created  2018-11-01
	 * @param    string
	 * @return   string
	 */
	$OP.URL = function(url){
		//	...
		var m = url.match(/^([_a-z0-9]+):\//);
		if(!m ){
			return url;
		};

		//	...
		if(!__meta[m[1]] ){
			console.error(`Has not been set this meta url. (${m[1]})`);
			return null;
		};

		//	...
		return url.replace(m[1]+':/', __meta[m[1]]);
	};

	/** Convert CDN FQDN.
	 *
	 * @created  2019-04-26
	 * @param    string
	 * @return   string
	 */
	$OP.CDN = function(url){
		//	...
		if( url.match(/^app:\//) ){
			url.replace(/^app/,'cdn');
		};

		//	...
		return $OP.URL(url);
	};
})();

//	...
(function(){
	//	...
	$OP._URL.Protocol = function(){
		return location.Protocol;
	};

	//	...
	$OP._URL.Domain = function(){
		return location.host;
	};

	//	...
	$OP._URL.Query = {};

	//	...
	$OP._URL.Query.Parse = function(query){
		//	...
		var queries = {};

		//	...
		query.replace(/&amp;/g,'%26').split('&').map(function(v){
			//	...
			var tmp = v.split('=');
			if( tmp.length !== 2 ){
				tmp = ['',''];
			};

			//	...
			var key = tmp[0];
			var val = decodeURIComponent(tmp[1].replace(/\+/g,' '));

			//	For checkbox.
			if( key.match(/%5B%5D$/) ){
				key = key.replace(/%5B%5D$/,'');
				if( queries[key] === undefined ){
					queries[key] = [];
				};
			};

			//	...
			if( 'object' === typeof queries[key] ){
				if( queries[key] instanceof Array ){
					queries[key].push(val);
				}else{
					console.error(key, queries[key]);
				};
			}else{
				queries[key] = val;
			};
		});

		//	...
		return queries;
	};

	//	...
	$OP._URL.Query.Get = function(key, def){
		//	...
		var result = null;

		//	...
		if( queries[key] !== undefined ){
			result = queries[key];
		}else if( def === undefined ){
			//	Web storage
		}else{
			result = def;
		}

		//	...
		return result;
	};

	//	...
	$OP._URL.Query.Set = function(key, val, save){
		//	...
		queries[key] = val;

		//	...
		window.history.pushState(null, null, __generate());

		//	...
		if( save ){
			//	Web storage
		};
	};

	//	...
	function __generate(){
		//	...
		var url = '?';

		//	...
		for(var key in queries ){
			var val =  queries[key];

			//	...
			if( key === '' ){ continue };

			//	...
			if( 'object' === typeof val ){
				for(var i in val){
					var v =  val[i];
					if( val instanceof Array ){
						url += `${key}%5B%5D=${v}&`;
					}else{
						url += `${key}%5B${i}%5D=${v}&`;
					};
				};
			}else{
				url += key+"="+val+'&';
			};
		};

		//	...
		return url.length === 1 ? url : url.slice(0, -1);
	};

	//	Initialize of accessed URL Query. (And remove of "?")
	var queries = $OP._URL.Query.Parse( location.search.substr(1) );
})();

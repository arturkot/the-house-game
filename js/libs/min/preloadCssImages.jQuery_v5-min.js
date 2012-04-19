/**
 * jQuery-Plugin "preloadCssImages"
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/update_automatically_preload_images_from_css_with_jquery/
 * demo page: http://www.filamentgroup.com/examples/preloadImages/index_v2.php
 * 
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Version: 5.0, 10.31.2008
 * Changelog:
 * 	02.20.2008 initial Version 1.0
 *    06.04.2008 Version 2.0 : removed need for any passed arguments. Images load from any and all directories.
 *    06.21.2008 Version 3.0 : Added options for loading status. Fixed IE abs image path bug (thanks Sam Pohlenz).
 *    07.24.2008 Version 4.0 : Added support for @imported CSS (credit: http://marcarea.com/). Fixed support in Opera as well. 
 *    10.31.2008 Version: 5.0 : Many feature and performance enhancements from trixta
 * --------------------------------------------------------------------
 */jQuery.preloadCssImages=function(a){function g(){clearTimeout(f);if(d&&d.length&&d[c]){c++;if(a.statusTextEl){var b=d[c]?"Now Loading: <span>"+d[c].split("/")[d[c].split("/").length-1]:"Loading complete";jQuery(a.statusTextEl).html('<span class="numLoaded">'+c+'</span> of <span class="numTotal">'+d.length+'</span> loaded (<span class="percentLoaded">'+(c/d.length*100).toFixed(0)+'%</span>) <span class="currentImg">'+b+"</span></span>")}if(a.statusBarEl){var e=jQuery(a.statusBarEl).width();jQuery(a.statusBarEl).css("background-position",-(e-(e*c/d.length).toFixed(0))+"px 50%");c===d.length&&$("#black").animate({opacity:0},500,function(){$(this).remove()})}h()}}function h(){if(d&&d.length&&d[c]){var b=new Image;b.src=d[c];b.complete?g():jQuery(b).bind("error load onreadystatechange",g);f=setTimeout(g,a.errorDelay)}}function i(b,c){var f=!1,g=[],j=[],k,l=b.length;while(l--){var m="";if(c&&c[l])k=c[l];else{var n=b[l].href?b[l].href:"window.location.href",o=n.split("/");o.pop();k=o.join("/");k&&(k+="/")}var p=!1;try{b[l].cssRules&&(p=!0)}catch(q){var r=q}if(!p)continue;if(b[l].cssRules||b[l].rules){e=b[l].cssRules?b[l].cssRules:b[l].rules;var s=e.length;while(s--)if(e[s].style&&e[s].style.cssText){var t=e[s].style.cssText;t.toLowerCase().indexOf("url")!=-1&&(m+=t)}else if(e[s].styleSheet){g.push(e[s].styleSheet);f=!0}}var u=m.match(/[^\("]+\.(gif|jpg|jpeg|png)/g);if(u){var v=u.length;while(v--){var w=u[v].charAt(0)=="/"||u[v].match("://")?u[v]:k+u[v];jQuery.inArray(w,d)==-1&&d.push(w)}}if(!f&&b[l].imports&&b[l].imports.length)for(var x=0,y=b[l].imports.length;x<y;x++){var z=b[l].imports[x].href;z=z.split("/");z.pop();z=z.join("/");z&&(z+="/");var A=z.charAt(0)=="/"||z.match("://")?z:k+z;j.push(A);g.push(b[l].imports[x])}}if(g.length){i(g,j);return!1}var B=a.simultaneousCacheLoading;while(B--)setTimeout(h,B)}a=jQuery.extend({statusTextEl:null,statusBarEl:null,errorDelay:999,simultaneousCacheLoading:2},a);var b=[],c=0,d=[],e,f;i(document.styleSheets);return d};
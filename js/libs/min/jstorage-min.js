/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *//**
 * $.jStorage
 *
 * USAGE:
 *
 * jStorage requires Prototype, MooTools or jQuery! If jQuery is used, then
 * jQuery-JSON (http://code.google.com/p/jquery-json/) is also needed.
 * (jQuery-JSON needs to be loaded BEFORE jStorage!)
 *
 * Methods:
 *
 * -set(key, value)
 * $.jStorage.set(key, value) -> saves a value
 *
 * -get(key[, default])
 * value = $.jStorage.get(key [, default]) ->
 *    retrieves value if key exists, or default if it doesn't
 *
 * -deleteKey(key)
 * $.jStorage.deleteKey(key) -> removes a key from the storage
 *
 * -flush()
 * $.jStorage.flush() -> clears the cache
 *
 * -storageObj()
 * $.jStorage.storageObj() -> returns a read-ony copy of the actual storage
 *
 * -storageSize()
 * $.jStorage.storageSize() -> returns the size of the storage in bytes
 *
 * -index()
 * $.jStorage.index() -> returns the used keys as an array
 *
 * -storageAvailable()
 * $.jStorage.storageAvailable() -> returns true if storage is available
 *
 * -reInit()
 * $.jStorage.reInit() -> reloads the data from browser storage
 *
 * <value> can be any JSON-able value, including objects and arrays.
 *
 **/(function(a){function k(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval");a=!0;window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{if(window.localStorage){c=window.localStorage;h="localStorage"}}catch(e){}else if("globalStorage"in window)try{if(window.globalStorage){c=window.globalStorage[window.location.hostname];h="globalStorage"}}catch(f){}else{d=document.createElement("link");if(!d.addBehavior){d=null;return}d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);d.load("jStorage");var g="{}";try{g=d.getAttribute("jStorage")}catch(i){}c.jStorage=g;h="userDataBehavior"}l();o()}function l(){if(c.jStorage)try{b=g(String(c.jStorage))}catch(a){c.jStorage="{}"}else c.jStorage="{}";e=c.jStorage?String(c.jStorage).length:0}function m(){try{c.jStorage=f(b);if(d){d.setAttribute("jStorage",c.jStorage);d.save("jStorage")}e=c.jStorage?String(c.jStorage).length:0}catch(a){}}function n(a){if(!a||typeof a!="string"&&typeof a!="number")throw new TypeError("Key name must be string or numeric");if(a=="__jstorage_meta")throw new TypeError("Reserved key name");return!0}function o(){var a,c,d,e=Infinity,f=!1;clearTimeout(i);if(!b.__jstorage_meta||typeof b.__jstorage_meta.TTL!="object")return;a=+(new Date);d=b.__jstorage_meta.TTL;for(c in d)if(d.hasOwnProperty(c))if(d[c]<=a){delete d[c];delete b[c];f=!0}else d[c]<e&&(e=d[c]);e!=Infinity&&(i=setTimeout(o,e-a));f&&m()}if(!a||!(a.toJSON||Object.toJSON||window.JSON))throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");var b={},c={jStorage:"{}"},d=null,e=0,f=a.toJSON||Object.toJSON||window.JSON&&(JSON.encode||JSON.stringify),g=a.evalJSON||window.JSON&&(JSON.decode||JSON.parse)||function(a){return String(a).evalJSON()},h=!1,i,j={isXML:function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(a);return b},c;if(!b)return!1;c=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(c)?c:!1}};a.jStorage={version:"0.1.6.0",set:function(a,c){n(a);j.isXML(c)&&(c={_is_xml:!0,xml:j.encode(c)});b[a]=c;m();return c},get:function(a,c){n(a);return a in b?b[a]&&typeof b[a]=="object"&&b[a]._is_xml&&b[a]._is_xml?j.decode(b[a].xml):b[a]:typeof c=="undefined"?null:c},deleteKey:function(a){n(a);if(a in b){delete b[a];b.__jstorage_meta&&typeof b.__jstorage_meta.TTL=="object"&&a in b.__jstorage_meta.TTL&&delete b.__jstorage_meta.TTL[a];m();return!0}return!1},setTTL:function(a,c){var d=+(new Date);n(a);c=Number(c)||0;if(a in b){b.__jstorage_meta||(b.__jstorage_meta={});b.__jstorage_meta.TTL||(b.__jstorage_meta.TTL={});c>0?b.__jstorage_meta.TTL[a]=d+c:delete b.__jstorage_meta.TTL[a];m();o();return!0}return!1},flush:function(){b={};m();return!0},storageObj:function(){function a(){}a.prototype=b;return new a},index:function(){var a=[],c;for(c in b)b.hasOwnProperty(c)&&c!="__jstorage_meta"&&a.push(c);return a},storageSize:function(){return e},currentBackend:function(){return h},storageAvailable:function(){return!!h},reInit:function(){var a,b;if(d&&d.addBehavior){a=document.createElement("link");d.parentNode.replaceChild(a,d);d=a;d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);d.load("jStorage");b="{}";try{b=d.getAttribute("jStorage")}catch(e){}c.jStorage=b;h="userDataBehavior"}l()}};k()})(window.jQuery||window.$);
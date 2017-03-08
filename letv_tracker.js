/**
 * Created by lixiao on 27/02/2017.
 */
(function(la){
    if(typeof JSON!=='object'){JSON={}}(function(){'use strict';var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return n<10?'0'+n:n}function this_value(){return this.valueOf()}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value}var gap,indent,meta,rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify')}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);rx_dangerous.lastIndex=0;if(rx_dangerous.test(text)){text=text.replace(rx_dangerous,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(rx_one.test(text.replace(rx_two,'@').replace(rx_three,']').replace(rx_four,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse')}}}());
    var logger = typeof logger === 'object' ? logger : {};
    var LIB_VERSION = '0.0.1';
    var tools = {
        LIB_VERSION : '0.0.1',
        ArrayProto :Array.prototype,
        ObjProto : Object.prototype,
        slice : Array.prototype.slice,
        toString : Object.prototype.toString,
        hasOwnProperty : Object.prototype.hasOwnProperty,
        nativeForEach : Array.prototype.forEach,
        breaker : {},
        domain : {
            'cn':'lemon.le.com:8080',
            'hk':'lemon-hk.le.com',
            'us':'lemon-us.le.com',
            'ru':'lemon-ru.le.com',
            'in':'lemon-in.le.com',
            'mo':'lemon-hk.le.com',
            'th':'lemon-us.le.com',
            'sg':'lemon-us.le.com',
            'id':'lemon-us.le.com',
            'tw':'lemon-us.le.com',
            'ca':'lemon-us.le.com',
            'au':'lemon-us.le.com',
            'nz':'lemon-us.le.com'
        },
        basicbussiness:{
            ad : true,
            search : true,
            recommend : true
        }
    };
    tools.cookie = {
        get: function(name) {
            var nameEQ = name + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
            }
            return '';
        },
        set: function(name, value, days, cross_subdomain, is_secure) {
            cross_subdomain = typeof cross_subdomain === 'undefined' ? false : cross_subdomain;
            var cdomain = '', expires = '', secure = '';
            days = typeof days === 'undefined' ? 730 : days;

            if (cross_subdomain) {
                var matches = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)
                    , domain = matches ? matches[0] : '';

                cdomain = ((domain) ? '; domain=.' + domain : '');
            }

            if (days !== 0) {
                var date = new Date();
                if (String(days).slice(-1) === 's') {
                    date.setTime(date.getTime() + (Number(String(days).slice(0, -1)) * 1000));
                } else {
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                }
                expires = '; expires=' + date.toGMTString();
            }
            if (is_secure) {
                secure = '; secure';
            }
            document.cookie = name + '=' + encodeURIComponent(value) + expires
                + '; path=/' + cdomain + secure;
        },
        remove: function(name, cross_subdomain) {
            cross_subdomain = typeof cross_subdomain === 'undefined' ? false : cross_subdomain;
            _.cookie.set(name, '', -1, cross_subdomain);

        }
    };
    tools.each = function(obj, iterator, context) {
        if (obj == null) {
            return false;
        }
        if (this.nativeForEach && obj.forEach === this.nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === this.breaker) {
                    return false;
                }
            }
        } else {
            for (var key in obj) {
                if (this.hasOwnProperty.call(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === this.breaker) {
                        return false;
                    }
                }
            }
        }
    };
    tools.extend = function(obj) {
        this.each(this.slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                //if (source[prop] !== void 0) {
                obj[prop] = source[prop];
                //}
            }
        });
        return obj;
    };
    tools.isObject = function(obj) {
        return this.toString.call(obj) == '[object Object]';
    };
    tools.isString = function(obj) {
        return this.toString.call(obj) == '[object String]';
    };
    tools.isJSONObj = function(obj) {
        try {
            JSON.stringify(obj)
        } catch (e) {
            return false;
        }
        return true;
    };
    tools.isNumber = function(obj) {
        return (this.toString.call(obj) == '[object Number]' && /[\d\.]+/.test(String(obj)));
    };
    tools.Encode = function(uri, isAll){
        var _encode = encodeURIComponent;
        if(_encode instanceof Function){
            return isAll ? encodeURI(uri) : _encode(uri);
        }else{
            return escape(uri);
        }
    };
    tools.isEmpty = function(o) {
        return (undefined == o);
    }
    tools.emptyFunction = function () {}
    tools.isFunction = function (obj) {
        return this.toString.call(obj) === "[object Function]";
    }
    tools.getCrossId = function() {
        var fra = document.createElement('iframe');
        fra.height = "0";
        fra.width = "0";
        fra.style.display = "none";
        fra.style.visibility = "hidden";
        fra.src = document.location.protocol + "//banana.le.com/letv_bduuid.html";
        if (document.body) {
            document.body.appendChild(fra);
        }
    }
    tools.getServerUrl = function(country, ext) {
        //var la_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        var la_protocol = 'http://'
        var la_path = '';
        if (ext === 0 || ext === 1) {
            la_path = '/beta_jssdkmsg';
        } else if (ext === 2) {
            la_path = '/jssdk_event';
        } else {
            tools.log("ext must be 0、1、2");
            return ;
        }
        var la_domain = this.domain[country];
        if(this.isEmpty(la_domain)) {
            tools.log('please input correct country name');
            return ;
        }
        return la_protocol + la_domain + la_path;
    }
    tools.utf8Encode = function(string) {
        string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        var utftext = '', start, end;
        var stringl = 0, n;

        start = end = 0;
        stringl = string.length;

        for (n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;

            if (c1 < 128) {
                end++;
            } else if ((c1 > 127) && (c1 < 2048)) {
                enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
            } else {
                enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.substring(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }

        if (end > start) {
            utftext += string.substring(start, string.length);
        }

        return utftext;
    };
    tools.base64Encode = function(data) {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];
        if (!data) {
            return data;
        }
        data = this.utf8Encode(data);
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');

        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + '==';
                break;
            case 2:
                enc = enc.slice(0, -1) + '=';
                break;
        }

        return enc;
    };
    tools.cloneObj = function (obj) {
        var newobj = JSON.parse(JSON.stringify(obj));
        return newobj;
    }
    tools.info = {
        pageProp: {},
        initPage: function() {
            var ref_url = this.getRefurl(),
                url = location.href,
                title = document.title,
                screen = window.screen,
                screen = screen ? screen.width + "x" + screen.height : '',
                navigator = window.navigator,
                charset = tools.Encode(window.document.characterSet ? window.document.characterSet : window.document.charset ? window.document.charset : ''),
                userLangue = (navigator && navigator.language ? navigator.language : navigator && navigator.browserLanguage ? navigator.browserLanguage : ''),
                src_url = this.getSrcurl(),
                device_uuid = this.getDeviceid(),
                cross_id = '',
                le_uid = tools.cookie.get('ssouid');
            ;
            this.pageProp = {
                encode:charset,
                browser_lang: userLangue,
                screen: screen,
                url: url,
                ref_url: ref_url,
                src_url: src_url,
                title: title,
                device_uuid: device_uuid,
                cross_id: cross_id,
                le_uid : le_uid
            };
        },
        getRefurl: function() {
            var referrer = '';
            try {
                referrer = window.top.document.referrer;
            } catch(e) {
                if (window.parent) {
                    try {
                        referrer = window.parent.document.referrer;
                    } catch(e2) {
                        referrer = '';
                    }
                }
            }
            if (referrer === '') {
                referrer = document.referrer;
            }
            return referrer;
        },
        getSrcurl: function (){
            var sourceUrl = tools.cookie.get("sourceUrl");
            if(!sourceUrl){
                if(this.getRefurl()){
                    sourceUrl = this.getRefurl();
                    tools.cookie.set("sourceUrl", sourceUrl, 0);
                }
            }
            return sourceUrl;
        },
        genUid32: function() {
            var lc = "";
            var i = 32;
            while (i--) {
                lc += Math.floor(Math.random() * 16).toString(16)
            }
            return lc;
        },
        getDeviceid: function() {
            var device_id = tools.cookie.get("tj2_lc");
            if(!device_id){
                device_id = this.genUid32();
                tools.cookie.set("tj2_lc", device_id, 3650, true);
            }
            return device_id;
        }
    };
    tools.send = function(url, data, callback) {
        if (2036 >= data.length) {
            this.sendByImage(url, data, callback);
        } else if(8192 >=data.length) {
            this.sendByBeacon(url, data, callback) || this.sendByRequest(url, data, callback) || this.sendByImage(url, data, callback);
        } else {

        }
    }
    tools.sendByImage = function (url, data, callback) {
        var img = document.createElement("img");
        img.width = 1;
        img.height = 1;
        img.src = url + '?' +data;
        img.onload = img.onerror = function () {
            img.onload = null;
            img.onerror = null;
            callback();
        };
    }
    tools.sendByRequest = function (url, data ,callback) {
        var request,
            Request = window.XDomainRequest;
        if(Request){
            request = new Request;
            request.open("POST", url);
        }else if(Request = window.XMLHttpRequest){
            Request = new Request;
            if("withCredentials"in Request){
                request = Request;
                request.open("POST", url, true);
                request.setRequestHeader("Content-Type", "text/plain");
            }
        }
        if(request){
            request.onreadystatechange = function(){
                if(request.readyState == 4){
                    callback && callback();
                    request = null;
                }
            };
            request.send(data);
            return true;
        }
        return false;
    }
    tools.sendByBeacon = function(url, data, callback) {
        return (window.navigator.sendBeacon ? window.navigator.sendBeacon(url, data) ? (callback(), !0) : !1 : !1);
    }
    tools.getSessionid = function(){
        var tj_sg = tools.cookie.get("tj_sg");
        var tj_sid = tools.cookie.get("tj_sid");
        if(tj_sg==null || tj_sg==""){
            tj_sid = this.info.genUid32();
            tools.cookie.set("tj_sg", "1", 0, true);
            tools.cookie.set("tj_sid", tj_sid, 1800+'s', true);
        }else{
            if(tj_sid==null||tj_sid==""){
                tj_sid = this.info.genUid32();
                tools.cookie.set("tj_sid", tj_sid, 1800+'s', true);
            }else{
                tools.cookie.set("tj_sid", tj_sid, 1800+'s', true);
            }
        }
        return tj_sid;
    }
    tools.log = function () {
        if (typeof console === 'object' && console.log) {
            try {
                return console.log.apply(console, arguments);
            } catch (e) {
                console.log(arguments[0]);
            }
        }
    }

    function Tracker(trackName) {
        this.name = trackName;
        this.counter = 0;
        this.profile = {};
        this['agnes'] = {};
        this['basic'] = {};
        this.temp_agnes = {
            'route_id': '',
            'app_from' : '',
            'exp_variant_id' : '',
            'exp_unit' : '',
            'exp_id' : '',
            'e_type' : '',
            'widget_id' : '',
            'ref' : ''
        }
        this['message'] = {};
        this.ad = {};
        this.search = {};
        this.recommend = {};
    }
    Tracker.prototype.init = function(method, appname, platform, country, ext) {
        var agnes = this.agnes;
        agnes['app_name'] = appname;
        agnes['platform'] = platform;
        agnes['country'] = country;
        agnes['ext'] = ext;
        tools.info.initPage();
        tools.extend(agnes,tools.info.pageProp);
        agnes['cross_id'] = '-';
    };
    Tracker.prototype.setAppFrom = function(method, value) {
        this.temp_agnes['app_from'] = value;
    }
    Tracker.prototype.setRouteID = function(method, value) {
        this.temp_agnes['route_id'] = value;
    }
    Tracker.prototype.setExpVariantId = function(method, value) {
        this.temp_agnes['exp_variant_id'] = value;
    }
    Tracker.prototype.setExpUnit = function(method, value) {
        this.temp_agnes['exp_unit'] = value;
    }
    Tracker.prototype.setExpId = function(method, value) {
        this.temp_agnes['exp_id'] = value;
    }
    Tracker.prototype.setEtype = function(method, value) {
        this.temp_agnes['e_type'] = value;
    }
    Tracker.prototype.setWidgetId = function(method, value) {
        this.temp_agnes['widget_id'] = value;
    }
    Tracker.prototype.setRef = function(method, value) {
        this.temp_agnes['ref'] = value;
    }
    Tracker.prototype.setBasic = function(method, key, value) {
        if(tools.isEmpty(key) || tools.isEmpty(value)) {
            tools.log('key and value can not be empty');
            return ;
        }
        if(!tools.basicbussiness[key]) {
            tools.log('You have no permissions to add basic!!!');
            return ;
        }
        if(!tools.isJSONObj(value)) {
            tools.log('value must be JSON Object');
            return ;
        }
        this.basic[key] = value;
    }

    Tracker.prototype.setAd = function (method, value) {
        this.setBasic('', 'ad', value)
    }
    Tracker.prototype.setSearch = function (method, value) {
        this.setBasic('', 'search', value)
    }
    Tracker.prototype.setRecommend = function (method, value) {
        this.setBasic('', 'recommend', value)
    }
    Tracker.prototype.track = function (method, e_name, props, callback) {
        if(tools.isEmpty(e_name)) {
            tools.log('e_name can not be empty');
            return ;
        }
        props = props || {};
        if(!tools.isJSONObj(props)) {
            tools.log('props must be JSON Object');
            return ;
        }
        callback = callback || tools.emptyFunction;
        ++this.counter;
        var message = this.message;
        message['agnes'] = {};
        message['basic'] = {};
        message['props'] = props;
        tools.extend(message.basic, this.basic);
        this.basic = {};
        var agnes = message.agnes;
        tools.extend(agnes, this.agnes, this.temp_agnes);
        for(var key in this.temp_agnes) {
            this.temp_agnes[key] = '';
        }
        var ctime = String(1 * new Date());
        agnes['e_name'] = e_name;
        agnes['ctime'] = ctime;
        agnes['session_id'] = tools.getSessionid();
        agnes['uid'] = tools.cookie.get('la_uid');
        agnes['msg_id'] = agnes['device_uuid'] + '-' + ctime + '-' + this.name + '-' + this.counter;
        var url = tools.getServerUrl(agnes.country, agnes.ext);
        var strData = tools.Encode(tools.base64Encode(JSON.stringify(message)));
        tools.send(url, strData, callback);
        this.message = {};
    };
    Tracker.prototype.signin = function (method, uid) {
        if(!tools.isEmpty(uid)&&tools.isString(uid)) {
            tools.cookie.set('la_uid', uid, 730, true);
        } else {
            tools.log('uid could not be empty and must be sring');
        }
    }

    function createTracker(method, appname, platform, country, ext, trackername){
        if(tools.isEmpty(appname) || tools.isEmpty(country) || tools.isEmpty(platform) || tools.isEmpty(ext)) {
            tools.log('appname country platform ext can not be empty');
            return ;
        }
        if(!tools.isNumber(platform)) {
            tools.log('platform must be number');
            return ;
        }
        if(tools.isEmpty(trackername)) {
            trackername = "_letv_bigdata";
        }
        this[trackername] = this[trackername] || new Tracker(trackername);
        this[trackername].init('', appname, platform, country,ext);
        return  this[trackername];
    }

    var cmdList = window[la].q;
    window[la] =  function () {
        var tracker_method = arguments[0].split('.');
        if (tracker_method.length == 1) {
            if (window[la][tracker_method[0]] !== undefined) {
                window[la][tracker_method[0]].apply(window[la],arguments);
            }
            else{
                if(window[la]['_letv_bigdata'][tracker_method[0]] !== undefined) {
                    window[la]['_letv_bigdata'][tracker_method[0]].apply(window[la]['_letv_bigdata'], arguments);
                } else {
                    tools.log('letv_tracker has no this function: ' + tracker_method[0]);
                    return ;
                }

            }
        }
        else if (tracker_method.length == 2) {
            var trackerName = tracker_method[0];
            var method = tracker_method[1];
            if(window[la][trackerName][method] !== undefined) {
                window[la][trackerName][method].apply(window[la][trackerName], arguments);
            } else {
                tools.log('letv_tracker has no this function: ' + method);
                return ;
            }
        }
    };
    window[la].creat = createTracker;
    if(cmdList !== undefined) {
        for (var i = 0; i < cmdList.length; ++i){
            window[la].apply(window[la],cmdList[i]);
        }
    }
    //tools.getCrossId();
})(window['LetvBigdataAnalyticsObject']);

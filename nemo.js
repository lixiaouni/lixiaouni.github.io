/**
 * Created by lixiao on 10/10/16.
 */
/**
 * @fileoverview sensors analytic javascript sdk
 * @author shengyonggen@sensorsdata.cn
 */

(function(sd) {

    // 防止重复引入
    sd = window[sd];
    sd._t = sd._t || 1 * new Date();

    if ((typeof sd !== 'function' && typeof sd !== 'object') || sd.has_load_sdk) {
        return false;
    }
    sd.has_load_sdk = true;

// 压缩后的json库
    if(typeof JSON!=='object'){JSON={}}(function(){'use strict';var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return n<10?'0'+n:n}function this_value(){return this.valueOf()}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value}var gap,indent,meta,rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify')}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);rx_dangerous.lastIndex=0;if(rx_dangerous.test(text)){text=text.replace(rx_dangerous,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(rx_one.test(text.replace(rx_two,'@').replace(rx_three,']').replace(rx_four,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse')}}}());

    var _ = sd._ = {};

    // 默认配置
    sd.para = sd.para || {};
    sd.para_default = {
        // referrer字符串截取
        max_referrer_string_length: 500,
        //通用字符串截取，超过7000的字符串会导致url超长发不出去，所以限制长度
        max_string_length: 1000,
        //    send_error_event: true,
        cross_subdomain: true,
        show_log: true,
        debug_mode: false,
        debug_mode_upload: false,

        // todo 前端session时长
        session_time: 0,

        use_client_time: false,
        //来源参数名字
        source_channel: [],

        // 七鱼过滤id
        vtrack_ignore: {}

    };
    // 合并配置
    for (var i in sd.para_default) {
        if (sd.para[i] === void 0) {
            sd.para[i] = sd.para_default[i];
        }
    }
    // 优化配置
    if (!/sa\.gif[^\/]*$/.test(sd.para.server_url)) {
        sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
    }
    sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');

    // 是否需要非cache，等于每次请求文件
    if (sd.para.noCache === true) {
        sd.para.noCache = '?' + (new Date()).getTime();
    } else {
        sd.para.noCache = '';
    }

    // 是否需要给可视化埋点加前缀
    var detector = {};
    (function() {
        var NA_VERSION = "-1";
        var win = window;
        var userAgent = win.navigator.userAgent || "";


        function toString(object) {
            return Object.prototype.toString.call(object);
        }

        function isObject(object) {
            return toString(object) === "[object Object]";
        }

        function isFunction(object) {
            return toString(object) === "[object Function]";
        }

        function each(object, factory) {
            for (var i = 0, l = object.length; i < l; i++) {
                if (factory.call(object, object[i], i) === false) {
                    break;
                }
            }
        }


    })();

    var ArrayProto = Array.prototype
        , FuncProto = Function.prototype
        , ObjProto = Object.prototype
        , slice = ArrayProto.slice
        , toString = ObjProto.toString
        , hasOwnProperty = ObjProto.hasOwnProperty
        , LIB_VERSION = '0.0.1';

    sd.lib_version = LIB_VERSION;

// 提供错误日志
    var error_msg = [];
    var is_first_visitor = false;

// 标准广告系列来源
    var source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';


    var logger = typeof logger === 'object' ? logger : {};
    logger.info = function() {
        if (!sd.para.show_log) {
            return false;
        }
        if (typeof console === 'object' && console.log) {
            try {
                return console.log.apply(console, arguments);
            } catch (e) {
                console.log(arguments[0]);
            }
        }
    };

    (function() {
        var nativeBind = FuncProto.bind,
            nativeForEach = ArrayProto.forEach,
            nativeIndexOf = ArrayProto.indexOf,
            nativeIsArray = Array.isArray,
            breaker = {};

        var each = _.each = function(obj, iterator, context) {
            if (obj == null) {
                return false;
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                        return false;
                    }
                }
            } else {
                for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                        if (iterator.call(context, obj[key], key, obj) === breaker) {
                            return false;
                        }
                    }
                }
            }
        };

        _.logger = logger;
        // 普通的extend，不能到二级_.extend(oldobj,newobj,newobj2) 如果old有某属性则会被覆盖，没有会添加
        _.extend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (source[prop] !== void 0) {
                        obj[prop] = source[prop];
                    }
                }
            });
            return obj;
        };
        // 允许二级的extend
        _.extend2Lev = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (source[prop] !== void 0) {
                        if (_.isObject(source[prop]) && _.isObject(obj[prop])) {
                            _.extend(obj[prop], source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    }
                }
            });
            return obj;
        };
        // 如果已经有的属性不覆盖,如果没有的属性加进来
        _.coverExtend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (source[prop] !== void 0 && obj[prop] === void 0) {
                        obj[prop] = source[prop];
                    }
                }
            });
            return obj;
        };

        _.isArray = nativeIsArray || function(obj) {
                return toString.call(obj) === '[object Array]';
            };

        _.isFunction = function(f) {
            try {
                return /^\s*\bfunction\b/.test(f);
            } catch (x) {
                return false;
            }
        };

        _.isArguments = function(obj) {
            return !!(obj && hasOwnProperty.call(obj, 'callee'));
        };

        _.toArray = function(iterable) {
            if (!iterable) {
                return [];
            }
            if (iterable.toArray) {
                return iterable.toArray();
            }
            if (_.isArray(iterable)) {
                return slice.call(iterable);
            }
            if (_.isArguments(iterable)) {
                return slice.call(iterable);
            }
            return _.values(iterable);
        };

        _.values = function(obj) {
            var results = [];
            if (obj == null) {
                return results;
            }
            each(obj, function(value) {
                results[results.length] = value;
            });
            return results;
        };

        _.include = function(obj, target) {
            var found = false;
            if (obj == null) {
                return found;
            }
            if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
                return obj.indexOf(target) != -1;
            }
            each(obj, function(value) {
                if (found || (found = (value === target))) {
                    return breaker;
                }
            });
            return found;
        };

        _.includes = function(str, needle) {
            return str.indexOf(needle) !== -1;
        };

    })();


    _.isObject = function(obj) {
        return toString.call(obj) == '[object Object]';
    };

    _.isEmptyObject = function(obj) {
        if (_.isObject(obj)) {
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };

    _.isUndefined = function(obj) {
        return obj === void 0;//void 0等价为undefined
    };

    _.isString = function(obj) {
        return toString.call(obj) == '[object String]';
    };

    _.isDate = function(obj) {
        return toString.call(obj) == '[object Date]';
    };

    _.isBoolean = function(obj) {
        return toString.call(obj) == '[object Boolean]';
    };

    _.isNumber = function(obj) {
        return (toString.call(obj) == '[object Number]' && /[\d\.]+/.test(String(obj)));
    };

    _.isJSONString = function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
//用不到 将一个日期数组格式化为特定格式
    _.encodeDates = function(obj) {
        _.each(obj, function(v, k) {
            if (_.isDate(v)) {
                obj[k] = _.formatDate(v);
            } else if (_.isObject(v)) {
                obj[k] = _.encodeDates(v); // recurse
            }
        });
        return obj;
    };
//2016-10-08 15:29:12.233444
    _.formatDate = function(d) {
        function pad(n) {
            return n < 10 ? '0' + n : n;
        }

        return d.getFullYear() + '-'
            + pad(d.getMonth() + 1) + '-'
            + pad(d.getDate()) + ' '
            + pad(d.getHours()) + ':'
            + pad(d.getMinutes()) + ':'
            + pad(d.getSeconds()) + '.'
            + pad(d.getMilliseconds());
    };

// 把日期格式全部转化成日期字符串  将其中日期成员转换为特定格式
    _.searchObjDate = function(o) {
        if (_.isObject(o)) {
            _.each(o, function(a, b) {
                if (_.isObject(a)) {
                    _.searchObjDate(o[b]);
                } else {
                    if (_.isDate(a)) {
                        o[b] = _.formatDate(a);
                    }
                }
            });
        }
    };
// 把字符串格式数据限制字符串长度
    _.formatString = function(str) {
        if (str.length > sd.para.max_string_length) {
            logger.info('字符串长度超过限制，已经做截取--' + str);
            return str.slice(0, sd.para.max_string_length);
        } else {
            return str;
        }
    };

// 把字符串格式数据限制字符串长度  将其中字符串截断
    _.searchObjString = function(o) {
        if (_.isObject(o)) {
            _.each(o, function(a, b) {
                if (_.isObject(a)) {
                    _.searchObjString(o[b]);
                } else {
                    if (_.isString(a)) {
                        o[b] = _.formatString(a);
                    }
                }
            });
        }
    };


// 数组去重复
    _.unique = function(ar) {
        var temp, n = [], o = {};
        for (var i = 0; i < ar.length; i++) {
            temp = ar[i];
            if (!(temp in o)) {
                o[temp] = true;
                n.push(temp);
            }
        }
        return n;
    };


// 只能是sensors满足的数据格式
    _.strip_sa_properties = function(p) {
        if (!_.isObject(p)) {
            return p;
        }
        _.each(p, function(v, k) {
            // 如果是数组，把值自动转换成string
            if (_.isArray(v)) {
                var temp = [];
                _.each(v, function(arrv) {
                    if (_.isString(arrv)) {
                        temp.push(arrv);
                    } else {
                        logger.info('您的数据-', v, '的数组里的值必须是字符串,已经将其删除');
                    }
                });
                if (temp.length !== 0) {
                    p[k] = temp;
                } else {
                    delete p[k];
                    logger.info('已经删除空的数组');
                }
            }
            // 只能是字符串，数字，日期,布尔，数组
            if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _.isArray(v))) {
                logger.info('您的数据-', v, '-格式不满足要求，我们已经将其删除');
                delete p[k];
            }
        });
        return p;
    };

    _.strip_empty_properties = function(p) {
        var ret = {};
        _.each(p, function(v, k) {
            if (_.isString(v) && v.length > 0) {
                ret[k] = v;
            }
        });
        return ret;
    };

    _.utf8Encode = function(string) {
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

    _.detector = detector;

    _.base64Encode = function(data) {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];
        if (!data) {
            return data;
        }
        data = _.utf8Encode(data);
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

    _.UUID = (function() {
        var T = function() {
            var d = 1 * new Date()
                , i = 0;
            while (d == 1 * new Date()) {
                i++;
            }
            return d.toString(16) + i.toString(16);
        };
        var R = function() {
            return Math.random().toString(16).replace('.', '');
        };
        var UA = function(n) {
            var ua = navigator.userAgent, i, ch, buffer = [], ret = 0;

            function xor(result, byte_array) {
                var j, tmp = 0;
                for (j = 0; j < byte_array.length; j++) {
                    tmp |= (buffer[j] << j * 8);
                }
                return result ^ tmp;
            }

            for (i = 0; i < ua.length; i++) {
                ch = ua.charCodeAt(i);
                buffer.unshift(ch & 0xFF);
                if (buffer.length >= 4) {
                    ret = xor(ret, buffer);
                    buffer = [];
                }
            }

            if (buffer.length > 0) {
                ret = xor(ret, buffer);
            }

            return ret.toString(16);
        };

        return function() {
            // 有些浏览器取个屏幕宽度都异常...
            var se = String(screen.height * screen.width);
            if (se && /\d{5,}/.test(se)) {
                se = se.toString(16);
            } else {
                se = String(Math.random() * 31242).replace('.', '').slice(0, 8);
            }
            return (T() + '-' + R() + '-' + UA() + '-' + se + '-' + T());
        };
    })();
//此函数用不到
    _.getQueryParam = function(url, param) {
        param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + param + "=([^&#]*)",
            regex = new RegExp(regexS),
            results = regex.exec(url);
        if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
            return '';
        } else {
            return decodeURIComponent(results[1]).replace(/\+/g, ' ');
        }
    };

    _.urlParse = function(para) {
        var URLParser = function(a) {
            this._fields = {
                Username: 4,
                Password: 5,
                Port: 7,
                Protocol: 2,
                Host: 6,
                Path: 8,
                URL: 0,
                QueryString: 9,
                Fragment: 10
            };
            this._values = {};
            this._regex = null;
            this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

            if (typeof a != 'undefined') {
                this._parse(a)
            }
        };
        URLParser.prototype.setUrl = function(a) {
            this._parse(a)
        };
        URLParser.prototype._initValues = function() {
            for (var a in this._fields) {
                this._values[a] = ''
            }
        };
        URLParser.prototype.getUrl = function() {
            var url = '';
            url += this._values.Origin;
            url += this._values.Port ? ':' + this._values.Port : '';
            url += this._values.Path;
            url += this._values.QueryString ? '?' + this._values.QueryString : '';
            return url;
        };
        URLParser.prototype._parse = function(a) {
            this._initValues();
            var b = this._regex.exec(a);
            if (!b) {
                throw 'DPURLParser::_parse -> Invalid URL'
            }
            for (var c in this._fields) {
                if (typeof b[this._fields[c]] != 'undefined') {
                    this._values[c] = b[this._fields[c]]
                }
            }
            this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
            this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];

        };
        return new URLParser(para);
    }

// 是否有标准的浏览器环境,如果不是发送$errorEnviroment:{$errorReson:'没有window'}
    _.hasStandardBrowserEnviroment = function() {
        if (!window) {
            return 'window';
        }
        if (!document) {
            return 'document';
        }
        if (!navigator) {
            return 'navigator';
        }
        if (!screen) {
            return 'screen';
        }

    };

    _.cookie = {
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
            return null;
        },
        //days 可以是100s  或者100 这样就是100天 cross_subdomain 为true在根域设置 默认为true
        set: function(name, value, days, cross_subdomain, is_secure) {
            cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
            var cdomain = '', expires = '', secure = '';
            days = typeof days === 'undefined' ? 730 : days;

            if (cross_subdomain) {
                var matches = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)
                    , domain = matches ? matches[0] : '';

                cdomain = ((domain) ? '; domain=.' + domain : '');
            }

            // 0 session
            // -1 马上过期
            //
            if (days !== 0) {
                var date = new Date();
                // 默认是填，可以是秒
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
            //cookie不设置域就默认为当前页面的域
            document.cookie = name + '=' + encodeURIComponent(value) + expires
                + '; path=/' + cdomain + secure;
        },

        remove: function(name, cross_subdomain) {
            cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
            _.cookie.set(name, '', -1, cross_subdomain);

        }
    };

    _.xhr = function(cors) {
        if (cors) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                return xhr;
            } else if (typeof XDomainRequest != "undefined") {
                return new XDomainRequest();
            } else {
                return xhr;
            }
        } else {
            if (XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            if (window.ActiveXObject) {
                try {
                    return new ActiveXObject('Msxml2.XMLHTTP')
                } catch (d) {
                    try {
                        return new ActiveXObject('Microsoft.XMLHTTP')
                    } catch (d) {
                    }
                }
            }
        }
    };
    /*
     调用示例
     _.ajax({
     url: url,
     type: 'GET',
     cors: true,
     header:{'Dry-Run': String(sd.para.debug_mode_upload)}
     });
     * */
    _.ajax = function(para) {
        function getJSON(data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                return {};
            }
        }

        var g = _.xhr(para.cors);
        if (!para.type) {
            para.type = para.data ? 'POST' : 'GET';
        }
        para = _.extend({
            success: function() {},
            error: function() {}
        }, para);


        g.onreadystatechange = function() {
            if (g.readyState == 4) {
                if ((g.status >= 200 && g.status < 300) || g.status == 304) {
                    para.success(getJSON(g.responseText));
                } else {
                    para.error(getJSON(g.responseText), g.status);
                }
                g.onreadystatechange = null;
                g.onload = null;
            }
        };


        g.open(para.type, para.url, true);

        try {
            g.withCredentials = true;

            if (_.isObject(para.header)) {
                for (var i in para.header) {
                    g.setRequestHeader(i, para.header[i]);
                }
            }

            if (para.data) {
                g.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                if (para.contentType === 'application/json') {
                    g.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                } else {
                    g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }

            }
        } catch (e) {
        }

        g.send(para.data || null);


    };

    _.info = {
        initPage: function() {
            var referrer = document.referrer;
            var referrer_host = referrer ? _.url('hostname',referrer) : referrer;
            var referrer_domain = referrer ? _.url('domain',referrer) : referrer;
            var url = location.href;
            var url_host = url ? _.url('hostname',url) : url;
            var url_domain = url ? _.url('domain',url) : url;
            this.pageProp = {
                referrer: referrer,
                referrer_host: referrer_host,
                referrer_domain: referrer_domain,
                url: url,
                url_host: url_host,
                url_domain: url_domain
            };
        },
        //当前页面的一些属性，在store初始化是生成
        pageProp: {},

        campaignParams: function() {
            var campaign_keywords = source_channel_standard.split(' ')
                , kw = ''
                , params = {};
            if (_.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0) {
                campaign_keywords = campaign_keywords.concat(sd.para.source_channel);
                campaign_keywords = _.unique(campaign_keywords);
            }
            _.each(campaign_keywords, function(kwkey) {
                kw = _.getQueryParam(location.href, kwkey);
                if (kw.length) {
                    params[kwkey] = kw;
                }
            });

            return params;
        },
        campaignParamsStandard: function(prefix) {
            var utms = _.info.campaignParams();
            var $utms = {}, otherUtms = {};
            for (var i in utms) {
                if ((' ' + source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
                    $utms[prefix + i] = utms[i];
                } else {
                    otherUtms[i] = utms[i];
                }
            }
            return {
                $utms: $utms,
                otherUtms: otherUtms
            };
        },
        // 预置属性
        properties: function() {
            return {
                $os: detector.os.name,
                $model: detector.device.name,
                $os_version: String(detector.os.version),
                $screen_height: Number(screen.height) || 0,
                $screen_width: Number(screen.width) || 0,
                // 我说两遍写的重复，佳捷说就写两遍
                $lib: 'js',
                $lib_version: String(LIB_VERSION),
                $browser: detector.browser.name,
                $browser_version: String(detector.browser.version)
            };
        },
        // 保存临时的一些变量，只针对当前页面有效
        currentProps: {},
        register: function(obj) {
            _.extend(_.info.currentProps, obj);
        }
    };

// 数据发送状态
    sd.sendState = {}
//成功发送数
    sd.sendState._complete = 0;
//接受发送数
    sd.sendState._receive = 0;
    sd.sendState.getSendCall = function(data, callback) {
        ++this._receive;
        var state = '_state' + this._receive;
        var me = this;
        this[state] = document.createElement('img');
        this[state].onload = this[state].onerror = function(e) {
            me[state].onload = null;
            me[state].onerror = null;
            delete me[state];
            ++me._complete;
            (typeof callback === 'function') && callback();
        };
        // 加cache防止缓存
        data._nocache = (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15);
        logger.info(data);
        data = JSON.stringify(data);

        if (sd.para.server_url.indexOf('?') !== -1) {
            this[state].src = sd.para.server_url + '&data=' + encodeURIComponent(_.base64Encode(data));
        } else {
            this[state].src = sd.para.server_url + '?data=' + encodeURIComponent(_.base64Encode(data));
        }
    };


// 检查是否是新用户（第一次种cookie，且在8个小时内的）
    var saNewUser = {
        checkIsAddSign: function(data) {
            if (data.type === 'track') {
                if (_.cookie.get('sensorsdata_is_new_user') !== null) {
                    data.properties.$is_first_day = true;
                } else {
                    data.properties.$is_first_day = false;
                }
            }
        },
        is_first_visit_time: false,
        checkIsFirstTime: function(data) {
            if (data.type === 'track') {
                if (this.is_first_visit_time) {
                    data.properties.$is_first_time = true;
                    this.is_first_visit_time = false;
                } else {
                    data.properties.$is_first_time = false;
                }
            }
        },
        storeInitCheck: function() {
            // 如果是新用户，种cookie只种当页
            if (is_first_visitor) {
                var date = new Date();
                var obj = {
                    h: 23 - date.getHours(),
                    m: 59 - date.getMinutes(),
                    s: 59 - date.getSeconds()
                };
                _.cookie.set('sensorsdata_is_new_user', 'true', obj.h * 3600 + obj.m * 60 + obj.s + 's');
                // 如果是is_first_visit_time，且第一次，那就发数据
                this.is_first_visit_time = true;
            } else {
                // 如果没有这个cookie，肯定不是首日
                if (_.cookie.get('sensorsdata_is_new_user') === null) {
                    this.checkIsAddSign = function(data) {
                        if (data.type === 'track') {
                            data.properties.$is_first_day = false;
                        }
                    };
                }
                // 如果不是第一次打开的用户，肯定不是首次访问
                this.checkIsFirstTime = function(data) {
                    if (data.type === 'track') {
                        data.properties.$is_first_time = false;
                    }
                }
            }
        },
        //检查是否是latest
        checkIsFirstLatest: function() {
            var url_domain = _.info.pageProp.url_domain;
            var referrer_domain = _.info.pageProp.referrer_domain;
            // 如果域名不一致，就register为latest
            if (url_domain !== '' && url_domain !== referrer_domain) {
                sd.register({
                    $latest_referrer: _.info.pageProp.referrer,
                    $latest_referrer_host: _.info.pageProp.referrer_host
                });
            }
            // utm
            var $utms = _.info.campaignParamsStandard('$latest_').$utms;
            if (!_.isEmptyObject($utms)) {
                sd.register($utms);
            }
        }

    };

    var saEvent = {};

    saEvent.checkOption = {
        // event和property里的key要是一个合法的变量名，由大小写字母、数字、下划线和$组成，并且首字符不能是数字。
        regChecks: {
            regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
        },
        checkPropertiesKey: function(obj) {
            var me = this, flag = true;
            _.each(obj, function(content, key) {
                if (!me.regChecks.regName.test(key)) {
                    flag = false;
                }
            });
            return flag;
        },
        check: function(a, b) {
            if (typeof this[a] === 'string') {
                return this[this[a]](b);
            } else {
                return this[a](b);
            }
        },
        str: function(s) {
            if (!_.isString(s)) {
                logger.info('请检查参数格式,必须是字符串');
                //return false;
                return true;
            } else {
                return true;
            }
        },
        properties: function(p) {
            _.strip_sa_properties(p);
            if (p) {
                if (_.isObject(p)) {
                    if (this.checkPropertiesKey(p)) {
                        return true;
                    } else {
                        logger.info('properties里的key必须是由字符串数字_组成，且不能是系统保留字');
                        //return false;
                        return true;
                    }
                } else {
                    logger.info('properties可以没有，但有的话必须是对象');
                    return true;
                    //return false;
                }
            } else {//properties可以没有，但有的话必须是对象
                return true;
            }
        },
        propertiesMust: function(p) {
            _.strip_sa_properties(p);
            if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
                logger.info('properties必须是对象且有值');
                return true;
                //return false;
            } else {
                if (this.checkPropertiesKey(p)) {
                    return true;
                } else {
                    logger.info('properties里的key必须是由字符串数字_组成，且不能是系统保留字');
                    return true;
                    //return false;
                }
            }
        },
        // event要检查name
        event: function(s) {
            if (!_.isString(s) || !this['regChecks']['regName'].test(s)) {
                logger.info('请检查参数格式,必须是字符串,且eventName必须是字符串_开头,且不能是系统保留字');
                //return false;
                return true;
            } else {
                return true;
            }

        },
        test_id: 'str',
        group_id: 'str',
        distinct_id: function(id) {
            if (_.isString(id) && /^.{1,255}$/.test(id)) {
                return true;
            } else {
                logger.info('distinct_id必须是不能为空，且小于255位的字符串');
                return false;
            }
        }
    };

    saEvent.check = function(p) {
        var flag = true;
        for (var i in p) {
            if (!this.checkOption.check(i, p[i])) {
                return false;
            }
        }
        return flag;
    };

    saEvent.send = function(p, callback) {
        var data = {
            distinct_id: store.getDistinctId(),
            lib: {
                $lib: 'js',
                $lib_method: 'code',
                $lib_version: String(LIB_VERSION)
            },
            properties: {}
        };

        // 测试部分数据没有distinct_id的问题
        if (typeof store.getDistinctId() !== 'string' || typeof store.getDistinctId() === '') {
            var wrong_case = '';
            switch (store.getDistinctId()) {
                case null :
                    wrong_case = 'null';
                    break;
                case (void 0) :
                    wrong_case = 'undefined';
                    break;
                case '':
                    wrong_case = '空';
                    break;
                default:
                    wrong_case = String(store.getDistinctId());
            }
            error_msg.push('distinct_id_wrong' + wrong_case + '-' + (new Date()).getTime());
        }

        _.extend(data, p);

        if (error_msg.length > 0) {
            data.jssdk_error = error_msg.join('--');
        }

        // 合并properties里的属性
        if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
            _.extend(data.properties, p.properties);
        }
        // 合并lib里的属性
        if (_.isObject(callback)) {
            _.extend(data.lib, callback);
        }

        // profile时不传公用属性
        if (!p.type || p.type.slice(0, 7) !== 'profile') {
            // 传入的属性 > 当前页面的属性 > session的属性 > cookie的属性 > 预定义属性
            data.properties = _.extend({}, _.info.properties(), store.getProps(), store.getSessionProps(), _.info.currentProps, data.properties);
        }
        // 如果$time是传入的就用，否则使用服务端时间
        if (data.properties.$time && _.isDate(data.properties.$time)) {
            data.time = data.properties.$time * 1;
            delete data.properties.$time;
        } else {
            if (sd.para.use_client_time) {
                data.time = (new Date()) * 1;
            }
        }
        _.searchObjDate(data);
        _.searchObjString(data);
        //判断是否要给数据增加新用户属性
        saNewUser.checkIsAddSign(data);
        saNewUser.checkIsFirstTime(data);


        if (sd.para.debug_mode === true) {
            logger.info(data);
            this.debugPath(JSON.stringify(data), callback);
        } else {
            sd.sendState.getSendCall(data, callback);
        }

    }
    ;

    // 发送debug数据请求
    saEvent.debugPath = function(data, callback) {
        var url = '';
        if (sd.para.debug_mode_url.indexOf('?') !== -1) {
            url = sd.para.debug_mode_url + '&data=' + encodeURIComponent(_.base64Encode(data));
        } else {
            url = sd.para.debug_mode_url + '?data=' + encodeURIComponent(_.base64Encode(data));
        }

        _.ajax({
            url: url,
            type: 'GET',
            cors: true,
            header: {'Dry-Run': String(sd.para.debug_mode_upload)}
        });

    };

    var store = sd.store = {
        getProps: function() {
            return this._state.props;
        },
        getSessionProps: function() {
            return this._sessionState;
        },
        getDistinctId: function() {
            return this._state.distinct_id;
        },
        toState: function(ds) {
            var state = null;
            if (ds !== null && (typeof (state = JSON.parse(ds)) === 'object')) {
                if (state.distinct_id) {
                    this._state = state;
                } else {
                    this.set('distinct_id', _.UUID());
                    error_msg.push('parseCookieDistinctJSSDKError');
                }
            } else {
                this.set('distinct_id', _.UUID());
                error_msg.push('parseCookieJSSDKError');
            }
        },
        initSessionState: function() {
            var ds = _.cookie.get('sensorsdata2015session');
            var state = null;
            if (ds !== null && (typeof (state = JSON.parse(ds)) === 'object')) {
                this._sessionState = state;
            }
        },

        setOnce: function(a, b) {
            if (!(a in this._state)) {
                this.set(a, b);
            }
        },
        set: function(name, value) {
            this._state[name] = value;
            this.save();
        },
        // 针对当前页面修改
        change: function(name, value) {
            this._state[name] = value;
        },
        setSessionProps: function(newp) {//覆盖extend
            var props = this._sessionState;
            _.extend(props, newp);
            this.sessionSave(props);
        },
        setSessionPropsOnce: function(newp) {
            var props = this._sessionState;
            _.coverExtend(props, newp);
            this.sessionSave(props);
        },
        setProps: function(newp) {
            var props = this._state.props || {};
            _.extend(props, newp);
            this.set('props', props);
        },
        setPropsOnce: function(newp) {
            var props = this._state.props || {};
            _.coverExtend(props, newp);
            this.set('props', props);
        },
        sessionSave: function(props) {
            this._sessionState = props;
            _.cookie.set('sensorsdata2015session', JSON.stringify(this._sessionState), 0);
        },
        save: function() {
            _.cookie.set('sensorsdata2015jssdkcross', JSON.stringify(this._state), 730, sd.para.cross_subdomain);
        },
        _sessionState: {},
        _state: {},
        init: function() {
            // 如果不支持cookie，设置新的id，并且带有error_msg
            if (!navigator.cookieEnabled) {
                error_msg.push('cookieNotEnable');
                if (!_.localStorage.isSupport) {
                    error_msg.push('localStorageNotEnable');
                }
            }
            this.initSessionState();
            var cross = _.cookie.get(sd.para.cross_subdomain ? 'sensorsdata2015jssdkcross' : 'sensorsdata2015jssdk');
            if (cross === null) {
                // 判断是否是第一次载入sdk
                is_first_visitor = true;
                this.set('distinct_id', _.UUID());
            } else {
                this.toState(cross);
            }
            //判断新用户
            saNewUser.storeInitCheck();
            saNewUser.checkIsFirstLatest();
            // 如果初始化cookie失败，发送错误事件
            /*
             if(error_msg.length > 0 && sd.para.send_error_event){
             sd.track('jssdk_error_msg');
             }*/

        }
    };

    var commonWays = {
        // 获取谷歌标准参数
        getUtm: function() {
            return _.info.campaignParams();
        },
        // 获取当前页面停留时间
        getStayTime: function() {
            return ((new Date()) - sd._t) / 1000;
        },
        //set init referrer
        setInitReferrer: function() {
            var _referrer = (document.referrer).slice(0, sd.para.max_referrer_string_length);
            sd.setOnceProfile({
                _init_referrer: _referrer,
                _init_referrer_host: _.info.pageProp.referrer_host
            });
        },
        // set init sessionRegister cookie
        setSessionReferrer: function() {
            var _referrer = (document.referrer).slice(0, sd.para.max_referrer_string_length);
            store.setSessionPropsOnce({
                _session_referrer: _referrer,
                _session_referrer_host: _.info.pageProp.referrer_host
            });
        },
        // set default referrr and pageurl
        setDefaultAttr: function() {
            _.info.register({
                _current_url: location.href,
                _referrer: (document.referrer).slice(0, sd.para.max_referrer_string_length),
                _referring_host: _.info.pageProp.referrer_host
            });
        },

        autoTrackWithoutProfile:function(para){
            this.autoTrack(_.extend(para,{not_set_profile:true}));
        },
        autoTrack: function(para) {
            para = _.isObject(para) ? para : {};

            var utms = _.info.campaignParams();
            var $utms = {};
            for (var i in utms) {
                if ((' ' + source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
                    $utms['$' + i] = utms[i];
                } else {
                    $utms[i] = utms[i];
                }
            }
            // setOnceProfile 如果是新用户，且允许设置profile
            if (is_first_visitor && !para.not_set_profile) {
                sd.setOnceProfile(_.extend({
                        $first_visit_time: new Date(),
                        $first_referrer: (document.referrer).slice(0, sd.para.max_referrer_string_length),
                        $first_browser_language: navigator.language,
                        $first_referrer_host: _.info.pageProp.referrer_host
                    }, $utms)
                );
            }
            if(para.not_set_profile){
                delete para.not_set_profile;
            }

// trackpageview
            sd.track('$pageview', _.extend({
                    $referrer: (document.referrer).slice(0, sd.para.max_referrer_string_length),
                    $referrer_host: _.info.pageProp.referrer_host,
                    $url: location.href,
                    $url_path: location.pathname,
                    $title: document.title
                }, $utms,para)
            );
        }


    };

    // 一些常见的方法
    sd.quick = function() {
        var arg = slice.call(arguments);
        var arg0 = arg[0];
        var arg1 = arg.slice(1);
        if (typeof arg0 === 'string' && commonWays[arg0]) {
            return commonWays[arg0].apply(commonWays, arg1);
        } else if (typeof arg0 === 'function') {
            arg0.apply(sd, arg1);
        } else {
            logger.info('quick方法中没有这个功能' + arg[0]);
        }
    };


    /*
     * @param {string} event
     * @param {string} properties
     * */
    sd.track = function(e, p, c) {
        if (saEvent.check({event: e, properties: p})) {
            saEvent.send({
                type: 'track',
                event: e,
                properties: p
            }, c);
        }
    };

    sd.identify = function(id, isSave) {
        if (typeof id === 'undefined') {
            store.set('distinct_id', _.UUID());
        } else if (saEvent.check({distinct_id: id})) {

            if (isSave === true) {
                store.set('distinct_id', id);
            } else {
                store.change('distinct_id', id);
            }

        } else {
            logger.info('identify的参数必须是字符串');
        }
    };
    /*
     * 这个接口是一个较为复杂的功能，请在使用前先阅读相关说明:http://www.sensorsdata.cn/manual/track_signup.html，并在必要时联系我们的技术支持人员。
     * @param {string} distinct_id
     * @param {string} event
     * @param {object} properties
     * */
    sd.trackSignup = function(id, e, p, c) {
        if (saEvent.check({distinct_id: id, event: e, properties: p})) {
            saEvent.send({
                original_id: store.getDistinctId(),
                distinct_id: id,
                type: 'track_signup',
                event: e,
                properties: p
            }, c);
            store.set('distinct_id', id);
        }
    };

    sd.registerPage = function(obj) {
        if (saEvent.check({properties: obj})) {
            _.extend(_.info.currentProps, obj);
        } else {
            logger.info('register输入的参数有误');
        }
    };

    sd.register = function(props) {
        if (saEvent.check({properties: props})) {
            store.setProps(props);
        } else {
            logger.info('register输入的参数有误');
        }
    };

    sd.registerOnce = function(props) {
        if (saEvent.check({properties: props})) {
            store.setPropsOnce(props);
        } else {
            logger.info('registerOnce输入的参数有误');
        }
    };

    sd.registerSession = function(props) {
        if (saEvent.check({properties: props})) {
            store.setSessionProps(props);
        } else {
            logger.info('registerSession输入的参数有误');
        }
    };

    sd.registerSessionOnce = function(props) {
        if (saEvent.check({properties: props})) {
            store.setSessionPropsOnce(props);
        } else {
            logger.info('registerSessionOnce输入的参数有误');
        }
    };



    sd.init = function() {
        // 防止爬虫等异常情况
        /*
         if(!_.hasStandardBrowserEnviroment()){
         return false;
         }*/
        // 初始化referrer等页面属性 1.6
        _.info.initPage();

        // 初始化distinct_id
        store.init();

        _.each(sd._q, function(content) {
            sd[content[0]].apply(sd, slice.call(content[1]));
        });

    };


    sd.init();

})(window['sensorsDataAnalytic201505']);


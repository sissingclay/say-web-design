/**
 * Created by claysissing on 18/08/2016.
 */
 function SwdAjax () {
     
    var parse = function(req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };
    
    var xhr = function(type, url, data) {
        var methods = {
            success: function(callback) {
                this.success = callback;
                return this;
            },
            error: function(callback) {
                this.error = callback;
                return this;
            }
        };
        var XHR = XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(type, url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    methods.success.apply(methods, parse(request));
                } else {
                    methods.error.apply(methods, parse(request));
                }
            }
        };
        request.send(data);
        return methods;
    };
    
    return {
        get: function(url) {
            return xhr('GET', url);
        },
        post: function(url, data) {
            return xhr('POST', url, data);
        }
    };
};

export { SwdAjax };
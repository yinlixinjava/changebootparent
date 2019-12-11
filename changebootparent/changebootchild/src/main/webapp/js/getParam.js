UrlParm = function() { // url����  
  var data, index;  
  (function init() {  
    data = [];  
    index = {};  
    var u = window.location.search.substr(1);  
    if (u != '') {  
      var parms = decodeURIComponent(u).split('&');  
      for (var i = 0, len = parms.length; i < len; i++) {  
        if (parms[i] != '') {  
          var p = parms[i].split("=");  
          if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=  
            data.push(['']);  
            index[p[0]] = data.length - 1;  
          } else if (typeof(p[0]) == 'undefined' || p[0] == '') { // =c | =  
            data[0] = [p[1]];  
          } else if (typeof(index[p[0]]) == 'undefined') { // c=aaa  
            data.push([p[1]]);  
            index[p[0]] = data.length - 1;  
          } else {// c=aaa  
            data[index[p[0]]].push(p[1]);  
          }  
        }  
      }  
    }  
  })();  
  return {  
    // ��ò���,����request.getParameter()  
    parm : function(o) { // o: ���������߲�������  
      try {  
        return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);  
      } catch (e) {  
      }  
    },  
    //��ò�����, ����request.getParameterValues()  
    parmValues : function(o) { //  o: ���������߲�������  
      try {  
        return (typeof(o) == 'number' ? data[o] : data[index[o]]);  
      } catch (e) {}  
    },  
    //�Ƿ���parmName����  
    hasParm : function(parmName) {  
      return typeof(parmName) == 'string' ? typeof(index[parmName]) != 'undefined' : false;  
    },  
    // ��ò���Map ,����request.getParameterMap()  
    parmMap : function() {  
      var map = {};  
      try {  
        for (var p in index) {  map[p] = data[index[p]];  }  
      } catch (e) {}  
      return map;  
    }  
  }  
}();  
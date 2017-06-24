/*
 这种封装方法的思想：
 在不改变原有请求方法的同时，对请求的参数进行改变。
 */
(function ($) {
  //1.得到$.ajax的对象 保存原来$.ajax的指向 其实是一个指针变量
  var _ajax = $.ajax;
//重写$.ajax的方法
  $.ajax = function (options) {
	console.log(options.type);
    //2.每次调用发送ajax请求的时候定义默认的error处理方法
    var fn = {
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("请求失败");
      },
      success: function (data, textStatus) {
	      console.log(data);
      },
      beforeSend: function (XHR) {
				console.log("网络请求之前");
 			},
      complete: function (XHR, TS) { 
				console.log("网络请求完成");			
			}
    }
    //3.如果在调用的时候写了error的处理方法，就不用默认的
    if (options.error) {
      fn.error = options.error;
    }
    if (options.success) {
      fn.success = options.success;
    }
    if (options.beforeSend) {
      fn.beforeSend = options.beforeSend;
    }
    if (options.complete) {
      fn.complete = options.complete;
    }
    //4.扩展原生的$.ajax方法，返回最新的参数
    var _options = $.extend(options, {
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        fn.error(XMLHttpRequest, textStatus, errorThrown);
      },
      success: function (data, textStatus) {
        fn.success(data, textStatus);
      },
      beforeSend: function (XHR) {
        fn.beforeSend(XHR);
      },
      complete: function (XHR, TS) {
        fn.complete(XHR, TS);
      }
    });
    //5.将最新的参数传回ajax对象 这才是真正的发起网络请求
  _ajax(options);
  };
})(jQuery);
	

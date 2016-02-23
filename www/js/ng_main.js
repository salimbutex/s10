/*******************************NgAPP*****************************************************/
var mainApp = angular.module("mainApp", ['ngRoute', 'ngAnimate' ,'ui.bootstrap']);
/**********************************Routing*****************************************************/
mainApp.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'html/home.html',
             controller: 'loginController'
			 //animate: "fade"
        }).when('/register', {
            templateUrl: 'html/register.html',
            controller: 'registerController'
			//animate: "fade"
        }).when('/create_register', {
            templateUrl: 'html/signup.html',
            controller: 'create_registerController'
			//animate: "fade"
        }).when('/session', {
            templateUrl: 'html/session.html',
            controller: 'sessionController'
			//animate: "fade"
        }).when('/create_session', {
            templateUrl: 'html/create_session.html',
            controller: 'create_sessionController'
			//animate: "slideLeft"
        }).when('/find_session', {
            templateUrl: 'html/find_session.html',
            controller: 'find_sessionController'
			//animate: "slideLeft"
        }).when('/find_result/:professor/:courses/:time/:date', {
            templateUrl: 'html/find_result.html',
            controller: 'find_resultController'
			//animate: "slideLeft"
        }).when('/join_session/', {
            templateUrl: 'html/join_session.html',
            controller: 'join_sessionController'
			//animate: "slideLeft"
        }).when('/my_session/', {
            templateUrl: 'html/my_session.html',
            controller: 'my_sessionController'
			//animate: "slideLeft"
        }).when('/chat/:session_id/:course_name', {
            templateUrl: 'html/chat.html',
            controller: 'chatController'
			//animate: "slideLeft"
        }).when('/setting', {
            templateUrl: 'html/setting.html',
            controller: 'settingController'
			//animate: "slideLeft"
        }).when('/edit_session/:session_id', {
            templateUrl: 'html/edit_session.html',
            controller: 'edit_sessionController'
			//animate: "slideLeft"
        }).when('/block_unblock/:course_id', {
            templateUrl: 'html/block_unblock.html',
            controller: 'block_unblock_sessionController'
			//animate: "slideLeft"
        }).when('/my_created_session', {
            templateUrl: 'html/my_created_session.html',
            controller: 'my_created_sessionController'
			//animate: "slideLeft"
        }).when('/notification', {
            templateUrl: 'html/notification.html',
            controller: 'notificationController'
			//animate: "slideLeft"
        }).otherwise({
            redirectTo: '/home'
        });
});
/*mainApp.directive('animClass',function($route){
  return {
    link: function(scope, elm, attrs){
      var enterClass = $route.current.animate;
      elm.addClass(enterClass);
      scope.$on('$destroy',function(){
        elm.removeClass(enterClass);
        elm.addClass($route.current.animate);
      })
    }
  }
});*/
/* mainApp.directive('camera', function() {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
         elm.on('click', function() {
            navigator.camera.getPicture(function (imageURI) {
               scope.$apply(function() {
                  ctrl.$setViewValue(imageURI);
               });
            }, function (err) {
               ctrl.$setValidity('error', false);
            }, { quality: 50, destinationType: Camera.DestinationType.FILE_URI,sourceType : Camera.PictureSourceType.PHOTOLIBRARY,encodingType: 0     })
         });
      }
   };
}); */

/**********************************Filters**********************************************/
mainApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
 mainApp.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  });


/**********************************controller*******************************************/
mainApp.controller('chatController', function($scope,$routeParams, $rootScope, $http, $location) {
	document.addEventListener("backbutton", shutuploading, false);
	function shutuploading(){
			$('.spinner').stop().fadeOut('fast');	
	}
    $scope.course_name=$routeParams.course_name;
	$scope.session_id=$routeParams.session_id;
	$scope.chatSendstatus=0;
	$scope.openImg=function(imguri){
		cordova.ThemeableBrowser.open(imguri, '_blank', {statusbar: {
				color: '#f77500'
			},toolbar: {
				height: 44,
				color: '#f77500'
			},title: {
				color: '#EBEBEB',
				showPageTitle: true
			},backButton: {
			   /*  wwwImage : 'images/close.jpg',
				imagePressed: 'back_pressed',
				align: 'left',
				event: 'backPressed' */
			},
			forwardButton: {
			  /*  wwwImage : 'images/close.jpg',
				imagePressed: 'forward_pressed',
				align: 'left',
				event: 'forwardPressed'*/
			},
			closeButton: {
				wwwImage : 'images/close.jpg',
				imagePressed: 'images/close.jpg',
				align: 'left',
				event: 'closePressed'
			},
			customButtons: [
			 /*   {
					wwwImage : 'images/close.jpg',
					imagePressed: 'share_pressed',
					align: 'right',
					event: 'sharePressed'
				} */
			],
			menu: {
			/*     wwwImage : 'images/close.jpg',
				imagePressed: 'menu_pressed',
				title: 'Test',
				cancel: 'Cancel',
				align: 'right',
				items: [
					{
						event: 'helloPressed',
						label: 'Hello World!'
					},
					{
						event: 'testPressed',
						label: 'Test!'
					}
				]  */
			},
			backButtonCanClose: true
		}).addEventListener('closePressed', function(r) {
		   // e.path('#/search-results?service=events');
			g.backOpenedMain=i.listingid;		   
			window.history.back();			
		}).addEventListener('helloPressed', function(e) {
		   // alert('hello pressed');
		}).addEventListener('sharePressed', function(e) {
		   // alert(e.url);
		}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
			console.error(e.message);
		}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
			console.log(e.message);
		});
	}
	$scope.downoladImg=function(imguri){
	 var url = imguri;
    var filePath = cordova.file.documentsDirectory;
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);

    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
		
	};
	
	
    $scope.send=function(){ 
	$scope.chatSendstatus=1;	
	  	 $('.spinner').fadeIn('fast');
		$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/chat.php',
		  data    : $.param({ sender:$rootScope.isloggedIn ,receiver:$scope.session_id,message:$scope.message }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){				 
			setTimeout(function(){ 
			$scope.chats.push({
					created: data.body.created,
					message: data.body.message,
					sentbyme:1,
					type:0
			});	
			$scope.lastid=data.body.id;
			$scope.chatSendstatus=0;
			},100);
			$("html, body").animate({ scrollTop: $(document).height() }, "slow");
			$scope.message='';
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 	
			$('.spinner').stop().fadeOut('fast');			
		  }); 
		}
			
		var win = function(r) {
			
		$('.spinner').stop().fadeOut('fast');
		$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/getPic.php',
		  data    : $.param({ sender:$rootScope.isloggedIn ,receiver:$scope.session_id}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
		
			if(data.status.code == 1){	
		
			setTimeout(function(){ 
			$scope.chats.push({
				created: data.body.created,
				message: data.body.message,
				sentbyme:1,
				type:1
			});	
			$scope.lastid=data.body.id;
			$("html, body").animate({ scrollTop: $(document).height() }, "slow");
			$scope.chatSendstatus=0;
			},100);
			
			
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 	
			$('.spinner').stop().fadeOut('fast');			
		  }); 
		
			 
			  
		}

		var fail = function(error) {
		console.log("upload error source " + error.source);
		console.log("upload error target " + error.target);
		}
       var onSuccess = function(FILE_URI) {
        $scope.picData='';
        $scope.picData = FILE_URI;
        $scope.$apply();		
		var myImg =$scope.picData;	
		var options = new FileUploadOptions();
		options.fileKey="message";
		options.chunkedMode = false;
		options.fileName="myphoto.jpg";
		options.mimeType="image/jpeg";
		var params = {sender:$rootScope.isloggedIn ,receiver:$scope.session_id};
		options.params = params; 
		var ft = new FileTransfer();
		ft.headers = { Connection: "close" };
		ft.upload(myImg,encodeURI("http://studysesh.co/api/chat.php"), win, fail,options);		
		};
    var onFail = function(e) {
        console.log("On fail " + e);
    }
	
	$scope.takePic = function() {
	$('.spinner').fadeIn('fast');
	$scope.chatSendstatus=1;
	var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 2,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        navigator.camera.getPicture(onSuccess,onFail,options);
	  }
	$scope.takePic_ = function() {
	$('.spinner').fadeIn('fast');
	$scope.chatSendstatus=1;
	var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        navigator.camera.getPicture(onSuccess,onFail,options);
	  }
		
		$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/getchatbyid.php',
		  data    : $.param({ id:$rootScope.isloggedIn ,session_id:$scope.session_id }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) {	
		 if (!data.success ) {
			 if(data.status.code==0){
              $scope.chats=[];	
			setInterval(function(){
			if($scope.lastid=='' || $scope.lastid==undefined){
			$scope.lastid=0;			}
		 if($scope.chatSendstatus==0){		
		  $http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/recievedchat.php',
		  data    : $.param({id:$rootScope.isloggedIn ,session_id:$scope.session_id ,lastid:$scope.lastid}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		  })
		  .success(function(data) {	
		 
		 if (!data.success) {
			 if(data.status.code==0){	
			 }else{
         /*     if($scope.vibration==1)	 
			 {navigator.notification.vibrate(100);} */
              $("html, body").animate({ scrollTop: $(document).height() }, "slow");				 
			  for(var key in data.body) {
				$scope.chats.push(data.body[key]); 
				 
               var value = data.body[key];
		        $scope.lastid=data.body[key]['id'];
               } 		
				}		 
			// $scope.errorSuperhero = data.errors.superheroAlias;
			} else {
			  // if successful, bind success message to message
			// alert('Plese try again later...');
			}
		  });
		} }, 5000);  			  
			 }else{ 
			  $scope.chats=data.body;
			  for(var key in $scope.chats) {
               var value = $scope.chats[key];
		      /*  if($scope.chats[key]['sentbyme']==0)
			   { */
                 $scope.lastid=$scope.chats[key]['id'];				  
			   /* } */
               }  
			   
		setInterval(function(){
			if($scope.lastid=='' || $scope.lastid==undefined){
				$scope.lastid=0;
			}
		if($scope.chatSendstatus==0){	
		$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/recievedchat.php',
		  data    : $.param({id:$rootScope.isloggedIn ,session_id:$scope.session_id ,lastid:$scope.lastid}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) {	
		 if (!data.success) {
			 if(data.status.code==0){	
			 }else{
		/* 	if($scope.vibration==1)	 
			{navigator.notification.vibrate(100);} */
			 $("html, body").animate({ scrollTop: $(document).height() }, "slow");
			  for(var key in data.body) {
				$scope.chats.push(data.body[key]); 
				 
               var value = data.body[key];
		        $scope.lastid=data.body[key]['id'];
				
               } 

		//	alert($scope.lastid);
				}		 
			// $scope.errorSuperhero = data.errors.superheroAlias;
			} else {
			  // if successful, bind success message to message
			// alert('Plese try again later...');
			}
		  });
		} }, 5000);	  
			   
				}		 
			// $scope.errorSuperhero = data.errors.superheroAlias;
			} else {
				 $scope.chats=[];

			  // if successful, bind success message to message
			// alert('Plese try again later...');
			}
		  });
		});

/**********************************controller*****************************************************/
mainApp.controller('edit_sessionController', function($scope,$filter, $routeParams, $rootScope, $http, $location) {
	$scope.id=$routeParams.session_id;	
	/*$http({
	  method  : 'POST',
	  url     : 'http://studysesh.co/api/all_university.php',
	data    : $.param({admin:$rootScope.isloggedIn}),  // pass in data as strings
	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
	  // set the headers so angular passing info as form data (not request payload)
	 })
	  .success(function(data) {
		if(data.status.code == 1){
		$scope.courseoptions = data.body;
	} 
});*/
	/* ============================== [CODE FOR DROPDOWNS] =========================== */
	  $('.spinner').fadeIn('fast');
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_professor.php',
		  data    : $.param({admin:$rootScope.isloggedIn}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.professor = data.body;
			
			
	$http({  
	  method  : 'POST',
	  url     : 'http://studysesh.co/api/get_session_by_id.php',
	  data    : $.param({ id: $scope.id }),  // pass in data as strings
	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
	  // set the headers so angular passing info as form data (not request payload)
	 }).success(function(data) { 
		if(data.status.code == 1){
		$scope.findError = data.status.message;
		$rootScope.userForm = data.body;
		$scope.userForm.date = new Date(data.body.date);
		$scope.userForm.courses = data.body.courses;
		$scope.userForm.professor = data.body.professor;		
		//$scope.selectedCourseOption = data.body.courses;
		$scope.userForm.time = data.body.time;
		/***************************************************************/
		$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_university.php',
		  data    : $.param({admin:$rootScope.isloggedIn,professor:data.body.professor}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.courseoptions = data.body;
	}
});


	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_time.php',
		  data    : $.param({admin:$rootScope.isloggedIn,course:data.body.courses,professor:data.body.professor}),// pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.timeoptions = data.body;
			$scope.userForm = $rootScope.userForm;
	}
});
	/*******************************************************************/
		}
		 $('.spinner').stop().fadeOut('fast');
		});			
	}
});

	

	$scope.getValue=function(){
	//alert($scope.userForm.professor);
	//$scope.getSelection = true;
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_university.php',
		  data    : $.param({admin:$rootScope.isloggedIn,professor:$scope.userForm.professor}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.courseoptions = data.body;
	}
});
	}
	
	
	$scope.getCourseValue=function(){	
	//alert($scope.userForm.courses);
	//$scope.getTime = true;
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_time.php',
		  data    : $.param({admin:$rootScope.isloggedIn, course:$scope.userForm.courses, professor:$scope.userForm.professor}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.timeoptions = data.body;
	}
});
	}
	
	
	/* ================================= [/CODE FOR DROPDOWNS] =========================== */
	/*$http({  
	  method  : 'POST',
	  url     : 'http://studysesh.co/api/get_session_by_id.php',
	  data    : $.param({ id: $scope.id }),  // pass in data as strings
	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
	  // set the headers so angular passing info as form data (not request payload)
	 }).success(function(data) { 
		if(data.status.code == 1){
		$scope.findError = data.status.message;
		$scope.userForm = data.body;
		$scope.userForm.date = new Date(data.body.date);
		$scope.userForm.courses = data.body.courses;
		//$scope.userForm.professor = data.body.professor;		
		//$scope.selectedCourseOption = data.body.courses;
		$scope.userForm.time = data.body.time;		
		
		}else{
		$scope.findError=data.status.message;
		}if (!data.success) {
		$scope.findError=data.status.message;
		} else {} 			
	  }); */

	
	$scope.save_session=function(){
	$scope.userForm.admin=$rootScope.isloggedIn;
	$scope.userForm.date = $filter('date')( $scope.userForm.date, 'yyyy-MM-dd HH:mm:ss');
	//$scope.userForm.date = $filter('date')( $scope.userForm.date, 'yyyy-MM-dd');
	$rootScope.isloggedIn = $scope.userForm.admin; 
	//window.localStorage.setItem("id", $scope.userForm.admin);
    $http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/save_edit_session.php',
		  data    : $.param($scope.userForm),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) {
			if(data.status.code == 1){
			 //$rootScope.isloggedIn = data.body.id;			 
			 //alert($rootScope.isloggedIn);
			 $location.path("/my_created_session"); 
			}else{
			 $scope.loginError=data.status.message;
			}if (!data.success) {
	          $scope.loginError=data.status.message;
			} else {
			
			}
		  });	 
}
});

/********************************* BLOCK/UNBLOCK *************************************************/
mainApp.controller('block_unblock_sessionController', function($scope,$routeParams, $rootScope, $http, $location) {
		$('.spinner').fadeIn('fast');
		$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/getCourseStatus.php',
		  data    : $.param({ id: $routeParams.course_id  }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
		    $scope.requests=data.body;
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 
			$('.spinner').stop().fadeOut('fast');
		  });
		  
	$scope.session_block=function(id,index){
	$('.spinner').fadeIn('fast');
	$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/block.php',
		  data    : $.param({ id:id }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
			 //$scope.sessions.splice(index, 1);
			 $location.path("/session");
		   }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 	
			 $('.spinner').stop().fadeOut('fast');
		  });	
}

$scope.session_unblock=function(id,index){
	$('.spinner').fadeIn('fast');
	$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/unblock.php',
		  data    : $.param({ id:id }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
			$location.path("/session");
			 //$scope.sessions.splice(index, 1);
		   }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 	
			$('.spinner').stop().fadeOut('fast');
		  });	
}
	 

});

/**********************************controller*****************************************************/
mainApp.controller('notificationController', function($scope,$routeParams, $rootScope, $http, $location) {
		$('.spinner').fadeIn('fast');
		$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/request.php',
		  data    : $.param({ id:$rootScope.isloggedIn }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
		    $scope.requests=data.body;
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 
				$('.spinner').stop().fadeOut('fast');
		  });
		  
		  
		  $scope.accept=function(id,index){
		  $('.spinner').fadeIn('fast');
		$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/accept_request.php',
		  data    : $.param({ id:id}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
			 $scope.requests.splice(index,1);
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 
				$('.spinner').stop().fadeOut('fast');
		  });
		  }
		  
		  
		  $scope.cancel=function(id,index){
			$('.spinner').fadeIn('fast');
		$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/cancel_request.php',
		  data    : $.param({ id:id }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
		    $scope.requests.splice(index,1);
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {}
				$('.spinner').stop().fadeOut('fast');
		  });
		  }

});
/**********************************controller*****************************************************/
mainApp.controller('my_created_sessionController', function($scope,$routeParams, $rootScope, $http, $location) {
$('.spinner').fadeIn('fast');

$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/getusercreatedsession.php',
		  data    : $.param({ id:$rootScope.isloggedIn }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 		 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
		    $scope.sessions=data.body;
			//alert($scope.sessions);
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 	
			$('.spinner').stop().fadeOut('fast');
		  }); 
		  
		 /* $http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/getCourseStatus.php',
		  data    : $.param({ id:$rootScope.isloggedIn }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 		 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
		    $scope.sessions=data.body;
			//alert($scope.sessions);
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 			
		  });
		  */
		  
$scope.session_delete=function(id,index){
	$('.spinner').fadeIn('fast');
	$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/deletesession.php',
		  data    : $.param({ id:id }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
			 $scope.sessions.splice(index, 1);
		   }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 
				$('.spinner').stop().fadeOut('fast');
		  });	
}

 $scope.edit=function(id){ 
  $location.path("/edit_session/"+id); 
 }
 
 
  $scope.session_names=function(courseid){ 
  $location.path("/block_unblock/"+courseid); 
 }
 
 $scope.live=function(id){
	$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/session_status.php',
		  data    : $.param({ id:id }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
			}else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 			
		  }); 
		  } 
	 });




/**********************************controller*****************************************************/
mainApp.controller('my_sessionController', function($scope,$routeParams, $rootScope, $http, $location) {
	$('.spinner').fadeIn('fast');
		$http({  
		  method  : 'POST',
		 // url     : 'http://studysesh.co/api/getusersession.php',
		  url     : 'http://studysesh.co/api/getmysession.php',
		  data    : $.param({ id:$rootScope.isloggedIn }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
		    $scope.sessions=data.body;
		    }else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 	
			$('.spinner').stop().fadeOut('fast');
		  }); 
		});

/**********************************controller*****************************************************/
mainApp.controller('find_resultController', function($scope,$routeParams, $rootScope, $http, $location) {

	$scope.searchform={};
	$scope.searchform.admin=$rootScope.isloggedIn;
	$scope.searchform.professor=$routeParams.professor;	
	$scope.searchform.date=$routeParams.date;
	$scope.searchform.courses=$routeParams.courses;
	$scope.searchform.time=$routeParams.time;	
	 
    $scope.join=function(index,session_id,session_type){
	
		$http({  
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/join_session.php',
		  data    : $.param({ user_id:$rootScope.isloggedIn,session_id:session_id,session_type:session_type }),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError = data.status.message;
		    $scope.sessions.splice(index, 1);
			}else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {} 	
				
		  }); 
		  }
		  $('.spinner').fadeIn('fast');
		  
		$http({   method  : 'POST',
		  url     : 'http://studysesh.co/api/searchsession.php',
		  data    : $.param($scope.searchform),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) { 
			if(data.status.code == 1){
		    $scope.findError=data.status.message;
		    $scope.sessions=data.body;
			}else{
			$scope.findError=data.status.message;
			}if (!data.success) {
	        $scope.findError=data.status.message;
			} else {			
			} 
		   $('.spinner').stop().fadeOut('fast');			
		  });	

});



/**********************************controller*****************************************************/
mainApp.controller('registerController', function($scope,$filter, $rootScope, $http, $location) {
	
	$scope.facebookLogin=function(){  
	   facebookConnectPlugin.login( ["email"], 
        function (response) {
		facebookConnectPlugin.api( "me/?fields=id,name,email,picture", ["user_birthday"],
        function (response) {
		var length=response.name.split(' ').length;
		var firstName = response.name;
		var lastName = response.name;
			if(length>1){
			var fullName =response.name;
			firstName ='';
			lastName ='';
			firstName = fullName.split(' ').slice(0, -1).join(' ');
			lastName  =  fullName.split(' ').slice(-1).join(' ');
			}
			
			$http({   method  : 'POST',
			url     : 'http://studysesh.co/api/fblogin.php',
			data    : $.param({fbid:response.id,first_name:firstName,last_name:lastName,email:response.email,pic:response.picture.data.url }),  // pass in data as strings
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		     }).success(function(data) {
			if(data.status.code == 1){
			 $rootScope.isloggedIn = data.body.id; 	
			 $scope.loginError=data.status.message;
			 window.localStorage.setItem("fbid", data.body.fbid);
			 window.localStorage.setItem("fblogin", 1);
			  window.localStorage.setItem("institute", data.body.institute);
		     window.localStorage.setItem("admin", data.body.id);
		     window.localStorage.setItem("fullname", data.body.first_name+" "+data.body.last_name); 
			 $location.path("/session"); 
			}else{
			 $scope.registerError=data.status.message;
			}if (!data.success) {
	         $scope.registerError=data.status.message;
			} else {}
		  });},
          function (response) { 
		  alert(JSON.stringify(response));
		  alert('Some error found during login with facebook.') }); 
		},function (response) {
		alert(JSON.stringify(response));
		alert('Some error found during login with facebook.'); });

	}	
	
	
});

/**********************************controller*****************************************************/
mainApp.controller('settingController', function($scope,$filter,$route, $rootScope, $http,$location){
		$('.spinner').stop().fadeOut('fast');	
	
	  if(window.localStorage.getItem("fblogin")==1){
		    $scope.fblogin = 1; 
	  }
	  else{  $scope.fblogin = false; }
		var win = function(r) {
			//$route.reload();
			
			$('.spinner').stop().fadeOut('fast');
		}
	
		var fail = function(error) {
		console.log("upload error source " + error.source);
		console.log("upload error target " + error.target);
		}
       var onSuccess = function(FILE_URI) {
		  // Android 4.4 cordova workarounds ... returns new kind or URL for content from chooser
                //if (imageUrl.substring(0,21)=="content://com.android") {
			/* 		var imageUrl=FILE_URI;
                if(imageUrl.indexOf('content://') != -1 && imageUrl.indexOf("%3A") != -1){
                    //"PlainFileUrl = content://com.android.providers.media.documents/document/image%3A14",
                    photo_split=imageUrl.split("%3A");
                    imageUrl="content://media/external/images/media/"+photo_split[1];
                }
                // workaround end

                var fileName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
                var extension;

                // check for content: protocol to make sure is not
                // a file with no extension
                if (imageUrl.indexOf('content://') != -1) {
                    if(imageUrl.lastIndexOf('.') > imageUrl.lastIndexOf('/')){
                        extension = imageUrl.substr(imageUrl.lastIndexOf('.') + 1);
                    }else{
                        extension = "jpg";
                        fileName = fileName + ".jpg";
                        console.log("Created File Extension jpg");
                    }
                } else {
                    if (imageUrl.lastIndexOf('.') == -1 || (imageUrl.lastIndexOf('.') < imageUrl.lastIndexOf('/')) ) {
                        extension = "invalid";
                    } else {
                        extension = imageUrl.substr(imageUrl.lastIndexOf('.') + 1);
                    }
                }  */
		$('.spinner').stop().fadeOut('fast');
        $scope.picData='';
		$scope.picData = FILE_URI;
		var random = Math.floor(Math.random()*1000);
        $scope.profilepic = FILE_URI + "?dummy=" + random;
		//alert(fileName);
        $scope.$apply();		
		var myImg =$scope.picData;	
		var options = new FileUploadOptions();
		options.fileKey="pic";
		options.chunkedMode = false;
		options.fileName="myphoto.jpg";
		options.mimeType="image/jpeg";
		var params = {userid:$rootScope.isloggedIn};
		options.params = params; 
		var ft = new FileTransfer();
		ft.headers = { Connection: "close" };
		ft.upload(myImg,encodeURI("http://studysesh.co/api/changeprofilepic.php"), win, fail,options);		
		};
    var onFail = function(e) {
        console.log("On fail " + e);
    }
	
	$scope.takePic = function() {
	$('.spinner').fadeIn('fast');
	$scope.chatSendstatus=1;
	var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 2,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        navigator.camera.getPicture(onSuccess,onFail,options);
	  }
	$scope.takePic_ = function() {
	$('.spinner').fadeIn('fast');
	$scope.chatSendstatus=1;
	var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        navigator.camera.getPicture(onSuccess,onFail,options);
	  }
		$scope.profilepic='images/logo.jpg';
		$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_university.php',
		data    : $.param,  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 }).success(function(data) {
			if(data.status.code == 1){
			$scope.instituteoptions = data.body;
			$('.spinner').stop().fadeOut('fast');
			} });
		
		$scope.userForm={};
		$scope.userForm.id=$rootScope.isloggedIn;
		//alert($scope.userForm.id);
		$http({   method  : 'POST',
		url     : 'http://studysesh.co/api/getuserbyid.php',
		data    : $.param($scope.userForm),  // pass in data as strings
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		// set the headers so angular passing info as form data (not request payload)
	}).success(function(data) {
		$scope.userForm=data.body;
		$scope.profilepic=data.body.pic;
		if(data.status.code == 1){	
		if((window.localStorage.getItem("fblogin")==1) && (window.localStorage.	getItem("institute")=='')){
			$scope.registerError='Please select a university first.';
			alert('Please select a university first.');
		}
	}else{
		 $scope.registerError=data.status.message;
	}if (!data.success) {
		 $scope.registerError=data.status.message;
	} else {
    }});	

	
	$scope.processsettingForm=function(){
	if($scope.userForm==undefined){
		$scope.loginForm.first_name.$pristine=false;
		$scope.loginForm.last_name.$pristine=false;
		$scope.loginForm.email.$pristine=false;
		$scope.loginForm.phone.$pristine=false;
	}else{
		var URL= 'http://studysesh.co/api/savesetting.php';
	 	if(window.localStorage.getItem("fblogin")==1){
			 URL= 'http://studysesh.co/api/savesetting.php?fbid='+window.localStorage.getItem("fbid");
		}
		
		window.localStorage.setItem("institute",$scope.loginForm.institute);
		$http({   method  : 'POST',
		url     :URL,
		data    : $.param($scope.userForm),  // pass in data as strings
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		// set the headers so angular passing info as form data (not request payload)
	}).success(function(data) {
		if(data.status.code == 1){
	  $location.path("/session"); 
	}else{
		 $scope.registerError=data.status.message;
	}if (!data.success) {
		 $scope.registerError=data.status.message;
	} else {
    }});	
  }}
});

/**********************************controller*****************************************************/
mainApp.controller('find_sessionController', function($scope,$filter, $rootScope, $http, $location) {
	$('.spinner').fadeIn('fast');
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_professor.php',
		  data    : $.param({admin:$rootScope.isloggedIn}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 }).success(function(data) {
			if(data.status.code == 1){
			$scope.professor = data.body;
			$('.spinner').stop().fadeOut('fast');
	}else{
		$('.spinner').stop().fadeOut('fast');
		$scope.findError=data.status.message;
	}
	});
	$scope.getTimeVal=function(){	
	//$scope.searchform.date1 = $filter('date')( $scope.searchform.date, 'yyyy-MM-dd');
	$scope.searchform.date1 = $filter('date')( $scope.searchform.date, 'HH:mm:ss');	
	}
	$scope.getValue=function(){	
	$scope.getSelection = true;
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_university.php',
		  data    : $.param({admin:$rootScope.isloggedIn,professor:$scope.searchform.professor}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.courseoptions = data.body;
	}
	});
	}
	$scope.getCourseValue=function(){
	//alert($scope.searchform.courses);
	$scope.getTime = true;
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_time.php',
		  data    : $.param({admin:$rootScope.isloggedIn,course:$scope.searchform.courses,professor:$scope.searchform.professor}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.timeoptions = data.body;
	}
	});
	}
	

    $scope.find=function(){
	//$location.path('/session');
	$location.path('/find_result/'+$scope.searchform.professor+'/'+$scope.searchform.courses+'/'+ $scope.searchform.time+'/'+$scope.searchform.date1);
	}

});

/**********************************controller*****************************************************/
mainApp.controller('create_registerController', function($scope,$filter, $rootScope, $http, $location) {
$scope.processregisterForm=function(){
	if($scope.loginForm==undefined){
	$scope.loginForm.first_name.$pristine=false;
	$scope.loginForm.last_name.$pristine=false;
	$scope.loginForm.password.$pristine=false;
	
	$scope.loginForm.email.$pristine=false;
	$scope.loginForm.phone.$pristine=false;
	}else{
     $http({   method  : 'POST',
		  url     : 'http://studysesh.co/api/register.php',
		  data    : $.param($scope.userForm),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) {
			if(data.status.code == 1){
			 $rootScope.isloggedIn = data.body.id; 	
		     $rootScope.userfullname=data.body.first_name;
			 $scope.registerError=data.status.message;
			 $location.path("/session"); 
			}else{
			 $scope.registerError=data.status.message;
			}if (!data.success) {
	         $scope.registerError=data.status.message;
			} else {
			
			}
		  });	

}}
});
/**********************************controller*****************************************************/
mainApp.controller('create_sessionController', function($scope,$filter, $rootScope, $http, $location) {


	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_professor.php',
		  data    : $.param({admin:$rootScope.isloggedIn}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.professor = data.body;
	}else{
		$('.spinner').stop().fadeOut('fast');
		$scope.findError=data.status.message;
	}
});

	$scope.getValue=function(){
	//alert($scope.userForm.professor);
	//$scope.getSelection = true;
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_university.php',
		  data    : $.param({admin:$rootScope.isloggedIn,professor:$scope.userForm.professor}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.courseoptions = data.body;
	}
});
	}
	
	
	$scope.getCourseValue=function(){
	//alert($scope.userForm.courses);
	//$scope.getTime = true;
	$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/all_time.php',
		  data    : $.param({admin:$rootScope.isloggedIn,course:$scope.userForm.courses,professor:$scope.userForm.professor}),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
	 })
		  .success(function(data) {
			if(data.status.code == 1){
			$scope.timeoptions = data.body;
	}
});
	}
	
	
	
	
	$scope.create_session=function(){	
	$scope.userForm.admin=$rootScope.isloggedIn;
	$scope.userForm.date = $filter('date')( $scope.userForm.date, 'yyyy-MM-dd HH:mm:ss');
	//$scope.userForm.date = $filter('date')( $scope.userForm.date, 'yyyy-MM-dd');
	
    $http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/create_session.php',
		  data    : $.param($scope.userForm),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) {
			if(data.status.code == 1){
			 $rootScope.isloggedIn = data.body.id; 	
		     $rootScope.userfullname = data.body.first_name;
			 $scope.loginError = data.status.message;
			 //alert("A new session has been created!");
			 navigator.notification.alert('Session created!', '', '', 'Ok');
			 $location.path("/session"); 
			}else{
			 $scope.loginError=data.status.message;
			}if (!data.success) {
	          $scope.loginError=data.status.message;
			}else {
			
			}
		  });	 
}		
});
/**********************************controller*****************************************************/
mainApp.controller('sessionController', function($scope, $rootScope, $http, $location) {
 $('.spinner').stop().fadeOut('fast');

 $scope.processloginForm = function() {
 alert('work in progress'); }
 function redirect(){
	 if(window.localStorage.getItem("admin")!='' || window.localStorage.getItem("admin")!=null || $rootScope.isloggedIn==undefined){
		$rootScope.isloggedIn=window.localStorage.getItem("admin");		
	 }else{
		$location.path("/home"); 
	 }
 }
 	$scope.logout=function(){ 
	//alert("logout"+window.localStorage.getItem("emailLogin"));
                window.localStorage.setItem("admin", '');
		        window.localStorage.setItem("fullname",'');				 
			    window.localStorage.setItem("fbid", '');
				window.localStorage.setItem("fblogin", '');
				window.localStorage.setItem("pic", '');
				window.localStorage.setItem("firstName", '');
				window.localStorage.setItem("lastName", '');
				if(window.localStorage.getItem("emailLogin") != '' && window.localStorage.getItem("pwdLogin") != '') {				
					var emailLocal = window.localStorage.getItem("emailLogin");	
					$rootScope.userForm1 = window.localStorage.getItem("emailLogin");		
					$('#email').val(emailLocal);					
					$('#pwd').val(window.localStorage.getItem("pwdLogin"));				
					$('#remember').attr('checked', 'checked');
					console.log(window.localStorage.getItem("emailLogin"));
					console.log(window.localStorage.getItem("pwdLogin"));
				}
			    $location.path("/home");
				$rootScope.isloggedIn=undefined;
		}
 document.addEventListener("backbutton", redirect, false);
  if(window.localStorage.getItem("admin")!='' || window.localStorage.getItem("admin")!=null || $rootScope.isloggedIn==undefined){
		$rootScope.isloggedIn=window.localStorage.getItem("admin");		
	 }else{
		$location.path("/home"); 
	 }
 	if(window.localStorage.getItem("institute")==''){
		$location.path("/setting"); 
	};
});
/**********************************controller*****************************************************/
mainApp.controller('loginController', function($scope, $rootScope, $http, $location,$timeout){
	
	$scope.facebookLogin=function(){  
	   facebookConnectPlugin.login( ["email"], 
        function (response) {
		facebookConnectPlugin.api( "me/?fields=id,name,email,picture", ["user_birthday"],
        function (response) {
		var length=response.name.split(' ').length;
		var firstName = response.name;
		var lastName = response.name;
			if(length>1){
			var fullName =response.name;
			firstName ='';
			lastName ='';
			firstName = fullName.split(' ').slice(0, -1).join(' ');
			lastName  =  fullName.split(' ').slice(-1).join(' ');
			}
			
			$http({   method  : 'POST',
			url     : 'http://studysesh.co/api/fblogin.php',
			data    : $.param({fbid:response.id,first_name:firstName,last_name:lastName,email:response.email,pic:response.picture.data.url }),  // pass in data as strings
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		     }).success(function(data) {
			if(data.status.code == 1){
			 $rootScope.isloggedIn = data.body.id; 	
			 $scope.loginError=data.status.message;
			 window.localStorage.setItem("fbid", data.body.fbid);
			 window.localStorage.setItem("fblogin", 1);
			 window.localStorage.setItem("institute", data.body.institute);
		     window.localStorage.setItem("admin", data.body.id);
		     window.localStorage.setItem("fullname", data.body.first_name+" "+data.body.last_name); 
			 $location.path("/session"); 
			}else{
			 $scope.registerError=data.status.message;
			}if (!data.success) {
	         $scope.registerError=data.status.message;
			} else {}
		  });},
          function (response) { 
		  //alert(JSON.stringify(response));
		  alert('Some error found during login with facebook.') }); 
		},function (response) {
		//alert(JSON.stringify(response));
		alert('Some error found during login with facebook.'); });

	}
  
	 if(window.localStorage.getItem("admin")!='' && window.localStorage.getItem("admin")!=null && $rootScope.isloggedIn==undefined){
		$rootScope.isloggedIn=window.localStorage.getItem("admin");
		$location.path("/session");
	 }
	 else{
	 $location.path("/home");
	 }	 
	
	
	 if(window.localStorage.getItem("emailLogin")!='' && window.localStorage.getItem("emailLogin")!=null ){	 
	 $scope.userForm = [];
	 $timeout(function() {
            $scope.userForm.email = window.localStorage.getItem("emailLogin");
			$scope.userForm.password = window.localStorage.getItem("pwdLogin");
			$scope.userForm.remember = true;
        });   
	
	 }
	
	 $('#remember_me').click(function() {
	 if( $(this).prop("checked") == true ) {
	  //if ($('#remember_me').is(':checked')) {
	 //alert("cheked"+$('#email').val());
	 window.localStorage.setItem('emailLogin', $('#email').val());
	 window.localStorage.setItem('pwdLogin', $('#pwd').val());
	// alert("get"+window.localStorage.getItem("emailLogin"));
	 /*$('#remember').attr('checked', 'checked');
	 $('#email').val(window.localStorage.getItem("emailLogin"));
	 $('#pwd').val(window.localStorage.getItem("pwdLogin"));*/
	 } 
	 else {
	  window.localStorage.setItem('emailLogin', '');
	  window.localStorage.setItem('pwdLogin', '');
	}
	 });         
	
	 
 $scope.loginError='';
 $scope.userForm ={};
 $scope.processloginForm = function() {
	 if( $scope.loginForm.$invalid==1){
		$scope.loginForm.email.$pristine=false;
		$scope.loginForm.password.$pristine=false;
		}else{
	    $scope.loginError='';		
		if(!$scope.userForm.email ) 
		//alert('Please Enter Email');
		navigator.notification.alert('Please Enter Email', '', '', 'Ok');		
		else if(!$scope.userForm.password)
		//alert('Please Enter Password'); 
		navigator.notification.alert('Please Enter Password', '', '', 'Ok');
		 $('.spinner').fadeIn('fast');
		$http({
		  method  : 'POST',
		  url     : 'http://studysesh.co/api/login.php',
		  data    : $.param($scope.userForm),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
		  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) {
			if(data.status.code == 1){			 
			 $rootScope.isloggedIn = data.body.id; 	
			 $scope.loginError=data.status.message;
			 window.localStorage.setItem("fblogin", false);
		     window.localStorage.setItem("admin", data.body.id);
		     window.localStorage.setItem("fullname", data.body.first_name+" "+data.body.last_name); 
			 $location.path("/session"); 
			}else{
			 $scope.loginError=data.status.message;
			  
			}if (!data.success) {
	          $scope.loginError=data.status.message;
			} else {			
			}
			 $('.spinner').stop().fadeOut('fast');
		  });		  
	}};
});

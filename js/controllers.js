var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog']);

phonecatControllers.controller('home', function($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
phonecatControllers.controller('user', function($scope, TemplateService, NavigationService, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("User");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = false;
    TemplateService.content = "views/user.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.user = [];
    $scope.userid = 0;
//    NavigationService.getUser().success(function(data, status) {
//        console.log(data);
//        $scope.user = data;
//    });
    NavigationService.getUser(function(data, status) {
        $scope.user = data;
    });

    //DELETE USER
    $scope.confDelete = function(){
        NavigationService.deleteUser(function(data, status){
            console.log(data);
        });
    }
    
    //OPENDELETE DIALOG BOX
    $scope.deletefun = function(id) {
        $.jStorage.set("deleteuser", id);
        ngDialog.open({
            template: 'http://localhost/notes/views/delete.html',
            closeByEscape: false,
            controller: 'user',
            closeByDocument: false
        });
    }
});
phonecatControllers.controller('edituser', function($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Update User");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/edituser.html";
    $scope.navigation = NavigationService.getnav();
    $scope.usr = $routeParams.id;
    
    console.log($routeParams.id);

    //DEVELOPMENT
    $scope.user = [];
    
    //get one user
    NavigationService.getOneUser($routeParams.id,function (data, status){
        $scope.user = data;
    });

    //DELETE USER
    $scope.confDelete = function(){
        NavigationService.deleteUser(function(data, status){
            console.log(data);
        });
    }
    
      //save user
    $scope.submitForm = function(){
        console.log($scope.user);
        NavigationService.saveUser($scope.user,function(data, status){
            console.log(data);
        });
    }
    
    //OPENDELETE DIALOG BOX
    $scope.deletefun = function(id) {
        $.jStorage.set("deleteuser", id);
        ngDialog.open({
            template: 'http://localhost/notes/views/delete.html',
            closeByEscape: false,
            controller: 'user',
            closeByDocument: false
        });
    }
});
phonecatControllers.controller('createuser', function($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create User");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = false;
    TemplateService.content = "views/createuser.html";
    $scope.navigation = NavigationService.getnav();
    
    console.log($routeParams.id);

    //DEVELOPMENT
    $scope.user = [];
    
    //save user
    $scope.submitForm = function(){
        console.log($scope.user);
        NavigationService.saveUser($scope.user,function(data, status){
            console.log(data);
        });
    }

});
phonecatControllers.controller('device', function($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create User");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/device.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.device = [];
    $scope.createdev = [];
    $scope.usr = $routeParams.id;
    $scope.createdev.user = $routeParams.id;
    
    //GET ALL DEVICE
    var allDevice = function(){
    NavigationService.getDevice($routeParams.id, function(data, status){
        console.log(data);
        $scope.device = data;
    });
    }
    
    allDevice();
    
    //save user
    $scope.createDevice = function(){
        console.log($scope.user);
        NavigationService.saveDevice($scope.createdev,function(data, status){
            console.log(data);
            allDevice();
        });
    }
    
    //update device
    $scope.updateDevice = function(dev){
        dev.user = $routeParams.id;
        NavigationService.editDevice(dev, function(data, status){
            console.log(data);
        });
    }
    
    //delete device
    $scope.deleteDevice = function(dev){
        dev.user = $routeParams.id;
        NavigationService.deleteDevice(dev, function(data, status){
            console.log(data);
            allDevice();
        });
    }

});
phonecatControllers.controller('folder', function($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create Folder");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/folder.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.Folder = [];
    $scope.createdev = [];
    $scope.usr = $routeParams.id;
    $scope.createdev.user = $routeParams.id;
    console.log($routeParams.id);
    
    //GET ALL Folder
    var allFolder = function(){
    NavigationService.getFolder($routeParams.id, function(data, status){
        console.log(data);
        $scope.Folder = data;
    });
    }
    
    allFolder();
    
    //save user
    $scope.createFolder = function(){
        console.log($scope.createdev);
        NavigationService.saveFolder($scope.createdev,function(data, status){
            console.log(data);
            allFolder();
        });
    }
    
    //update Folder
    $scope.updateFolder = function(dev){
        dev.user = $routeParams.id;
        NavigationService.editFolder(dev, function(data, status){
            console.log(data);
        });
    }
    
    //delete Folder
    $scope.deleteFolder = function(dev){
        dev.user = $routeParams.id;
        NavigationService.deleteFolder(dev, function(data, status){
            console.log(data);
            allFolder();
        });
    }

});
phonecatControllers.controller('feeds', function($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create Feeds");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/feeds.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.Feeds = [];
    $scope.createdev = [];
    $scope.usr = $routeParams.id;
    $scope.createdev.user = $routeParams.id;
    
    //GET ALL Feeds
    var allFeeds = function(){
    NavigationService.getFeeds($routeParams.id, function(data, status){
        console.log(data);
        $scope.Feeds = data;
    });
    }
    
    allFeeds();
    
    //save user
    $scope.createFeeds = function(){
        console.log($scope.user);
        NavigationService.saveFeeds($scope.createdev,function(data, status){
            console.log(data);
            allFeeds();
        });
    }
    
    //update Feeds
    $scope.updateFeeds = function(dev){
        dev.user = $routeParams.id;
        NavigationService.editFeeds(dev, function(data, status){
            console.log(data);
        });
    }
    
    //delete Feeds
    $scope.deleteFeeds = function(dev){
        dev.user = $routeParams.id;
        NavigationService.deleteFeeds(dev, function(data, status){
            console.log(data);
            allFeeds();
        });
    }

});
phonecatControllers.controller('share', function($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create Share");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/share.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.device = [];
    $scope.createdev = [];
    $scope.usr = $routeParams.id;
    $scope.createdev.user = $routeParams.id;
    
    //user drop down
    NavigationService.getUser(function(data, status) {
        $scope.user = data;
    });
    
    //GET ALL DEVICE
    var allDevice = function(){
    NavigationService.getDevice($routeParams.id, function(data, status){
        console.log(data);
        $scope.device = data;
    });
    }
    
    allDevice();
    
    //save user
    $scope.createDevice = function(){
        console.log($scope.user);
        NavigationService.saveDevice($scope.createdev,function(data, status){
            console.log(data);
            allDevice();
        });
    }
    
    //update device
    $scope.updateDevice = function(dev){
        dev.user = $routeParams.id;
        NavigationService.editDevice(dev, function(data, status){
            console.log(data);
        });
    }
    
    //delete device
    $scope.deleteDevice = function(dev){
        dev.user = $routeParams.id;
        NavigationService.deleteDevice(dev, function(data, status){
            console.log(data);
            allDevice();
        });
    }

});
phonecatControllers.controller('note', function($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create Note");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/note.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.device = [];
    $scope.createdev = [];
    $scope.usr = $routeParams.id;
    $scope.createdev.user = $routeParams.id;
    
    //GET ALL DEVICE
    var allDevice = function(){
    NavigationService.getDevice($routeParams.id, function(data, status){
        console.log(data);
        $scope.device = data;
    });
    }
    
    allDevice();
    
    //save user
    $scope.createDevice = function(){
        console.log($scope.user);
        NavigationService.saveDevice($scope.createdev,function(data, status){
            console.log(data);
            allDevice();
        });
    }
    
    //update device
    $scope.updateDevice = function(dev){
        dev.user = $routeParams.id;
        NavigationService.editDevice(dev, function(data, status){
            console.log(data);
        });
    }
    
    //delete device
    $scope.deleteDevice = function(dev){
        dev.user = $routeParams.id;
        NavigationService.deleteDevice(dev, function(data, status){
            console.log(data);
            allDevice();
        });
    }

});
phonecatControllers.controller('services', ['$scope', 'TemplateService', 'NavigationService',
    function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("Services");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    }
]);
phonecatControllers.controller('portfolio', ['$scope', 'TemplateService', 'NavigationService',
    function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("Portfolio");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    }
]);
phonecatControllers.controller('contact', ['$scope', 'TemplateService', 'NavigationService',
    function($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("Contact");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    }
]);


phonecatControllers.controller('headerctrl', ['$scope', 'TemplateService',
    function($scope, TemplateService) {
        $scope.template = TemplateService;
    }
]);
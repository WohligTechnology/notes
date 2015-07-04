var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog']);

phonecatControllers.controller('home', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
});
phonecatControllers.controller('user', function ($scope, TemplateService, NavigationService, ngDialog, $location) {
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

    var reload = function () {
        console.log("in load");
        NavigationService.getUser(function (data, status) {
            console.log(data);
            $scope.user = data;
        });
    }

    reload();


    //DELETE USER
    $scope.confDelete = function () {
        NavigationService.deleteUser(function (data, status) {
            console.log(data);
            //            reload();
            ngDialog.close();
            window.location.reload();

        });
    }

    $scope.getallusers = function () {
        console.log("in get all users");

    }

    //OPENDELETE DIALOG BOX
    $scope.deletefun = function (id) {
        $.jStorage.set("deleteuser", id);
        ngDialog.open({
            template: 'http://localhost/notes/views/delete.html',
            closeByEscape: false,
            controller: 'user',
            closeByDocument: false
        });
    }
});
phonecatControllers.controller('edituser', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
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
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        $scope.user = data;
    });

    //DELETE USER
    $scope.confDelete = function () {
        NavigationService.deleteUser(function (data, status) {
            console.log(data);
        });
    }

    //save user
    $scope.submitForm = function () {
        $scope.user.id = $scope.usr;
        console.log($scope.user);
        NavigationService.updateUser($scope.user, function (data, status) {
            console.log(data);
            $location.url("/user");
        });
    }

    //OPENDELETE DIALOG BOX
    $scope.deletefun = function (id) {
        $.jStorage.set("deleteuser", id);
        ngDialog.open({
            template: 'http://localhost/notes/views/delete.html',
            closeByEscape: false,
            controller: 'user',
            closeByDocument: false
        });
    }
});
phonecatControllers.controller('createuser', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create User");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = false;
    TemplateService.content = "views/createuser.html";
    $scope.navigation = NavigationService.getnav();
    $scope.isValidEmail = 1;

    $scope.email = function (myemail) {
        NavigationService.getOneemail(myemail, function (data, status) {
            console.log(data);
            if (data.value == true) {
                console.log("if");
                $scope.isValidEmail = 0;
            } else {
                console.log("else");
                $scope.isValidEmail = 1;
            }
        });
    }

    console.log($routeParams.id);

    //DEVELOPMENT
    $scope.user = [];

    //save user
    $scope.submitForm = function () {
        console.log($scope.user);
        if ($scope.isValidEmail == 1) {
            NavigationService.saveUser($scope.user, function (data, status) {
                console.log(data);
                $location.url("/user");
            });
        } else {
            console.log("kgfhsdv");
        }
    }

});
phonecatControllers.controller('device', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
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
    var allDevice = function () {
        NavigationService.getDevice($routeParams.id, function (data, status) {
            console.log(data);
            $scope.device = data;
        });
    }

    allDevice();

    //save device
    $scope.createDevice = function (createdev) {
        console.log($scope.createdev);
        createdev.user = $routeParams.id;
        NavigationService.saveDevice(createdev, function (data, status) {
            $scope.createdev = {};
            console.log(data);
            allDevice();
        });
    }

    //update device
    $scope.updateDevice = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.editDevice(dev, function (data, status) {
            console.log(data);
        });
    }

    //delete device
    $scope.deleteDevice = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.deleteDevice(dev, function (data, status) {
            console.log(data);
            allDevice();
        });
    }

});
phonecatControllers.controller('folder', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
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
    var allFolder = function () {
        NavigationService.getFolder($routeParams.id, function (data, status) {
            console.log(data);
            $scope.Folder = data;
            console.log($scope.Folder);
        });
    }

    allFolder();

    //save user
    $scope.createFolder = function (createdev) {
        console.log($scope.createdev);
        createdev.user = $routeParams.id;
        NavigationService.saveFolder(createdev, function (data, status) {
            console.log(data);
            $scope.createdev = [];
            allFolder();
        });
    }

    //update Folder
    $scope.updateFolder = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.editFolder(dev, function (data, status) {
            console.log(data);
        });
    }

    //delete Folder
    $scope.deleteFolder = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.deleteFolder(dev, function (data, status) {
            console.log(data);
            allFolder();
        });
    }

});
phonecatControllers.controller('feeds', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
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
    var allFeeds = function () {
        NavigationService.getFeeds($routeParams.id, function (data, status) {
            console.log(data);
            $scope.Feeds = data;
        });
    }

    allFeeds();

    //save user
    $scope.createFeeds = function (createdev) {
        console.log($scope.user);
        createdev.user = $routeParams.id;
        NavigationService.saveFeeds($scope.createdev, function (data, status) {
            console.log(data);
            $scope.createdev = [];
            allFeeds();
        });
    }

    //update Feeds
    $scope.updateFeeds = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.editFeeds(dev, function (data, status) {
            console.log(data);
        });
    }

    //delete Feeds
    $scope.deleteFeeds = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.deleteFeeds(dev, function (data, status) {
            console.log(data);
            allFeeds();
        });
    }

});
phonecatControllers.controller('share', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create Share");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/share.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.usr = $routeParams.id;
    $scope.device = [];
    $scope.createdev = [];
    //    $scope.usr = $routeParams.id;
    $scope.createdev.user = $routeParams.id;

    //user drop down
    NavigationService.getUser(function (data, status) {
        $scope.user = data;
        $scope.user.unshift({
            _id: "1",
            username: "select"
        });
    });
    NavigationService.getNote($routeParams.id, function (data, status) {
        $scope.note = data;
    });

    //GET ALL DEVICE
    var allShare = function () {
        NavigationService.getShare($routeParams.id, function (data, status) {
            console.log(data);
            $scope.share = data;
        });
    }

    allShare();

    //save user
    $scope.createShare = function (createdev) {
        console.log($scope.user);
        createdev.user = $routeParams.id;
        NavigationService.saveShare(createdev, function (data, status) {
            console.log(data);
            $scope.createdev = [];
            allShare();
        });
    }

    //update device
    $scope.updateshare = function (dev) {
        dev.user = $routeParams.id;
        //        console.log(data);
        NavigationService.editShare(dev, function (data, status) {
            console.log(data);
        });
    }

    //delete device
    $scope.deleteshare = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.deleteShare(dev, function (data, status) {
            console.log(data);
            allShare();
        });
    }

});
phonecatControllers.controller('note', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams) {
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

    //create tag
    $scope.addcreateTag = function (crdv) {
        console.log(crdv.tags)
        if (!crdv.tags) {
            crdv.tags = [{
                "value": ""
        }];
        } else {
            crdv.tags.push({
                "value": ""
            });
        }
    };
    $scope.removecreateTag = function (i, dev) {
        dev.splice(i, 1);
    };
    //

    //update tag
    $scope.addupdateTag = function (dev) {
        if (!dev.note.tags) {
            dev.note.tags = [{
                "value": ""
        }];
        } else {
            dev.note.tags.push({
                "value": ""
            });
        }
    };
    $scope.removeupdateTag = function (i, dev) {
        dev.note.tags.splice(i, 1);
    };

    //GET ALL DEVICE
    NavigationService.getFolder($routeParams.id, function (data, status) {
        console.log(data);
        $scope.folder = data;
    });

    var allNote = function () {
        NavigationService.getNote($routeParams.id, function (data, status) {
            $scope.Note = data;
            console.log(data);
        });
    }

    allNote();

    //save user
    $scope.createnote = function (createdev) {
        createdev.user = $routeParams.id;
        NavigationService.saveNote($scope.createdev, function (data, status) {
            console.log(data);
            $scope.createdev = [];
            $scope.tagcreateData = [];
            allNote();
        });
    }

    //update device
    $scope.updatenote = function (dev) {
        dev.user = $routeParams.id;
        console.log(dev);
        NavigationService.editNote(dev, function (data, status) {
            console.log(data);
        });
    }

    //delete device
    $scope.deletenote = function (dev) {
        dev.user = $routeParams.id;
        NavigationService.deleteNote(dev, function (data, status) {
            console.log(data);
            allNote();
        });
    }


    //create noteelements
    $scope.addcreateNoteElem = function (crdv) {
        if (!crdv.noteelements) {
            crdv.noteelements = [{
                "note": "",
                "type": "",
                "details": "",
                "order": ""
        }];
        } else {
            crdv.noteelements.push({
                "note": "",
                "type": "",
                "details": "",
                "order": ""
            });
        }
    };
    $scope.removecreateNoteElem = function (i, dev) {
        dev.splice(i, 1);
    };
    //

    //update noteelements
    $scope.addupdateNoteElem = function (dev) {
        if (!dev.note.noteelements) {
            dev.note.noteelements = [{
                "note": "",
                "type": "",
                "details": "",
                "order": ""
        }];
        } else {
            dev.note.noteelements.push({
                "note": "",
                "type": "",
                "details": "",
                "order": ""
            });
        }
    };
    $scope.removeupdateNoteElem = function (i, dev) {
        dev.note.tags.splice(i, 1);
    };
});

phonecatControllers.controller('headerctrl', ['$scope', 'TemplateService',
    function ($scope, TemplateService) {
        $scope.template = TemplateService;
    }
]);
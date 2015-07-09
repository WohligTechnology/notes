var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog']);

phonecatControllers.controller('home', function ($scope, TemplateService, NavigationService, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = "";
    TemplateService.content = "views/dashboard.html";
    TemplateService.list = false;
    $scope.navigation = NavigationService.getnav();
    NavigationService.countUsers(function (data, status) {
        if (data.value == false) {
            data = 0;
        }
        $scope.user = data;
    });
    NavigationService.countNotes(function (data, status) {
        if (data.value == false) {
            data = 0;
        }
        $scope.notes = data;
    });
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
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = "20";
    $scope.pagedata.search = "";
    $scope.number = 100;
    $scope.getNumber = function (num) {
        return new Array(num);
    }

    //    NavigationService.getUser().success(function(data, status) {
    //        console.log(data);
    //        $scope.user = data;
    //    });

    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        NavigationService.getlimitedUsers(pagedata, function (data, status) {
            console.log(data);
            $scope.user = data;
            $scope.pages = [];
            var newclass = "";
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = "active";
                } else {
                    newclass = "";
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }

    $scope.reload($scope.pagedata);


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
            template: 'views/delete.html',
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
    TemplateService.submenu = "views/submenu.html";
    TemplateService.list = true;
    TemplateService.content = "views/edituser.html";
    $scope.navigation = NavigationService.getnav();
    $scope.usr = $routeParams.id;

    console.log($routeParams.id);

    //DEVELOPMENT
    $scope.user = [];

    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
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
            console.log("not valid");
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

    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
    });

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

    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
    });
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

    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
    });
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

    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
    });

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
phonecatControllers.controller('note', function ($scope, TemplateService, NavigationService, ngDialog, $location, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Note");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/note.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.note = [];
    $scope.noteid = 0;
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = "20";
    $scope.pagedata.search = "";
    $scope.pagedata.user = $routeParams.id;
    $scope.number = 100;
    $scope.usr = $routeParams.id;
    console.log($scope.pagedata);
    $scope.getNumber = function (num) {
        return new Array(num);
    }


    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
    });

    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        console.log(pagedata);
        NavigationService.getlimitedNotes(pagedata, function (data, status) {
            console.log(data);
            $scope.note = data;
            $scope.pages = [];
            var newclass = "";
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = "active";
                } else {
                    newclass = "";
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }

    $scope.reload($scope.pagedata);

    //DELETE Note
    $scope.confDelete = function () {
        NavigationService.deleteNote(function (data, status) {
            console.log(data);
            ngDialog.close();
            window.location.reload();

        });
    }
    $scope.deletefun = function (id, user) {
        $.jStorage.set("deleteuser", user);
        $.jStorage.set("deletenote", id);
        ngDialog.open({
            template: 'views/deletenote.html',
            closeByEscape: false,
            controller: 'note',
            closeByDocument: false
        });
    }
});
phonecatControllers.controller('editnote', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Update Note");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/editnote.html";
    $scope.navigation = NavigationService.getnav();
    $scope.note = $routeParams.id;
    $scope.usr = $routeParams.user;


    //get one user
    NavigationService.getOneUser($routeParams.user, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
    });


    NavigationService.getOneNote($scope.note, $scope.usr, function (data, status) {
        console.log(data);
        $scope.Note = data;
    });

    NavigationService.getFolder($routeParams.user, function (data, status) {
        $scope.folder = data;
    });

    $scope.addupdateTag = function (Note) {
        if (!Note.tags) {
            Noteote.tags = [{
                "value": ""
        }];
        } else {
            Note.tags.push({
                "value": ""
            });
        }
    };
    $scope.removeupdateTag = function (i, Note) {
        Note.tags.splice(i, 1);
    };

    $scope.addupdateNoteElem = function (Note) {
        if (!Note.noteelements) {
            Note.noteelements = [{
                "type": "",
                "details": "",
                "order": ""
        }];
        } else {
            Note.noteelements.push({
                "type": "",
                "details": "",
                "order": ""
            });
        }
    };
    $scope.removeupdateNoteElem = function (i, Note) {
        Note.noteelements.splice(i, 1);
    };
    $scope.updatenote = function (Note) {
        Note.user = $scope.usr;
        Note._id = $scope.note;
        console.log(Note);
        NavigationService.editNote(Note, function (data, status) {
            console.log(data);
            $location.url("/note/" + $scope.usr);
        });
    }

});
phonecatControllers.controller('createnote', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create Note");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = true;
    TemplateService.content = "views/createnote.html";
    $scope.navigation = NavigationService.getnav();
    $scope.usr = $routeParams.id;

    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.devicecount = data.device;
        $scope.foldercount = data.folder;
        $scope.feedcount = data.feed;
        $scope.sharecount = data.share;
        $scope.notecount = data.note;
    });

    NavigationService.getFolder($routeParams.id, function (data, status) {
        console.log(data);
        $scope.folder = data;
    });

    $scope.createdev = [];
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

    $scope.addcreateNoteElem = function (crdv) {
        if (!crdv.noteelements) {
            crdv.noteelements = [{
                "type": "",
                "details": "",
                "order": ""
                        }];
        } else {
            crdv.noteelements.push({
                "type": "",
                "details": "",
                "order": ""
            });
        }
    };
    $scope.removecreateNoteElem = function (i, dev) {
        dev.splice(i, 1);
    };
    $scope.createnote = function (createdev) {
        createdev.user = $routeParams.id;
        NavigationService.saveNote($scope.createdev, function (data, status) {
            console.log(data);
            $scope.createdev = [];
            $location.url("/note/" + $scope.usr);
        });
    }
});
phonecatControllers.controller('headerctrl', ['$scope', 'TemplateService',
    function ($scope, TemplateService) {
        $scope.template = TemplateService;
    }
]);
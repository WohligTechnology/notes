var adminurl = "http://localhost:1337/";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        link:"#/home",
        subnav: []
    }, {
        name: "User",
        active: "",
        link:"#/user",
        subnav: []
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for(var i=0;i<navigation.length;i++) {
                if(navigation[i].name==menuname)
                {
                    navigation[i].classis="active";
                }
                else {
                    navigation[i].classis="";
                }
            }
            return menuname;
        },
        getUser: function(callback){
            $http.post(adminurl + "user/find").success(callback);
        },
        getFolder: function(callback){
            $http.post(adminurl + "folder/find").success(callback);
        },
        getDevice: function(id,callback){
            $http({
                url: adminurl + "device/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        getFolder: function(id,callback){
            $http({
                url: adminurl + "folder/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        getFeeds: function(id,callback){
            $http({
                url: adminurl + "feed/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        getShare: function(id,callback){
            $http({
                url: adminurl + "share/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        deleteUser: function(callback){
//            $http.get(adminurl + "user/find?_id="+$.jStorage.get("deleteuser")).success(callback);
            $http({
                url: adminurl + "user/delete",
                method: "POST",
                data: {
//                    "id": $.jStorage.get("deleteuser")
                    "_id": $.jStorage.get("deleteuser")
                }
            }).success(callback);
        },
        getOneUser: function(id, callback){
            $http({
                url: adminurl + "user/findone",
                method: "POST",
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        saveDevice: function(data, callback){
            $http({
                url: adminurl + "device/save",
                method: "POST",
                data: {
                    "user":data.user,
                    "OS":data.os,
                    "pushid":data.pushid
                }
            }).success(callback);
        },
        editDevice: function(data, callback){
            $http({
                url: adminurl + "device/save",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user,
                    "os":data.os,
                    "pushid":data.pushid
                }
            }).success(callback);
        },
        deleteDevice: function(data, callback){
            $http({
                url: adminurl + "device/delete",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user
                }
            }).success(callback);
        },
        saveFolder: function(data, callback){
            $http({
                url: adminurl + "folder/save",
                method: "POST",
                data: {
                    "user":data.user,
                    "name":data.name
                }
            }).success(callback);
        },
        editFolder: function(data, callback){
            $http({
                url: adminurl + "folder/save",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user,
                    "name":data.name
                }
            }).success(callback);
        },
        deleteFolder: function(data, callback){
            $http({
                url: adminurl + "folder/delete",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user
                }
            }).success(callback);
        },
        saveFeeds: function(data, callback){
            $http({
                url: adminurl + "feed/save",
                method: "POST",
                data: {
                    "user":data.user,
                    "title":data.title,
                    "text":data.text
                }
            }).success(callback);
        },
        editFeeds: function(data, callback){
            $http({
                url: adminurl + "feed/save",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user,
                    "title":data.title,
                    "text":data.text
                }
            }).success(callback);
        },
        deleteFeeds: function(data, callback){
            $http({
                url: adminurl + "feed/delete",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user
                }
            }).success(callback);
        },
        saveShare: function(data, callback){
            $http({
                url: adminurl + "share/save",
                method: "POST",
                data: {
                    "user":data.user,
                    "userfrom":data.userfrom,
                    "userto":data.userto,
                    "note":data.note,
                    "status":data.status
                }
            }).success(callback);
        },
        editShare: function(data, callback){
            $http({
                url: adminurl + "share/save",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user,
                    "userfrom":data.userfrom,
                    "userto":data.userto,
                    "note":data.note,
                    "status":data.status
                }
            }).success(callback);
        },
        deleteShare: function(data, callback){
            $http({
                url: adminurl + "share/delete",
                method: "POST",
                data: {
                    "_id":data._id,
                    "user":data.user
                }
            }).success(callback);
        },
        saveUser: function(data, callback){
            console.log(data);
//            $http.get(adminurl + "user/find?_id="+$.jStorage.get("deleteuser")).success(callback);
            $http({
                url: adminurl + "user/save",
                method: "POST",
                data: {
                    "username":data.username,
                    "firstname":data.firstname,
                    "lastname":data.lastname,
                    "email":data.email,
                    "password":data.password,
                    "fbid":data.fbid,
                    "gid":data.gid,
                    "passcode":data.passcode
                }
            }).success(callback);
        },
        updateUser: function(data, callback){
//            $http.get(adminurl + "user/find?_id="+$.jStorage.get("deleteuser")).success(callback);
            $http({
                url: adminurl + "user/save",
                method: "POST",
                data: {
                    "_id":data.id,
                    "username":data.username,
                    "firstname":data.firstname,
                    "lastname":data.lastname,
                    "email":data.email,
                    "fbid":data.fbid,
                    "gid":data.gid,
                    "passcode":data.passcode
                }
            }).success(callback);
        }
        
    }
});
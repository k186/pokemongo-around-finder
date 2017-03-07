/**
 * Created by K186 on 2016/7/25.
 */
//ajax----------------------------------------------------
function ajaxFetchData(param){
    var url = param.url,
        returnObj = {};
    if(!url){
        returnObj.code = '9996';
        returnObj.msg = 'router error';
        return;
    }
    $.ajax({
        type:"GET",
        url: url,
        dataType: 'json',
        async: true,
        cache: true,
        data: param.data,
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            if (typeof data === 'string') {
                returnObj = JSON.parse(data);
            } else {
                returnObj = data;
            }
            if (undefined != param.callback) param.callback(returnObj);
        },
        error: function () {
            if (undefined != param.callback) param.callback({code: 'error', msg: 'request error ,try again later'});
        }
    });
}
//scroll-----------------------------------------------------
function pullDownAction () {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!


        myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}
function pullUpAction () {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!


        myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}
function LoadiScroll() {
    var myScroll = new iScroll('wrapper', {
        useTransition: false,
        bounce:true
    });
}
//timechange
function getDate(times){
    var v = times;
    if (/^(-)?\d{1,10}$/.test(v)) {
        v = v * 1000;
    } else if (/^(-)?\d{1,13}$/.test(v)) {
        v = v * 1;
    } else {
        alert("时间戳格式不正确");
        return;
    }
    var dateObj = new Date(v);
    var UnixTimeToDate = /*dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + ' ' + */dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
    return UnixTimeToDate
}
//distance
function GetDistance(lat1, lng1, lat2, lng2) {
    if (( Math.abs(lat1) > 90  ) || (  Math.abs(lat2) > 90 )) {
        document.getElementById("warning").innerHTML = ("兄台，这哪里是纬度啊？分明是想忽悠我嘛");
        show("warning");
        return "耍我？拒绝计算！";
    } else {

    }
    if (( Math.abs(lng1) > 180  ) || (  Math.abs(lng2) > 180 )) {

        show("warning");
        document.getElementById("warning").innerHTML = ("兄台，这哪里是经度啊？分明是想忽悠我嘛");
        return "耍我？拒绝计算！";
    } else {

    }
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
//id2Name
function Id2Name(obj1,obj2,callback){
    var len=obj1.length;
    for(i=0;i<len;i++){
        if(obj2[obj1[i].pokemonId]){
            obj1[i].uid=obj2[obj1[i].pokemonId]
        }
        if(obj1[i].expiration_time){
            obj1[i].expiration_time=getDate(obj1[i].expiration_time);
        }
    }
    if(callback){
        callback(obj1);
    }
}

//getGPS
function getLocation() {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{x.innerHTML="Geolocation is not supported by this browser.";}
}
function showPosition(position) {
    $('#latitude').val(position.coords.latitude);
    $('#longitude').val(position.coords.longitude);
}

//load doT
function LoadTpl(TplId, ContainerId, ObjectData) {
    var interHtml = doT.template($(TplId).text());
    $(ContainerId).html(interHtml(ObjectData));
}
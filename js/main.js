/**
 * Created by K186 on 2016/7/24.
 */
$(document).ready(function(){
    //input window
    $('#GoInput').on('click',function(){
        $('#inputLocation').toggleClass('show');
        $(this).toggleClass('in')
    });

    $('#latitude').focus(function (){
      $('#GoInput').css('display','none')
    });
    $('#longitude').focus(function (){
        $('#GoInput').css('display','none')
    });
    $('#latitude').blur(function (){
        $('#GoInput').css('display','block')
    });
    $('#longitude').blur(function (){
        $('#GoInput').css('display','block')
    });
    //getGPS
    $('#GPS').on('click',function(){
        getLocation();
    });
    //submit
    var PokemoData={
            Lng:"",//经度
            Lat:"",//纬度
            type: 1//1重新扫描 2 获取
        },
        InputLng=$('#longitude'),
        InputLat=$('#latitude'),
        pokemons;
    //获取精灵名称
    ajaxFetchData({
        url:'../php/pokemon.json',
        callback:function(data){
            if(data){
                pokemonName=data;
            }
        }
    });
    $('#submit').click(function(){
        //PokemoData.type=$('#methods input[name="method"]:checked ').val();
        PokemoData.Lng=InputLng.val().replace(/\s+/g,"");
        PokemoData.Lat=InputLat.val().replace(/\s+/g,"");
        //只能输入数字的正则
        ajaxFetchData({
            url:'http://k186studio.com/pokemon?type=1&lat='+PokemoData.Lat+'&lng='+PokemoData.Lng,
            //url:'../../php/moke.json',
            callback: function (data) {
                if (data.status == 'success')
                {
                    pokemons=data.pokemon;
                    Id2Name(pokemons,pokemonName,function(){
                        //load doT
                        var data=arguments[0];
                        LoadTpl('#listTpl','#box-list',pokemons);
                        //when tempaltes is complete then load iscroll
                        LoadiScroll();
                        $('#inputLocation').toggleClass('show');
                        $('.list-right').on('click',function(){
                            var location='',
                                urls='https://www.google.com/maps?q=';
                            location=$(this).children().attr('google');
                            window.location.href=encodeURI(urls+location)
                        });
                    });
                }
                else {

                }
            }
        });
    });
    //把数据中的ID 换成名字
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
    //间隔拉稀有
    /* setTimeout(function () {
         ajaxFetchData({
             url:'http://pokesnipers.com/api/v1/pokemon.json',
             callback: function (data) {
                 if (data.results.length!=0)
                 {
                     var unusualpokemon=data.results;
                     var unusuallArr=[];
                     var unusuallID=0;

                     for(var i=0;i<unusualpokemon.length;i++){
                         var locationArr=unusualpokemon[i].coords.split(",");
                         var unusual={
                             expiration_time: unusualpokemon[i].until,
                             name: unusualpokemon[i].name,
                             latitude: locationArr[0],
                             longitude: locationArr[1],
                             id:''
                         };
                         for(key in pokemonName){
                             if(unusualpokemon[i].name==key){
                                 unusual.id=key
                             }
                         }
                         unusuallArr.push(unusual)
                     }
                    //load T
                     LoadTpl('#unusualTpl','#unusual-box',unusuallArr);
                 }
                 else {

                 }
             }
         });
     },30000)*/

    //filter
    function pokemonFilter(obj,arr,callback){
        var len=obj.length;
        var filterLen=arr.length;
        var filterData=[];
        for(i=0;i<len;i++){
            for(k=0;i<filterLen;k++){
                if(obj[i].pokemonId==arr[i]){
                    filterData.push(obj[i])
                }
            }
        }
        if(callback){
            callback(filterData);
        }
    }

});

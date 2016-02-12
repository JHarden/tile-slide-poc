var tyloren = function(object,initialize){

    var sw=[190,150],mw=[280,220],lw=[380,290],speed=100,singularity=true,toggle_small='small_size',toggle_medium='medium_size',toggle_large='large_size',toggle_reset='reset';
    if(initialize !== undefined){
        sw = initialize.small !== undefined ? initialize.small : sw;
        mw = initialize.medium !== undefined ? initialize.medium : mw;
        lw = initialize.large !== undefined ? initialize.large : lw;
        speed = initialize.speed !== undefined ? initialize.speed : speed;
        singularity = initialize.singularity !== undefined ? initialize.singularity : singularity;
        toggle_small = initialize.toggle_handlers.small != undefined ? initialize.toggle_handlers.small : toggle_small;
        toggle_medium = initialize.toggle_handlers.medium != undefined ? initialize.toggle_handlers.medium : toggle_medium;
        toggle_large = initialize.toggle_handlers.large != undefined ? initialize.toggle_handlers.large : toggle_large;
        toggle_reset = initialize.toggle_handlers.reset != undefined ? initialize.toggle_handlers.reset : toggle_reset;
    }

    var container_width = object.getBoundingClientRect().width;
    console.log(container_width);
    var outer_list = object.children;
    var singularityList = document.getElementsByClassName('photo');

    document.getElementById(toggle_small).addEventListener('click',setSmallTiles,false);
    document.getElementById(toggle_medium).addEventListener('click',setMediumTiles,false);
    document.getElementById(toggle_large).addEventListener('click',setLargeTiles,false);
    document.getElementById(toggle_reset).addEventListener('click',resetTiles,false);

    var small_thumb_list, med_thumb_list,large_thumb_list;
    function init2dArray(countPerRow,xdim,ydim){
        //init the new array
        var arrayLength = outer_list.length;
        var myList;
        switch (countPerRow){
            case 6:
                small_thumb_list = new Array(document.getElementsByClassName('photo-tile').length);
                myList = small_thumb_list;
                break;
            case 4:
                med_thumb_list = new Array(document.getElementsByClassName('photo-tile').length);
                myList = med_thumb_list;
                break;
            case 3:
                large_thumb_list = new Array(document.getElementsByClassName('photo-tile').length);
                myList = large_thumb_list;
                break;
        }
        //outer array contains number of rows
        var count = 0;
        for(var i = 0; i<Math.ceil(arrayLength/countPerRow);i++){

            myList[i] = new Array(countPerRow);
            //inner array will contain coords. j will break every 6 elements
            for(var j =0; j<countPerRow;j++){
                myList[i][j] = {
                    x: (xdim *(j)),
                    y: (ydim *(i))
                };
                count++;
                if(count === arrayLength){
                    break;
                }
            }
        }
        switch (countPerRow){
            case 6:
                return small_thumb_list;
            case 4:
                return  med_thumb_list;
            case 3:
                return large_thumb_list;
        }
    }
    small_thumb_list = init2dArray(6,sw[0],sw[1]);
    med_thumb_list = init2dArray(4,mw[0],mw[1]);
    large_thumb_list = init2dArray(3,lw[0],lw[1]);

    function doTranslate(counter,array_length){
        var thumb_list;
        if(array_length === 6){
            thumb_list = small_thumb_list;
        }else if(array_length === 4){
            thumb_list = med_thumb_list;
        }else if(array_length === 3){
            thumb_list = large_thumb_list;
        }
        var dest_xcoord = (Math.ceil((counter+1)/array_length))-1;
        var dest_ycoord = 0;
        if(((counter+1)%array_length)===0){
            dest_ycoord = array_length-1;
        }else{
            dest_ycoord = ((counter+1)%array_length)-1;
        }
        var destination_coords = thumb_list[dest_xcoord][dest_ycoord];
        //do the thing
        outer_list[counter].style="transform:translate3d("+(destination_coords.x)+"px,"+(destination_coords.y)+"px,0);";
    }

    function setNewCoordinates(element,counter){
        //new classname;
        if(element.className === "photo-tile column-six"){
            doTranslate(counter,6);
        }else if(element.className === "photo-tile column-four"){
            doTranslate(counter,4);
        }else if(element.className === "photo-tile column-three"){
            doTranslate(counter,3);
        }
    }

    function doIntervalClassChange(classname){
        var counter = outer_list.length-1;
        var i = setInterval(function(){
            outer_list[counter].className = classname;
            setNewCoordinates(outer_list[counter],counter);
            counter--;
            if(counter < 0) {
                clearInterval(i);
            }
        }, speed);
    }
    function setSmallTiles(){
        doIntervalClassChange('photo-tile column-six');
    }
    function setMediumTiles(){
        doIntervalClassChange('photo-tile column-four');
    }
    function setLargeTiles(){
        doIntervalClassChange('photo-tile column-three');
    }
    function resetTiles(){
        for(var i=0;i<singularityList.length;i++){
            singularityList[i].classList.remove('singularity');
            singularityList[i].classList.remove('sub-singularity');
        }
    }
    function onLoadSort(){
        for(var i = outer_list.length-1;i>0;i--) {
            var counter = i;
            var origin_xcoord = (Math.ceil((counter + 1) / 6)) - 1;
            var origin_ycoord = 0;

            if (((counter + 1) % 6) === 0) {
                origin_ycoord = 5;
            } else {
                origin_ycoord = ((counter + 1) % 6) - 1;
            }
            var origin_coords = small_thumb_list[origin_xcoord][origin_ycoord];

            Object.assign(
                outer_list[counter].style,
                {
                    width:"160px",
                    height:"120px",
                    transform:"translate(" + (origin_coords.x) + "px," + (origin_coords.y) + "px)"
                }
            );
        }
    }onLoadSort();
    //singularity animation
    function doSubSingularity(){
        for(var i=0;i<singularityList.length;i++){
            console.log(i);
            if(!((singularityList[i].className).match(/(?:^|\s)singularity(?!\S)/))){
                console.log('match');
                singularityList[i].className += " sub-singularity";
            }
        }
    }
    function doSingularity(){
        this.className += " singularity";
        doSubSingularity();
    }

    function initSingularity(){
        if(singularity){
            for(var i=0;i<singularityList.length;i++){
                singularityList[i].addEventListener('click',doSingularity,false);
            }
        }
    }initSingularity();

};
//tyloren(document.getElementById('photos_list'));

tyloren(document.getElementById('photos_list'),{
    small:[190,150], // small[8], medium[5], large[2]
    medium:[280,220],
    large:[380,290],
    speed:100,
    singularity:true,
    toggle_handlers:{
        small:'small_size',
        medium:'medium_size',
        large:'large_size',
        reset:'reset'
    }
});

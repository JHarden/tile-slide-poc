var tyloren = function(object,initialize){

    var padding=15,
        tpr_small = 6,
        tpr_med = 4,
        tpr_lrg = 3,
        speed=100,
        singularity=true,
        toggle_small='small_size',
        toggle_medium='medium_size',
        toggle_large='large_size',
        toggle_reset='reset';
    if(initialize !== undefined){
        tpr_small = initialize.small !== undefined ? initialize.small : tpr_small;
        tpr_med = initialize.medium !== undefined ? initialize.medium : tpr_med;
        tpr_lrg = initialize.large !== undefined ? initialize.large : tpr_lrg;
        speed = initialize.speed !== undefined ? initialize.speed : speed;
        padding = initialize.padding !== undefined ? initialize.padding : padding;
        singularity = initialize.singularity !== undefined ? initialize.singularity : singularity;
        toggle_small = initialize.toggle_handlers.small != undefined ? initialize.toggle_handlers.small : toggle_small;
        toggle_medium = initialize.toggle_handlers.medium != undefined ? initialize.toggle_handlers.medium : toggle_medium;
        toggle_large = initialize.toggle_handlers.large != undefined ? initialize.toggle_handlers.large : toggle_large;
        toggle_reset = initialize.toggle_handlers.reset != undefined ? initialize.toggle_handlers.reset : toggle_reset;
    }
    var container_width = object.getBoundingClientRect().width-padding,
        sw=[container_width/tpr_small,container_width/tpr_small],
        mw=[container_width/tpr_med,container_width/tpr_med],
        lw=[container_width/tpr_lrg,container_width/tpr_lrg];
    var outer_list = object.children;

   var singularityList = [];


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
            case tpr_small:
                small_thumb_list = new Array(document.getElementsByClassName('photo-tile').length);
                myList = small_thumb_list;
                break;
            case tpr_med:
                med_thumb_list = new Array(document.getElementsByClassName('photo-tile').length);
                myList = med_thumb_list;
                break;
            case tpr_lrg:
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
                    x: (padding) + (xdim *(j)),
                    y: (padding) + (ydim *(i))
                };
                count++;
                if(count === arrayLength){
                    break;
                }
            }
        }
        switch (countPerRow){
            case tpr_small:
                return small_thumb_list;
            case tpr_med:
                return  med_thumb_list;
            case tpr_lrg:
                return large_thumb_list;
        }
    }
    small_thumb_list = init2dArray(tpr_small,sw[0],sw[1]);
    med_thumb_list = init2dArray(tpr_med,mw[0],mw[1]);
    large_thumb_list = init2dArray(tpr_lrg,lw[0],lw[1]);

    function doTranslate(counter,array_length){
        var thumb_list, cw;
        if(array_length === tpr_small){
            thumb_list = small_thumb_list;
            cw = sw;
        }else if(array_length === tpr_med){
            thumb_list = med_thumb_list;
            cw = mw;
        }else if(array_length === tpr_lrg){
            thumb_list = large_thumb_list;
            cw = lw;
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
        Object.assign(
            outer_list[counter].style,
            {
                width:(Math.round(cw[0]-padding))+"px",
                height:(Math.round(cw[1]-padding))+"px",
                transform:"translate(" + (destination_coords.x) + "px," + (destination_coords.y) + "px)"
            }
        );
        //outer_list[counter].style="transform:translate3d("+(destination_coords.x)+"px,"+(destination_coords.y)+"px,0);";
    }

    function setNewCoordinates(element,counter){
        //new classname;
        if(element.className === "photo-tile column-six"){
            doTranslate(counter,tpr_small);
        }else if(element.className === "photo-tile column-four"){
            doTranslate(counter,tpr_med);
        }else if(element.className === "photo-tile column-three"){
            doTranslate(counter,tpr_lrg);
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
        for(var i = outer_list.length;i>0;i--) {

            var counter = i-1;
            var origin_xcoord = (Math.ceil((counter + 1) / tpr_small)) - 1;
            var origin_ycoord = 0;

            if (((counter + 1) % tpr_small) === 0) {
                origin_ycoord = tpr_small-1;
            } else {
                origin_ycoord = ((counter + 1) % tpr_small) - 1;
            }
            var origin_coords = small_thumb_list[origin_xcoord][origin_ycoord];
            Object.assign(
                outer_list[counter].style,
                {
                    width:(Math.round(sw[0]-padding))+"px",
                    height:(Math.round(sw[1]-padding))+"px",
                    transform:"translate(" + (origin_coords.x) + "px," + (origin_coords.y) + "px)"
                }
            );
        }
    }onLoadSort();

    //singularity animation
    function doSubSingularity(){
        for(var i=0;i<singularityList.length;i++){
            if(!((singularityList[i].className).match(/(?:^|\s)singularity(?!\S)/))){
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
            for(var i=0;i<outer_list.length;i++){
                outer_list[i].children[0].addEventListener('click',doSingularity,false);
                singularityList.push(outer_list[i].children[0]);
            }
        }
    }initSingularity();

};
//tyloren(document.getElementById('photos_list'));

tyloren(document.getElementById('photos_list'),{
    small:6,
    medium:4,
    large:3,
    speed:100,
    padding:30,
    singularity:true,
    toggle_handlers:{
        small:'small_size',
        medium:'medium_size',
        large:'large_size',
        reset:'reset'
    }
});

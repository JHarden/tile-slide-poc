window.onload = function(){

    var small_click = document.getElementById('small_size'),
     medium_click = document.getElementById('medium_size'),
     large_click = document.getElementById('large_size'),
     photos_list = document.getElementsByClassName('photo-tile');
    small_click.addEventListener('click',setSmallTiles,false);
    medium_click.addEventListener('click',setMediumTiles,false);
    large_click.addEventListener('click',setLargeTiles,false);
    var small_thumb_list, med_thumb_list,large_thumb_list;
    var isSmall = true,isMed =false,isLarge =false;
    //create 3 d2 arrays based and store data

    function initsmall2dArray(){

        small_thumb_list = new Array(document.getElementsByClassName('photo-tile').length);

        console.log('init SMALL');
        //outer array contains number of rows
        var count = 0;
        for(var i = 0; i<Math.ceil(small_thumb_list.length/6);i++){

           // console.log('row: ' + i);
            small_thumb_list[i] = new Array(6);
            //inner array will contain coords. j will break every 6 elements
            for(var j =0; j<6;j++){

                small_thumb_list[i][j] = {
                    x: 0 + (190 *(j)),
                    y: 0 + (150 *(i))
                };
                //console.log('coords: x: ' + +small_thumb_list[i][j].x + ' y: '+small_thumb_list[i][j].y);
                count++;
                if(count === small_thumb_list.length){

                    break;
                }
            }
        }
        return small_thumb_list;
    }

    small_thumb_list = initsmall2dArray();

    function initmedium2dArray(){
        med_thumb_list =  new Array(document.getElementsByClassName('photo-tile').length);
        console.log('init MEDIUM');
        //outer array contains number of rows
        var count = 0;
        for(var i = 0; i<Math.ceil(med_thumb_list.length/4);i++){

            //console.log('row: ' + i);
            med_thumb_list[i] = new Array(4);
            //inner array will contain coords. j will break every 6 elements
            for(var j =0; j<4;j++){

                med_thumb_list[i][j] = {
                    x:  0 + (280 *(j)),
                    y: 0 + (220 *(i))
                };
               // console.log('coords: x: ' + +med_thumb_list[i][j].x + ' y: '+med_thumb_list[i][j].y);
                count++;
                if(count === med_thumb_list.length){
                    break;
                }
            }
        }
        return med_thumb_list;
    }
    med_thumb_list = initmedium2dArray();

    function initlarge2dArray(){
        large_thumb_list =  new Array(document.getElementsByClassName('photo-tile').length);
        console.log('init LARGE');
        //outer array contains number of rows
        var count = 0;
        for(var i = 0; i<Math.ceil(large_thumb_list.length/3);i++){

            large_thumb_list[i] = new Array(3);
            //inner array will contain coords. j will break every 6 elements
            for(var j =0; j<3;j++){

                large_thumb_list[i][j] = {
                    x: 0 + (380 *(j)),
                    y: 0 + (290 *(i))
                };
                count++;
                if(count === large_thumb_list.length){
                    break;
                }
            }
        }
        return large_thumb_list;
    }
    large_thumb_list = initlarge2dArray();

   function getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

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
        photos_list[counter].style="transform:translate("+(destination_coords.x)+"px,"+(destination_coords.y)+"px);";

    }

    function setNewCoordinates(element,counter){

        //new classname;
        if(element.className === "photo-tile column-six"){

            doTranslate(counter,6);

        }else if(element.className === "photo-tile column-four"){

            //if(isSmall){
                doTranslate(counter,4);
            //}
        }else if(element.className === "photo-tile column-three"){
            doTranslate(counter,3);
        }
    }

    function doIntervalClassChange(classname){

        var counter = photos_list.length-1;
        var i = setInterval(function(){

            photos_list[counter].className = classname;

            setNewCoordinates(photos_list[counter],counter);
            counter--;
            if(counter < 0) {
                clearInterval(i);
            }
        }, 50);

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



    function onLoadSort(){

        for(var i = photos_list.length-1;i>0;i--) {
            var counter = i;
            var origin_xcoord = (Math.ceil((counter + 1) / 6)) - 1;
            var origin_ycoord = 0;

            if (((counter + 1) % 6) === 0) {
                origin_ycoord = 5;
            } else {
                origin_ycoord = ((counter + 1) % 6) - 1;
            }
            var origin_coords = small_thumb_list[origin_xcoord][origin_ycoord];
            photos_list[counter].style = "transform:translate(" + (origin_coords.x) + "px," + (origin_coords.y) + "px);";
        }
    }onLoadSort();
};

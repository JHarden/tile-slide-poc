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
                    x: 190 *(j),
                    y: 120 *(i+1)
                };
                //console.log('coords: x: ' + +small_thumb_list[i][j].x + ' y: '+small_thumb_list[i][j].y);
                count++;
                if(count === small_thumb_list.length){
                    break;
                }
            }
        }
        console.log(small_thumb_list);
    }
    initsmall2dArray();

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
                    x: 250 *(j),
                    y: 190 *(i+1)
                };
               // console.log('coords: x: ' + +med_thumb_list[i][j].x + ' y: '+med_thumb_list[i][j].y);
                count++;
                if(count === med_thumb_list.length){
                    break;
                }
            }
        }
        console.log(med_thumb_list);
    }
    initmedium2dArray();

    function initlarge2dArray(){
        large_thumb_list =  new Array(document.getElementsByClassName('photo-tile').length);
        console.log('init LARGE');
        //outer array contains number of rows
        var count = 0;
        for(var i = 0; i<Math.ceil(large_thumb_list.length/3);i++){

           // console.log('row: ' + i);
            large_thumb_list[i] = new Array(3);
            //inner array will contain coords. j will break every 6 elements
            for(var j =0; j<3;j++){

                large_thumb_list[i][j] = {
                    x: 350 *(j),
                    y: 260 *(i+1)
                };
                //console.log('coords: x: ' + +large_thumb_list[i][j].x + ' y: '+large_thumb_list[i][j].y);
                count++;
                if(count === large_thumb_list.length){
                    break;
                }
            }
        }
        console.log(large_thumb_list);
    }
    initlarge2dArray();





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


    function setNewCoordinates(element,counter){




        //new classname;
        if(element.className === "photo-tile column-six"){

            if(isSmall){

            }

        }else if(element.className === "photo-tile column-four"){

            if(isSmall){
                //isSmall = false; isMed = true;
                console.log('from small to medium');

                //get coords from small array
                //console.log('element #: ' + counter);
                var ct = 0;
                var coords;



                    for(var i = 0; i<small_thumb_list.length-1;i++){
                        for(var j=0;j<6;j++){

                            console.log('i: ' + i + ' j: ' + j);
                            if(ct ===counter){
                                coords = small_thumb_list[i][j];
                            console.log('COORDS: ' + small_thumb_list[i][j].x + " " + small_thumb_list[i][j].y);
                                console.log('counter: ' + ct + ' full length: ' + (small_thumb_list.length-1));
                            break;
                            }
                            ct++;
                        }
                    }

                    /*
                    if(counter === 2){
                    var coords = small_thumb_list[Math.ceil((counter+1)/6)-1][Math.round((counter+1)/6)-1];
                    console.log(coords);
                    console.log('coords: ' + coords.x + " " + coords.y);
                    }
                    */
                //translate to coords of med array


            }

        }else if(element.className === "photo-tile column-three"){

        }

        /*
        if(element.clientWidth === 190){

            //location is zero based
            console.log('figure out current location on this row: ' + element.offsetLeft/190);
            //figure out which row location is on.
            var row  = Math.round((element_pos)/6);
            console.log("element row: " + row);
            var x = element.offsetLeft/190;
            var y;
            console.log('element pos: ' + element_pos);
            if(element_pos%6 === 0){
                console.log('element y: ' + Math.round((element_pos)/6));
                y = Math.round((element_pos)/6)-1;
            }else{
                y = Math.round((element_pos)/6) -1;
                console.log('element y no modulus: ' + Math.round((element_pos)/6));
            }
            console.log('coords: ');
            console.log('x: ' + x);
            console.log('y: ' + y);
            //based on location - add specific coords which determine where to translate to
            var loc = element.offsetLeft/190;
            //250 is medium length + 50 for padding = 290
            //1150 is container width
            var container_width = document.getElementById('photos_list').clientWidth;
            //find total length divided by tiles per row
            //var len = Math.round((((element_pos) *290)/1150)/0.25 );
            //console.log('new position of element: ' + len);

        }
        */

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
        }, 100);

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

};

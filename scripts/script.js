(function(){
window.onload = function(){
    var photos_list = document.getElementsByClassName('photo-tile');
    document.getElementById('small_size').addEventListener('click',setSmallTiles,false);
    document.getElementById('medium_size').addEventListener('click',setMediumTiles,false);
    document.getElementById('large_size').addEventListener('click',setLargeTiles,false);
    var small_thumb_list, med_thumb_list,large_thumb_list;

    function init2dArray(countPerRow,xdim,ydim){
        //init the new array
        var arrayLength = photos_list.length;
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
                    x: 0 + (xdim *(j)),
                    y: 0 + (ydim *(i))
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
    small_thumb_list = init2dArray(6,190,150);
    med_thumb_list = init2dArray(4,280,220);
    large_thumb_list = init2dArray(3,380,290);

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
        photos_list[counter].style="transform:translate3d("+(destination_coords.x)+"px,"+(destination_coords.y)+"px,0);";
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
        this.className.className =this.className.replace( /(?:^|\s)pre-animate(?!\S)/g , '' );
        this.className += " singularity";
        doSubSingularity();
    }


    var singularityList = document.getElementsByClassName('photo');
    for(var i=0;i<singularityList.length;i++){
        singularityList[i].addEventListener('click',doSingularity,false);
    }

};
})();
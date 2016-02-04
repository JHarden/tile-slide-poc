window.onload = function(){

    var small_click = document.getElementById('small_size'),
     medium_click = document.getElementById('medium_size'),
     large_click = document.getElementById('large_size'),
     photos_list = document.getElementsByClassName('photo-tile');
    small_click.addEventListener('click',setSmallTiles,false);
    medium_click.addEventListener('click',setMediumTiles,false);
    large_click.addEventListener('click',setLargeTiles,false);
    var timeoutID;


    function initializeTransitions(){

        var container  = document.getElementById('photo_container');
        var container_height = container.height;

    }

    function getCoordinates(element){

        console.log("element coords: ");
        console.log("left: " +  element.getBoundingClientRect().left);
        console.log("top: " +  element.getBoundingClientRect().top);
    }



    function doIntervalClassChange(classname){

        var counter = photos_list.length-1;
        var i = setInterval(function(){

            photos_list[counter].className = classname;
            console.log(counter);
            getCoordinates(photos_list[counter]);
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

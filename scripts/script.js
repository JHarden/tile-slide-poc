window.onload = function(){

    var small_click = document.getElementById('small_size'),
     medium_click = document.getElementById('medium_size'),
     large_click = document.getElementById('large_size'),
     photos_list = document.getElementsByClassName('photo-tile');
    small_click.addEventListener('click',setSmallTiles,false);
    medium_click.addEventListener('click',setMediumTiles,false);
    large_click.addEventListener('click',setLargeTiles,false);


    function setSmallTiles(){

        for(var i = photos_list.length-1;i>=0; i--){
            photos_list[i].className = "photo-tile column-six";
        }

    }

    function setMediumTiles(){

        for(var i = photos_list.length-1;i>=0; i--){
            photos_list[i].className = "photo-tile column-four";
        }
    }

    function setLargeTiles(){

        for(var i = photos_list.length-1;i>=0; i--){
            photos_list[i].className = "photo-tile column-three";
        }
    }


};

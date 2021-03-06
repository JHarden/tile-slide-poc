'use strict';
var Tyloren = function(object,initialize){

    var padding=10,
        tpr_small = [10,10],
        tpr_med = [7,15],
        tpr_lrg = [5,10],
        speed=100,
        responsive=true,
        width_height_ratio=1,
        singularity=false,
        xplode=false,
        vacuum=false,
        glados=false,
        toggle_animations=false,
        toggle_small='small_size',
        toggle_medium='medium_size',
        toggle_large='large_size',
        toggle_reset='reset',
        animationList = [],
        outer_list = object.children,
        small_thumb_list,
        med_thumb_list,
        large_thumb_list;
    if(initialize !== undefined){
        tpr_small = initialize.small !== undefined ? initialize.small : tpr_small;
        tpr_med = initialize.medium !== undefined ? initialize.medium : tpr_med;
        tpr_lrg = initialize.large !== undefined ? initialize.large : tpr_lrg;
        speed = initialize.speed !== undefined ? initialize.speed : speed;
        width_height_ratio = initialize.width_height_ratio !== undefined ? initialize.width_height_ratio : width_height_ratio;
        responsive = initialize.responsive !== undefined ? initialize.responsive : responsive;
        padding = initialize.padding !== undefined ? initialize.padding : padding;
        singularity = (initialize.singularity !== undefined) ? initialize.singularity : singularity;
        xplode = (initialize.xplode !== undefined) ? initialize.xplode : xplode;
        vacuum = (initialize.vacuum !== undefined) ? initialize.vacuum : vacuum;
        glados = (initialize.glados !== undefined) ? initialize.glados : glados;
        toggle_animations = (initialize.toggle_animations !== undefined) ? initialize.toggle_animations : toggle_animations;
        if(initialize.toggle_handlers!==undefined){
        toggle_small = initialize.toggle_handlers.small != undefined ? initialize.toggle_handlers.small : toggle_small;
        toggle_medium = initialize.toggle_handlers.medium != undefined ? initialize.toggle_handlers.medium : toggle_medium;
        toggle_large = initialize.toggle_handlers.large != undefined ? initialize.toggle_handlers.large : toggle_large;
        toggle_reset = initialize.toggle_handlers.reset != undefined ? initialize.toggle_handlers.reset : toggle_reset;
        }
    }
    var container_width = object.getBoundingClientRect().width-padding;
    var sw,mw,lw;
    if(width_height_ratio!=1){
        sw=[container_width/tpr_small[0],(container_width/tpr_small[0])*width_height_ratio],
        mw=[container_width/tpr_med[0],(container_width/tpr_med[0])*width_height_ratio],
        lw=[container_width/tpr_lrg[0],(container_width/tpr_lrg[0])*width_height_ratio];

    }else{
        sw=[container_width/tpr_small[0],container_width/tpr_small[0]],
        mw=[container_width/tpr_med[0],container_width/tpr_med[0]],
        lw=[container_width/tpr_lrg[0],container_width/tpr_lrg[0]];

    }

    function getTransform(el) {
        var transform = window.getComputedStyle(el, null).getPropertyValue('-webkit-transform');
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/);

        if(!results) return [0, 0, 0];
        if(results[1] == '3d') return results.slice(2,5);

        results.push(0);
        return results.slice(5, 8); // returns the [X,Y,Z,1] values
    }

    function getClosest(array,num){
        var i=0;
        var minDiff=1000;
        var ans;
        for(i in array){
            var m=Math.abs(num-array[i]);
            if(m<minDiff &&(num<array[i])){ //number has to be closest but not over the resolution
                minDiff=m;
                ans=array[i];
            }
        }
        return ans;
    }

    function init2dArray(countPerRow,xdim,ydim){
        //init the new array
        var arrayLength = outer_list.length;
        var myList;
        switch (countPerRow){
            case tpr_small[0]:
                small_thumb_list = new Array(arrayLength);
                myList = small_thumb_list;

                break;
            case tpr_med[0]:
                med_thumb_list = new Array(arrayLength);
                myList = med_thumb_list;
                break;
            case tpr_lrg[0]:
                large_thumb_list = new Array(arrayLength);
                myList = large_thumb_list;
                break;
        }
        var count = 0;

        for(var i = 0; i<Math.ceil(arrayLength/countPerRow);i++){
            myList[i] = new Array(countPerRow);

            for(var j =0; j<countPerRow;j++){
                myList[i][j] = {
                    x: Math.round((padding) + (xdim *(j))),
                    y: Math.round((padding) + (ydim *(i)))
                };
                count++;
                if(count === arrayLength){
                    break;
                }
            }
        }
        switch (countPerRow){
            case tpr_small[0]:
                return small_thumb_list;
            case tpr_med[0]:
                return  med_thumb_list;
            case tpr_lrg[0]:
                return large_thumb_list;
        }
    }
    small_thumb_list = init2dArray(tpr_small[0],sw[0],sw[1]);
    med_thumb_list = init2dArray(tpr_med[0],mw[0],mw[1]);
    large_thumb_list = init2dArray(tpr_lrg[0],lw[0],lw[1]);

    function doTranslate(counter,array_length){
        var thumb_list, cw;
        if(parseInt(array_length) === tpr_small[0]){
            thumb_list = small_thumb_list;
            padding = tpr_small[1] !== undefined ? tpr_small[1] : padding;
            cw = sw;
        }else if(parseInt(array_length) === tpr_med[0]){
            thumb_list = med_thumb_list;
            padding = tpr_med[1] !== undefined ? tpr_med[1] : padding;
            cw = mw;
        }else if(parseInt(array_length) === tpr_lrg[0]){
            thumb_list = large_thumb_list;
            padding = tpr_lrg[1] !== undefined ? tpr_lrg[1] : padding;
            cw = lw;
        }
        var dest_xcoord = (Math.ceil((counter+1)/parseInt(array_length)))-1;
        var dest_ycoord = 0;
        if(((counter+1)%parseInt(array_length))===0){
            dest_ycoord = parseInt(array_length)-1;
        }else{
            dest_ycoord = ((counter+1)%parseInt(array_length))-1;
        }
        var destination_coords = thumb_list[dest_xcoord][dest_ycoord];

        Object.assign(
            outer_list[counter].style,
            {
                width:(Math.round(cw[0]-padding))+"px",
                height:(Math.round(cw[1]-padding))+"px",
                transform:"translate3d(" + (destination_coords.x) + "px," + (destination_coords.y) + "px,0)",
                position:"absolute"
            }
        );
    }

    function getThumbListByLength(len,i,j){
        switch(len){
            case tpr_small[0]:
                return small_thumb_list[i][j];
                break;
            case tpr_med[0]:
                return med_thumb_list[i][j];
                break;
            case tpr_lrg[0]:
                return large_thumb_list[i][j];
                break;
        }
    }

    function doIntervalChange(row_num){
        object.dataset.tiles = row_num[0];
        var counter = outer_list.length-1;
        var i = setInterval(function(){
            if(object.dataset.tiles==tpr_small[0]){
                doTranslate(counter,tpr_small[0]);
            }else if(object.dataset.tiles==tpr_med[0]){
                doTranslate(counter,tpr_med[0]);
            }else if(object.dataset.tiles==tpr_lrg[0]){
                doTranslate(counter,tpr_lrg[0]);
            }
            counter--;
            if(counter < 0) {
                clearInterval(i);
            }
        }, speed);
    }

    function sort(){
        var counter,origin_xcoord,origin_ycoord,origin_coords;
        var cpr = parseInt(object.dataset.tiles);

        var list, cw;
        switch(cpr){
            case tpr_small[0]:
                list = small_thumb_list;
                padding = tpr_small[1] !== undefined ? tpr_small[1] : padding;
                cw = sw;
                break;
            case tpr_med[0]:
                list = med_thumb_list;
                padding = tpr_med[1] !== undefined ? tpr_med[1] : padding;
                cw = mw;
                break;
            case tpr_lrg[0]:
                list = large_thumb_list;
                padding = tpr_lrg[1] !== undefined ? tpr_lrg[1] : padding;
                cw = lw;
                break;
            default :
                break;
        }

        for(var i = outer_list.length;i>0;i--) {
            counter = i-1;
            if(typeof animationList != "undefined" && animationList.length >0){
                animationList[counter].classList.remove('singularity','sub-singularity','sub-xplosion','singularity-nofade','xplode','vacuum','vortex','glados','chell');
                animationList[counter].style.transform='';
            }
            origin_xcoord = (Math.ceil((counter + 1) / cpr)) - 1;
            origin_ycoord = 0;
            if (((counter + 1) % cpr) === 0) {
                origin_ycoord = cpr-1;
            } else {
                origin_ycoord = ((counter + 1) % cpr) - 1;
            }

            origin_coords = list[origin_xcoord][origin_ycoord];
            Object.assign(
                outer_list[counter].style,
                {
                    width:(Math.round(cw[0]-padding))+"px",
                    height:(Math.round(cw[1]-padding))+"px",
                    transform:"translate3d(" + (origin_coords.x) + "px," + (origin_coords.y) + "px,0)",
                    position:"absolute"
                }
            );
        }
    }

    function getMaxR(array){
        return Math.max.apply(Math,array);
    };

    function doResponsiveTileVariations(){

        var config = initialize.responsive_config;
        var resolutions = Object.keys(config);
        var closest = getClosest(resolutions,window.innerWidth);
        if(window.innerWidth <= closest){
            for(var key in config[closest]){
                switch(key){
                    case "small":

                        tpr_small = config[closest][key];
                        if(width_height_ratio!=1) {
                            sw = [container_width / tpr_small[0], (container_width / tpr_small[0]) * width_height_ratio];
                        }else{
                            sw=[container_width/tpr_small[0],container_width/tpr_small[0]];
                        }
                        padding =  tpr_small[1] !== "undefined" ? tpr_small[1] : padding;
                        small_thumb_list = init2dArray(tpr_small[0],sw[0],sw[1]);
                        object.dataset.tiles=tpr_small[0];

                        break;
                    case "medium":
                        tpr_med = config[closest][key];
                        if(width_height_ratio!=1) {
                            mw = [container_width / tpr_med[0], (container_width / tpr_med[0]) * width_height_ratio];
                        }else{
                            mw=[container_width/tpr_med[0],container_width/tpr_med[0]];
                        }
                        padding =  tpr_med[1] !== "undefined" ? tpr_med[1] : padding;
                        med_thumb_list = init2dArray(tpr_med[0],mw[0],mw[1]);
                        break;
                    case "large":
                        tpr_lrg = config[closest][key];
                        if(width_height_ratio!=1) {
                            lw = [container_width / tpr_lrg[0], (container_width / tpr_lrg[0]) * width_height_ratio];
                        }else{
                            lw=[container_width/tpr_lrg[0],container_width/tpr_lrg[0]];
                        }
                        padding =  tpr_lrg[1] !== "undefined" ? tpr_lrg[1] : padding;
                        large_thumb_list = init2dArray(tpr_lrg[0],lw[0],lw[1]);
                        break;
                    default :
                        break;
                }
            }
        }
    }

    function initResize(){
            container_width = object.getBoundingClientRect().width-padding;
        if(typeof initialize!=="undefined" && typeof initialize.responsive_config!=="undefined"){
            doResponsiveTileVariations();
        }
        sort();
    }

    if(responsive){
        var id;
        window.onresize = function(){
            clearInterval(id);
            id = window.setTimeout(initResize,200);
        }
    }
    /*
    * OPTIONAL ANIMATION FUNCTIONS
     * 1. Singularity
     * 2. Xplosion
     * 3. Vacuum
     * 4. glados
    */
    function demoAnimations(){
        var el,elClone;
        for(var i=0;i<outer_list.length;i++){
            el = outer_list[i].children[0];
            elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
        }
    }

    function initAnimation(type){
        if(toggle_animations){
            demoAnimations();
        }
        for(var i=0;i<outer_list.length;i++){
            if(type!==null){
                outer_list[i].children[0].addEventListener('click',type,false);
            }
            outer_list[i].children[0].dataset.animate=i;
            outer_list[i].children[0].style.transitionProperty="all";
            outer_list[i].children[0].style.transitionDuration="1s";
            outer_list[i].children[0].style.transitionTimingFunction="ease-out";
            outer_list[i].children[0].style.transitionDelay="0.2s";
            outer_list[i].children[0].style.width="100%";
            animationList.push(outer_list[i].children[0]);
        }
    }

    function doSingularity(){

        var sconf;
        if(typeof initialize !=="undefined" && typeof initialize.singularity_config !== "undefined"){
            sconf =    initialize.singularity_config;
        }
        if(typeof sconf==="undefined" || (typeof sconf.fade_active!== "undefined" && sconf.fade_active===true) ){
            this.className += " singularity";
        }else{
            this.className += " singularity-nofade";
        }
        if( typeof sconf==="undefined" ||(typeof sconf.fade_others !== "undefined" && sconf.fade_others ===true)){
            for(var i=0;i<animationList.length;i++){
                if(!((animationList[i].className).match(/(?:^|\s)singularity(?!\S)/) || (animationList[i].className).match(/(?:^|\s)singularity-nofade(?!\S)/))){
                    animationList[i].className += " sub-singularity";
                }
            }
        }
    }

    function doXplosion(){
        this.className += " singularity-nofade";
        var n,s,e,w,el = parseInt(this.dataset.animate),pr = parseInt(object.dataset.tiles),count = 0;
        for(var i = 0; i<Math.ceil(animationList.length/pr);i++){
            for(var j =0; j<pr;j++){
                //get north and south
                if(count === el){
                    if(i>0 && j<pr-1){
                        n = animationList[count-pr];
                        n.className += " xplode";
                    }
                    if(((i+1)*pr)+j <outer_list.length ){
                        s = animationList[((i+1)*pr)+j];
                        s.className += " xplode";
                    }
                }
                if(count === outer_list.length){
                    break;
                }else if(count === el-1 && (Math.floor(count/pr)===Math.floor(el/pr))){ //check if the west tile and current tile are on the same row
                   w = animationList[el-1]; //set the west tile as the tile thats to the left of the selected one
                    w.className += " xplode";
                }else if(count === el+1 && (Math.floor(count/pr)===Math.floor(el/pr))){ //check if the east tile and current tile are on the same row
                   e = animationList[el+1]; //set the east tile as the tile thats to the right of the selected one
                    e.className += " xplode";
                }
                count++;
            }
        }
        for(var i=0;i<animationList.length;i++){
            if(!( (animationList[i].className).match(/(?:^|\s)xplode(?!\S)/) || (animationList[i].className).match(/(?:^|\s)singularity-nofade(?!\S)/))){
                animationList[i].className += " sub-xplosion";
            }
        }
        if(typeof initialize !=="undefined" && typeof initialize.xplode_config!=="undefined" && typeof initialize.xplode_config.split !=="undefined" && initialize.xplode_config.split===true){
            if(typeof w !=="undefined")Object.assign(w.style,{transform:"translate3d(-" + (container_width/2) + "px,0,0)"});
                if(typeof e !=="undefined")Object.assign(e.style,{transform:"translate3d(" + (container_width/2) + "px,0,0)"});
                    if(typeof n !=="undefined")Object.assign(n.style,{transform:"translate3d(0,-" + (window.innerHeight/2) + "px,0)"});
                        if(typeof s !=="undefined")Object.assign(s.style,{transform:"translate3d(0,+" + (window.innerHeight/2) + "px,0)"});
        }
    }

    function doVacuum(){
        this.className += " vacuum";
        var cpr = parseInt(object.dataset.tiles), count = -1, len = animationList.length,coords = [],el = parseInt(this.dataset.animate),interval = 50, isFade = true, stagger = 0;
        for(var i = 0; i<Math.ceil(len/cpr);i++){
            for(var j =0; j<cpr;j++){
                count++;
                if(count === el){
                    coords = getThumbListByLength(cpr,i,j);
                    break;
                }
            }
        }
        if(typeof initialize!=="undefined" && typeof initialize.vacuum_config !== "undefined"){
            interval = initialize.vacuum_config.stagger;
            isFade = initialize.vacuum_config.fade;
        }

        var k = setInterval(function(){
            var matrix = getTransform(outer_list[stagger]);
            if(!animationList[stagger].classList.contains("vacuum")){
                if(isFade){
                    animationList[stagger].className+=" vortex";
                }
                Object.assign(animationList[stagger].style,{transform:"translate3d(" + ((parseInt(coords.x)) - parseInt(matrix[0])) + "px,"+(parseInt(coords.y - parseInt(matrix[1])))+"px,0)"});
            }
            stagger++;
            if(stagger >= animationList.length) {
                clearInterval(k);
            }
        }, interval);
    }

    function doGlados(){
        this.className += " glados";
        var stagger  = 0;
        var interval = 50;
        if(typeof initialize !== "undefined" && typeof initialize.glados_config !== "undefined" && initialize.glados_config.stagger !== "undefined"){
            interval = initialize.glados_config.stagger;
        }
        var l = setInterval(function(){
            if(!animationList[stagger].classList.contains("glados")){
                animationList[stagger].className += " chell";
            }
            stagger++;
            if(stagger >= animationList.length) {
                clearInterval(l);
            }
        }, interval);
    }

    document.getElementById(toggle_small).addEventListener('click', function(){doIntervalChange(tpr_small)},false);
    document.getElementById(toggle_medium).addEventListener('click', function(){doIntervalChange(tpr_med)},false);
    document.getElementById(toggle_large).addEventListener('click', function(){doIntervalChange(tpr_lrg)},false);
    document.getElementById(toggle_reset).addEventListener('click',sort,false);

    //onload
    if(singularity){
        initAnimation(doSingularity);
    }else if(xplode){
        initAnimation(doXplosion);
    }else if(vacuum){
        initAnimation(doVacuum);
    }else if(glados){
        initAnimation(doGlados);
    }else{
        initAnimation(null);
    }

    if(typeof initialize!=="undefined" && typeof initialize.responsive_config!=="undefined"){
        doResponsiveTileVariations();
    }
    sort();

};


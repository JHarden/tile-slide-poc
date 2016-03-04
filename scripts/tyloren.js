'use strict';
var Tyloren = (function(){

     Tyloren.prototype.target = null;
     Tyloren.prototype.padding=10,
     Tyloren.prototype.tpr_small = [10,10],
     Tyloren.prototype.tpr_med = [7,15],
     Tyloren.prototype.tpr_lrg = [5,10],
     Tyloren.prototype.speed=100,
     Tyloren.prototype.responsive=true,
     Tyloren.prototype.width_height_ratio=1,
     Tyloren.prototype.singularity=false,
     Tyloren.prototype.xplode=false,
     Tyloren.prototype.vacuum=false,
     Tyloren.prototype.glados=false,
     Tyloren.prototype.toggle_animations=false,
     Tyloren.prototype.toggle_small='small_size',
     Tyloren.prototype.toggle_medium='medium_size',
     Tyloren.prototype.toggle_large='large_size',
     Tyloren.prototype.toggle_reset='reset',
     Tyloren.prototype.animationList = [],
     Tyloren.prototype.outer_list = null,
     Tyloren.prototype.container_width = 0,
     Tyloren.prototype.small_thumb_list,
     Tyloren.prototype.med_thumb_list,
     Tyloren.prototype.large_thumb_list,
     Tyloren.prototype.sw,
     Tyloren.prototype.mw,
     Tyloren.prototype.lw;
     Tyloren.prototype.initialize = null;

    //CONSTRUCTOR
    function Tyloren(target,initialize){

        console.log('in constructor');
        //.1 get instance variables from config

        this.initInstanceVariables(target,initialize);

        //.2 init the 2d arrays
        this.small_thumb_list = this.init2dArray(this.tpr_small[0],this.sw[0],this.sw[1]);
        this.med_thumb_list = this.init2dArray(this.tpr_med[0],this.mw[0],this.mw[1]);
        this.large_thumb_list = this.init2dArray(this.tpr_lrg[0],this.lw[0],this.lw[1]);

        //3. init resize listener
        if(this.responsive){
            var id;
            var local_outer_list = this.outer_list;
            window.onresize = function(){

                clearInterval(id);
                id = window.setTimeout(Tyloren.prototype.initResize(target,initialize,local_outer_list),200);
            }
        };

        //4. bind events for toggles\
        console.log("test before events");
        console.log(this.tpr_small);
        document.getElementById(this.toggle_small).addEventListener('click',this.doIntervalChange(this.tpr_small),false);
        document.getElementById(this.toggle_medium).addEventListener('click', this.doIntervalChange(this.tpr_med),false);
        document.getElementById(this.toggle_large).addEventListener('click', this.doIntervalChange(this.tpr_lrg),false);
        document.getElementById(this.toggle_reset).addEventListener('click',this.sort,false);

        //5. Check if any animations are required
        if(this.singularity){
            this.initAnimation(this.doSingularity);
        }else if(this.xplode){
            this.initAnimation(this.doXplosion);
        }else if(this.vacuum){
            this.initAnimation(this.doVacuum);
        }else if(this.glados){
            this.initAnimation(this.doGlados);
        }else{
            this.initAnimation(null);
        }

        //6. initialize responsive code
        if(typeof initialize!=="undefined" && typeof initialize.responsive_config!=="undefined"){
            this.doResponsiveTileVariations(initialize);
        }

        //7. kick of initial sort
        this.sort();
    };

    //init Instance variables from config
    Tyloren.prototype.initInstanceVariables = function(target,initialize){
        this.target = target;
        this.initialize = initialize;
        this.outer_list=target.children;
        this.container_width = target.getBoundingClientRect().width-this.padding;
        if(initialize !== undefined){
            this.tpr_small = initialize.small !== undefined ? initialize.small : this.tpr_small;
            this.tpr_med = initialize.medium !== undefined ? initialize.medium : this.tpr_med;
            this.tpr_lrg = initialize.large !== undefined ? initialize.large : this.tpr_lrg;
            this.speed = initialize.speed !== undefined ? initialize.speed : speed;
            this.width_height_ratio = initialize.width_height_ratio !== undefined ? initialize.width_height_ratio : this.width_height_ratio;
            this.responsive = initialize.responsive !== undefined ? initialize.responsive : this.responsive;
            this.padding = initialize.padding !== undefined ? initialize.padding : this.padding;
            this.singularity = (initialize.singularity !== undefined) ? initialize.singularity : this.singularity;
            this.xplode = (initialize.xplode !== undefined) ? initialize.xplode : this.xplode;
            this.vacuum = (initialize.vacuum !== undefined) ? initialize.vacuum : this.vacuum;
            this.glados = (initialize.glados !== undefined) ? initialize.glados : this.glados;
            this.toggle_animations = (initialize.toggle_animations !== undefined) ? initialize.toggle_animations : this.toggle_animations;
            if(initialize.toggle_handlers!==undefined){
                this.toggle_small = initialize.toggle_handlers.small != undefined ? initialize.toggle_handlers.small : this.toggle_small;
                this.toggle_medium = initialize.toggle_handlers.medium != undefined ? initialize.toggle_handlers.medium : this.toggle_medium;
                this.toggle_large = initialize.toggle_handlers.large != undefined ? initialize.toggle_handlers.large : this.toggle_large;
                this.toggle_reset = initialize.toggle_handlers.reset != undefined ? initialize.toggle_handlers.reset : this.toggle_reset;
            }
        }

        if(this.width_height_ratio!=1){
            this.sw=[this.container_width/this.tpr_small[0],(this.container_width/this.tpr_small[0])*this.width_height_ratio],
            this.mw=[this.container_width/this.tpr_med[0],(this.container_width/this.tpr_med[0])*this.width_height_ratio],
            this.lw=[this.container_width/this.tpr_lrg[0],(this.container_width/this.tpr_lrg[0])*this.width_height_ratio];

        }else{
            this.sw=[this.container_width/this.tpr_small[0],this.container_width/this.tpr_small[0]],
            this.mw=[this.container_width/this.tpr_med[0],this.container_width/this.tpr_med[0]],
            this.lw=[this.container_width/this.tpr_lrg[0],this.container_width/this.tpr_lrg[0]];
        }

    };
    //init Instance variables from config


    //getTransform
    Tyloren.prototype.getTransform = function(el) {
        var transform = window.getComputedStyle(el, null).getPropertyValue('-webkit-transform');
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/);

        if(!results) return [0, 0, 0];
        if(results[1] == '3d') return results.slice(2,5);

        results.push(0);
        return results.slice(5, 8); // returns the [X,Y,Z,1] values
    };//getTransform


    //getClosest
    Tyloren.prototype.getClosest = function(array,num){
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
    };//getClosest


    //init2dArray
    Tyloren.prototype.init2dArray = function(countPerRow,xdim,ydim){
        //init the new array

        var arrayLength = this.outer_list.length;
        var myList;
        switch (countPerRow){
            case this.tpr_small[0]:
                this.small_thumb_list = new Array(arrayLength);
                myList = this.small_thumb_list;

                break;
            case this.tpr_med[0]:
                this.med_thumb_list = new Array(arrayLength);
                myList = this.med_thumb_list;
                break;
            case this.tpr_lrg[0]:
                this.large_thumb_list = new Array(arrayLength);
                myList = this.large_thumb_list;
                break;
        }
        var count = 0;
        for(var i = 0; i<Math.ceil(arrayLength/countPerRow);i++){
            myList[i] = new Array(countPerRow);
            for(var j =0; j<countPerRow;j++){
                myList[i][j] = {
                    x: Math.round((this.padding) + (xdim *(j))),
                    y: Math.round((this.padding) + (ydim *(i)))
                };
                count++;
                if(count === arrayLength){
                    break;
                }
            }
        }
        switch (countPerRow){
            case this.tpr_small[0]:
                return this.small_thumb_list;
            case this.tpr_med[0]:
                return  this.med_thumb_list;
            case this.tpr_lrg[0]:
                return this.large_thumb_list;
        }
    };//init2dArray


    //doTranslate
    Tyloren.prototype.doTranslate=function(counter,array_length){
        var thumb_list, cw;
        if(parseInt(array_length) === this.tpr_small[0]){
            thumb_list = this.small_thumb_list;
            this.padding = this.tpr_small[1] !== undefined ? this.tpr_small[1] : this.padding;
            cw = this.sw;
        }else if(parseInt(array_length) === this.tpr_med[0]){
            thumb_list = this.med_thumb_list;
            this.padding = this.tpr_med[1] !== undefined ? this.tpr_med[1] :this.padding;
            cw = this.mw;
        }else if(parseInt(array_length) === this.tpr_lrg[0]){
            thumb_list = this.large_thumb_list;
            this.padding = this.tpr_lrg[1] !== undefined ? this.tpr_lrg[1] : this.padding;
            cw = this.lw;
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
            this.outer_list[counter].style,
            {
                width:(Math.round(cw[0]-this.padding))+"px",
                height:(Math.round(cw[1]-this.padding))+"px",
                transform:"translate3d(" + (destination_coords.x) + "px," + (destination_coords.y) + "px,0)",
                position:"absolute"
            }
        );
    };//doTranslate

    //getThumbList
    Tyloren.prototype.getThumbListByLength = function(len,i,j){
        switch(len){
            case this.tpr_small[0]:
                return this.small_thumb_list[i][j];
                break;
            case this.tpr_med[0]:
                return this.med_thumb_list[i][j];
                break;
            case this.tpr_lrg[0]:
                return this.large_thumb_list[i][j];
                break;
        }
    }//getThumbList




    //doIntervalChange
    Tyloren.prototype.doIntervalChange = function(row_num){
        console.log(row_num);
        console.log(this.target);
        this.target.dataset.tiles = row_num[0];

        var counter = this.outer_list.length-1;
        var that = this;
        var i = setInterval(function(){
            if(that.target.dataset.tiles==that.tpr_small[0]){
                that.doTranslate(counter,that.tpr_small[0]);
            }else if(that.target.dataset.tiles==that.tpr_med[0]){
                that.doTranslate(counter,that.tpr_med[0]);
            }else if(that.target.dataset.tiles==that.tpr_lrg[0]){
                that.doTranslate(counter,that.tpr_lrg[0]);
            }
            counter--;
            if(counter < 0) {
                clearInterval(i);
            }
        }, this.speed);
    };//doIntervalChange

    //doIntervalChange
    Tyloren.prototype.sort = function(){
        var counter,origin_xcoord,origin_ycoord,origin_coords;
        var cpr = parseInt(this.target.dataset.tiles);

        var list, cw;
        switch(cpr){
            case this.tpr_small[0]:
                list = this.small_thumb_list;
                this.padding = this.tpr_small[1] !== undefined ? this.tpr_small[1] : this.padding;
                cw = this.sw;
                break;
            case this.tpr_med[0]:
                list = this.med_thumb_list;
                this.padding = this.tpr_med[1] !== undefined ? this.tpr_med[1] : this.padding;
                cw = this.mw;
                break;
            case this.tpr_lrg[0]:
                list = this.large_thumb_list;
                this.padding = this.tpr_lrg[1] !== undefined ? this.tpr_lrg[1] : this.padding;
                cw = this.lw;
                break;
            default :
                break;
        }

        for(var i = this.outer_list.length;i>0;i--) {
            counter = i-1;
            if(typeof this.animationList != "undefined" && this.animationList.length >0){
                this.animationList[counter].classList.remove('singularity','sub-singularity','sub-xplosion','singularity-nofade','xplode','vacuum','vortex','glados','chell');
                this.animationList[counter].style.transform='';
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
                this.outer_list[counter].style,
                {
                    width:(Math.round(cw[0]-this.padding))+"px",
                    height:(Math.round(cw[1]-this.padding))+"px",
                    transform:"translate3d(" + (origin_coords.x) + "px," + (origin_coords.y) + "px,0)",
                    position:"absolute"
                }
            );
        };
    };//doIntervalChange

    //helper method to sort
    Tyloren.prototype.sortgetMaxR=function(array){
        return Math.max.apply(Math,array);
    };//helper method to sort

    //doResponsiveTileVariations
    Tyloren.prototype.doResponsiveTileVariations=function(initialize){

        var config = initialize.responsive_config;
        var resolutions = Object.keys(config);
        var closest = this.getClosest(resolutions,window.innerWidth);
        if(window.innerWidth <= closest){
            for(var key in config[closest]){
                switch(key){
                    case "small":

                        this.tpr_small = config[closest][key];
                        if(this.width_height_ratio!=1) {
                            this.sw = [this.container_width / this.tpr_small[0], (this.container_width / this.tpr_small[0]) * this.width_height_ratio];
                        }else{
                            this.sw=[this.container_width/this.tpr_small[0],this.container_width/this.tpr_small[0]];
                        }

                        this.padding =  this.tpr_small[1] !== "undefined" ? this.tpr_small[1] : this.padding;
                        this.small_thumb_list = this.init2dArray(this.tpr_small[0],this.sw[0],this.sw[1]);
                        this.target.dataset.tiles=this.tpr_small[0];

                        break;
                    case "medium":
                        this.tpr_med = config[closest][key];
                        if(this.width_height_ratio!=1) {
                            this.mw = [this.container_width / this.tpr_med[0], (this.container_width /this.tpr_med[0]) * this.width_height_ratio];
                        }else{
                            this.mw=[this.container_width/this.tpr_med[0],this.container_width/this.tpr_med[0]];
                        }
                        this.padding =  this.tpr_med[1] !== "undefined" ? this.tpr_med[1] : this.padding;
                        this.med_thumb_list = this.init2dArray(this.tpr_med[0],this.mw[0],this.mw[1]);
                        break;
                    case "large":
                        this.tpr_lrg = config[closest][key];
                        if(this.width_height_ratio!=1) {
                            this.width_height_ratio = [this.container_width / this.tpr_lrg[0], (this.container_width / this.tpr_lrg[0]) * this.width_height_ratio];
                        }else{
                            this.lw=[this.container_width/this.tpr_lrg[0],this.container_width/this.tpr_lrg[0]];
                        }
                        this.padding =  this.tpr_lrg[1] !== "undefined" ? this.tpr_lrg[1] : this.padding;
                        this.large_thumb_list = this.init2dArray(this.tpr_lrg[0],this.lw[0],this.lw[1]);
                        break;
                    default :
                        break;
                }
            }
        }
    }//doResponsiveTileVariations

    //initResize
    Tyloren.prototype.initResize=function(target,initialize){

        this.container_width = target.getBoundingClientRect().width-this.padding;

        if(typeof initialize!=="undefined" && typeof initialize.responsive_config!=="undefined"){

            this.doResponsiveTileVariations(initialize);
        }
        this.sort();
    };//initResize

    /*
    * OPTIONAL ANIMATION FUNCTIONS
     * 1. Singularity
     * 2. Xplosion
     * 3. Vacuum
     * 4. glados
    */

    //demo animations
    Tyloren.prototype.demoAnimations=function(){
        var el,elClone;
        for(var i=0;i<this.outer_list.length;i++){
            el = this.outer_list[i].children[0];
            elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
        }
    };//demo animations

    //initAnimation
    Tyloren.prototype.initAnimation=function(type){
        if(this.toggle_animations){
            this.demoAnimations();
        }
        for(var i=0;i<this.outer_list.length;i++){
            if(type!==null){
                this.outer_list[i].children[0].addEventListener('click',type,false);
            }
            this.outer_list[i].children[0].dataset.animate=i;
            this.outer_list[i].children[0].style.transitionProperty="all";
            this.outer_list[i].children[0].style.transitionDuration="1s";
            this.outer_list[i].children[0].style.transitionTimingFunction="ease-out";
            this.outer_list[i].children[0].style.transitionDelay="0.2s";
            this.outer_list[i].children[0].style.width="100%";
            this.animationList.push(this.outer_list[i].children[0]);
        }
    };//initAnimation

    //doSingularity
    Tyloren.prototype.doSingularity=function(){

        var sconf;
        if(typeof this.initialize !=="undefined" && typeof this.initialize.singularity_config !== "undefined"){
            sconf =    this.initialize.singularity_config;
        }
        if(typeof sconf==="undefined" || (typeof sconf.fade_active!== "undefined" && sconf.fade_active===true) ){
            this.className += " singularity";
        }else{
            this.className += " singularity-nofade";
        }
        console.log("test:");
        console.log(this.animationList);
        if( typeof sconf==="undefined" ||(typeof sconf.fade_others !== "undefined" && sconf.fade_others ===true)){
            for(var i=0;i<this.animationList.length;i++){
                if(!((this.animationList[i].className).match(/(?:^|\s)singularity(?!\S)/) || (this.animationList[i].className).match(/(?:^|\s)singularity-nofade(?!\S)/))){
                    this.animationList[i].className += " sub-singularity";
                }
            }
        }
    };//doSingularity

    //doXplosion
    Tyloren.prototype.doXplosion=function(){
        this.className += " singularity-nofade";
        var n,s,e,w,el = parseInt(this.dataset.animate),pr = parseInt(target.dataset.tiles),count = 0;
        for(var i = 0; i<Math.ceil(this.animationList.length/pr);i++){
            for(var j =0; j<pr;j++){
                //get north and south
                if(count === el){
                    if(i>0 && j<pr-1){
                        n = this.animationList[count-pr];
                        n.className += " xplode";
                    }
                    if(((i+1)*pr)+j <this.outer_list.length ){
                        s = this.animationList[((i+1)*pr)+j];
                        s.className += " xplode";
                    }
                }
                if(count === this.outer_list.length){
                    break;
                }else if(count === el-1 && (Math.floor(count/pr)===Math.floor(el/pr))){ //check if the west tile and current tile are on the same row
                   w = this.animationList[el-1]; //set the west tile as the tile thats to the left of the selected one
                    w.className += " xplode";
                }else if(count === el+1 && (Math.floor(count/pr)===Math.floor(el/pr))){ //check if the east tile and current tile are on the same row
                   e = this.animationList[el+1]; //set the east tile as the tile thats to the right of the selected one
                    e.className += " xplode";
                }
                count++;
            }
        }
        for(var i=0;i<this.animationList.length;i++){
            if(!( (this.animationList[i].className).match(/(?:^|\s)xplode(?!\S)/) || (this.animationList[i].className).match(/(?:^|\s)singularity-nofade(?!\S)/))){
                this.animationList[i].className += " sub-xplosion";
            }
        }
        if(typeof this.initialize !=="undefined" && typeof this.initialize.xplode_config!=="undefined" && typeof this.initialize.xplode_config.split !=="undefined" && this.initialize.xplode_config.split===true){
            if(typeof w !=="undefined")Object.assign(this.w.style,{transform:"translate3d(-" + (this.container_width/2) + "px,0,0)"});
                if(typeof e !=="undefined")Object.assign(this.e.style,{transform:"translate3d(" + (this.container_width/2) + "px,0,0)"});
                    if(typeof n !=="undefined")Object.assign(this.n.style,{transform:"translate3d(0,-" + (window.innerHeight/2) + "px,0)"});
                        if(typeof s !=="undefined")Object.assign(this.s.style,{transform:"translate3d(0,+" + (window.innerHeight/2) + "px,0)"});
        }
    };//doXplosion


    //doVacuum
    Tyloren.prototype.doVacuum=function(){
        this.className += " vacuum";
        var cpr = parseInt(target.dataset.tiles), count = -1, len = this.animationList.length,coords = [],el = parseInt(this.dataset.animate),interval = 50, isFade = true, stagger = 0;
        for(var i = 0; i<Math.ceil(len/cpr);i++){
            for(var j =0; j<cpr;j++){
                count++;
                if(count === el){
                    coords = this.getThumbListByLength(cpr,i,j);
                    break;
                }
            }
        }
        if(typeof this.initialize!=="undefined" && typeof this.initialize.vacuum_config !== "undefined"){
            interval = this.initialize.vacuum_config.stagger;
            isFade = this.initialize.vacuum_config.fade;
        }

        var k = setInterval(function(){
            var matrix = this.getTransform(this.outer_list[stagger]);
            if(!this.animationList[stagger].classList.contains("vacuum")){
                if(isFade){
                    this.animationList[stagger].className+=" vortex";
                }
                Object.assign(this.animationList[stagger].style,{transform:"translate3d(" + ((parseInt(coords.x)) - parseInt(matrix[0])) + "px,"+(parseInt(coords.y - parseInt(matrix[1])))+"px,0)"});
            }
            stagger++;
            if(stagger >= this.animationList.length) {
                clearInterval(k);
            }
        }, interval);
    };//doVacum

    //doGlados
    Tyloren.prototype.doGlados=function(){
        this.className += " glados";
        var stagger  = 0;
        var interval = 50;
        if(typeof this.initialize !== "undefined" && typeof this.initialize.glados_config !== "undefined" && this.initialize.glados_config.stagger !== "undefined"){
            interval = this.initialize.glados_config.stagger;
        }
        var l = setInterval(function(){
            if(!this.animationList[stagger].classList.contains("glados")){
                this.animationList[stagger].className += " chell";
            }
            stagger++;
            if(stagger >= this.animationList.length) {
                clearInterval(l);
            }
        }, interval);
    };//doGlados

    return Tyloren;
})();




var tyloren = new Tyloren(document.getElementById('photos_list'),{
    //small:[10,5],
    //medium:[7,15],
    //large:[5,10],
    //padding:15,
    speed:75,
    responsive:true,
    width_height_ratio:1,
    responsive_config:{
        2000:{
            small:[10,5],
            medium:[7,10],
            large:[5,30]
        },
        1024:{
            small:[6,20],
            medium:[4,10],
            large:[2,30]
        },
        768:{
            small:[6,5],
            medium:[4,10],
            large:[3,10]
        },
        414:{
            small:[4,5],
            medium:[3,10],
            large:[2,10]
        }
    },
    singularity:true,
    singularity_config:{
        fade_others:true,
        fade_active:false
    },
    xplode:false,
    xplode_config:{
        split:true
    },
    vacuum:false,
    vacuum_config:{
        stagger:25,
        fade:true
    },
    glados:false,
    glados_config:{
        stagger:50,
    },
    toggle_handlers:{
        small:'small_size',
        medium:'medium_size',
        large:'large_size',
        reset:'reset'
    }
});

describe('tyloren', function() {

    // inject the HTML fixture for the tests
    beforeEach(function () {

        var fixture = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="initial-scale=1.0, width=device-width" /> <title>Tile slide proof of concept</title> <!--<link rel="stylesheet" href="styles/css/style.min.css"> <link rel="stylesheet" href="/styles/css/style.min.css">--> </head> <body> <div class="wrap"> <header> <h1> Tylo Ren </h1> </header> <section class="content"> <div class="photos" id="photo_container"> <ul id="photos_list" class="photo-wrap" data-tiles="10"> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=1004"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=1003"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=1002"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=1001"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=1000"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=999"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=998"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=997"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=996"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=995"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=994"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=993"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=992"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=991"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=990"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=989"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=988"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=987"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=986"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=985"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=984"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=983"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=982"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=981"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=980"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=979"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=978"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=977"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=976"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=975"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=974"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=973"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=972"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=971"> </li> <li class="photo-tile" > <img class="photo" src="https://unsplash.it/600/600/?image=970"> </li> </ul> </div> <div class="tool-bar"> <div class="select-wrap"> <form> <div class="option"> <input name="thumbnail" type="radio" id="small_size" class="radio"> <label for="small_size" class="label-medium">S</label> </div> <div class="option"> <input name="thumbnail" type="radio" id="medium_size" class="radio"> <label for="medium_size" class="label-medium">M</label> </div> <div class="option"> <input name="thumbnail" type="radio" id="large_size" class="radio"> <label for="large_size" class="label-medium">L</label> </div> <div class="option"> <input name="thumbnail" type="radio" id="reset" class="radio"> <label for="reset" class="label-reset">Reset</label> </div> <div class="option-select"> <select id="toggle_animation"> <option value="" disabled selected>select an animation...</option> <option value="singularity">singularity</option> <option value="xplode">xplode</option> <option value="vacuum">vacuum</option> <option value="glados">glados</option> </select> </div> </form> </div> </div> </section> <!-- <script src="scripts/tyloren.min.js"></script> --> <script src="scripts/tyloren.js"></script> <script src="scripts/demo.js"></script> </div> </body> </html>';

        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);
    });

    /*
    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });
    */

    // call the tyloren init function of calculator to register DOM elements
    beforeEach(function() {
        var test = tyloren(document.getElementById('photos_list'));
    });

    it('should create a tyloren object',function(){
        expect(typeof document.getElementById('photos_list')).toBe('object');
    });

    it('should apply translate3d to its direct children',function(){
        var list = document.getElementById('photos_list').children;
        for(var i=0;i<list.length;i++){
            expect(list[i].style.transform.indexOf("translate3d")!=-1).toBe(true);
        }
    });

    it('should apply height and width to its direct children',function(){
        var list = document.getElementById('photos_list').children;
        for(var i=0;i<list.length;i++){
            expect(parseInt(list[i].style.width) >0 && parseInt(list[i].style.height) >0).toBe(true);
        }
    });

    it('should initialize all its variables',function(){



    });

});
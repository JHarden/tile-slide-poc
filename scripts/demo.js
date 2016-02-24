//tyloren(document.getElementById('photos_list'));

tyloren(document.getElementById('photos_list'),{
    small:10,
    medium:7,
    large:5,
    speed:100,
    padding:15,
    responsive:true,
    width_height_ratio:1,
    responsive_config:{
        2000:{
            small:10,
            medium:8,
            large:6,
            padding:15
        },
        1024:{
            small:7,
            medium:6,
            large:4,
            padding:10
        },
        768:{
            small:5,
            medium:4,
            large:3,
            padding:5
        },
        414:{
            small:4,
            medium:3,
            large:2,
            padding:5
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

//demo purposes
document.getElementById("toggle_animation").addEventListener('change', function(){

    switch(this.value){
        case "singularity":
            tyloren(document.getElementById('photos_list'),{
                toggle_animations:true,
                singularity:true,
                singularity_config:{
                    fade_active:false,
                    fade_others:true
                },
                xplode:false,
                vacuum:false,
                glados:false
            });
            break;
        case "xplode":
            tyloren(document.getElementById('photos_list'),{
                toggle_animations:true,
                singularity:false,
                xplode:true,
                xplode_config:{
                    split:true
                },
                vacuum:false,
                glados:false
            });
            break;
        case "vacuum":
            tyloren(document.getElementById('photos_list'),{
                toggle_animations:true,
                singularity:false,
                xplode:false,
                vacuum:true,
                glados:false

            });
            break;
        case "glados":
            tyloren(document.getElementById('photos_list'),{
                toggle_animations:true,
                singularity:false,
                xplode:false,
                vacuum:false,
                glados:true
            });
            break;

        default :
            break;
    }
},false);
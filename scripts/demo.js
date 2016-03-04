//tyloren(document.getElementById('photos_list'));

/*
tyloren(document.getElementById('photos_list'),{
    responsive:true,
    responsive_config:{
        2000:{
            small:10,
            medium:8,
            large:6,
            padding:7.5
        },
        1024:{
            small:6,
            medium:4,
            large:2,
            padding:5
        },
        768:{
            small:5,
            medium:3,
            large:2,
            padding:5
        },
        414:{
            small:3,
            medium:2,
            large:1,
            padding:5
        }
    }
});
*/
//
//var tyloren = new Tyloren(document.getElementById('photos_list'),{
//    //small:[10,5],
//    //medium:[7,15],
//    //large:[5,10],
//    //padding:15,
//    speed:75,
//    responsive:true,
//    width_height_ratio:1,
//    responsive_config:{
//        2000:{
//            small:[10,5],
//            medium:[7,10],
//            large:[5,30]
//        },
//        1024:{
//            small:[6,20],
//            medium:[4,10],
//            large:[2,30]
//        },
//        768:{
//            small:[6,5],
//            medium:[4,10],
//            large:[3,10]
//        },
//        414:{
//            small:[4,5],
//            medium:[3,10],
//            large:[2,10]
//        }
//    },
//    singularity:true,
//    singularity_config:{
//        fade_others:true,
//        fade_active:false
//    },
//    xplode:false,
//    xplode_config:{
//        split:true
//    },
//    vacuum:false,
//    vacuum_config:{
//        stagger:25,
//        fade:true
//    },
//    glados:false,
//    glados_config:{
//        stagger:50,
//    },
//    toggle_handlers:{
//        small:'small_size',
//        medium:'medium_size',
//        large:'large_size',
//        reset:'reset'
//    }
//});


//
//var second = new Tyloren(document.getElementById('photos_list2'),{
//    //small:[10,5],
//    //medium:[7,15],
//    //large:[5,10],
//    //padding:15,
//    speed:75,
//    responsive:true,
//    width_height_ratio:1,
//    responsive_config:{
//        2000:{
//            small:[10,5],
//            medium:[7,10],
//            large:[5,30]
//        },
//        1024:{
//            small:[6,20],
//            medium:[4,10],
//            large:[2,30]
//        },
//        768:{
//            small:[6,5],
//            medium:[4,10],
//            large:[3,10]
//        },
//        414:{
//            small:[4,5],
//            medium:[3,10],
//            large:[2,10]
//        }
//    },
//    singularity:true,
//    singularity_config:{
//        fade_others:true,
//        fade_active:false
//    },
//    xplode:false,
//    xplode_config:{
//        split:true
//    },
//    vacuum:false,
//    vacuum_config:{
//        stagger:25,
//        fade:true
//    },
//    glados:false,
//    glados_config:{
//        stagger:50,
//    },
//    toggle_handlers:{
//        small:'small_size',
//        medium:'medium_size',
//        large:'large_size',
//        reset:'reset'
//    }
//});
//



//
//demo purposes
//
// tyloren(document.getElementById('photos_list'),{
// //small:[10,5],
// //medium:[7,15],
// //large:[5,10],
// //padding:15,
// speed:75,
// responsive:true,
// width_height_ratio:1,
// responsive_config:{
//     2000:{
//         small:[10,5],
//         medium:[7,10],
//         large:[5,30]
//     },
//     1024:{
//         small:[6,20],
//         medium:[4,10],
//         large:[2,30]
//     },
//     768:{
//         small:[6,5],
//         medium:[4,10],
//         large:[3,10]
//     },
//     414:{
//         small:[4,5],
//         medium:[3,10],
//         large:[2,10]
//     }
// },
// singularity:true,
//     singularity_config:{
//         fade_others:true,
//         fade_active:false
//     },
// xplode:false,
//     xplode_config:{
//         split:true
//     },
// vacuum:false,
//     vacuum_config:{
//         stagger:25,
//         fade:true
//     },
// glados:false,
//     glados_config:{
//         stagger:50,
//     },
// toggle_handlers:{
// small:'small_size',
// medium:'medium_size',
// large:'large_size',
// reset:'reset'
// }
// });
//

//
//document.getElementById("toggle_animation").addEventListener('change', function(){
//
//    switch(this.value){
//        case "singularity":
//            tyloren(document.getElementById('photos_list'),{
//                toggle_animations:true,
//                singularity:true,
//                singularity_config:{
//                    fade_active:false,
//                    fade_others:true
//                },
//                xplode:false,
//                vacuum:false,
//                glados:false
//            });
//            break;
//        case "xplode":
//            tyloren(document.getElementById('photos_list'),{
//                toggle_animations:true,
//                singularity:false,
//                xplode:true,
//                xplode_config:{
//                    split:true
//                },
//                vacuum:false,
//                glados:false
//            });
//            break;
//        case "vacuum":
//            tyloren(document.getElementById('photos_list'),{
//                toggle_animations:true,
//                singularity:false,
//                xplode:false,
//                vacuum:true,
//                glados:false
//
//            });
//            break;
//        case "glados":
//            tyloren(document.getElementById('photos_list'),{
//                toggle_animations:true,
//                singularity:false,
//                xplode:false,
//                vacuum:false,
//                glados:true
//            });
//            break;
//        default :
//            break;
//    }
//},false);

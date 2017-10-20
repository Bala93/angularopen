
function createsliders(){
    var app = window.app;
    var slidersteps = [0];
    
    for(ii=6;ii<=12;++ii) {
            slidersteps.push(Math.pow(2,ii)-1);
    } // [0, 64,128,256,512,1024,2048,4096,2^13,2^14,2^15,2^16]
    
    var fromidx = [0,0,0];
    var toidx = [3,3,3];
  
    var gam = 1.0;
    
    var cnt1 = [0,0,0];
    var cnt2 = [0,0,0];
    app.cnt1 = cnt1;
    app.cnt2 = cnt2;
    app.gamma  = gam;
    
    for(ci=0;ci<3;++ci) {
            cnt1[ci]=slidersteps[fromidx[ci]];
            cnt2[ci]=slidersteps[toidx[ci]];
    }  

    var range_red = $('#range_cnt_red');

    range_red.ionRangeSlider({
    //$("#range_cnt_red").ionRangeSlider({
        type: "double",
        min: 0,
        max: 4095,
        from: fromidx[0],
        to: toidx[0], 
        values: slidersteps,
        //step: 128,
        onStart: function (data) {
                //consol.log(data);
        },
        onChange:  function (data) {
                // console.log("change");
        },
        onFinish: function (data) {
                cnt1[0]=slidersteps[data.from];
                cnt2[0]=slidersteps[data.to];
                app.cnt1[0] = cnt1[0];
                app.cnt2[0] = cnt2[0];
                //console.log("finish" + data.from + "-"+data.to);
        },
        onUpdate : function (data) {
                //console.log("update");
        }
    });


    var range_green = $("#range_cnt_green");
    
        range_green.ionRangeSlider({
            type: "double",
            min: 0,
            max: 4095,
            from: fromidx[1],
            to: toidx[1],
            values: slidersteps,
            //step: 128,
            onStart: function (data) {
                    //console.log(data);
            },
            onChange:  function (data) {
                    // console.log("change");
            },
            onFinish: function (data) {
                    cnt1[1]=slidersteps[data.from];
                    cnt2[1]=slidersteps[data.to];
                    app.cnt1[1] = cnt1[1];
                    app.cnt2[1] = cnt2[1];
                    //console.log("finish" + data.from + "-"+data.to);
            },
            onUpdate : function (data) {
                    //console.log("update");
            }
    });
  
    var range_blue = $("#range_cnt_blue");
    range_blue.ionRangeSlider({
            type: "double",
            min: 0,
            max: 4095,
            from: fromidx[2],
            to: toidx[2],
            values: slidersteps,
            //step: 128,
            onStart: function (data) {
                    //console.log(data);
            },
            onChange:  function (data) {
                    // console.log("change");
            },
            onFinish: function (data) {
                    cnt1[2]=slidersteps[data.from];
                    cnt2[2]=slidersteps[data.to];
                    app.cnt1[2] = cnt1[2];
                    app.cnt2[2] = cnt2[2];
                    //console.log("finish" + data.from + "-"+data.to);
            },
            onUpdate : function (data) {
                    //console.log("update");
            }
    });

    var range_gam = $("#range_gam");
    range_gam.ionRangeSlider({
        type: "single",
        min: 0,
        max: 2,
        from: gam,
        step: 0.1,
        keyboard: true,
        onStart: function (data) {
            //console.log("onStart");
        },
        onChange: function (data) {
            //console.log("onChange");
        },
        onFinish: function (data) {
            gam = data.from;
            app.gamma = gam;
            //      console.log("onFinish: " + data.from);
        },
        onUpdate: function (data) {
            //console.log("onUpdate");
        }
    });


    var range_trans_nissl = $("#range_transparency_nissl");
    range_trans_nissl.ionRangeSlider({
        type: "single",
        min: 0,
        max: 1,
        from: 0.5,
        step: 0.02,
        keyboard: true,
        onStart: function (data) {
            //console.log("onStart");
        },
        onChange: function (data) {
            //console.log("onChange");
        },
        onFinish: function (data) {
            trans_nissl = data.from;
            app.layers[0].setOpacity(trans_nissl);
            //      console.log("onFinish: " + data.from);
        },
        onUpdate: function (data) {
            //console.log("onUpdate");
        }
    });

    var range_trans_fluo = $("#range_transparency_fluo");
    range_trans_fluo.ionRangeSlider({
        type: "single",
        min: 0,
        max: 1,
        from: 0.5,
        step: 0.05,
        keyboard: true,
        onStart: function (data) {
            //console.log("onStart");
        },
        onChange: function (data) {
            //console.log("onChange");
        },
        onFinish: function (data) {
            trans_fluo = data.from;
            //app.trans_fluo = trans_fluo;
            app.layers[1].setOpacity(trans_fluo);
            //      console.log("onFinish: " + data.from);
        },
        onUpdate: function (data) {
            //console.log("onUpdate");
        }
    });


}
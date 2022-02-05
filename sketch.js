var img_init = document.getElementById("image");
const canvas_width  = img_init.width;
const canvas_height = img_init.height;
console.log(canvas_width,canvas_height);


var c = document.getElementById("canvas");
c.width = canvas_width;
c.height = canvas_height;
var ctx = c.getContext("2d");
var img = document.getElementById("image");
ctx.drawImage(img, 0, 0);
const image_data = ctx.getImageData(0,0,canvas_width,canvas_height);
//console.log(image_data.data);


const num_rects = 30;
const pop_size  = 50;
const num_gens  = 5000;
var rects = [];

function setup() {
    createCanvas(canvas_width,canvas_height);
    noStroke();
    for (var i1=0;i1<pop_size;i1++) {
        rects.push([]);
        for (var i2=0;i2<num_rects;i2++) {
            var x_pos = canvas_width*Math.random();
            var y_pos = canvas_height*Math.random();
            rects[i1].push([x_pos,y_pos,(canvas_width-x_pos)*Math.random(),(canvas_height-y_pos)*Math.random(),255*Math.random(),255*Math.random(),255*Math.random(),255*Math.random()]);
        }
    }
    console.log(rects);
}

iters = 0;
function draw() {
    all_loss = [];
    for (var i=0;i<pop_size;i++) {
        background(0,0,0);
        draw_rects(rects[i]);
        /*for (var j=0;j<num_rects;j++) {
            fill(rects[i][j][4],rects[i][j][5],rects[i][j][6],rects[i][j][7]);
            rect(rects[i][j][0],rects[i][j][1],rects[i][j][2],rects[i][j][3]);
        }*/
        all_loss.push(find_loss());
    }
    console.log(all_loss);
    best = Math.min(...all_loss);
    worst = Math.max(...all_loss);
    best_index = all_loss.indexOf(best);
    console.log("Best:",best);
    console.log("Worst:",worst);
    console.log(best_index);
    best_rect = rects[best_index];
    draw_rects(best_rect);
    iters += 1;
    //if (iters >= num_gens) {
        noLoop();
    //}
}

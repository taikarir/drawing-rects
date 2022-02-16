function draw_rects(arr) {
    background(0,0,0);
    for (var ii=0;ii<num_rects;ii++) {
        fill(arr[ii][4],arr[ii][5],arr[ii][6],arr[ii][7]);
        rect(arr[ii][0],arr[ii][1],arr[ii][2],arr[ii][3]);
    }
}

function find_loss() {
    loadPixels();
    //console.log(pixels);
    var xloss = 0;
    for (var i1=0; i1<pixels.length; i1++) {
        xloss += (image_data.data[i1]-pixels[i1])^2;
    }
    if (xloss<0) {
        xloss = -xloss;
    }
    return xloss;
    //console.log(loss);
}

function one_gen() {
    //shifting x and y
    for (var i1=0; i1<best_rect.length; i1++) {
        var loss = [0,0,0,0,0,0,0,0,0];
        var new_rects = [];
        var x_changes = [-learning_rate,0,learning_rate];
        var y_changes = [-learning_rate,0,learning_rate];
        for (var i2=0; i2<3; i2++) {
            for (var i3=0; i3<3; i3++) {
                new_rect = best_rect.slice();
                new_rect[i1][0] += x_changes[i2];
                new_rect[i1][1] += y_changes[i3];
                draw_rects(new_rect);
                loss[i2*3+i3] = find_loss();
            }
        }
        var bestx = loss.indexOf(Math.min(...loss));
        best_rect[i1][0] += x_changes[bestx%3];
        best_rect[i1][1] += y_changes[Math.floor(bestx/3)];
    }
    //shifting w and h
    for (var i1=0; i1<best_rect.length; i1++) {
        var loss = [0,0,0,0,0,0,0,0,0];
        var new_rects = [];
        var x_changes = [-learning_rate,0,learning_rate];
        var y_changes = [-learning_rate,0,learning_rate];
        for (var i2=0; i2<3; i2++) {
            for (var i3=0; i3<3; i3++) {
                new_rect = best_rect.slice();
                new_rect[i1][2] += x_changes[i2];
                new_rect[i1][3] += y_changes[i3];
                draw_rects(new_rect);
                loss[i2*3+i3] = find_loss();
            }
        }
        var bestx = loss.indexOf(Math.min(...loss));
        best_rect[i1][2] += x_changes[bestx%3];
        best_rect[i1][3] += y_changes[Math.floor(bestx/3)];
    }
    //shifing color channels r and g
    for (var i1=0; i1<best_rect.length; i1++) {
        var loss = [0,0,0,0,0,0,0,0,0];
        var new_rects = [];
        var r_changes = [-10*learning_rate,0,10*learning_rate];
        var g_changes = [-10*learning_rate,0,10*learning_rate];
        for (var i2=0; i2<3; i2++) {
            for (var i3=0; i3<3; i3++) {
                new_rect = best_rect.slice();
                new_rect[i1][4] += r_changes[i2];
                new_rect[i1][5] += g_changes[i3];
                draw_rects(new_rect);
                loss[i2*3+i3] = find_loss();
            }
        }
        var bestx = loss.indexOf(Math.min(...loss));
        best_rect[i1][4] += r_changes[bestx%3];
        best_rect[i1][5] += g_changes[Math.floor(bestx/3)];
    }
    //shifting color channels b and a
    for (var i1=0; i1<best_rect.length; i1++) {
        var loss = [0,0,0,0,0,0,0,0,0];
        var new_rects = [];
        var b_changes = [-10*learning_rate,0,10*learning_rate];
        var a_changes = [-10*learning_rate,0,10*learning_rate];
        for (var i2=0; i2<3; i2++) {
            for (var i3=0; i3<3; i3++) {
                new_rect = best_rect.slice();
                new_rect[i1][6] += b_changes[i2];
                //new_rect[i1][7] += a_changes[i3];
                draw_rects(new_rect);
                loss[i2*3+i3] = find_loss();
            }
        }
        var bestx = loss.indexOf(Math.min(...loss));
        best_rect[i1][6] += b_changes[bestx%3];
        //best_rect[i1][7] += a_changes[Math.floor(bestx/3)];
    }
    draw_rects(best_rect);
    loss_iters.push(find_loss());
    if (Math.abs(loss_iters[loss_iters.length-2]-loss_iters.slice(-1))/loss_iters[loss_iters.length-2] >= 1/2) {
        //learning_rate /= 2;
    }
    //console.log(loss_iters);
    console.log("Gen "+(iters+1)+": "+loss_iters.slice(-1));
}

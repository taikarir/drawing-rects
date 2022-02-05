function draw_rects(arr) {
    for (var ii=0;ii<num_rects;ii++) {
        fill(arr[ii][4],arr[ii][5],arr[ii][6],arr[ii][7]);
        rect(arr[ii][0],arr[ii][1],arr[ii][2],arr[ii][3]);
    }
}

function find_loss() {
    loadPixels();
    //console.log(pixels);
    loss = 0;
    for (var i1=0; i1<pixels.length; i1++) {
        loss += (image_data.data[i1]-pixels[i1])^2;
    }
    if (loss<0) {
        loss = loss*loss;
    }
    return loss;
    //console.log(loss);
}

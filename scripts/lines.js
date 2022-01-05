var displayLines = {
    lines: function drawLines() {
        //mod 1 assignment
        if (mod1 === "A") {
            inc = 0.0015;
        } else if (mod1 === "B") {
            inc = 0.006;
        } else if (mod1 === "C") {
            inc = 0.0015;
        } else {
            inc = 0.006;
        }
        //main line
        noiseDetail(4);
        push();
        beginShape();
        strokeWeight(12);
        noFill();
        translate(-width / 2, -height / 2.4, -50);
        translate(0, 50, 0);
        var xoff = start1;
        for (var x = -50; x < width + 50; x++) {
            stroke(colorAttribute, 100, 100);
            var y = noise(xoff) * (0.75 * height);
            vertex(x + 0.5, y);
            vertex(x, y);
            xoff += inc;
        }
        endShape();
        start1 += inc;
        pop();
        //ine up 1
        push();
        translate(-width / 2, -height / 2.4, -50);
        translate(0, 50, 0);
        beginShape();
        strokeWeight(6);
        noFill();
        var xoff1 = start2;
        for (var x = -50; x < width + 50; x++) {
            stroke(colorAttribute, 55, 100);
            var y = noise(xoff1) * (0.5 * height);
            vertex(x, y);
            xoff1 += inc;
        }
        endShape();
        start2 += inc;
        pop();
        //line down 1
        push();
        translate(-width / 2, -height / 2.4, -50);
        translate(0, 50, 0);
        beginShape();
        strokeWeight(6);
        noFill();
        var xoff3 = start4;
        for (var x = -50; x < width + 50; x++) {
            stroke(colorAttribute, 100, 80);
            var y = noise(xoff3) * (0.95 * height);
            vertex(x, y);
            xoff3 += inc;
        }
        endShape();
        start4 += inc;
        pop();
        //line top
        push();
        translate(-width / 2, -height / 2.4, -50);
        beginShape();
        noFill();
        var xoff2 = start3;
        for (var x = -50; x < width + 50; x++) {
            if (mod1 !== "A" && mod1 !== "B") {
                strokeWeight(4);
                stroke(colorAttribute, 40, 100);
            } else {
                strokeWeight(0);
            }
            var y = noise(xoff2) * (0.25 * height);
            vertex(x, y);
            xoff2 += inc;
        }
        endShape();
        start3 += inc;
        pop();
        //line bottom
        push();
        translate(-width / 2, -height / 2.4, -50);
        translate(0, 50, 0);
        beginShape();
        noFill();
        var xoff4 = start5;
        for (var x = -50; x < width + 50; x++) {
            if (mod1 !== "A" && mod1 !== "B") {
                strokeWeight(4);
                stroke(colorAttribute, 100, 50);
            } else {
                strokeWeight(0);
            }
            var y = noise(xoff4) * (1.3 * height);
            vertex(x, y);
            xoff4 += inc;
        }
        endShape();
        start5 += inc;
        pop();
    }
};
var displayWeekLines = {
    perLines: function weekLines() {
        push();
        beginShape();
        for (var i = 0; i < TWO_PI; i += (0.06)) {
            var h = map(sin(i * (frameCount * 0.001)), 0, 1, -100, 100);
            colorAttribute = map(h, -100, 100, startColor, endColor);
            var r1Max = map(cos(frameCount * 0.005), -1, 1, 100, 20);
            var r2Min = map(sin(frameCount * 0.005), -1, 1, 120, 50);
            var r2Max = map(sin(frameCount * 0.005), -1, 1, 20, 100);
            var r1 = map(cos(i * 3), -1, 1, r1Min, r1Max);
            var r2 = map(cos(i * 6 + 90), -1, 1, r2Min, r2Max);
            var r = r1 + r2 - (i / 10);
            var x = r * cos(i);
            var y = r * sin(i);
            var shape = sin(frameCount * 0.01);
            var shapeChange = map(shape, 0, 1, 2, 40);
            if (mod2 === 1) {
                translate(0, 0, 0.2);
                push();
                rotate(0.01);
                stroke(colorAttribute, 100 - i * 4, 70 + i * 20);
                strokeWeight(5);
                push();
                noStroke();
                rectMode(CENTER);
                fill(colorAttribute, 100, 100, 0.1);
                rect(x, y, shapeChange * 2);
                translate(0, 0, -2);
                fill(colorAttribute, 100, 100, 0.3);
                rect(x, y, shapeChange);
                translate(0, 0, 2);
                fill(colorAttribute, 50, 100, 0.8);
                rect(x, y, shapeChange / 4);
                pop();
                pop();
            } else if (mod2 === 2) {
                translate(0, 0, 0.1);
                push();
                rotate(0.01);
                stroke(colorAttribute, 100 - (i * 20) * 4, 70 + i * 20);
                strokeWeight(5);
                push();
                noStroke();
                translate(0, 0, -1);
                fill(colorAttribute, 100, 100, 0.1);
                ellipse(x, y, shapeChange * 2);
                translate(0, 0, 10);
                fill(colorAttribute, 100, 100, 0.3);
                ellipse(x, y, shapeChange);
                fill(colorAttribute, 90, 100, 0.8);
                ellipse(x, y, shapeChange / 4);
                pop();
                pop();
            } else {
                translate(0, 0, 0.01);
                push();
                rotate(0.01);
                strokeWeight(1);
                fill(colorAttribute, 100, 100, 0.4);
                stroke(colorAttribute, 100, 100, 0.1);
                arc(x, y, shapeChange * 8, 60, HALF_PI, PI);
                noStroke();
                fill(colorAttribute, 100, 100, 0.3);
                arc(x, y, shapeChange * 8, 60, HALF_PI, PI);
                pop();
            }
            rotateZ(2);
            endShape(CLOSE);
        }
        pop();
    }
};
var monthBG = {
    monthBGDisplay: function monthBGeffects() {
        push();
        rectMode(CENTER);
        strokeWeight(3);
        rotateZ((frameCount * 0.002));
        for (var i = 0; i < 30; i++) {
            push();
            colorAttribute = map(sin(i * 100), -1, 1, startColor, endColor);
            var s = map(sin(i), -1, 1, 60, 100);
            var b = map(i, 0, 20, 80, 100);
            rotate(sin(i * 2 + (frameCount * 0.003)));
            stroke(colorAttribute, s, b);
            ambientMaterial(colorAttribute, s, b);
            pointLight(50, 100, 100, 0, 0, 500);
            pointLight(250, 0, 100, mouseX, mouseY, 500);
            var size = sin(frameCount * 0.01);
            var sizeChange = map(size, 0, 1, 20, 100);
            noFill();
            if (mod2 === 1) {
                push();
                translate(0, 0, -50);
                triangle(160, 0, 50, 50, 50, sizeChange);
                ambientMaterial(colorAttribute, s, b);
                fill(colorAttribute, s, b, 0.8);
                stroke(0);
                strokeWeight(0.3);
                cone(20, sizeChange, 6);
                pop();
            } else if (mod2 === 2) {
                push();
                if (mod1 === "C" || mod1 === "D") {
                    translate(0, 0, -100);
                    scale(6.5);
                    ellipse(0, 0, sizeChange, 100);
                    ambientMaterial(colorAttribute, s, b);
                    fill(colorAttribute, s, b, 0.8);
                    strokeWeight(0.3);
                    scale(0.4);
                    sphere((sizeChange * 0.3), 10);
                } else {
                    translate(0, 0, -50);
                    ellipse(0, 0, sizeChange, 100);
                    ambientMaterial(colorAttribute, s, b);
                    fill(colorAttribute, s, b, 0.8);
                    strokeWeight(0.3);
                    scale(0.4);
                    sphere((sizeChange * 0.3), 10);
                }
                pop();
            } else {
                strokeWeight(2);
                translate(0, 0, -100);
                scale(3);
                rect(0, 0, sizeChange, sizeChange * 2);
                ambientMaterial(colorAttribute, s, b);
                fill(colorAttribute, s, b, 0.8);
                stroke(0);
                strokeWeight(0.7);
                box(10, sizeChange * 0.8, 10);
                box(2, sizeChange, 2);
            }
            pop();
            if (mod2 === 2) {
                scale(1.048);
            } else if (mod2 === 3) {
                scale(1.05);
            } else {
                scale(1.08);
            }
            if (mod1 === "A") {
                translate(20, 10, 0);
                rotate((0.29 + (sin(frameCount * 0.0001))));
            } else if (mod1 === "B") {
                if (mod2 === 3) {
                    translate(30, -10, 4);
                } else {
                    translate(30, -10, 1);
                }
                rotate((0.2 + (sin(frameCount * 0.0002))));
            } else if (mod1 === "C") {
                translate(40, 10, 0);
                rotate((0.5 + (cos(frameCount * 0.0003))));
            } else {
                translate(20, -10, 0);
                rotate((0.29 + (sin(frameCount * 0.0008))));
            }
        }
    }
};
var yearBG = {
    yearBGDisplay: function yearBGeffects() {
        push();
        noiseDetail(1);
        if (mod1 === "A") {
            translate(0, 950, -660);
            rotateX(60);
            rotateY(49.8);
            scale(1.01, 1.3);
        } else if (mod1 === "B") {
            translate(-400, 400, -660);
            rotateX(500.1);
            rotateY(10.1);
        } else if (mod1 === "C") {
            translate(0, 920, -1060);
            rotateX(500.04);
            rotateY(50);
            scale(1.01, 1.5);
        } else {
            scale(0.8);
            translate(0, 950, -1060);
            rotateX(500.1);
            rotateY(50);
        }
        stroke(0);
        strokeWeight(0.01);
        directionalLight([255], createVector(0, 0, -1));
        directionalLight([255], createVector(0, 110, -1));
        scale(2.1);
        var w = 21;
        var start = frameCount / 60;
        var xoffCube = 0;
        for (var x = -350; x <= width / 2; x += w) {
            var yoffCube = 0;
            for (var y = -50; y <= 500; y += (w)) {
                if (mod1 === "A") {
                    rotateZ(0.1);
                    rotateY(0.0009);
                } else if (mod1 === "B") {
                    rotateY(0.0031);
                } else if (mod1 === "C") {
                    rotateY(0.079);
                } else {
                    rotateY(1);
                }
                var h = map(noise(xoffCube + start, yoffCube + start), 0, 1, -100, 130);
                colorAttribute = map(x, -width / 2, width / 2, startColor, endColor);
                var s = map(y, -height / 2, height / 2, 500, 0);
                var b = map(h, -100, 100, 0, 500);
                push();
                fill(colorAttribute, s, b, 0.8);
                translate(x, y, -h / 2);
                if (mod2 === 1) {
                    box(w, h, h);
                } else if (mod2 === 2) {
                    cylinder(h, w, 5, 5);

                } else {
                    sphere(h, 6, 6);
                }
                pop();
                yoffCube += 0.2;
            }
            xoffCube += 0.008;
        }
        pop();
}
};
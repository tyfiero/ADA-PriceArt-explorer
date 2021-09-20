var pair = "ADA/USD";
//color variables
var colorAttribute;
var startColor, endColor;
//date variable for date text
var inputData;
var dateSelector;
// Global data variables
var data;
var dataPoints = [];
// Data variables
var dO, dH, dL, dC, dDate, dColor, mod1, mod2, NFTnum, timeType, rank;
//background variables
var bgDark;
var bgRed;
var bgPurple;
var bgTrees;
var pg;
var wStart = 1;
//percent shader variables
var emitter;
var img;
var myShader;
var up1;
var up2;
var up3;
var down1;
var down2;
var down3;
//monthly sin variables
var kMax = 10; // between 2-10
var scaleMax = 2; //between 0.6-2
var r1Min;
//other variable declarations
var logo;
var logoLocale = -0.004;
var logoSpeed = 0.004;
var logoTrademark;
var button;
var buttonZoom;
var buttonRefresh;
var buttonAlpha;
var buttonPause;
var logo3D;
var rotateLogo = 1;
var myFont;
//click variables
var clickState;
var clicked;
var spinSpeed;
var clickedMap;
var released;
var clickAlpha;
var clickStroke;
var bigLogo = false;
var transCand = false;
var rKey = false;
var paused = false;
//start variables for bg lines
var start1 = 0;
var start2 = 0;
var start3 = 0;
var start4 = 0;
var start5 = 0;
var inc;
//color variable for text
var textColor;
var textSat;
var textBright;
var dirColor;
var isRecording = false;
var message = false;
var timeToWait;

function preload() {
    // Data
    data = {
        "yearly": loadJSON("data/yearly.json"),
        "monthly": loadJSON("data/monthly.json"),
        "weekly": loadJSON("data/weekly.json"),
        "daily": loadJSON("data/daily.json"),
        "4hour": loadJSON("data/4hour.json"),
    };
    //font
    myFont = loadFont("https://arweave.net/-hnQ1l6qi8W82XdVBX0-cWatpQcLbN5TZ6-MRKHilRc");
    // //images
    moon = loadImage("https://oksfendlaida6jopynz3kone4hlgazcx4r3xav2spoa5o7f2dzla.arweave.net/cqRSNGsCBg8lz8NztTmk4dZgZFfkd3BXUnuB13y6HlY");
    venus = loadImage("https://si6obhn6jipv2pw3dijxpv5nhp6fdfaar6i4nkrr3tkjefunqjdq.arweave.net/kjzgnb5KH10-2xoTd9etO_xRlACPkcaqMdzUkhaNgkc");
    neptune = loadImage("https://sdbfddngouflnoaw3ulcbllatfpzzwby36cydxswpz7l6gih43ga.arweave.net/kMJRjaZ1Cra4Ft0WIK1gmV-c2DjfhYHeVn5-vxkH5sw");
    jupiter = loadImage("https://jyrfnwtiw3eaki7enu2lljtkigpnixty5ycsqrj7cvpj4isqp66q.arweave.net/TiJW2mi2yAUj5G00taZqQZ7UXnjuBShFPxVeniJQf70");
    planetary = loadImage("https://pqbynmdg4vtrqnj4vnxytbvkf6hxavqvjyagwkygztovbfmrowla.arweave.net/fAOGsGblZxg1PKtviYaqL49wVhVOAGsrBszdUJWRdZY");
    //3d logo
    logo3D = loadModel("assets/ada3d.obj", true);
    logoTrademark = loadImage("https://5yzjyswno5npllnoa4xmgb4xl3zzrfaaci6wrqxkkuhspplr52pa.arweave.net/7jKcSs13WvWtrgcuwweXXvOYlAASPWjC6lUPJ71x7p4");
    //shader preload
    myShader = loadShader("assets/percentshader.vert", "assets/percentshader.frag");
    up1 = loadImage("https://fowyqquowcpmynfhs4uhk45w35rurtnnvhushnwj327tc3rfkqma.arweave.net/K62IQo6wnsw0p5codXO232NIza2p6SO2yd6_MW4lVBg");
    up2 = loadImage("https://axzp6e4deb4qnbygd5cwpo6qgab7nxlbbs7vz4zdm2rxa2o2qhia.arweave.net/BfL_E4MgeQaHBh9FZ7vQMAP23WEMv1zzI2ajcGnagdA");
    up3 = loadImage("https://gtiafqa4c6bwq5xr6bnfaxjslp4rltm2evztua64pzkriorjazma.arweave.net/NNACwBwXg2h28fBaUF0yW_kVzZolczoD3H5VFDopBlg");
    down1 = loadImage("https://qgqbkujck7ljk5wcdshbrwrn5ddtc5mdjdn2aptqkaerwaxkxw2a.arweave.net/gaAVUSJX1pV2whyOGNot6McxdYNI26A-cFAJGwLqvbQ");
    down2 = loadImage("https://a27fi4qrhpuhz4lonzado4ytrhndcwpdwf5iizzueltnwq7ramma.arweave.net/Br5UchE76Hzxbm5AN3MTidoxWeOxeoRnNCLm20PxAxg");
    down3 = loadImage("https://lu3jhlxx4wnjknjoywjxgowwearnkgkk7h5lzxrl25jknijdjrxa.arweave.net/XTaTrvflmpU1LsWTczrWICLVGUr5-rzeK9dSpqEjTG4");
}
// Load meta-data into div
var metaDataNames = ['NFT #', 'Type', 'Date', '% Rank', 'Color', 'Loop Mod', 'Shape Mod'];

function loadMetaData(metaData) {
    var metaDataDiv = document.querySelector('#nft-meta-data');
    var cnv = document.querySelector('canvas');
    if (innerWidth > 1000) {
        metaDataDiv.style.height = `${cnv.style.height.slice(0, -2) - 200}px`;
        metaDataDiv.style.width = '350px';
    } else {
        metaDataDiv.style.height = '600px';
        metaDataDiv.style.width = '90vw';
    }
    metaDataDiv.innerHTML = '';
    var i = 0;
    for (val of Object.entries(metaData)) {
        if (['open', 'close', 'high', 'low'].includes(val[0])) {
            continue;
        } else {
            var text = val[1];
            var p = document.createElement('p');
            p.innerHTML = `<span class="meta-data-key">${metaDataNames[i]}:</span>
            <span class="meta-data-value">${text}</span>`
            metaDataDiv.appendChild(p);
        }
        i++;

    }
}
//FUNCTION SETUP
var cnv;

function setup() {
    cnv = createCanvas(1000, 1000, WEBGL);
    // Scale canvas
    if (window.innerWidth > 1000) {
        document.querySelector('canvas').style.height = `${innerHeight - 150}px`;
        document.querySelector('canvas').style.width = `${innerHeight - 150}px`;

    } else {
        document.querySelector('canvas').style.height = `${innerWidth - 70}px`;
        document.querySelector('canvas').style.width = `${innerWidth - 70}px`;
    }
    cnv.parent(document.querySelector('#canvas-and-metadata'));
    colorMode(HSB, 359, 100, 100, 1);
    textFont(myFont);
    //pauses sketch if runs for more than 5 minutes.
    setTimeout(timeOutPause, 300000);
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    };
    // When the dropdown date is selected, it changes the variable timeType
    document.querySelector("#date-selector").oninput = function () {
        var e = document.getElementById("date-selector").value;
        parentElement = document.querySelector('#dynamic-selectors');
        parentElement.innerHTML = '';
        switch (e) {
            case 'Year':
                // Create year selector
                var selectYear = document.createElement('select');

                // Create first option
                var option = document.createElement('option');
                option.text = 'Year:';
                option.selected = true;
                selectYear.appendChild(option);
                parentElement.appendChild(selectYear);

                // Create other options
                for (year of Object.entries(data['yearly']['adaOHLC'][0])) {
                    var option = document.createElement('option');
                    option.text = year[0];
                    selectYear.appendChild(option);
                    parentElement.appendChild(selectYear);
                }
                // Update data variables
                selectYear.oninput = function () {
                    var OHLCdata = data['yearly']['adaOHLC'][0][selectYear.value];
                    dO = OHLCdata.open;
                    dC = OHLCdata.close;
                    dL = OHLCdata.low;
                    dH = OHLCdata.high;
                    dDate = OHLCdata.date;
                    dColor = OHLCdata.color;
                    mod1 = OHLCdata.mod1;
                    mod2 = OHLCdata.mod2;
                    rank = OHLCdata['%rank'];
                    NFTnum = OHLCdata["NFT#"];
                    timeType = OHLCdata.timeType;
                    loadMetaData(OHLCdata);
                };
                break;
            case 'Month':
                // Create year selector
                var selectYear = document.createElement('select');
                // Create first option
                var option = document.createElement('option');
                option.text = 'Year:';
                option.selected = true;
                selectYear.appendChild(option);;
                parentElement.appendChild(selectYear)
                // Create other options
                for (year of Object.entries(data['yearly']['adaOHLC'][0])) {
                    var option = document.createElement('option');
                    option.text = year[0];
                    selectYear.appendChild(option);
                    parentElement.appendChild(selectYear);
                }

                // Create month selector
                selectYear.oninput = function () {
                    var selectMonth = document.createElement('select');

                    // Clear parrent's inner html
                    parentElement.innerHTML = '';
                    parentElement.appendChild(selectYear);

                    // Create first option
                    var option = document.createElement('option');
                    option.text = 'Month:';
                    option.selected = true;
                    selectMonth.appendChild(option);
                    parentElement.appendChild(selectMonth);

                    // Create other options
                    for (month of Object.entries(data['monthly']['adaOHLC'][0])) {

                        if (month[0].slice(-4) === selectYear.value) {
                            var monthNum = month[0].slice(0, 2);
                            var option = document.createElement('option');
                            option.text = months[monthNum];
                            option.value = monthNum;
                            selectMonth.appendChild(option);
                            parentElement.appendChild(selectMonth);
                        }
                    }
                    selectMonth.oninput = function () {
                        var key = selectMonth.value + '/' + selectYear.value;
                        var OHLCdata = data['monthly']['adaOHLC'][0][key];
                        dO = OHLCdata.open;
                        dC = OHLCdata.close;
                        dL = OHLCdata.low;
                        dH = OHLCdata.high;
                        dDate = OHLCdata.date;
                        dColor = OHLCdata.color;
                        mod1 = OHLCdata.mod1;
                        mod2 = OHLCdata.mod2;
                        rank = OHLCdata['%rank'];
                        NFTnum = OHLCdata["NFT#"];
                        timeType = OHLCdata.timeType;
                        loadMetaData(OHLCdata);
                    }
                };
                break;
            case 'Week':
                // Create year selector
                var selectYear = document.createElement('select');
                // Create first option
                var option = document.createElement('option');
                option.text = 'Year:';
                option.selected = true;
                selectYear.appendChild(option);
                parentElement.appendChild(selectYear);
                // Create other options
                for (year of Object.entries(data['yearly']['adaOHLC'][0])) {
                    var option = document.createElement('option');
                    option.text = year[0];
                    selectYear.appendChild(option);
                    parentElement.appendChild(selectYear);
                }
                // Create week selector
                selectYear.oninput = function () {
                    var selectWeek = document.createElement('select');
                    // Clear parent's inner html
                    parentElement.innerHTML = '';
                    parentElement.appendChild(selectYear);
                    // Create first option
                    var option = document.createElement('option');
                    option.text = 'Week:';
                    option.selected = true;
                    selectWeek.appendChild(option);
                    parentElement.appendChild(selectWeek);
                    // Create other options
                    for (week of Object.entries(data['weekly']['adaOHLC'][0])) {
                        if (week[0].slice(0, 4) === selectYear.value) {
                            var weekNum = week[0].slice(5);
                            var option = document.createElement('option');
                            option.text = weekNum;
                            option.value = weekNum;
                            selectWeek.appendChild(option);
                            parentElement.appendChild(selectWeek);
                        }
                    }
                    // Update data variables
                    selectWeek.oninput = function () {
                        var key = selectYear.value + '-' + selectWeek.value;
                        var OHLCdata = data['weekly']['adaOHLC'][0][key];
                        dO = OHLCdata.open;
                        dC = OHLCdata.close;
                        dL = OHLCdata.low;
                        dH = OHLCdata.high;
                        dDate = OHLCdata.date;
                        dColor = OHLCdata.color;
                        mod1 = OHLCdata.mod1;
                        mod2 = OHLCdata.mod2;
                        rank = OHLCdata['%rank'];
                        NFTnum = OHLCdata["NFT#"];
                        timeType = OHLCdata.timeType;
                        loadMetaData(OHLCdata);
                    }
                }
                break;
            case 'Day':
                // Create day selector
                var selectDay = document.createElement('input');
                selectDay.type = 'date';
                selectDay.min = '2017-10-01';
                selectDay.max = '2021-08-31';
                parentElement.appendChild(selectDay);
                // Update data variables
                selectDay.oninput = function () {
                    var dateElements = selectDay.value.split('-');
                    var key = dateElements[1] + '/' + dateElements[2] + '/' + dateElements[0];
                    var OHLCdata = data['daily']['adaOHLC'][0][key];
                    dO = OHLCdata.open;
                    dC = OHLCdata.close;
                    dL = OHLCdata.low;
                    dH = OHLCdata.high;
                    dDate = OHLCdata.date;
                    dColor = OHLCdata.color;
                    mod1 = OHLCdata.mod1;
                    mod2 = OHLCdata.mod2;
                    rank = OHLCdata['%rank'];
                    NFTnum = OHLCdata["NFT#"];
                    timeType = OHLCdata.timeType;
                    loadMetaData(OHLCdata);
                }
                break;
            case '4-Hour':
                // Create day selector
                var selectDay = document.createElement('input');
                selectDay.type = 'date';
                selectDay.min = '2017-10-01';
                selectDay.max = '2021-08-31';
                parentElement.appendChild(selectDay);
                // Create 4hour selector
                selectDay.oninput = function () {
                    var select4Hour = document.createElement('select');
                    // Clear parrent's inner html
                    parentElement.innerHTML = '';
                    parentElement.appendChild(selectDay);
                    // Create first option
                    var option = document.createElement('option');
                    option.text = '4-Hour:';
                    option.selected = true;
                    select4Hour.appendChild(option);
                    parentElement.appendChild(select4Hour);
                    // Create other options
                    for (var i = 0; i < 24; i += 4) {
                        var option = document.createElement('option');
                        option.text = i;
                        select4Hour.appendChild(option);
                        parentElement.appendChild(select4Hour);
                    }
                    // Update data variables
                    select4Hour.oninput = function () {
                        var dateElements = selectDay.value.split('-');
                        var yearPart = dateElements[1] + '/' + dateElements[2] + '/' + dateElements[0];
                        var key = yearPart + '-' + select4Hour.value;
                        var OHLCdata = data['4hour']['adaOHLC'][0][key];
                        dO = OHLCdata.open;
                        dC = OHLCdata.close;
                        dL = OHLCdata.low;
                        dH = OHLCdata.high;
                        dDate = OHLCdata.date;
                        dColor = OHLCdata.color;
                        mod1 = OHLCdata.mod1;
                        mod2 = OHLCdata.mod2;
                        rank = OHLCdata['%rank'];
                        NFTnum = OHLCdata["NFT#"];
                        timeType = OHLCdata.timeType;
                        loadMetaData(OHLCdata);
                    };
                };
                break;
        };
    };
    // Create buttons inside the settings div
    var parentElement = document.querySelector('#settings');
    if (window.innerWidth > 1000) {
        buttonRecord = createButton("<span class='material-icons'>radio_button_checked</span>");
        buttonRecord.mousePressed(() => {
            isRecording = true;
        });
        buttonRecord.style("font-size", "15px");
        buttonRecord.style("background-color", 100);
        buttonRecord.parent(parentElement);

        button = createButton("<span class='material-icons'>file_download</span>");
        button.mousePressed(saveImage);
        button.style("font-size", "15px");
        button.style("background-color", 100);
        button.parent(parentElement);
    }
    buttonPause = createButton("<span class='material-icons'>pause</span>");
    buttonPause.mousePressed(pause);
    buttonPause.addClass('button-pause');
    buttonPause.style("font-size", "15px");
    buttonPause.style("background-color", 100);
    buttonPause.parent(parentElement);

    buttonZoom = createButton("<span class='material-icons'>zoom_in</span>");
    buttonZoom.mousePressed(logoZoom);
    buttonZoom.style("font-size", "15px");
    buttonZoom.style("background-color", 100);
    buttonZoom.parent(parentElement);

    buttonAlpha = createButton("<span class='material-icons'>view_in_ar</span>");
    buttonAlpha.mousePressed(transparentCandle);
    buttonAlpha.style("font-size", "15px");
    buttonAlpha.style("background-color", 100);
    buttonAlpha.parent(parentElement);

    buttonRefresh = createButton("<span class='material-icons'>wallpaper</span>");
    buttonRefresh.mousePressed(rButton);
    buttonRefresh.style("font-size", "15px");
    buttonRefresh.style("background-color", 100);
    buttonRefresh.parent(parentElement)

    function timeOutPause() {
        if (!isRecording) {
            paused = true;
            document.querySelector('.button-pause').innerHTML = '<span class="material-icons">play_arrow</span>';
        }
    }
};

function saveImage() {
    save(`${dDate} ADAUSD.png`);
}

function logoZoom() {
    if (!bigLogo) {
        bigLogo = true;
    } else {
        bigLogo = false;
    }
}

function transparentCandle() {
    if (!transCand) {
        transCand = true;
    } else {
        transCand = false;
    }
}

function keyPressed() {
    if (key === 'r' && !rKey) {
        rKey = true;
    } else {
        rKey = false;
    }
}

function rButton() {
    if (!rKey) {
        rKey = true;
    } else {
        rKey = false;
    }
}

function checkLoop() {
    if (this.checked()) {
        loop();
    } else {
        noLoop();
    }
}

function gifMessage() {
    push();
    colorAttribute = map(sin(frameCount * 0.01), -1, 1, startColor, endColor);
    fill(colorAttribute, 100, 100);
    translate(0, 0, 100);
    textSize(40);
    text("Please be patient, gif export\ncan take a few minutes after \nrecording to download.", -420, -180);
    pop();
}

function pause() {
    if (!paused) {
        paused = true;
        document.querySelector('.button-pause').innerHTML = '<span class="material-icons">play_arrow</span>';
        noLoop();

    } else {
        paused = false;
        document.querySelector('.button-pause').innerHTML = '<span class="material-icons">pause</span>';
        loop();
    }
}

var imageSource;
var gifLength = 60 * 5; // <-- Last number controls how many seconds should be recorded when the button is pressed
var frameNum = 0;

function draw() {
    // Set default for input
    if (frameCount === 1) {
        var dateSelector = document.querySelector('#date-selector');
        dateSelector.value = 'Year';
        var e = new Event('input', {
            value: 'Year'
        });
        dateSelector.dispatchEvent(e);
        var childSelector = document.querySelector('#dynamic-selectors').firstChild;
        childSelector.value = '2019';
        childSelector.dispatchEvent(e);

    }

    if (isRecording && frameNum === 1) {
        WEBMCapturer.start();
    }
    if (paused) {
        noLoop();
    } else if (!paused) {
        loop();
    }
    noStroke();
    //--------Delta and percent math for text
    var deltaUp = dC - dO;
    var deltaRoundUp = deltaUp.toFixed(3);
    var deltaDown = dO - dC;
    var deltaRoundDown = deltaDown.toFixed(3);
    var percentUp = ((dC - dO) / dO) * 100;
    var percentRoundUp = percentUp.toFixed(2);
    var percentDown = ((dC - dO) / dO) * 100;
    var percentRoundDown = percentDown.toFixed(2);
    var percentHL = ((dH - dL) / dL) * 100;
    var percentRoundHL = percentHL.toFixed(2);
    //ratio of H/L % vs O/C % for doji math and to see if the O/C text needs formatting
    var ratioPercent;
    //direction variable to determine red or green candle
    var direction = dC - dO;
    if (direction > 0) {
        ratioPercent = (percentRoundUp / percentRoundHL);
    } else {
        ratioPercent = (percentRoundDown / percentRoundHL) * -1;
    }
    //This keeps ratioPercent always positive to avoid weird scenarios
    if (ratioPercent < 0) {
        ratioPercent = ratioPercent * -1;
    }

    //Color variable assigning from metadata
    if (dColor === 'rainbow') {
        startColor = 0;
        endColor = 359;
    } else if (dColor === 'blue') {
        startColor = 180;
        endColor = 280;
    } else if (dColor === 'green') {
        startColor = 80;
        endColor = 169;
    } else {
        startColor = 281;
        if (startColor = 359) {
            startColor = 0;
        }
        endColor = 49;
    }
    //Make color variable change over time
    colorAttribute = map(sin(frameCount * 0.01), -1, 1, startColor, endColor);
    //Text color
    textColor = 215;
    textSat = 80;
    textBright = 100;
    //dynamic backgrounds
    if (timeType === "4-Hour") {
        push();
        if (!rKey) {
            push();
            translate(0, 0, -200);
            scale(1.4);
            texture(neptune);
            plane(width, height);
            pop();
        }
        //display lines function from lines.js
        displayLines.lines();
        //draw simulated volume bars
        push();
        translate(-70, 600, -150);
        rotateX(30);
        var boxStart = frameCount / 200;
        var boxOff = 0;
        var barSize;
        var boxHMax;
        if (mod2 === 1) {
            barSize = 100;
            boxHMax = 300;
        } else if (mod2 === 2) {
            barSize = 50;
            boxHMax = 500;
        } else {
            barSize = 20;
            boxHMax = 800;
        }
        for (var x = -width / 2; x <= (width / 2) + 150; x += barSize) {
            push();
            var colH = map(cos(x * (frameCount / 30000)), -1, 1, -100, 100);
            colorAttribute = map(colH, -100, 100, startColor, endColor);
            var boxH = map(noise(boxOff + boxStart, boxOff + boxStart), 0, 1, 0, boxHMax);
            fill(colorAttribute, 100, 100, 0.3);
            stroke(0);
            translate(x, -50, -boxH / 2);
            box((barSize - barSize / 5), 25, boxH);
            pop();
            boxOff += 0.08;
        }
        pop();
    } else if (timeType === "Day") {
        if (!rKey) {
            push();
            translate(0, 0, -100);
            scale(1.15);
            texture(venus);
            plane(width, height);
            pop();
        }
        push();
        noiseDetail(1);
        translate(0, 0, -90);
        strokeWeight(0.5);
        stroke(0);
        //draw circular bg visuals
        beginShape();
        for (var i = 0; i < 360; i += 3) {
            push();
            rotate(4);
            var size = 100;
            var rad = 300;
            var x = rad * cos(i);
            var y = rad * sin(i);
            var xOff = map(cos(i), -1, 1, 0, 3);
            var yOff = map(sin(i), -1, 1, 0, 3);
            if (mod1 === "A") {
                size = 200;
            } else if (mod1 === "B") {
                xOff = map(cos(i), -1, 1, 0, 300);
                size = 150;
            } else if (mod1 === "C") {
                x = rad * sin(2 * i);
                size = 200;
            } else {
                y = rad * tan(i);
                size = 300;
            }
            var h = map(noise(xOff + wStart, yOff + wStart), 0, 1, -100, 300);
            colorAttribute = map(h, -100, 100, startColor, endColor);
            fill(colorAttribute, 100, 100, 0.8);
            translate(x, y);
            rotate(i);
            if (mod2 === 1) {
                rect(0, 0, h, size / 3);
            } else if (mod2 === 2) {
                triangle(0, 0, h, size, h, h / 4);
            } else {
                arc(h, 0, size, h, PI, TWO_PI);
            }
            pop();
        }
        wStart += 0.01;
        pop();
    } else if (timeType === "Week") {
        textColor = 215;
        textSat = 80;
        textBright = 100;
        if (!rKey) {
            push();
            translate(0, 0, -100);
            scale(1.15);
            texture(planetary);
            plane(width, height);
            pop();
        }
        push();
        if (mod1 === "A") {
            speed = 1;
            r1Min = map(sin(frameCount * 0.011), -1, 1, 50, 90);
        } else if (mod1 === "B") {
            speed = 2;
            r1Min = map(sin(frameCount * 0.028), -1, 1, 50, 300);
        } else if (mod1 === "C") {
            speed = 4;
            r1Min = map(tan(frameCount * 0.008), -1, 1, 50, 500);
        } else {
            speed = 8;
            r1Min = map(tan(frameCount * 0.009), -1, 1, 50, 120);
        }
        pop();
        push();
        translate(0, 0, -90);
        scale(2);
        //display week lines from lines.js
        displayWeekLines.perLines();
        pop();
    } else if (timeType === "Month") {
        if (!rKey) {
            push();
            translate(0, 0, -200);
            scale(1.3);
            texture(jupiter);
            plane(width, height);
        }
        pop();
        push();
        monthBG.monthBGDisplay();
        pop();
        //YEAR
    } else {
        if (!rKey) {
            push();
            translate(0, 0, -1400);
            scale(3.15);
            texture(moon);
            plane(width, height);
            pop();
        }
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

    //logo rotation 
    spinSpeed = 0.009;
    clickedMap = map(mouseX, 0, 1000, 0.0001, 0.008);
    push();
    clicked = frameCount * clickedMap;
    released = frameCount * 0.003;
    pop();
    logoRotate = 0;
    //picks the high and low values of data
    var yMin = Math.min(...[dH, dO, dC, dL]);
    var yMax = Math.max(...[dH, dO, dC, dL]);

    //map data to canvas height
    var yH = map(dH, yMin, yMax, 450, -450);
    var yO = map(dO, yMin, yMax, 450, -450);
    var yC = map(dC, yMin, yMax, 450, -450);
    var yL = map(dL, yMin, yMax, 450, -450);

    if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
        //mouse click rotate candle
        if (!mouseIsPressed) {
            clickState = released;
            click = 0;
            camera(
                0,
                0,
                height / 2 / tan(PI / 6),
                0,
                0,
                0,
                0,
                1,
                0
            );
        } else {
            clickState = clicked;
            var cameraX = map(mouseX, 0, 1000, 500, -500);
            var cameraY = map(mouseY, 0, 1000, -500, 500);

            camera(
                0.08 * cameraX,
                0.08 * cameraY,
                height / 2 / tan(PI / 6),
                0,
                0,
                0,
                0,
                1,
                0
            );
        }

    } else {
        clickState = released;
        click = 0;
    }
    //Lines/labels
    stroke(255);
    strokeWeight(3);
    textSize(20);

    push();
    textSize(50);
    stroke(0, 100, 0);
    //symbol text
    fill(215, 100, 100);
    text(`${pair}`, -490, -450);

    fill(textColor, textSat, textBright);
    if (timeType === '4-Hour') {
        textSize(42);
    }
    push();
    stroke(0);
    strokeWeight(10);
    fill(200, 40, 100);
    text(`${dDate}`, -480, 480);
    pop();
    pop();
    //UP 3D candle draw
    if (direction > 0 && ratioPercent > 0.01) {
        push();
        textSize(25);
        fill(100, 0, 100);
        line(300, yC, 400, yC);
        fill(100, 100, 100);

        if (ratioPercent < 0.059) {
            text(`Close`, 356, yC - 8);
            text(`$${dC}`, 300, yC + 25);

            fill(100, 0, 100);
            text(` / `, 336, yC - 8);
            fill(100, 0, 70);

            text(`Open `, 280, yC - 8);
            text(`$${dO}`, 300, yC + 50);
            fill(100, 100, 100);

        } else {
            text(`$${dC}`, 310, yC + 25);
            text(`Close`, 325, yC - 8);

            line(300, yO, 400, yO);
            text(`$${dO}`, 310, yO + 25);
            text(`Open`, 322, yO - 8);
        }
        //high+low text
        line(410, yH, 500, yH);
        text(`$${dH}`, 400, yH + 25);
        text(`High`, 430, yH - 8);

        line(410, yL, 500, yL);
        text(`$${dL}`, 400, yL + 25);
        text(`Low`, 435, yL - 8);
        //reset stroke weight for candles
        strokeWeight(2);
        if (!transCand) {
            if (rank === "top 20-10%") {
                shader(myShader);
                myShader.setUniform("uPercentTexture", up1);
            } else if (rank === "top 10-2%") {
                shader(myShader);
                myShader.setUniform("uPercentTexture", up2);
            } else if (rank === "top 2%") {
                shader(myShader);
                myShader.setUniform("uPercentTexture", up3);
            } else {
                //color/light
                directionalLight(100, 0, 100, -200, 0, 0);
                pointLight(100, 0, 100, 100, 20, 100);
                pointLight(100, 0, 100, -100, 250, 100);
                var lightMapX = map(mouseX, 0, 1000, -500, 500);
                var lightMapY = map(mouseY, 0, 1000, -500, 500);
                pointLight(100, 0, 50, lightMapX, lightMapY, 80);
            }
        }
        //text, % & delta
        fill(100, 100, 100);
        textSize(35);
        text(`+${percentRoundUp}%`, -480, 435);
        textSize(25);
        text(`+$${deltaRoundUp}`, -477, 400);
        rotateY(clickState);

        ambientMaterial(125, 100, 100);
        stroke(0, 0, 0);
        //candle body
        push();
        if (transCand) {
            noFill();
            stroke(100, 100, 100);
            strokeWeight(0.5);
        }
        ambientLight(100, 0, 20);
        //moves candle to the middle of open/close
        translate(0, (yC + yO) / 2, 0);
        box(100, yC - yO, 100);
        pop();
        //---------wick-------------
        push();
        if (transCand) {
            noFill();
            stroke(100, 100, 100);
            strokeWeight(0.7);
        }
        ambientLight(100, 0, 30);
        translate(0, (yH + yL) / 2, 0); //moves wick to the middle of hi/low
        box(20, yH - yL, 20);
        pop();
        pop();
    }

    //DOWN 3D candle draw
    if (direction < 0 && ratioPercent > 0.01) {
        push();
        textSize(25);
        if (ratioPercent < 0.059 && timeType !== 'Year') {
            fill(100, 0, 100);
            line(300, yO, 400, yO);
            text(` / `, 336, yO - 8);
            fill(0, 100, 100);
            text(`Close`, 356, yO - 8);
            text(`$${dC}`, 300, yO + 50);
            fill(100, 0, 70);
            text(`Open `, 280, yO - 8);
            text(`$${dO}`, 300, yO + 25);
            fill(0, 100, 100);
        } else {
            fill(100, 0, 100);
            line(300, yC, 400, yC);
            line(300, yO, 400, yO);
            fill(0, 100, 100);
            text(`$${dC}`, 310, yC + 25);
            text(`Close`, 325, yC - 8);
            text(`$${dO}`, 310, yO + 25);
            text(`Open`, 322, yO - 8);
            fill(0, 100, 100);
        }
        //high +low text
        line(410, yH, 500, yH);
        text(`$${dH}`, 400, yH + 25);
        text(`High`, 430, yH - 8);
        line(410, yL, 500, yL);
        text(`$${dL}`, 400, yL + 25);
        text(`Low`, 435, yL - 8);
        strokeWeight(2);
        //DRAW PERCENT CONDITIONAL
        if (!transCand) {
            if (rank === "bottom 20-10%") {
                shader(myShader);
                myShader.setUniform("uPercentTexture", down1);
            } else if (rank === "bottom 10-2%") {
                shader(myShader);
                myShader.setUniform("uPercentTexture", down2);
            } else if (rank === "bottom 2%") {
                shader(myShader);
                myShader.setUniform("uPercentTexture", down3);
            } else {
                //-------color/light---------
                directionalLight(0, 0, 100, -200, 0, 0);
                pointLight(0, 0, 100, 100, 20, 100);
                pointLight(0, 0, 100, -100, 250, 100);
                lightMapX = map(mouseX, 0, 1000, -500, 500);
                lightMapY = map(mouseY, 0, 1000, -500, 500);
                pointLight(0, 0, 50, lightMapX, lightMapY, 80);
                ambientMaterial(0, 100, 100);
            }
        }
        fill(0, 100, 100);
        stroke(0, 0, 0);
        textSize(35);
        text(`${percentRoundDown}%`, -480, 435);
        textSize(25);
        text(`-$${deltaRoundDown}`, -477, 400);
        rotateY(clickState);

        //candle body
        push();
        if (transCand) {
            noFill();
            stroke(0, 100, 100);
            strokeWeight(0.7);
        }
        ambientLight(0, 0, 20);
        translate(0, (yC + yO) / 2, 0);
        box(100, yC - yO, 100);
        pop();
        //wick
        push();
        if (transCand) {
            noFill();
            stroke(0, 100, 100);
            strokeWeight(0.5);
        }
        ambientLight(0, 0, 30);
        translate(0, (yH + yL) / 2, 0);
        box(20, yH - yL, 20);
        pop();
        pop();
    }
    //DOJI 3D candle draw
    if (direction === 0 || ratioPercent <= 0.01) {
        push();
        strokeWeight(3);
        textSize(25);
        fill(100, 0, 100);
        line(300, yC, 400, yC);
        fill(220, 100, 100);
        text(`Open `, 280, yC - 8);
        text(`$${dO}`, 300, yC + 25);
        fill(200, 0, 100);
        text(` / `, 336, yC - 8);
        fill(200, 100, 100);
        text(`$${dC}`, 300, yC + 50);
        text(`Close`, 356, yC - 8);
        //high +low text
        line(410, yH, 500, yH);
        text(`$${dH}`, 400, yH + 25);
        text(`High`, 430, yH - 8);
        line(410, yL, 500, yL);
        text(`$${dL}`, 400, yL + 25);
        text(`Low`, 435, yL - 8);
        strokeWeight(2);
        // DOJI TEXT
        fill(200, 30, 100);
        textSize(30);
        text(`Doji!`, -360, 420);
        //color/light
        directionalLight(200, 0, 100, -200, 0, 0);
        pointLight(200, 0, 100, 100, 20, 100);
        pointLight(200, 0, 100, -100, 250, 100);
        fill(200, 100, 100);
        textSize(35);
        text(`+${percentRoundUp}%`, -480, 435);
        textSize(25);
        text(`+$${deltaRoundUp}`, -477, 400);
        rotateY(clickState);

        ambientMaterial(200, 100, 100);
        stroke(0, 0, 0);
        //candle body
        push();
        if (transCand) {
            noFill();
            stroke(200, 100, 100);
            strokeWeight(0.5);
        }
        ambientLight(100, 0, 100);
        translate(0, (yC + yO) / 2, 0);
        box(100, yC - yO, 100);
        pop();
        //wick
        push();
        if (transCand) {
            noFill();
            stroke(200, 100, 100);
            strokeWeight(0.7);
        }
        ambientLight(100, 0, 30);
        translate(0, (yH + yL) / 2, 0); //moves wick to the middle of hi/low
        box(20, yH - yL, 20);
        pop();
        pop();
    }
    //3D logo load
    if (1 > 0) {
        push();
        noStroke();
        translate(-300, -400, 0);
        scale(0.25);
        texture(logoTrademark);
        plane(50, 50);
        pop();
        push();
        translate(-380, -330, 10);
        noStroke();
        if (logoLocale > 0.6 || logoLocale < -0.1) {
            logoSpeed = logoSpeed * -1;
        }
        logoLocale = logoLocale + logoSpeed;
        if (!rKey) {
            rotateY(logoLocale);
        }
        var locX = mouseX - width / 2;
        var locY = mouseY - height / 2;
        lights();
        pointLight(220, 0, 100, locX, locY, 0);
        pointLight(220, 0, 100, locX, locY, 200);
        specularMaterial(220, 100, 70);
        shininess(100);
        //logoZoom
        if (mouseIsPressed && !bigLogo) {
            if (mouseButton === CENTER || bigLogo) {
                translate(330 + (mouseX / 10), 276 + (mouseY / 10), 100);
                scale(4);
                var spinMap = map(mouseX, 0, 1000, -0.2, 0.2);
                var spinMapY = map(mouseY, 0, 1000, -0.2, 0.2);
                rotateY(spinMap);
                rotateX(-spinMapY);
                logoLocale = 0;
            }
        } else if (bigLogo) {
            translate(382, 325, 100);
            scale(4);
            if (mouseY < 1100 && mouseY > -100) {
                spinMap = map(mouseX, 0, 1000, -0.2, 0.2);
                spinMapY = map(mouseY, 0, 1000, -0.2, 0.2);
                rotateY(spinMap);
                rotateX(-spinMapY);
            }
            logoLocale = 0;
        }
        fill(220, 100, 70);
        model(logo3D);
        pop();
        rotateLogo = rotateLogo - 0.01;
    }

    if (isRecording) {
        if (frameNum < gifLength) {
            WEBMCapturer.capture(canvas);
            frameNum++;
            push();
            fill(255);
            textSize(80);
            translate(0, 0, 100);
            text(`Recording... ${frameNum} / ${gifLength}`, -width / 2 + 100, -height / 2 + 100, 400, 300);
            pop();

        } else if (frameNum === gifLength) {
            WEBMCapturer.save();
            WEBMCapturer.stop();
            isRecording = false;
            message = true;
            timeToWait = frameCount;
        }
    }
    if (message) {
        var timeToWaitNum = timeToWait + 200;
        if (frameCount <= timeToWaitNum) {
            gifMessage();
        } else {
            message = false;
        }
    }
}

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
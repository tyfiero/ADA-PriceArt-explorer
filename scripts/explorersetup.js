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
var buttonReset;
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

p5.disableFriendlyErrors = true; // disables p5 FES

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
    moon = loadImage("https://ttqgnttfnndtg3j7n7zrmasnylbaqhaaodeilbmrocwh4qthkiga.arweave.net/nOBmzmVrRzNtP2_zFgJNwsIIHABwyIWFkXCsfkJnUgw");
    venus = loadImage("https://wotozhykyzlgeue26aptfp6vqx6hrjgmrhox7d23hag5ntvvfdpa.arweave.net/s6bsnwrGVmJQmvAfMr_Vhfx4pMyJ3X-PWzgN1s61KN4");
    neptune = loadImage("https://7zvixs7g3i4dbqdedet526vaheeihwf3v5w7nylt77oi32sbri2a.arweave.net/_mqLy-baODDAZBkn3XqgOQiD2Luvbfbhc__cjepBijQ");
    planetary = loadImage("https://5tztkp2mjzl5lzw4wl7fxbm6dyprxwv5hqk6mbkky7gnb4jos75a.arweave.net/7PM1P0xOV9Xm3LL-W4WeHh8b2r08FeYFSsfM0PEul_o");
    jupiter = loadImage("https://dhalxzx7mnh5f2dlv5iibm3eeo6nf2lotuecvceil3aisoumj4na.arweave.net/GcC75v9jT9Loa69QgLNkI7zS6W6dCCqIiF7AiTqMTxo");
    //3d logo
    logo3D = loadModel("assets/ada3d.obj", true);
    logoTrademark = loadImage("assets/trademark.png");
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
var isIPadPro = /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
window.mobileCheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
//FUNCTION SETUP
var cnv;

function setup() {
    cnv = createCanvas(1000, 1000, WEBGL);
    // Scale canvas
    if (window.innerWidth > 1000) {
        document.querySelector('canvas').style.height = `${innerHeight - 150}px`;
        document.querySelector('canvas').style.width = `${innerHeight - 150}px`;

    } else {
        if (window.mobileCheck()) {
            pixelDensity(1);
            alert('Use desktop for best experience.')
        }
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
    buttonReset = createButton("<span class='material-icons'>loop</span>");
    buttonReset.mousePressed(pageRefresh);
    buttonReset.style("font-size", "15px");
    buttonReset.style("background-color", 100);
    buttonReset.parent(parentElement)
    if (window.innerWidth > 1000 && !isIPadPro) {
        buttonRecord = createButton("<span class='material-icons'>gif</span>");
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
    bigLogo = !bigLogo
}

function pageRefresh() {
    window.location.reload();
}

function transparentCandle() {
    transCand = !transCand
}

function keyPressed() {
    if (key === 'r' && !rKey) {
        rKey = true;
    } else {
        rKey = false;
    }
}

function rButton() {
    rKey = !rKey
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
/*From: https://www.vocabulary.com/lists/286118*/
const myDictionary = {
    dictionary: [
      { word: "ajar", hint: "slightly open" },
      { word: "apex", hint: "the highest point of something" },
      { word: "avid", hint: "marked by active interest and enthusiasm" },
      { word: "bane", hint: "something causing misery or death" },
      { word: "bard", hint: "a lyric poet" },
      { word: "bent", hint: "stooped (used of the back and knees)" },
      { word: "bevy", hint: "a flock of birds" },
      { word: "bilk", hint: "cheat somebody out of what is due, especially money" },
      { word: "boon", hint: "something that is desirable, favorable, or beneficial" },
      { word: "boor", hint: "a crude uncouth ill-bred person lacking refinement" },
      { word: "curt", hint: "brief and to the point" },
      { word: "deft", hint: "skillful in physical movements; especially of the hands" },
      { word: "dire", hint: "fraught with extreme danger; nearly hopeless" },
      { word: "diva", hint: "a distinguished female operatic singer... aka jojo" },
      { word: "dolt", hint: "a person who is not very bright" },
      { word: "dupe", hint: "fool or hoax" },
      { word: "fawn", hint: "a young deer" },
      { word: "foil", hint: "hinder or prevent, as an effort, plan, or desire" },
      { word: "gait", hint: "an animal's manner of moving" },
      { word: "gale", hint: "a strong wind moving 34–40 knots... aka not Peeta" },
      { word: "garb", hint: "clothing of a distinctive style or for a particular occasion" },
      { word: "glib", hint: "artfully persuasive in speech" },
      { word: "glut", hint: "supply with an excess of" },
      { word: "guru", hint: "a Hindu or Buddhist religious leader/spiritual teacher... BLANK pathik" },
      { word: "hack", hint: "chop or cut away... or I'm a BLANKer" },
      { word: "hail", hint: "precipitation of ice pellets" },
      { word: "hale", hint: "exhibiting or restored to vigorous good health" },
      { word: "heed", hint: "careful attention" },
      { word: "hone", hint: "sharpen with a whetstone" },
      { word: "icon", hint: "a visual representation produced on a surface" },
      { word: "iota", hint: "a tiny or scarcely detectable amount" },
      { word: "keen", hint: "intense or sharp" },
      { word: "laud", hint: "praise, glorify, or honor" },
      { word: "loom", hint: "a textile machine for weaving yarn into a textile" },
      { word: "mire", hint: "a soft wet area of low-lying land that sinks underfoot" },
      { word: "mock", hint: "treat with contempt" },
      { word: "molt", hint: "cast off hair, skin, horn, or feathers" },
      { word: "onus", hint: "a burdensome or difficult concern" },
      { word: "opus", hint: "a musical work that has been created" },
      { word: "oust", hint: "remove from a position or office" },
      { word: "pact", hint: "a written agreement between two states or sovereigns" },
      { word: "sway", hint: "move back and forth" },
      { word: "tact", hint: "consideration in dealing with others" },
      { word: "tome", hint: "a large and scholarly book" },
      { word: "tout", hint: "advertise in strongly positive terms" },
      { word: "tyro", hint: "someone new to a field or activity" },
      { word: "void", hint: "an empty area or space" },
      { word: "wary", hint: "marked by keen caution and watchful prudence" },
      { word: "whet", hint: "sharpen by rubbing" },
      { word: "wily", hint: "marked by skill in deception" },
      { word: "sage", hint: "a mentor in spiritual and philosophical topics" },
      { word: "ruse", hint: "a deceptive maneuver, especially to avoid capture" }
    ]
};

let rightWord = '';
let guessWord = '';
let hint = '';

let wordList = [];
let guessNum = 0;
let lastPressed = 0;

let showHint = true;
let showInfo = true;
let dark = false;

/*Recieving Data from Dictionary & Loading Site*/
// DOES NOT WORK (taken down)
// async function dictionary(CB){
//     const res = await fetch("https://api.masoudkf.com/v1/wordle", {
//     headers: {"x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",},})
//     .then(res => res.text());
//     data = JSON.parse(res);
//     wordList = data['dictionary'];
//     CB(wordList);

//     return wordList;
// }
async function dictionary(CB) {
    // Use the imported dictionary
    CB(myDictionary.dictionary);
    return myDictionary.dictionary;
}
function loadSite() {
    let temp = dictionary(function(wl) {
        document.getElementById('startOver').disabled = false;
        document.getElementById('startOver').innerText = 'Start Over';
        wordList = wl;
        setWord();
    })
}

/*Choosing Right Word & The Top Buttons*/
function setWord() {
    let randIndex = Number.parseInt(Math.random() * wordList.length);
    rightWord = wordList[randIndex]['word'].toLowerCase();
    hint = wordList[randIndex]['hint'];
    document.getElementById('content').innerHTML = '<table id="game"><tr><td id="01"></td><td id="02"></td><td id="03"></td><td id="04"></td></tr>'
    + '<tr><td id="11"></td><td id="12"></td><td id="13"></td><td id="14"></td></tr><tr><td id="21"></td><td id="22"></td><td id="23"></td>'
    + '<td id="24"></td></tr><tr><td id="31"></td><td id="32"></td><td id="33"></td><td id="34"></td></tr></table>'
    document.getElementById('bottom-content').innerHTML = '<div id="footer"><footer>&#169; Teresa Lavoie</footer></div>';
    document.getElementById('startOver').blur();
}
function darkMode() {
    let root = document.querySelector(":root");
    let style = getComputedStyle(root);
    if(dark == false){
        root.style.setProperty('--main','#1a1a1a');
        root.style.setProperty('--text','white');
        dark = true;
    }
    else if(dark == true){
        root.style.setProperty('--main','white');
        root.style.setProperty('--text','black');
        dark = false;
    }
    document.getElementById('buttonMode').blur();
}
function giveHint() {
    // show word hint
    if (showHint == true) {
        document.getElementById('bottom-content').innerHTML = '<div id="hint-text">Hint: ' 
        + hint + '</div><div id="footer"><footer>&#169; Teresa Lavoie</footer></div>';
        showHint = false;
    } 
    // get rid of word hint
    else {
        document.getElementById('bottom-content').innerHTML = '<div id="footer"><footer>&#169; Teresa Lavoie</footer></div>';
        showHint = true;
    }
    document.getElementById('buttonHint').blur();
}
function giveInfo() {
    console.log(showInfo);
    // show game rules
    if (showInfo == true) {
        // broke up html statement to reduce line length
        document.getElementById('content').innerHTML += '<div id="help-text"><h1>How To Play</h1><ul>'
        + '<li style="font-family: \'bubbleboddy light\', sans-serif;font-size: medium;font-weight: bold; font-size: large;">You have 4 tries to guess the four-letter word</li>'
        + '<li style="font-family: \'bubbleboddy light\', sans-serif;font-size: medium;font-weight: bold; font-size: large;">Type in your guess and submit your word by hitting the "enter" key</li>'
        + '<li style="font-family: \'bubbleboddy light\', sans-serif;font-size: medium;font-weight: bold; font-size: large;">GREEN letters are correct, and in the correct spot</li>'
        + '<li style="font-family: \'bubbleboddy light\', sans-serif;font-size: medium;font-weight: bold; font-size: large;">YELLOW letters are correct, but in the wrong spot</li>'
        + '<li style="font-family: \'bubbleboddy light\', sans-serif;font-size: medium;font-weight: bold; font-size: large;">GREY letters are incorrect (not in the word)</li>'
        + '<li style="font-family: \'bubbleboddy light\', sans-serif;font-size: medium;font-weight: bold; font-size: large;">If you\'re stuck press the "&#63;" button for a hint</li></ul></div>';
        showInfo = false;
    } 
    // get rid of game rules
    else {
        let element = document.getElementById('help-text');
        element.remove();
        showInfo = true;
    }
    document.getElementById('buttonInfo').blur();
}

/*Adding and Deleting Letter Implementation*/
function letterAdd(letter) {
    if (guessWord.length <= 3 && /^[a-z]+$/.test(letter)) {
        guessWord += letter;
        const boxLetter = document.createTextNode(letter.toUpperCase());
        const boxLoc = guessNum.toString() + guessWord.length.toString();
        if (guessWord.length == 1) {
            const box = document.getElementById(boxLoc);
            box.appendChild(boxLetter);
        } else if (guessWord.length == 2) {
            const box = document.getElementById(boxLoc);
            box.appendChild(boxLetter);
        } else if (guessWord.length == 3) {
            const box = document.getElementById(boxLoc);
            box.appendChild(boxLetter);
        } else if (guessWord.length == 4) {
            const box = document.getElementById(boxLoc);
            box.appendChild(boxLetter);
        }
    }
}
function backspaceDelete() {
    const letterLoc = guessNum.toString() + guessWord.length.toString();
    for (let i = 1; i <= 4; i++) {
        if (guessWord.length == i) {
            document.getElementById(letterLoc).innerHTML = '';
            document.getElementById(letterLoc).style.backgroundColor = 'white';
        }
    }
    guessWord = guessWord.substring(0, guessWord.length - 1);
}

/*Screen Control*/
document.addEventListener('keydown', (event) => {
    let name = event.key.toLowerCase();
    displayKeyInput(name);
    if (name === 'enter') {
        if (guessWord.length == 4) {
            if (guessWord == rightWord) {
                winScreen();
            } 
            else {
                checkLetters();
            }
            guessNum++;
            if ((guessNum == 4) && (guessWord != rightWord)) {
                loseScreen();
            }
            guessWord = '';
        } 
        else {
            window.alert('first complete the word');
        }
    } else if (name === 'backspace') {
        backspaceDelete();
    } else {
        letterAdd(name);
    }
}, false);

/*Win Screen & Lose Screen*/
function winScreen() {
    document.getElementById('bottom-content').innerHTML = '<div id="win">YAY! You guessed the right word \'' + rightWord.toUpperCase() 
    + '\' and won!</div><div id="footer"><footer>&#169; Teresa Lavoie</footer></div>';
    
    document.getElementById('content').innerHTML = 
    '<div class="win"><img id="gif" src="https://i.pinimg.com/originals/d5/ad/75/d5ad75bfd0cfa00cfe2e738dda4458e6.gif"></img></div>'
}

function loseScreen() {
    document.getElementById('bottom-content').innerHTML = '<div id="lose">OH NO! You didn\'t guess the right word \'' 
    + rightWord.toUpperCase() + '\' and lost!</div><div id="footer"><footer>&#169; Teresa Lavoie</footer></div>';
}

/*Wordle Functionalty*/
function checkLetters() {
    // 0 is incorrect
    // 1 is correct & wrong spot
    // 2 is correct & right spot
    let wordCode = [];
    
    // dictionary to keep track of number
    // of each right letter in the guessWord
    let letterCount = {};
    for (let i = 0; i < rightWord.length; i++) {
        let letter = rightWord[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }

    console.log(letterCount);

    // 1st iteration check all correct ones
    for (let i = 0; i < rightWord.length; i++) {
        let letter = guessWord[i];
        if (rightWord[i] == letter) {
            wordCode[i] = 2;
            letterCount[letter] -= 1;
        }
        else {
            wordCode[i] = 0;
        }
    }

    // 2nd iteration check which are correct & wrong spot (wordCode = 1)
    for (let i = 0; i < rightWord.length; i++) {
        let letter = guessWord[i];
        // this condition needs to be more complex to check for repeated letter input
        if (wordCode[i] != 2) {
            if (rightWord.includes(letter) && letterCount[letter] > 0) {
                wordCode[i] = 1;
                letterCount[letter] -= 1;
            } 
            else {
                wordCode[i] = 0;
            }
        }
    }
    changeSquare(wordCode);
}
function changeSquare(code) {
    for (let i = 1; i <= rightWord.length; i++) {
        const boxLoc = guessNum.toString() + i.toString();
        const box = document.getElementById(boxLoc);
        if (code[i-1] == '0') {
            box.style.backgroundColor = 'grey';
        } 
        else if (code[i-1] == '1') {
            box.style.backgroundColor = '#b59f3b'; //'Wordle' yellow
        } 
        else {
            box.style.backgroundColor = '#538d4e'; //'Wordle' green
        }
    }
}

/*Default Settings after Start Over Clicked*/
function startOver() {
    guessWord = '';
    guessNum = 0;
    showInfo = true;
    showHint = true;
    setWord();
}

/*Recieving Input from User & Displaying*/
async function displayKeyInput(input) {
    if (input == 'enter') {
        input = 'en';
    } 
    else if (input == 'backspace') {
        input = 'bs';
    } 
    else if (!/^[a-z]+$/.test(input) || input.length > 1) {
        return;
    }
    document.getElementById('key-display').style.backgroundColor = 'var(--accent)';
    document.getElementById('key-display').style.opacity = 1;
    document.getElementById('key-display').innerHTML = '<div id="input-letter">' + input.toUpperCase() + '</div>';

    lastPressed = 10;
    await sleep(2000);
    lastPressed--;

    while (lastPressed < 10 && lastPressed >= 0) {
        document.getElementById('key-display').style.opacity = lastPressed/10;
        await sleep(10);
        lastPressed--;
    }
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

window.onload = function(){loadSite();};

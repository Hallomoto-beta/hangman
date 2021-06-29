const els = {
    score: null,
    answer: null,
    choices: null
};

const words = [
    'EVY',//0
    'EMERSON',
    'ELI',
    'PIERRE',
    'JAVASCRIPT',
    'MYBECODE',
    'YOUTUBE',
    'HTMLFIVE'//7
];

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;

const init = () => {
    console.log('>> #init');

    // rattacher les élément
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');


    // Choisi un mot
    word = pickWord();
    //    console.log('word', word);
    //      - créer un word mapping
    wordMapping = getWordMapping(word);
    console.log('wordMapping', wordMapping);
    // Générer des choix
    choices = generateChoices();
    //console.log(choices);
    //      - créer un mapping des choix
    choicesMapping = getChoicesMapping(choices);
    //console.log(choicesMapping);
    // afficher le mot
    displayWord(wordMapping);
    // afficher les choix
    displayChoices(choicesMapping);
    // afficher le score
    displayScore();
    // listen events
    //      - mouse events
    els.choices.addEventListener('click', ({target}) => {
        //evt:MouseEvent evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        }
    });
    //      - keyboard events
    document.addEventListener('keydown', ({ keyCode }) => {
        //evt:KeyboardEvent evt.keyCode => { keyCode }
    //    console.log('keyCode', keyCode);
        const letter = String.fromCharCode(keyCode);
    //    console.log('letter', letter);
    if(keyCode >= 65 && keyCode <= 90) {
     checkLetter(letter); 
    }
    });

    // check les lettres
    //      - if pas dans le mot : add score
    //      - if dans le mot : display la lettre
    //      - endGame
    //          - if score == max : loseGame
    //          - if les lettres sont toutes visibles : winGame
};

const checkLetter = (letter) => {
    console.log(letter);
    let isLetterInWord = false;
    let isAllLettersFound = true;
//    console.log('isLetterInWord before loop', isLetterInWord);
    wordMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });
    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }   
     });
     displayChoices(choicesMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else { 
        scoreCount++;
        displayScore();
    }  
    
    if(scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
//    console.log('isLetterInWord after loop', isLetterInWord);
};


const displayChoices = (choicesMapping) => {
    const choicesHtml = choicesMapping.map((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li class='disabled'>${letterMapping.letter}</li>`;
        }
    });
    els.choices.querySelector('ul').innerHTML = choicesHtml.join('');
};

const displayScore = () => {
    els.score.innerHTML = `${scoreCount} / ${maxScore}`;
};

const displayWord = (wordMapping) => {
   const wordHtml = wordMapping.map((letterMapping) => {
       if (letterMapping.isVisible === true) {
           return `<li>${letterMapping.letter}</li>`;
       } else {
           return `<li>_</li>`;
       }
   });
   els.answer.querySelector('ul').innerHTML = wordHtml.join('');
};

const endGame = () => {
    document.querySelector('body').style.backgroundImage = "url(https://images.alphacoders.com/813/thumb-1920-81391.jpg)";
    els.choices.innerHTML = `<h1 style= color:red;>tu y es presque essaye encore</h1>`;
};
const winGame = () => {
    document.querySelector('body').style.backgroundImage = "url(https://static.straitstimes.com.sg/s3fs-public/styles/article_pictrure_780x520_/public/articles/2020/12/17/nz_sweethome_171283.jpg?itok=Q-uqZsd2&timestamp=1608176714)";
    els.choices.innerHTML = `<h1 style= color:white;>tu es le meilleur :-) </h1>`;
}

const generateChoices = () => {
    const choices = [];
    for(let index = 65; index <= 90; index++) {
        choices.push(String.fromCharCode(index));
    }
    return choices;
};

const getChoicesMapping = (choices) => {
    const choicesMapping = choices.map((letter) => {
        return { 
            letter,
            isChosen: false
        };
    });
    return choicesMapping;
};

const getWordMapping = () => {
    const wordArr = word.split('');
//    console.log('word', word);
//    console.log('wordArr', wordArr);
    const wordMapping = wordArr.map((letter, index) =>{
        let isVisible = false;
        if (index === 0 || index == wordArr.length -1) {
            isVisible = true;
        }
        return {
            letter,
            isVisible
        };
    });
    return wordMapping;
};

const pickWord = () => {
    const randomIndex = getRandomInt(0, words.length - 1);

    return words[randomIndex];
};

window.addEventListener('load', () => {
    init();
});

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

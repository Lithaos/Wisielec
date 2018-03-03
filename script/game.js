const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
var polskiFilm = [ //hasła z których losujemy
        "Skazany na bluesa",
        "Chce się żyć",
        "Killer",
        "Killerów dwóch",
        "Pitbull",
        "Pianista",
        "Sara",
        "Chłopaki nie płaczą",
        "Tato",
        "Ida",
        "Miś",
        "Seksmisja",
        "Plac Zbawiciela",
        "Dzień świra",
        "Róża",
        "Sami swoi",
        "Psy"
    ];
var raperzy = [
    "Peja",
    "Grubson",
    "Paluch",
    "Tede",
    "Ten Typ Mess",
    "Abradab",
    "Borixon",
    "Bilon",
    "Chada",
    "Deep",
    "Diox",
    "Eldo",
    "Fisz",
    "Hans",
    "Jędker",
    "Juras",
    "Kaen",
    "Kękę",
    "Waldemar Kasta",
    "Liroy",
    "Magik",
    "Nullo",
    "OSTR",
    "Pelson",
    "Pono",
    "Rahim",
    "Słoń",
    "Sobota",
    "Szad",
]
const game = {
    currentSentence: null,
    currentSentenceLetters: null,
    attempts: 5,
    elemBoardElem: document.querySelector('.game'), //element z całą grą
    elemSentence: document.querySelector('.word'), //element z hasłem do zgadnięcia
    elemAttempts: document.querySelector('.attempts'), //element z liczba prob
    elemLetters: document.querySelector('.letters'), //lista z literkami do klikania
    sentences: raperzy,
    generateLetterButtons: function () {
        const alphabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż'];

        alphabet.forEach(function (letter) {
            const button = document.createElement('button');
            button.classList.add('letter');
            button.type = 'button';
            button.dataset.letter = letter;
            button.innerHTML = letter;
            this.elemLetters.appendChild(button);
        }.bind(this));
    },



    bindEvents: function () {
        this.elemLetters.addEventListener('click', function (e) {
            if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains('letter')) {
                const letter = e.target.dataset.letter;
                this.checkLettersInSentention(letter.toUpperCase());
                e.target.disabled = true;
            }
        }.bind(this));
    },

    enableLetters: function () {
        //pobieramy litery i robimy po nich pętlę włączając je
        const letters = this.elemLetters.querySelectorAll('.letter');
        [].forEach.call(letters, function (letter) {
            letter.disabled = false;
        });
    },

    disableLetters: function () {
        //pobieramy litery i robimy po nich pętlę wyłączając je
        const letters = this.elemLetters.querySelectorAll('.letter');
        [].forEach.call(letters, function (letter) {
            letter.disabled = true;
        });
    },
    showAttempts: function () {
        this.elemAttempts.innerHTML = this.attempts;
    },
    randomSentence: function () {
        const max = this.sentences.length - 1;
        const min = 0;
        const rand = Math.floor(Math.random() * (max - min + 1) + min);

        this.currentSentence = this.sentences[rand].toUpperCase();
        this.currentSentenceLetters = this.currentSentence.replace(/ /g, '');

        this.elemSentence.innerHTML = ''; //czyścimy listę

        const letters = this.currentSentence.split('');
        for (let i = 0; i < letters.length; i++) {
            const div = document.createElement('div');
            div.classList.add('word-box');
            if (letters[i] === ' ') {
                div.classList.add('word-box-space');
            }
            this.elemSentence.appendChild(div);
        }
    },
    isLetterExists: function () {
        return this.currentSentenceLetters.length;
    },
    checkLettersInSentention: function (letter) {
        if (this.currentSentence.indexOf(letter) !== -1) { //jeżeli litera istnieje w haśle
            for (let i = 0; i < this.currentSentence.length; i++) {
                if (this.currentSentence[i] === letter) {
                    this.elemSentence.querySelectorAll('.word-box')[i].innerHTML = letter; //wstawiamy w odpowiedni box wybraną literę
                }
            }

            //usuwamy trafioną literę z currentSentenceLetters
            this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, 'g'), '');

            //jeżeli już nie ma liter w powyższej zmiennej gracz wygrał
            if (!this.isLetterExists()) {
                this.gameComplete();
            }
        } else { //nie ma takiej litery w haśle
            this.attempts--;
            this.showAttempts();

            if (this.attempts <= 0) { //jeżeli nie ma już prób...
                this.gameOver();
            }
        }
    },
    gameOver: function () {
        alert("Niestety nie udało ci się odgadnąć hasła. Ps: brzmi ono: \n\n" + this.currentSentence);
        lose.style.display = "block";
        this.disableLetters();
    },

    gameComplete: function () {
        alert('Udało ci się zgadnąć hasło :)');
        win.style.display = "block";
        this.disableLetters();
    },
    initBoard: function () {
        this.generateLetterButtons();
        this.bindEvents();
        this.disableLetters(); //przy stworzeniu planszy wyłączamy litery
    },

    startGame: function () {
        win.style.display = "none";
        lose.style.display = "none";
        this.attempts = 5, //ile prób zostało dla aktualnej gry
            this.randomSentence(); //losujemy hasło do zgadnięcia
        this.showAttempts(); //pokazuje liczbę prób
        this.enableLetters(); //włączamy litery
    }
};

win.style.display = "none";
lose.style.display = "none";
game.initBoard();
document.querySelector('.start').addEventListener('click', function () {
    game.startGame();
});

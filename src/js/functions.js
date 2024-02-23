import { words } from './constants';
import {
	attempsElement,
	attempsNumber,
	checkButtonElement,
	letterElement,
	letterHistoryElement,
	loserElement,
	winnerElement,
	wordHiddenElement
} from './dom';

const word = words[Math.floor(Math.random() * words.length)];

let attempts = 5;
const letterHistory = [];

const hideAllWord = word => {
	let hideWord = '';
	for (let index = 0; index < word.length; index++) {
		if (word[index] === ' ') {
			hideWord += ' ';
		} else {
			hideWord += '_';
		}
	}
	return hideWord;
};

let hiddenWord = hideAllWord(word);

const showLetter = () => {
	const letter = letterElement.value.toLowerCase();
	letterElement.value = '';
	const updatedHiddenWord = hiddenWord.split('');
	let letterFound = false;

	if (letterHistory.includes(letter)) {
		alert('¡Ya has comprobado esta letra!');
		return;
	}

	letterHistory.push(letter);

	for (let index = 0; index < word.length; index++) {
		if (letter === word[index]) {
			updatedHiddenWord[index] = letter;
			letterFound = true;
		}
	}

	if (!letterFound) {
		attempts--;
		attempsNumber.classList.add('hidden');
		attempsElement.textContent = attempts;
		if (attempts === 0) {
			loserElement.classList.remove('hidden');
			checkButtonElement.disabled = true;
			checkButtonElement.classList.add('button-off');
			wordHiddenElement.textContent = word;
			return;
		}
	}

	hiddenWord = updatedHiddenWord.join('');
	printWord();
	addEachLetter(letter);

	if (!hiddenWord.includes('_')) {
		winnerElement.classList.remove('hidden');
	}
};

const addEachLetter = () => {
	letterHistoryElement.textContent = letterHistory.join(' , ');
};

const printWord = () => {
	wordHiddenElement.textContent = hiddenWord;
};

export { hideAllWord, showLetter, addEachLetter, printWord };

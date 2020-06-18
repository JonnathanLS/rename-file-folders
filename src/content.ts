const ALPHABET = /^[A-zÀ-ỹ]+$/;

const removeAccents = (str: string): string => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const isCapitalLetter = (str: string): boolean => isLetterOfAlphabet(str) ? str === str.toUpperCase() : false;
const isEmpty = (value: string): boolean => !value.trim();
const isLetterOfAlphabet = (value: string): boolean => !!value.match(ALPHABET);

const transformToLowerCaseWithHyphen = (str: string): string => {
	let newValue: string = str[0];
	if (str.length === 1) return str;
	if (str.length === 1) return str;
	for (let i = 1; i < str.length; i++) {
		let transform = isCapitalLetter(str[i]) && isLetterOfAlphabet(str[i]) && isLetterOfAlphabet(str[i-1]);
		newValue += transform ? `-${str[i]}` : str[i];		
	}		
	return newValue.toLowerCase();
}

export class Content{
	private newValue: string;
    constructor (public value: string){     
		if (isEmpty(value)) throw new EvalError("Content cannot be EMPTY"); 
		this.newValue = removeAccents(value)
			.replace(/\-\-+/g, '-')	// Replaces multiple hyphens with a single hyphen
			.replace(/([^\w]+|\s+)/g, '-') // Replaces space and other characters with a hyphen
			//.replace(/(^-+|-+$)/, ''); // Remove extra hyphens from the end or beginning of the string
	}
    old = () => this.value;
	new = () => transformToLowerCaseWithHyphen(this.newValue);			
}
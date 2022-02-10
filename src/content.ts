import { Pattern } from "./options.interface";

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
	private readonly hasCustomRename: boolean;
	
    constructor (
		private readonly value: string,
		private readonly pattern?: Pattern,
	){  
		if (isEmpty(this.value)) throw new EvalError("Content cannot be EMPTY"); 

		this.hasCustomRename = 
			this.pattern !== undefined && Object.keys(this.pattern) ? true : false;

		const customRename = this.hasCustomRename ? this.pattern as Pattern : {};

		const keys = customRename ? Object.keys(customRename) : [];

		if (this.hasCustomRename) {
			this.newValue = this.value;
			keys.forEach(key => {
				this.newValue = this.newValue.replace(key, customRename[key]);
			});
		} else {
			this.newValue = removeAccents(value)
			.replace(/\-\-+/g, '-')	// Replaces multiple hyphens with a single hyphen
			.replace(/([^\w]+|\s+)/g, '-') // Replaces space and other characters with a hyphen
			.replace(/(^-+|-+$)/, ''); // Remove extra hyphens from the end or beginning of the string
		}
	}
    public old = () => this.value;
	public new = () => this.hasCustomRename ? this.newValue : transformToLowerCaseWithHyphen(this.newValue);
}
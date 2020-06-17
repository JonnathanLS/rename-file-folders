const ALPHABET = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

export class Content{

    constructor (private value: string){ 
        const empty = !value.trim();
        if (empty) throw new EvalError("Invalid Content");
    }
    old = () => this.value;
    new = () => {
		let previous: string = "";
		const match = (str: string) => str.match(ALPHABET);
		const isUpperCase = (e: string) => e === e.toUpperCase();
		const transform = (x: string) => match(x) && isUpperCase(x) && match(previous);
		let newContent = this.value.split("").map(value => {
			const newValue = transform(value) ? `-${value}` : value;
			previous = value;
			return newValue;
		}).join("");
		return newContent
			.toLowerCase()
			.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
			.replace(/\-\-+/g, '-')	// Replaces multiple hyphens with a single hyphen
			.replace(/([^\w]+|\s+)/g, '-') // Replaces space and other characters with a hyphen
			//.replace(/(^-+|-+$)/, ''); // Remove extra hyphens from the end or beginning of the string
	}
}
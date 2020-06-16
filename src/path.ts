import  { readdirSync, renameSync, existsSync, mkdirSync } from 'fs';

const REGEX = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/

// PROXY IMPLEMENTATION
// const handlerProxy: Object = {
//     get: function(target: any, prop: string, receiver: any) {
// 		if(['change'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
// 			return function() {
// 				console.log("change")
// 				// // ArquivoTeste Path 1
// 				// const param: string = arguments[0];
// 				// let previous: string = "";
// 				// const isUpperCase = (e: string) => e === e.toUpperCase();
// 				// const transform = (x: string) => isUpperCase(x) && previous.match(REGEX);
// 				// let newParam = param.split("").map(x => transform(x) ? `-${x}` : x ).join("");
// 				// console.log(target[prop], target, [newParam]);
// 				Reflect.apply(target[prop], target, arguments);
// 		 	}	
// 		}
// 		return Reflect.get(target, prop, receiver);
//     }
// };

export class Path {
	private contents: string[] = [];
	private newPath: string;
	
	constructor(
		private root: string, 
		private destiny?: string){
			this.root = this.config(this.root);
			this.newPath = this.destiny ? this.config(this.destiny) : this.config(this.root);
			this.contents = readdirSync(this.root);
	}

	private config = (root: string): string => 
		root[root.length-1] === '/' ? root : root + '/';

	private new = (content: string): string => this.change(content);
		
	// change folder and file names
	public renameContents(): void {
		return this.contents.forEach(content => {
			const newContent = this.new(content);
			const oldPathContent = `${this.root}${content}`;
			const newPathContent = `${this.newPath}${newContent}`;
			if (!existsSync(this.newPath)) mkdirSync(this.newPath);
			if (!newContent) throw new Error("Invalid Content");
			renameSync(oldPathContent, newPathContent);
		})
	}
	private change(pathContent: string){
		let previous: string = "";
		const match = (str: string) => str.match(REGEX);
		const isUpperCase = (e: string) => e === e.toUpperCase();
		const transform = (x: string) => match(x) && isUpperCase(x) && match(previous);
		let newPathContent = pathContent.split("").map(value => {
			const newValue = transform(value) ? `-${value}` : value;
			previous = value;
			return newValue;
		}).join("");
		return newPathContent
			.trim()
			.toLowerCase() 
			.replace(/( )+/g, '-');
			// .replace('/[áàãâä]/ui', 'a')
			// .replace('/[éèêë]/ui', 'e')
			// .replace('/[íìîï]/ui', 'i')
			// .replace('/[óòõôö]/ui', 'o')
			// .replace('/[úùûü]/ui', 'u')
			// .replace('/[ç]/ui', 'c')
			 
	}
}
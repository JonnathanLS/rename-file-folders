import  { readdirSync, renameSync, existsSync, mkdirSync } from 'fs';

export class Path{
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
		return pathContent
			.trim()
			.toLowerCase() 
			.replace('/[áàãâä]/ui', 'a')
			.replace('/[éèêë]/ui', 'e')
			.replace('/[íìîï]/ui', 'i')
			.replace('/[óòõôö]/ui', 'o')
			.replace('/[úùûü]/ui', 'u')
			.replace('/[ç]/ui', 'c')
			.replace(/( )+/g, '-') 
	}
}
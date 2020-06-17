import  { readdirSync, renameSync, existsSync, mkdirSync } from 'fs';
import { Content } from './content';
export class Path {
	private contents: Content[];
	private newPath: string;
	
	constructor(
		private root: string, 
		private destiny?: string){
			this.root = this.config(this.root);
			this.newPath = this.destiny ? this.config(this.destiny) : this.config(this.root);
			this.contents = readdirSync(this.root).map(value => new Content(value));
	}

	private config = (root: string): string => 
		root[root.length-1] === '/' ? root : root + '/';

	// change folder and file names
	public renameContents(): void {
		return this.contents.forEach(content => {
			const oldPathContent = `${this.root}${content.old()}`;
			const newPathContent = `${this.newPath}${content.new()}`;
			if (!existsSync(this.newPath)) mkdirSync(this.newPath);
			renameSync(oldPathContent, newPathContent);
		})
	}
}
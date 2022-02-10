import  { readdirSync, renameSync, existsSync, mkdirSync } from 'fs';
import { Content } from './content';
import { Options } from './options.interface';
export class Path {
	private contents: Content[];
	private newPath: string;
	
	constructor(
		private root: string,
		private options?: Options
	){
		this.root = this.config(this.root);
		this.newPath = this.options?.destiny ? this.config(this.options.destiny) : this.config(this.root);
		this.contents = readdirSync(this.root).map(value => new Content(value, this.options?.pattern));
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
import  { readdirSync, renameSync,  } from 'fs';

export class Path{
    private root: string = "";
    private contents: string[] = [];
    
    constructor(root: string){
        this.root = this.config(root);
        this.contents = readdirSync(this.root);
    }

    private config = (root: string): string => 
        root[root.length-1] === '/' ? root : root + '/';

    private new = (content: string): string => this.change(content);
        
    // change folder and file names
    public renameContents(): void{
        this.contents.forEach(content => {
            const oldContent = `${this.root}${content}`;
            const newContent = `${this.root}${this.new(content)}`;
            renameSync(oldContent, newContent);
            console.log(`"${oldContent}" changed to "${newContent}"`);
        })
    }
    change(pathContent: string){
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
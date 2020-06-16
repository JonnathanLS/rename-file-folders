import { Path } from '../src/path'
import  { mkdirSync, readdirSync, existsSync} from 'fs';

const ROOT = "./test/example/";
let CONTENT = "TesT 1";


beforeEach(() => {
    if (!existsSync(`${ROOT}${CONTENT}`)) mkdirSync(`${ROOT}${CONTENT}`);
});

test('should rename files and folders', () => {
    const path = new Path(ROOT);
    path.renameContents();
    expect(readdirSync(ROOT).includes("test-1")).toBeTruthy();
});

test('should rename considering destination directory', () => {
    const destiny = "destiny";
    const path = new Path(ROOT, `./test/${destiny}`);
    path.renameContents();
    expect(readdirSync(`./test/${destiny}`).includes("test-1")).toBeTruthy();
});


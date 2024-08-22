import fs from 'fs/promises';
import srtParser2 from "srt-parser-2";
import { stripHtml } from "string-strip-html";
import { translateSync } from './translate.mjs';

const OUT_FOLDER = './out'

const process = async () => {
    const subtitle = await fs.readFile("./test_files/sub.srt", "utf8")
    var parser = new srtParser2();
    var srt_array = parser.fromSrt(subtitle);

    for (let srt of srt_array) {
        srt.text = await translateSync("Darker than Black", stripHtml(srt.text).result)
    }

    var srt_string = parser.toSrt(srt_array);
    await fs.writeFile(`${OUT_FOLDER}/sub.srt`, srt_string)
}

process()
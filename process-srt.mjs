import fs from 'fs/promises';
import srtParser2 from "srt-parser-2";
import { stripHtml } from "string-strip-html";
import { getReferenceTable, translateSync } from './translate.mjs';

const OUT_FOLDER = './out'

const process = async () => {
    const subtitle = await fs.readFile("./test_files/sub.srt", "utf8")
    var parser = new srtParser2();
    var srt_array = parser.fromSrt(subtitle);

    const guide = await getReferenceTable("Darker than Black")
    for (let i = 0; i < srt_array.length; i++) {
        const previousSrt = i > 0 ? srt_array[i - 1] : undefined
        const srt = srt_array[i]
        srt.text = await translateSync({
            name: "Darker than Black",
            guide,
            previous: previousSrt ? stripHtml(previousSrt.text).result : undefined
        }, stripHtml(srt.text).result)
    }

    var srt_string = parser.toSrt(srt_array);
    await fs.writeFile(`${OUT_FOLDER}/sub.srt`, srt_string)
}

process()
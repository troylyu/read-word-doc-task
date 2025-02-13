
import { Document, Paragraph, Packer } from 'docx';
import fs from 'fs/promises';
import JSZip from 'jszip';
import { parseStringPromise } from 'xml2js';

class WordDocumentHandler {
    async generateDocument(outputPath,children) {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: children
                    })
                ]
            }]
        });

        // save file
        const buffer = await Packer.toBuffer(doc);
        outputPath = `${new Date().getTime()}.${outputPath}`
        await fs.writeFile(outputPath, buffer);
        return outputPath;
    }

    async getDocXMLContent(filePath) {
        try {
            const data = await fs.readFile(filePath);
            const zip = new JSZip();
            const content = await zip.loadAsync(data);
            const documentXml = await content
                .file('word/document.xml')
                .async('text');
            return documentXml;
            ;
        } catch (e) {
            console.e('fail:', e);
            throw e;
        }
    }

    async getFirstThreeWordsAndStyles(xmlContent) {
        try {
            const result = await parseStringPromise(xmlContent);
            const wordsInfo = [];
            let wordCount = 0;
            // <w:r> cell string
            const runs = result['w:document']['w:body'][0]['w:p'][0]['w:r'];
            for (const run of runs) {
                const text = run['w:t'][0]._;
                const words = text?.trim().split(' ');
                for (const word of words) {
                    if (wordCount >= 3) {
                        break;
                    }
                    const rPr = run['w:rPr'][0];
                    const bold = rPr['w:b']!== undefined;
                    const underline = rPr['w:u']!== undefined;
                    const fontSize = rPr['w:sz'][0]['$']['w:val'];
                    wordsInfo.push({
                        word: word,
                        bold: bold,
                        underline: underline,
                        fontSize: fontSize
                    });
                    wordCount++;
                }
                if (wordCount >= 3) {
                    break;
                }
            }
            return wordsInfo;
        } catch (e) {
            console.error('error:', e);
            throw e;
        }
    }

    getCheckResult(firstThreeWordsAndStyles){
        const result = {
            firstWordBold: false,
            secondWordUnderlined: false,
            thirdWordFontSize: null,
        };
        
        result.firstWordBold = firstThreeWordsAndStyles[0]?.bold || false;
        result.secondWordUnderlined = firstThreeWordsAndStyles[1]?.underline || false;;
        result.thirdWordFontSize = firstThreeWordsAndStyles[2]?.fontSize || null;;

        return result;
    }
}

export default WordDocumentHandler;
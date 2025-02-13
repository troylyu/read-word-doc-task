import WordDocumentHandler from "./word.document.handler.js"; 
import { DEFAULT_CONTENT, TEST_CASES_DATA } from "./constant.js"; 

const main = async () => {
    const fileName = 'string.docx';

    const wordDocumentHandler = new WordDocumentHandler();

    const fileNamePath = await wordDocumentHandler.generateDocument(fileName, DEFAULT_CONTENT);

    const xmlContent = await wordDocumentHandler.getDocXMLContent(fileNamePath);

    const firstThreeWordsAndStyles = await wordDocumentHandler.getFirstThreeWordsAndStyles(xmlContent);
   
    const result = wordDocumentHandler.getCheckResult(firstThreeWordsAndStyles);

    console.log(result);
}

const runTest = async (name, fileName, content, expected) => {
    console.log(`\n excute test ${name}`);

    try {
        const wordDocumentHandler = new WordDocumentHandler();

        const fileNamePath = await wordDocumentHandler.generateDocument(fileName, content);

        const xmlContent = await wordDocumentHandler.getDocXMLContent(fileNamePath);

        const firstThreeWordsAndStyles = await wordDocumentHandler.getFirstThreeWordsAndStyles(xmlContent);
    
        const result = wordDocumentHandler.getCheckResult(firstThreeWordsAndStyles);

        const success = (
            result.firstWordBold === expected.firstWordBold &&
            result.secondWordUnderlined === expected.secondWordUnderlined &&
            result.thirdWordFontSize === expected.thirdWordFontSize
        );

        console.log('test:', success ? 'success' : 'fail');
        return success;
    } catch(e) {
        console.error(`test fail: ${e.message}`);
        return false;
    } 
}
    
const runAllTests = async () => {
    let passed = 0;
    for (const test of TEST_CASES_DATA) {
        const success = await runTest(
            test.name,
            test.fileName,
            test.content,
            test.expected
        );
        if (success) passed++;
    }
    
    console.log(`\n test finish: ${passed}/${TEST_CASES_DATA.length} passed`);
}

await main();

await runAllTests();


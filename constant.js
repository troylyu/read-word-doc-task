import { TextRun } from 'docx';

export const DEFAULT_CONTENT = [
    new TextRun({
        text: "In the small, charming town of Willowbrook, life unfolds at a gentle pace. " +
              "The cobblestone streets are lined with colorful, centuries - old houses, " +
              "each with its own unique story. A meandering river runs through the heart " +
              "of the town, its waters reflecting the changing hues of the sky.",
        size: 24
    })
]

//normal
export const CASE_0_CONTENT = [
    new TextRun({
        text: "just ",
        bold: true,
        size: 24
    }),
    new TextRun({
        text: "for ",
        size: 24
    }),
    new TextRun({
        text: "test",
        size: 32
    })
]

//normal true
export const  CASE_1_CONTENT = [
    new TextRun({
        text: "just ",
        bold: true,
        size: 24
    }),
    new TextRun({
        text: "for ",
        underline: {},
        size: 24
    }),
    new TextRun({
        text: "test",
        size: 24
    })
]

//normal false
export const CASE_2_CONTENT = [
    new TextRun({
        text: "just ",
        size: 24
    }),
    new TextRun({
        text: "for ",
        size: 24
    }),
    // fontsize
    new TextRun({
        text: "test",
        size: 32
    })
]

// less words
export const CASE_3_CONTENT = [
    new TextRun({
        text: "just ",
        bold: true,
        size: 24
    }),
    new TextRun({
        text: "for ",
        size: 24
    })
]

// empty
export const CASE_4_CONTENT = [
    new TextRun({
        text: "just ",
        size: 24
    }),
    new TextRun({
        text: "for ",
        size: 24
    }),
    new TextRun({
        text: "test ",
        size: 24
    }),
    new TextRun({
        text: "In the small, charming town of Willowbrook, life unfolds at a gentle pace. " +
              "The cobblestone streets are lined with colorful, centuries - old houses, " +
              "each with its own unique story. A meandering river runs through the heart " +
              "of the town, its waters reflecting the changing hues of the sky.",
        size: 24
    })
]

export const TEST_CASES_DATA = [
    {
        name: 'case0: normal',
        fileName: 'test0.docx',
        content: CASE_0_CONTENT,
        expected: {
            firstWordBold: true,
            secondWordUnderlined: false,
            thirdWordFontSize: '32'
        }
    },
    {
        name: 'case1: normal true',
        fileName: 'test1.docx',
        content: CASE_1_CONTENT,
        expected: {
            firstWordBold: true,
            secondWordUnderlined: true,
            thirdWordFontSize: '24'
        }
    },
    {
        name: 'case2: normal false',
        fileName: 'test2.docx',
        content: CASE_2_CONTENT,
        expected: {
            firstWordBold: false,
            secondWordUnderlined: false,
            thirdWordFontSize: '32'
        }
    },
    {
        name: 'case3: 2 words',
        fileName: 'test3.docx',
        content: CASE_3_CONTENT,
        expected: {
            firstWordBold: true,
            secondWordUnderlined: false,
            thirdWordFontSize: null
        }
    },
    {
        name: 'case4: complex',
        fileName: 'test4.docx',
        content: CASE_4_CONTENT,
        expected: {
            firstWordBold: false,
            secondWordUnderlined: false,
            thirdWordFontSize: '24'
        }
    },
];

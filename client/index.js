import axios from 'axios';
import CodeMirror from 'codemirror';
import 'codemirror/mode/commonlisp/commonlisp';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

const editor = document.getElementById('editor');
const result = document.getElementById('result');

const editorCM = CodeMirror(editor, {
    mode:  "text/x-common-lisp",
    lineNumbers: true
});

const  resultCM = CodeMirror(result, {
    mode:  "javascript",
    lineNumbers: true,
    readOnly: true
});

const editorSizer = document.querySelector('.CodeMirror-sizer');

editorCM.on('change', ({doc}) => {
    const data = doc.getValue();
    //editorSizer.className += ' error';

    axios
        .post('/convertToJS', {data})
        .then(res => {
            resultCM.setValue(res.data.program);
            editorSizer.classList.remove('error');
        })
        .catch(err => {
            editorSizer.classList.add('error');
        });
});
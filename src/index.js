import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import './index.css';

hljs.registerLanguage('javascript', javascript);

marked.setOptions({
  breaks: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
});

function Editor(props) {
  return (
    <div id="editor-container" className="white-box">
      <h1>Editor</h1>
      <hr/>
      <textarea id="editor" value={props.text} onChange={props.handleChange} />
    </div>
  );
}

function Preview(props) {
  let dirty = marked(props.text);
  let clean = DOMPurify.sanitize(dirty);

  return (
    <div id="preview-container" className="white-box">
      <h1>Preview</h1>
      <hr/>
      <div id="preview" dangerouslySetInnerHTML={{__html: clean}} />
    </div>
  );
}

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.placeholder,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    return (
      <div id="markdown-previewer-container">
        <Editor text={this.state.text} handleChange={this.handleChange}/>
        <Preview text={this.state.text}/>
      </div>
    );
  }
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(
  <MarkdownPreviewer placeholder={placeholder}/>,
  document.getElementById('root')
);

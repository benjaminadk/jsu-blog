import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx'
import js from 'react-syntax-highlighter/dist/languages/prism/javascript'
import { prism, tomorrow } from 'react-syntax-highlighter/dist/styles/prism'
import theme from './styles/Theme'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('jsx', jsx)

export default ({ language = 'javascript', mode = 'light', code, highlight = [] }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={mode === 'light' ? prism : tomorrow}
      showLineNumbers={true}
      wrapLines={true}
      lineProps={lineNumber => {
        let props = { style: { display: 'block', fontFamily: "'Roboto Mono'" } }
        if (highlight.includes(lineNumber)) {
          props.style.backgroundColor = `rgba(255,241,82,${mode === 'light' ? '.5' : '.15'})`
        }
        return props
      }}
      lineNumberStyle={{ fontSize: '1.2rem' }}
      customStyle={{
        border: `1px solid ${theme.grey[0]}`,
        fontSize: '1.2rem',
        marginBottom: '2rem'
      }}
      children={code}
    />
  )
}

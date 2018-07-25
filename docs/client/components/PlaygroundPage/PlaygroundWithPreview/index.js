import React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';
import Switch from 'react-switch';
import components from '../../../../../src';
import styles from './styles.scss';
import theme from '../../../components/common/DefaultCode/theme.scss';

class PlaygroundWithPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.defaultCode,
    };
  }

  render() {
    const {
      activeComponent,
      expandDocumentation,
      isDocumentationOn,
    } = this.props;
    
    return (
      <div className={styles['playground-preview']}>
        <div className="header">
          Playground
        </div>
        <LiveProvider 
          scope={{ ...components, theme }}
          code={this.props.defaultCode}
        >
          <div className="code-editor">
            <LiveEditor />
            <div className="doc-enabler">
              <label htmlFor="normal-switch">
                <div>Show Docs</div>
                <Switch
                  onChange={expandDocumentation}
                  checked={isDocumentationOn}
                  className="switch"
                />
              </label>
            </div>
          </div>
          <div className="code-preview">
            <LivePreview />
            <div className="error">
              <LiveError />
            </div>
          </div>
        </LiveProvider>
      </div>
    );
  }
}

export default PlaygroundWithPreview;

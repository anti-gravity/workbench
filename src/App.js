import React from 'react'
import _ from 'lodash'

const App = ({ stories, activeStory, onSelectStory }) => {
  const activeStoryComponent = _.find(stories, { name: activeStory }).Component
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#F2F7FA', display: 'flex', fontFamily: 'Roboto' }}>
      <div style={{ width: 250, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 54, background: '#fff', fontSize: 18, paddingLeft: 20, alignItems: 'center', display: 'flex' }}>
          Workbench
        </div>
        <div style={{ background: '#fff', flex: 1, marginTop: 2, paddingTop: 2 }}>
          {_.map(stories, ({ name, i }) => (
            <div
              style={{
                cursor: 'pointer',
                paddingLeft: 20,
                display: 'flex',
                alignItems: 'center',
                height: 50,
                background: activeStory === name ? '#E7F3FF' : 'transparent',
                color: activeStory === name ? '#008DFC' : '#999',
                marginRight: 2,
              }}
              key={ `${ name }-${ i }` }
              onClick={ () => onSelectStory(name) }
            >
              { name }
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <activeStoryComponent/>
        </div>
      </div>

      <div style={{ width: 250, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', paddingTop: 10, paddingBottom: 10 }}>
          <div style={{ height: 40, paddingLeft: 20, alignItems: 'center', display: 'flex', color: '#008DFC' }}>
            <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, marginRight: 10 }}>
              <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />
            </svg>
            Basic Button
          </div>

          <div style={{ height: 40, paddingLeft: 20, alignItems: 'center', display: 'flex', color: '#ccc' }}>
            <div style={{ width: 34, height: 24 }} />
            + Add Example
          </div>
        </div>

        <div style={{ background: '#fff', flex: 1, marginTop: 2, padding: 20 }}>
          props
        </div>

        <div style={{ background: '#fff', marginTop: 2, padding: 20, color: '#999' }}>
          {`<${ activeStory } />`}
        </div>

      </div>
    </div>
  )
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStory: props.stories[0].name,
    }
  }

  methods = {
    onSelectStory: activeStory => this.setState({ activeStory }),
  }

  render() {
    return (
      <App
        { ...this.state }
        { ...this.props }
        { ...this.methods }
      />
    )
  }
}

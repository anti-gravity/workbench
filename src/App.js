import React from 'react'
import _ from 'lodash'

const App = ({ stories, activeStory, onSelectStory }) => {
  const activeStoryComponent = _.find(stories, { name: activeStory }).Component
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#fafafa', display: 'flex' }}>
      <div style={{ width: 250, background: '#fff' }}>
        {_.map(stories, ({ name, i }) => (
          <div key={ `${ name }-${ i }` } onClick={ () => onSelectStory(name) }>{ name }</div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <activeStoryComponent/>
        </div>
      </div>

      <div style={{ width: 250, background: '#fff' }} />
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

import React from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import App from './App'
import 'normalize.css'

import * as stories from './stories'

ReactDOM.render(
  <App stories={ _.map(stories, (Component, name) => ({ Component, name })) } />,
  document.getElementById('root'),
)

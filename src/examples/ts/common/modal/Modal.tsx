import * as React from 'react'

interface Own {
  name: string
  render?: (Object) => {}
}

interface State {
  visible: boolean
  data: Object
}

interface Dispatch {
  onClose: (name: string) => void
}

type ModalProps = Own & State & Dispatch

type Style = {
  page: React.CSSProperties
  cover: React.CSSProperties
  content: React.CSSProperties
}

export class Modal extends React.Component<ModalProps, {}> {
    handleKeyPress = (e: KeyboardEvent) => {
        if(e.keyCode === 27) {
            this.props.onClose(this.props.name)
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyPress)
    }

    static defaultProps = {
      name: '',
      visible: false,
      render: () => null,
      onClose: name => {},
      data: {}
    }

    render() {
      const { children, visible, name, render, data, onClose } = this.props
      const styles: Style = {
        page: {
            position: "fixed", 
            bottom: 0, 
            width: "100%", 
            height: "100%", 
            left: 0,
            right: 0,
            top: 0,
            zIndex: 1999
        },
        cover: {
          position: "absolute", 
          width: "100%", 
          height: "100%", 
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 2000
        },
        content: {
          position: "relative", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "100%", 
          width: "100%", 
          pointerEvents: "none",
          zIndex: 2001
        }
      }

      const handleClick = () => onClose(name)

      return visible ? (
          <div style={ styles.page }>
              <div onClick={handleClick} style={ styles.cover }></div>
              <div style={ styles.content }>
                  <div style={{pointerEvents: "auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      { children ? children : render(data) }
                  </div>
              </div>
          </div>
      ) : null
    }

}
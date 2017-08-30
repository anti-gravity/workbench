import * as React from 'react'

interface Props {
    text: string
    moreText?: JSX.Element
}

interface State {
    open: boolean
}

interface DProps {
    text: string
}

export const Direction: React.SFC<DProps> = ({text}) => (
    <div style={{fontSize: 12, fontWeight: 300, letterSpacing: 0.41, lineHeight: "16px", color: "#474747", marginBottom: 12}}>{text}</div>
)

export class Directions extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClick = () => this.setState({open: !this.state.open})

    render() {
        const { text, moreText } = this.props
        const { open } = this.state
        return (
            <div>
                <div style={{fontSize: 16, fontWeight: 400, marginBottom: 12, color: "#474747"}}>Directions</div>
                <Direction text={text}/>
                { open && !!moreText && moreText }
                { !!moreText &&
                    <div style={{fontSize: 12, color: "#4990E2", cursor: "pointer"}} onClick={this.handleClick}>{open ? "Hide" : ""} Tips</div>
                }
            </div>
        )
    }
}

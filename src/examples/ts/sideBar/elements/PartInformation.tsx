import * as React from 'react'

interface Props {
    part: any
}

interface State {
    open: boolean
}

export class PartInformation extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    handleClick = () => this.setState({open: !this.state.open})

    render() {
        const {part: {name, manufacturer, description, dataSheet}} = this.props
        return (
            <div style={{}}>
                <div style={{fontSize: 16, marginBottom: 12, fontWeight: 400, color: "#474747"}}>Part Information</div>
                { this.state.open &&
                    <div style={{color: "#292929", marginBottom: 12}}>
                        <div title="Part Name" style={{ fontSize: 14}}>{name}</div>
                        { !!manufacturer && <div title="Manufacturer" style={{fontSize: 12, marginTop: 8}}>{manufacturer}</div> }
                        { !!description && <div title="Description" style={{ fontSize: 12, marginTop: 4}}>{description}</div> }
                        { !!dataSheet && 
                            <div title="Open datasheet in a new tab" style={{ fontSize: 12, marginTop: 4}}>
                                <a target="_blank" href={dataSheet} style={{ color: "#4990E2" }}>{dataSheet}</a>
                            </div>
                        }
                    </div>
                }
                <div style={{fontSize: 12, color: "#4990E2", cursor: "pointer"}} onClick={this.handleClick}>Show {this.state.open ? "Less" : "More"}</div>
            </div>
        )
    }
}
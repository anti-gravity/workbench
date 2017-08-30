import * as React from 'react';
export class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = (e) => {
            this.setState(this.isShadow(e.currentTarget));
        };
        this.isShadow = (el) => {
            // console.log(el.scrollHeight, el.clientHeight)
            let topShadow = false;
            let bottomShadow = false;
            const scrollTop = el.scrollTop;
            const scrollHeight = el.scrollHeight;
            const clientHeight = el.clientHeight;
            if (scrollTop !== 0)
                topShadow = true;
            if (scrollHeight > clientHeight &&
                scrollTop !== scrollHeight - clientHeight)
                bottomShadow = true;
            return { topShadow, bottomShadow };
        };
        this.state = {
            topShadow: false,
            bottomShadow: false
        };
    }
    componentDidUpdate(nextProp, nextState) {
        if (!!this.scroll) {
            const shadow = this.isShadow(this.scroll);
            if (shadow.bottomShadow !== this.state.bottomShadow || shadow.topShadow !== this.state.topShadow)
                this.setState(shadow);
        }
    }
    render() {
        const { children } = this.props;
        const { topShadow, bottomShadow } = this.state;
        return (<div style={{ flex: 1, display: "flex", position: "relative" }}>
                {topShadow &&
            <div style={{ borderTop: "solid 1px #D8D8D8", top: 0, left: 0, position: "absolute", height: 5, width: "100%", background: "linear-gradient(to bottom, rgba(171,171,171,0.15) 0%,rgba(171,171,171,0) 100%)" }}>
                    </div>}
                {bottomShadow &&
            <div style={{ borderBottom: "solid 1px #D8D8D8", bottom: 0, left: 0, position: "absolute", height: 5, width: "100%", background: "linear-gradient(to top, rgba(171,171,171,0.15) 0%,rgba(171,171,171,0) 100%)" }}>
                    </div>}
                <div ref={el => this.scroll = el} style={{ flex: 1, overflow: "auto" }} onScroll={this.handleScroll}>
                    <div style={{ margin: "40px 24px" }}>
                        {children}
                    </div>
                </div>
            </div>);
    }
}

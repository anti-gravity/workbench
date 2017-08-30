import * as React from 'react'
import { CardList } from './CardList'
import { Button } from '..'

interface Props {
    onNext: () => void
    onBack: () => void
    nextDisabled?: boolean
}

export const SideBar: React.SFC<Props> = ({children, onBack, onNext, nextDisabled=false}) => (
    <div style={{display: "flex", flex: 1, flexDirection: "column", maxWidth: 340, backgroundColor: "#FBFBFB"}}>
        <CardList>
            {children}
        </CardList>
        <div style={{display: "flex", margin: 24, justifyContent: "flex-end"}}>
            <Button label="Back" onClick={onBack} backgroundColor="#FBFBFB" color="#424242"/>
            {!!onNext && <Button label="Next" onClick={onNext} backgroundColor="#787878" color="#FBFBFB" disabled={nextDisabled}/>}
        </div> 
    </div>
)
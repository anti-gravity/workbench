export function getDefault(init, label) {
    const prop = init.props.find(p => p.label === "src")
    if(!!prop) return prop.defaultValue
    return null
}

export function stringKnob(state, component, prop) {
    return ""
}

export function numberKnob(state, component, prop) {
    return 0
}

export function anyKnob(state, component, prop) {
    return null
}

export function init(init, writeMode) {
    
}
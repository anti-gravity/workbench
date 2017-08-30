var Ast = require("ts-simple-ast");
var ts = require("typescript")
const path = require('path');

const a = new Ast.default({
    compilerOptions: {
        target: ts.ScriptTarget.ES2015
    }
});

const pathToRoot = "./src/examples"

a.addSourceFiles(`${pathToRoot}/**/*{.tsx,.ts}`);
const sourceFiles = a.getSourceFiles();
a.emit()
// Filter down to files that import react
const reactFiles = sourceFiles.filter(f => 
    f.getImport(i => i.getModuleSpecifier() === "react") !== undefined
)
const classes = reactFiles.reduce((classes, file, index, arr) => {
    classes.push(...file.getClasses().filter(c => c.getExtends().getExpression().getText() === 'React.Component')); 
    return classes
},[])

classes.map(c => c.getName()) // ['Artboard', ...]
classes[0].getExtends().getTypeArguments()[0].getText() // 'StateProps & DispatchProps & OwnProps'

const resolveStoryNameConflicts = (knobs, name, dirs) => {
    if(knobs.some(knob => knob.component === name)) {
        const storyName = `${dirs.pop()}.${name}`
        return resolveStoryNameConflicts(knobs, storyName, dirs)
    }
    return name
}

function getDefaultValue(type) {
    switch(type) {
        case "string":
            return ""
        case "number":
            return 0
        case "any":
            return null
        case "string[]":
        case "number[]":
        case "any[]":
            return []
        default:
            return null
    }
}

function getSelector(type) {
    switch(type) {
        case "string":
            return "stringKnob"
        case "number":
            return "numberKnob"
        default:
            return "anyKnob"
    }
}

function getModuleFilePath(filePath, pathToRoot) {
    const p = path.parse(filePath)
    const rightSide = path.relative(pathToRoot, path.join(p.dir, p.name))
    return path.join("../..", pathToRoot, rightSide)
}

const knobs = classes.reduce((knobs, c) => {
    const props = []
    const e = c.getExtends() // .getText() -> "React.Component"
    const typeArgs = e.getTypeArguments()[0] 
    const pushProps = (typeName) => {
        const inter = c.sourceFile.getInterface(typeName)
        if(!!inter) {
            inter.getProperties().forEach(property => {
                const type = property.getType().getText()
                props.push({
                    type: type,
                    label: property.getName(),
                    defaultValue: getDefaultValue(type)
                })
            })
        }
    }

    if(typeArgs.getKindName() === "IntersectionType") {
        typeArgs.compilerNode.types.forEach((type) => { 
            pushProps(type.typeName.getText())
        })
    } else if(typeArgs.getKindName() === "TypeReference") {
        const typeName = typeArgs.compilerNode.typeName.getText()
        pushProps(typeName)
    } else {
        // 
        console.log(typeArgs.getKindName()) // Type Literal
        console.log(typeArgs.getText()) // {}
    }
    const filePath = getModuleFilePath(c.sourceFile.getFilePath(), pathToRoot)
    //console.log(filePath)
    const dirs = path.dirname(filePath).split(path.sep)
    const storyName = resolveStoryNameConflicts(knobs, c.getName(), dirs)
    //console.log(dirs, storyName)
    
    knobs.push({
        component: c.getName(), // Artboard
        storyName: storyName,
        filePath: filePath,
        props: props
    })

    return knobs
}, [])

//console.log(a.addSourceFile)
// a.addSourceFileFromStructure("TEST.ts", {
//     imports: [
//         {
//             moduleSpecifier: "react",
//             namespaceImport: "React"
//         }, {
//             moduleSpecifier: "react-redux",
//             namedImports: [{name: "connect"}]
//         }, {
//             moduleSpecifier: "workbench",
//             namespaceImport: "wb"
//         }, {
//             moduleSpecifier: "./SourceImage",
//             namedImports: [{name: "SourceImage"}]
//         }
//     ],
//     classes: [
//         {
//             name: "Story",
//             extends: "React.Component<any, {}>",
//             methods: [
//                 {
//                     name: "componentDidMount",
//                     bodyText: `this.props.init(init, "passive") // "override" write mode when the use hits reset`
//                 }, {
//                     name: "render",
//                     bodyText: `return <ScaledImage {...this.props} />`
//                 }
//             ],
//             properties: [
//                 {
//                     name: "defaultProps",
//                     isStatic: true,
//                 }
//             ]
//         }
//     ]
// })
// const sourceFile = a.getSourceFile("TEST.ts");

a.addSourceFileFromStructure("./src/stories/index.ts", {
    exports: knobs.map(knob => ({
        moduleSpecifier: `./${knob.storyName}.story`,
        namedExports: [{name: "default", alias: knob.storyName.replace(".", "")}]
    }))
})
const index = a.getSourceFile("src/stories/index.ts");
index.saveSync()
index.emit()

a.addSourceFiles("./src/Template.tsx")
const template = a.getSourceFile("Template.tsx");

function createDefaultProps(props) {
    const expression = props.reduce((expression, prop) => { 
        const piece = `\n${prop.label}: wb.getDefault(init,"${prop.label}")`
        if(expression === "") return piece
        return `${expression}, ${piece}` 
    }, "")
    return (`{${expression}\n}`)
}

function createMapStateToProps(name, props) {
    const expression = props.reduce((expression, prop) => { 
        const piece = `\n${prop.label}: wb.${getSelector(prop.type)}(state, "${name}", "${prop.label}")`
        if(expression === "") return piece
        return `${expression}, ${piece}` 
    }, "")
    return (`return {${expression}\n}`)
}

knobs.forEach(knob => {
    // create file
    const story = template.copy(`./stories/${knob.storyName}.story.tsx`)

    // imports
    story.addImport({
        namedImports: [{name: knob.component}],
        moduleSpecifier: knob.filePath
    });

    // class Story...
    const c = story.getClass("Story")
    const r = c.getInstanceMember("render")
    r.setBodyText(`return <${knob.component} {...this.props}/>`)
    const dp = c.getStaticProperty("defaultProps")
    dp.setInitializer(createDefaultProps(knob.props))

    // const init....
    const init = story.getVariableDeclaration("init")
    init.setInitializer(JSON.stringify({
        component: knob.storyName,
        props: knob.props
    }, null, 2))

    // function mapStateToProps
    const mstp = story.getFunction("mapStateToProps")
    mstp.setBodyText(createMapStateToProps(knob.storyName, knob.props))
    story.formatText()
    story.saveSync()
    story.emit()
})

// console.log(JSON.stringify(knobs, null, 2))



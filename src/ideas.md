meta

- create list of components
- detect prop types using typescript, flow, propTypes
- determine default knobs
- go through usage of components, and add instances as first experience components

bootstrap / artifacts

- dont create a lot of files (use package.json instead, or warn about creating files)
- knob configuartion
- settings (package.json probably)
- story files
- codemod to convert storybooks to workbench
- golden feature: take a big app and generate all components out of the box

plugin

- everything in an npm package

mocks / knobs / props

- global persisted props between stories (registered to redux store)
- colorPicker(kind: string): string
- add knob configuration in the UI

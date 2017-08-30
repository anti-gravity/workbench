export type ArtboardData = {
    size: Size
    offset: Offset
    mouse: Offset
}

export type Offset = {
    left: number
    top: number
}

export type Size = {
    width: number
    height: number
}

export interface ArtboardProps {
    artboard: ArtboardData
    id?: string
}
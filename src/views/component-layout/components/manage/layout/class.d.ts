export type ClassList = []

export type CommonClass = ClassLib[]


export type ClassLib = {
    title: String,
    children: ClassLib[]
}

export type LibClass = {

} | {}
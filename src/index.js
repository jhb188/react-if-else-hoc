import React from 'react'
import curry from 'curry'

const getDisplayName = (component, defaultName = 'Unknown') =>
    component.displayName
    || component.name
    || defaultName

export const ifElse = curry((predicate, IfComponent, ElseComponent) => {
    const ifDisplayName = getDisplayName(IfComponent)
    const elseDisplayName = getDisplayName(ElseComponent)

    const IfThenElse = props => {
        if (predicate(props)) {
            return <IfComponent { ...props } />
        }

        return <ElseComponent { ...props } />
    }

    IfThenElse.displayName = `IfThen(${ifDisplayName})Else(${elseDisplayName})`

    return IfThenElse
})

export const or = curry(
    (ElseComponent, predicate, IfComponent) => ifElse(
        predicate,
        IfComponent,
        ElseComponent
    )
)

export const Nothing = () => null

export const orNothing = or(Nothing)

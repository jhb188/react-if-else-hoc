import React from 'react'
import { mount } from 'enzyme'
import { ifElse, or, orNothing } from './'

describe('ifElse', () => {
    const IfComponent = () => <div>If</div>
    const ElseComponent = () => <div>Else</div>

    const IfElseComponent = ifElse(
        props => props.renderFirst,
        IfComponent,
        ElseComponent
    )

    it('renders the IfComponent if the predicate passes', () => {
        const wrapper = mount(<IfElseComponent renderFirst={ true } />)

        expect(wrapper.text()).toBe('If')
    })

    it('renders the ElseComponent if the predicate fails', () => {
        const wrapper = mount(<IfElseComponent renderFirst={ false } />)

        expect(wrapper.text()).toBe('Else')
    })
})

describe('or', () => {
    const Primary = ({ number }) => <div>{ number }</div>
    const Alternative = ({ number }) => <div>{ number + 1 }</div>
    const orAlternative = or(Alternative, props => props.showPrimary)

    const PrimaryOrAlternative = orAlternative(Primary)

    it('renders the primary if the predicate passes', () => {
        const wrapper = mount(
            <PrimaryOrAlternative
                number={ 5 }
                showPrimary={ true }
            />
        )

        expect(wrapper.find(Primary).length).toBe(1)
        expect(wrapper.find(Alternative).length).toBe(0)
    })

    it('renders the alternative if the predicate fails', () => {
        const wrapper = mount(
            <PrimaryOrAlternative
                number={ 5 }
                showPrimary={ false }
            />
        )

        expect(wrapper.find(Primary).length).toBe(0)
        expect(wrapper.find(Alternative).length).toBe(1)
    })

    it('passes props to rendered component', () => {
        const wrapper = mount(
            <PrimaryOrAlternative
                number={ 5 }
                showPrimary={ true }
            />
        )

        expect(wrapper.text()).toBe('5')

        const altWrapper = mount(
            <PrimaryOrAlternative
                number={ 5 }
                showPrimary={ false }
            />
        )

        expect(altWrapper.text()).toBe('6')
    })
})

describe('orNothing', () => {
    const TestComponent = () => <div>Test</div>

    const TestOrNothing = orNothing(props => props.show, TestComponent)

    it('renders the passed component if the predicate passes', () => {
        const wrapper = mount(<TestOrNothing show={ true } />)

        expect(wrapper.text()).toBe('Test')
    })

    it('renders null if the predicate fails', () => {
        const wrapper = mount(<TestOrNothing show={ false } />)

        expect(wrapper.instance()).toBe(null)
    })
})

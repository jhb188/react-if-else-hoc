import React, { Component } from 'react'
import { compose } from 'recompose'
import { ClipLoader } from 'react-spinners'
import { ifElse, or, orNothing } from 'react-if-else-hoc'

const orLoader = or(ClipLoader, props => !props.isLoading)

const Thanks = () =>
    <div>
        Great!
    </div>

const Apology = () =>
    <div>
        Sorry...
    </div>

const AppropriateResponse = ifElse(props => props.likesLibrary, Thanks, Apology)

const AppropriateResponseIfReady = compose(
    orNothing(props => props.hasAnswered),
    orLoader
)(AppropriateResponse)

class LibrarySurvey extends Component {
    state = {
        hasAnswered: false,
        likesLibrary: null,
        isLoadingResponse: false,
    }

    answer = likesLibrary => {
        this.setState({
            likesLibrary: likesLibrary,
            hasAnswered: true,
            isLoadingResponse: true,
        }, () => {
            setTimeout(
                () => this.setState({ isLoadingResponse: false }),
                1000
            )
        })
    }

    render = () =>
        <div>
            <h4>
                Do you like this library?
            </h4>
            <div>
                <button onClick={ () => this.answer(true) }>Yes</button>
                <button onClick={ () => this.answer(false) }>No</button>
            </div>
            <div style={{ marginTop: 20 }}>
                <AppropriateResponseIfReady
                    hasAnswered={ this.state.hasAnswered }
                    isLoading={ this.state.isLoadingResponse }
                    likesLibrary={ this.state.likesLibrary }
                />
            </div>
        </div>
}

export default class App extends Component {
    render = () =>
        <LibrarySurvey />
}

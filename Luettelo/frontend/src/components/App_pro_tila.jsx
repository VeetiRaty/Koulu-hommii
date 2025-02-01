import React, { Component } from "react";

const Hedelmä = (props) => {
    return (
        <div className="hedelmä">
            <h1>Lista hedelmistä</h1>
            <p>Nimi: {props.hedelmät.nimi}</p>
            <p>Väri: {props.hedelmät.väri}</p>
        </div>
    );
}

class Auto extends Component {
    constructor() {
        super();
        this.state = {
            auto: 'Audi'
        };
    }

    changeMessage() {
        this.setState({
            auto: 'BMW'
        });
    }

    render() {
        return (
            <div className="App">
                <h1>{this.state.auto}</h1>
                <button onClick={() => this.changeMessage()}>
                    Vaihda autoa
                </button>
            </div>
        );
    }
}

function App() {
    const hedelmät = {
        nimi: "Appelsiini",
        väri: "Oranssi"
    };

    return (
        <div className="App">
            <Hedelmä hedelmät={hedelmät} />
            <hr />
            <h1>Autoni on</h1>
            <Auto />
            
        </div>
    );
}
export default App;


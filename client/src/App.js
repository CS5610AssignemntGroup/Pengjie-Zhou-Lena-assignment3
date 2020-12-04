import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MyHeader from './components/MyHeader';
import Home from './components/Home';
import Unbranded from './components/content/Unbranded';
import Branded from './components/content/Branded';
import Edit from './components/content/Edit';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <MyHeader />
                        <br />
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/url/unbranded"
                            component={Unbranded}
                        />
                        <Route exact path="/url/branded" component={Branded} />
                        <Route path="/url/:shortUrl/edit" component={Edit} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

import React, {useState} from 'react';
import ReactGA from 'react-ga';
import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider";
import ColorModeProvider from "@chakra-ui/core/dist/ColorModeProvider";
import CSSReset from "@chakra-ui/core/dist/CSSReset";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import StateContext from './context/StateContext'

// pages
import Index from './pages/Index';

// ga
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
    const stateHook = useState('');

    return (
        <StateContext.Provider value={stateHook}>
            <ThemeProvider>
                <ColorModeProvider>
                    <CSSReset/>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Index/>
                            </Route>
                            <Route exact path="/:state">
                                <Index/>
                            </Route>
                        </Switch>
                    </Router>
                </ColorModeProvider>
            </ThemeProvider>
        </StateContext.Provider>
    );
}

export default App;

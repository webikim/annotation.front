import React from 'react';
import { Cookies } from 'react-cookie'

import MainPage from './pages/MainPage';

const cookies: Cookies = new Cookies();

function App() {
    return (
        <MainPage cookies={ cookies }></MainPage>
    );
}

export default App;
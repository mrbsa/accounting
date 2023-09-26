import './App.css';

import { useState } from 'react';
import welcomeImage from './assets/welcome.svg'

function App() {
    const [activeTab, setTab] = useState('WELCOME');

    console.log(activeTab);

    return (
        <>
            { activeTab === 'WELCOME' && (
                <div className='container'>
                    <img className='welcome-image' src={welcomeImage} alt="bem-vinde"/>
                    <button onClick={() => setTab('TABLE')} className='generate-button'>Gerar dados</button>
                </div>
            )}

            { activeTab === 'TABLE' && (
                <div className='main-container'>
                    <h1>EAI PAPAI</h1>
                </div>
            )}
        </>
    );
}

export default App;

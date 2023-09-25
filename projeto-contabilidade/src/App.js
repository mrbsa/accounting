import './App.css';

import { useState } from 'react';

function App() {
    const [activeTab, setTab] = useState('WELCOME');

    console.log(activeTab);

    return (
        <>
            { activeTab === 'WELCOME' && (
                <div className='container'>
                    {/* <img src="./assets/welcomepage.svg" alt="bem-vinde"/> */}
                    <button onClick={() => setTab('TABLE')} className='generate-button'>Gerar dados</button>
                </div>
            )}

            { activeTab === 'TABLE' && (
                <h1>EAI PAPAI</h1>
            )}
        </>
    );
}

export default App;

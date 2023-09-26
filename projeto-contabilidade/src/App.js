import './App.css';

import { useState } from 'react';
import welcomeImage from './assets/welcome.svg'

function App() {
    const [activeTab, setTab] = useState('WELCOME');

    return (
        <>
            {activeTab === 'WELCOME' && (
                <div className='container'>
                    <img className='welcome-image' src={welcomeImage} alt='bem-vinde' />
                    <button onClick={() => setTab('GENERAL')} className='generate-button'>Gerar dados</button>
                </div>
            )}

            {activeTab === 'GENERAL' && (
                <div className='main-container'>
                    <h1 className='main-title'> Análise dos dados (colocar outro nome dps) </h1>
                    <div className='navbar-main-div'>
                        <div className='navbar-filter-div'>
                            <div className='select-div'>
                                <label className='select-label'>filtrar por op1</label>
                                <select className='select-element'>
                                    <option value='maca'>Maçã</option>
                                    <option value='banana'>Banana</option>
                                    <option value='laranja'>Laranja</option>
                                    <option value='uva'>Uva</option>
                                </select>
                            </div>
                            <div className='select-div'>
                                <label className='select-label'>filtrar por op2</label>
                                <select className='select-element'>
                                    <option value='maca'>Maçã</option>
                                    <option value='banana'>Banana</option>
                                    <option value='laranja'>Laranja</option>
                                    <option value='uva'>Uva</option>
                                </select>
                            </div>
                            <div className='select-div'>
                                <label className='select-label'>filtrar por op3</label>
                                <select className='select-element'>
                                    <option value='maca'>Maçã</option>
                                    <option value='banana'>Banana</option>
                                    <option value='laranja'>Laranja</option>
                                    <option value='uva'>Uva</option>
                                </select>
                            </div>
                            <div className='select-div'>
                                <label className='select-label'>filtrar por op4</label>
                                <select className='select-element'>
                                    <option value='maca'>Maçã</option>
                                    <option value='banana'>Banana</option>
                                    <option value='laranja'>Laranja</option>
                                    <option value='uva'>Uva</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setTab('WELCOME')} className='go-back-button'>Início</button>
                </div>
            )}
        </>
    );
}

export default App;

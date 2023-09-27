import './App.css';

import data from './data.json';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import welcomeImage from './assets/welcome.svg';


function App() {
    const [activeTab, setTab] = useState('WELCOME');

    console.log(data[1]);

    const teste = [];
    const dados1 = data.splice(0, 100);

    for (let i = 0; i < dados1.length; i++) {
        const dados = dados1[i];
        const objetoFormatado = {
            name: dados.account,
            uv: dados.value,
            pv: dados.population,
            amt: dados.year
        };
        teste.push(objetoFormatado);
    }

    return (
        <>
            {activeTab === 'WELCOME' && (
                <div className='container-initial'>
                    <img className='welcome-image' src={welcomeImage} alt='bem-vinde' />
                    <button onClick={() => setTab('GENERAL')} id='generate-button' className='btn btn-light'>Gerar dados</button>
                </div>
            )}

            {activeTab === 'GENERAL' && (
                <div className='general-div'>
                    <div className='main-container-general'>
                        <h1 className='main-title'> Análise dos dados (colocar outro nome dps) </h1>
                        <button onClick={() => setTab('WELCOME')} id="go-back-button" className='btn btn-primary'>Início</button>
                        <button onClick={() => setTab('CHARTS')} id="generate-charts-button" className='btn btn-secondary'>Gerar gráficos</button>
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
                    </div>
                    <div>
                        <table className='table table-light table-hover'>
                            <thead>
                                <tr>
                                    <th>Ano</th>
                                    <th>Instituição</th>
                                    <th>Cod.IBGE</th>
                                    <th>UF</th>
                                    <th>População</th>
                                    <th>Coluna</th>
                                    <th>Conta</th>
                                    <th>Identificador da Conta</th>
                                    <th>Valor (R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {data.map((item, index) => (
                                    <tr key={`key_${item.value}_${index}`}>
                                        <td>{item.year}</td>
                                        <td>{item.institution}</td>
                                        <td>{item.cod}</td>
                                        <td>{item.uf}</td>
                                        <td>{item.population}</td>
                                        <td>{item.column}</td>
                                        <td>{item.account}</td>
                                        <td>{item.id}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {activeTab === 'CHARTS' && (
                <div className='general-div'>
                    <div className='main-container-general'>
                        <h1 className='main-title'>Análise dos dados (colocar outro nome dps)</h1>
                        <button onClick={() => setTab('WELCOME')} id="go-back-button" className='btn btn-primary'>Início</button>
                        <button onClick={() => setTab('CHARTS')} id="generate-charts-button" className='btn btn-secondary'>Gerar gráficos</button>
                    </div>
                    <div className='chart-div'>
                        <LineChart
                            width={1500}
                            height={500}
                            data={teste}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="uv" stroke="red" strokeDasharray="3 4 5 2" />
                        </LineChart>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;

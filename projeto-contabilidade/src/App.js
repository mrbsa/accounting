import './App.css';

import data from './data.json';
import { useState } from 'react';
import { Tooltip, XAxis, YAxis, Legend, BarChart, Bar } from "recharts";

import 'bootstrap/dist/css/bootstrap.min.css';
import welcomeImage from './assets/welcome.svg';

function findTop5StatesWithHighestExpenses(data) {
    const expensesByState = {};

    data.forEach(item => {
        const state = item.uf;
        const expense = item.value;

        if (expensesByState[state]) {
            expensesByState[state] += expense;
        } else {
            expensesByState[state] = expense;
        }
    });

    const sortedStates = Object.entries(expensesByState).sort((a, b) => b[1] - a[1]);

    const top5States = sortedStates.slice(0, 30);

    return top5States;
}
const top5States = findTop5StatesWithHighestExpenses(data);

top5States.forEach(([state, expense]) => {
    console.log(`${state}: R$ ${expense.toFixed(2)}`);
});

function App() {
    const [activeTab, setTab] = useState('WELCOME');

    const dados1 = data.splice(0, 1000);

    const estados = {};
    dados1.forEach((item) => {
        const uf = item.uf;
        const valor = parseFloat(item.value);
        if (estados[uf]) {
            estados[uf] += valor;
        } else {
            estados[uf] = valor;
        }
    });

    const dadosFormatados = Object.keys(estados).map((uf) => ({
        estado: uf,
        valor: estados[uf] / 1e9,
    }));

    return (
        <>
            {activeTab === 'WELCOME' && (
                <>
                    <div className='container-initial'>
                    <div>
                        <img className='welcome-image' src={welcomeImage} alt='bem-vinde' />
                        <p className='description'>
                        Base de dados relacional composta pelas informações de contabilidade financeira que abarca despesas por função, no escopo das unidades federativas do Brasil, entre 2018 e 2021. Os possíveis filtros de pesquisa por campo são: Ano, Instituição (Governo do Estado determinado), Código do IBGE do estado, Unidade Federativa, População (quantidade de habitantes na Unidade Federativa como apurado pelo IBGE no ano especificado), Coluna (tipo de despesa), Identificador da Conta, e Valor da conta (em reais).
                        </p>
                    </div>
                        <button onClick={() => setTab('GENERAL')} id='generate-button' className='btn btn-light'>Gerar dados</button>
                    </div>
                </>
            )}

            {activeTab === 'GENERAL' && (
                <div className='general-div'>
                    <div className='main-container-general'>
                        <h1 className='main-title'>Análise de dados</h1>
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
                        <h1 className='main-title'>Análise de dados</h1>
                        <button onClick={() => setTab('WELCOME')} id="go-back-button" className='btn btn-primary'>Início</button>
                        <button onClick={() => setTab('GENERAL')} id="generate-charts-button" className='btn btn-secondary'>Gerar tabela</button>
                    </div>
                    <div className='dos-graficos'>
                        <div className='chart-div-top5'>
                            <BarChart width={1000} height={500} data={top5States}>
                                <XAxis dataKey="0" />
                                <YAxis
                                    tickFormatter={(value) => `R$ ${(value / 1e9)} B`}
                                />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="1" name="Despesas" fill='#80A4ED' />
                            </BarChart>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;

import React, { useMemo, useCallback, useState, useEffect } from 'react';
import './App.css';

import { orderBy } from 'lodash';

import data from './data.json';
import { Tooltip, XAxis, YAxis, Legend, BarChart, Bar } from "recharts";

import 'bootstrap/dist/css/bootstrap.min.css';
import welcomeImage from './assets/welcome.svg';

const states = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RN','RR','RO','RS','RJ','SE','SP','SC','TO'];

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

// top5States.forEach(([state, expense]) => {
//     console.log(`${state}: R$ ${expense.toFixed(2)}`);
// });


function App() {
    const sortedData = useMemo(() => orderBy(data, ['key']), [])

    const [activeTab, setTab] = useState('WELCOME');
    
    const [statsData, setData] = useState(sortedData.slice(0, 1500));

    const [state, setState] = useState('');
    const [account, setAccount] = useState('');
    const [column, setColumn] = useState('');
    const [year, setYear] = useState('');

    
    useEffect(() => {
        const checkState = item => {
            return state ? item.uf === state : true
        };
    
        const checkAccount = item => {
            if (account === 'sub A') {
                return item.account.includes('08.') || item.account === account
            }

            if (account === 'sub P') {
                return item.account.includes('09.') || item.account === account;
            }

            if (account === 'sub S') {
                return item.account.includes('10.') || item.account === account;
            }

            return account ? item.account === account : true
        };
    
        const checkcolumn = item => { 
            return column ? item.column === column : true
        };
    
        const checkYear = item => {
            return year ? ~~item.year === ~~year : true
        };

        const filteredData = sortedData.filter(item => {
           return checkState(item) && checkAccount(item) && checkcolumn(item) && checkYear(item)
        })

        setData(filteredData.slice(0, 1500));
    }, [column, year, account, state, sortedData])
        
    // const [dataStart, setStart] = useState(0);
    // const [dataEnd, setEnd] = useState(20);
    // const [page, setPage] = useState(1);
    
    // useEffect(() => {
    //     setStart(dataStart + 20);
    //     setEnd(dataEnd + 20);
    //     setData(sortedData.slice(dataStart, dataEnd));
    // }, [page, dataStart, dataEnd, sortedData]);

    // //////// //////// //////// //////// //////// //////// //////// //////// //////// //////// //////// //////// //////


    useEffect(() => {
        const dados1 = sortedData.splice(0, 1000);
    
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
    }, [sortedData]);

    // const dadosFormatados = Object.keys(estados).map((uf) => ({
    //     estado: uf,
    //     valor: estados[uf] / 1e9,
    // }));

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
                                    <label className='select-label'>Estado</label>
                                    <select className='select-element' value={state} onChange={(e) => setState(e.target.value)}>
                                        <option key='0' value='' >-</option>
                                        {states.map(state => (
                                            <option key={state} value={state} >{ state }</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='select-div'>
                                    <label className='select-label'>Coluna</label>
                                    <select className='select-element' value={column} onChange={(e) => setColumn(e.target.value)}>
                                        <option key='0' value=''>-</option>
                                        <option value='Despesas Empenhadas'>Despesas Empenhadas</option>
                                        <option value='Despesas Liquidadas'>Despesas Liquidadas</option>
                                        <option value='Despesas Pagas'>Despesas Pagas</option>
                                    </select>
                                </div>
                                <div className='select-div'>
                                    <label className='select-label'>Conta</label>
                                    <select className='select-element' value={account} onChange={(e) => setAccount(e.target.value)}>
                                        <option key='0' value=''>-</option>
                                        <option value='08 - Assistência Social'>08 - Assistência Social</option>
                                        <option value='sub A'>Assistência Social + sub</option>
                                        <option value='09 - Previdência Social'>09 - Previdência Social</option>
                                        <option value='sub P'>Previdência Social + sub</option>
                                        <option value='10 - Saúde'>10 - Saúde</option>
                                        <option value='sub S'>Saúde + sub</option>
                                    </select>
                                </div>
                                <div className='select-div'>
                                    <label className='select-label'>Ano</label>
                                    <select className='select-element' value={year} onChange={(e) => setYear(e.target.value)}>
                                        <option key='0' value=''>-</option>
                                        <option value='2018'>2018</option>
                                        <option value='2019'>2019</option>
                                        <option value='2020'>2020</option>
                                        <option value='2021'>2021</option>
                                    </select>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className='table-p'>
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
                                {statsData && statsData.map((item, index) => (
                                    <tr key={`key_${item.value}_${index}`}>
                                        <td>{item.year}</td>
                                        <td>{item.instituition}</td>
                                        <td>{item.cod}</td>
                                        <td>{item.uf}</td>
                                        <td>{item.population}</td>
                                        <td>{item.column}</td>
                                        <td>{item.account}</td>
                                        <td>{item.id}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                ))}
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

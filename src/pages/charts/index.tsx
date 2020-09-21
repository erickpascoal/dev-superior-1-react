import React, { useEffect, useState } from 'react';
import Filters from '../../components/filters';
import './styles.scss';
import Chart from 'react-apexcharts';
import { barOptions, pieOptions } from './chart-options';
import axios from 'axios';
import { buildBarSeries, getGenderChartData, getPlatformChartData } from './helpers'


type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartData = {
    x: string;
    y: number;
}

const initPieChartData = {
    labels: [],
    series: []
}

const URL_API = 'https://sds1-nelio.herokuapp.com'

const Charts = () => {

    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData>(initPieChartData);
    const [genderData, setGenderData] = useState<PieChartData>(initPieChartData);


    useEffect(() => {
        async function getData() {
            const recordsResponse = await axios.get(`${URL_API}/records`);
            const gamesResponse = await axios.get(`${URL_API}/games`);

            const barData = buildBarSeries((await gamesResponse).data, (await recordsResponse).data.content);
            setBarChartData(barData);

            const platformChartData = getPlatformChartData(recordsResponse.data.content)
            setPlatformData(platformChartData);

            const gnderChartData = getGenderChartData(recordsResponse.data.content)
            setGenderData(gnderChartData);
        }

        getData();
    }, []);


    return (
        <div className="page-container">
            <Filters link="/records" linkText="VER TABELA" />

            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title"> Jogos mais votados</h1>

                    <div className="games-container">
                        <Chart
                            options={barOptions}
                            type="bar"
                            width="900"
                            height="450"
                            series={[{ data: barChartData }]}
                        />
                    </div>
                </div>

                <div className="charts">
                    <div className="platform-chart ">
                        <h2 className="chart-title">Plataformas</h2>
                        <div className="chart-position">
                            <Chart
                                options={{ ...pieOptions, labels: platformData?.labels }}
                                type="donut"
                                series={platformData?.series}
                                width="300"
                            />
                        </div>
                    </div>

                    <div className="gender-chart ">
                        <h2 className="chart-title">Gêneros</h2>
                        <div className="chart-position">
                            <Chart
                                options={{ ...pieOptions, labels: genderData?.labels }}
                                type="donut"
                                series={genderData?.series}
                                width="300"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Charts;
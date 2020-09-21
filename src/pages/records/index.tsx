
import React, { useEffect, useState } from 'react';
import './styles.scss'
import axios from 'axios';
import { format } from 'date-fns'
import Pagination from './pagination';
import Filters from '../../components/filters';


const URL_API = 'https://sds1-nelio.herokuapp.com'

const Records = () => {

    const [records, setRecords] = useState<any>([]);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        async function loadRecords() {
            const response = await axios.get(URL_API + `/records?page=${activePage}&linesPerPage=10&orderBy=moment&direction=DESC`);
            setRecords(response.data)
        }

        loadRecords();
    }, [activePage])

    return (
        <div className="page-container">
            <Filters link="/charts" linkText="VER GRÁFICOS" />
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead className="thead">
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {records?.content?.map((record: any) => (
                        <tr key={record.id}>
                            <td>{format(new Date(record.moment), 'dd/MM/yyyy HH:mm')}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlatform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                activePage={activePage}
                goToPage={(page: number) => setActivePage(page)}
                totalPages={records?.totalPages}
            />
        </div>
    )
}

export default Records;
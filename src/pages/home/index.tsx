import React from 'react';
import { Link } from 'react-router-dom'
import './styles.scss'
import { ReactComponent as ArrowRight } from '../../assets/img/arrow-right.svg'
import { ReactComponent as Homeimage } from '../../assets/img/home.svg'

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-text">
                <h1 className="home-text-title"> Quais jogos a galera gosta mais?</h1>
                <h3 className="home-text-subtitle"> Clieque no botão abaixo e saiba quais são os jgos que os gamers estão escolhendo!</h3>
                <Link to="/records">
                    <div className="home-actions">
                        <button className="home-btn">
                            QUERO SABER QUAIS SÃO
                     </button>
                        <div className="home-btn-icon">
                            <ArrowRight />
                        </div>
                    </div>
                </Link>
            </div>
            <Homeimage />
        </div>
    );
}

export default Home;
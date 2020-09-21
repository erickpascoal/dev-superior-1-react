import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'

type Props = {
    link: string;
    linkText: string;
}

const Filters = ({ linkText: titleButton, link }: Props) => {
    return (
        <div className="filters-container records-actions">
            <Link to={link}>
                <button className="action-filters">{titleButton}</button>
            </Link>
        </div>

    );
}

export default Filters;
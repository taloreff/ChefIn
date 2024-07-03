import React, { useState } from 'react';
import { ChefList } from '../cmps/ChefList';
import chefsData from '../data/chefs.json';
import { Chef } from '../types/Chef';

export function ChefIndex() {
    const chefs: Chef[] = chefsData;
    const itemsPerPage = 5;

    const [italianPage, setItalianPage] = useState(0);
    const [frenchPage, setFrenchPage] = useState(0);

    const italianChefs = chefs.filter(chef => chef.labels.includes('Italian'));
    const frenchChefs = chefs.filter(chef => chef.labels.includes('French'));

    const paginatedItalianChefs = italianChefs.slice(italianPage * itemsPerPage, (italianPage + 1) * itemsPerPage);
    const paginatedFrenchChefs = frenchChefs.slice(frenchPage * itemsPerPage, (frenchPage + 1) * itemsPerPage);

    async function onUpdateChef(chef: Chef) {
        try {
            //   await saveChef(chef)
            console.log('Chef updated:', chef);
        } catch (err) {
            console.log('Error in onUpdateChef', err);
        }
    }

    const handlePageChange = (setPage: React.Dispatch<React.SetStateAction<number>>, page: number, maxPages: number) => {
        if (page < 0) return;
        if (page >= maxPages) return;
        setPage(page);
    };

    return (
        <div className="chef-index">
            <div className="section">
                <h2>Italian</h2>
                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(setItalianPage, italianPage - 1, Math.ceil(italianChefs.length / itemsPerPage))}>&lt;</button>
                    <ChefList chefs={paginatedItalianChefs} onUpdateChef={onUpdateChef} />
                    <button onClick={() => handlePageChange(setItalianPage, italianPage + 1, Math.ceil(italianChefs.length / itemsPerPage))}>&gt;</button>
                </div>
            </div>
            <div className="section">
                <h2>French</h2>
                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(setFrenchPage, frenchPage - 1, Math.ceil(frenchChefs.length / itemsPerPage))}>&lt;</button>
                    <ChefList chefs={paginatedFrenchChefs} onUpdateChef={onUpdateChef} />
                    <button onClick={() => handlePageChange(setFrenchPage, frenchPage + 1, Math.ceil(frenchChefs.length / itemsPerPage))}>&gt;</button>
                </div>
            </div>
        </div>
    );
}

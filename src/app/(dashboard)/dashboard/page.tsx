"use client";

import { useState } from 'react';
import { Pagination } from '#/components/ui/base/Pagination';

// With Server-side Pagination
const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([
        {
            id: 1,
            name: 'text'
        },
        {
            id: 2,
            name: 'text'
        },
        {
            id: 3,
            name: 'text'
        }
    ]);

    const fetchData = async (page: number) => {
        try {
            const response = await fetch(`/api/data?page=${page}&limit=10`);
            const result = await response.json();
            setData(result.data);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchData(page);
    };

    return (
        <div>
            {/* Your data rendering */}
            <div className="data-container">
                {data.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                theme="blue"
                size="md"
                variant="advanced"
            />

            <Pagination
                currentPage={currentPage}
                totalPages={50}
                onPageChange={setCurrentPage}
                theme="green"
                size="lg"
                variant="advanced"
                showFirstLast={true}
                showPrevNext={true}
                showPageNumbers={true}
                showPageInfo={true}
                siblingCount={2}
                boundaryCount={1}
                customLabels={{
                    first: 'पहला',
                    previous: 'पिछला',
                    next: 'अगला',
                    last: 'अंतिम',
                    of: 'का',
                    page: 'पृष्ठ'
                }}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={20}
                onPageChange={setCurrentPage}
                theme="dark"
                variant="minimal"
                showPageInfo={true}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                theme="purple"
                size="md"
            />
        </div>
    );
}
export default Dashboard;

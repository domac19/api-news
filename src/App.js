import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    const API_KEY = 'mojKljuc';
    const API_URL =
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}';

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Can not catch news!');
                }
                const data = await response.json();
                setNews(data.articles || []);
            } catch (error) {
                console.error('Error:', error);
                setError('Impossible to catch news!');
            }
        };

        fetchNews();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1 style={{ textAlign: 'center' }}>Vijesti</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {news && news.length > 0 ? (
                news.map((article, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ddd',
                            marginBottom: '10px',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a
                            href={article.url}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Pročitaj više
                        </a>
                    </div>
                ))
            ) : (
                <p>Učitavam vijesti...</p>
            )}
        </div>
    );
};

export default App;

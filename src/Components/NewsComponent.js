import React, { useState, useEffect } from 'react';
import Newitem from './Newitem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsComponent = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const { country, category, pageSize, api } = props;

    const updateNews = async () => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api}&page=${page}&pageSize=${pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api}&page=${nextPage}&pageSize=${pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();

        setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setPage(nextPage);
    };
    const capitalizeFirstLetter = (word) => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <>
            <h1 className='text-center' style={{ marginTop: '90px' }}>
                Top Stories - {capitalizeFirstLetter(category)}
            </h1>

            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}


            >
                <div className='container my-3'>
                    <div className='row'>
                        {articles.map((article) => (
                            <div className='col-md-4 my-4' key={article.url}>
                                <Newitem
                                    title={article.title?.slice(0, 45) || ''}
                                    desc={article.description?.slice(0, 80) || ''}
                                    img={
                                        article.urlToImage ||
                                        'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'
                                    }
                                    newsUrl={article.url}
                                    source={article.author}
                                    time={article.publishedAt}
                                    newschannel={article.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

export default NewsComponent;

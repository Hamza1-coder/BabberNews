import React, {useState, useEffect} from 'react'
import Newsitem from './Newsitem';
import Spinners from './Spinners';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
 
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
    }

    useEffect(() => {
      updateNews();
       document.title = `${capitalizeFirstLetter(props.category)} - Babber News`;
    },[])


// const handlePrevClick = async () => {
//   setPage(page-1);
//   updateNews();
// }
// const handleNextClick = async () => {
//   setPage(page+1);
//   updateNews();
// }

const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page+1);
  let data = await fetch(url);
  let parsedData = await data.json()
  setArticles(articles.concat(parsedData.articles));
  settotalResults(parsedData.totalResults);
};

    return (
      <div>
        <h1 className='text-center' style={{margin:"40px 0px", marginTop:"90px"}}>BabberNews - Top {`${capitalizeFirstLetter(props.category)}`} Headlines</h1>
        {loading && <Spinners />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinners />}
        >
          <div className='container'>
        <div className="row">
        {articles.map((element)=> {
            return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div> 
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }

export default News;

News.defaultProps = {
  country: 'in',
  pagesize: 8,
  category: 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
}
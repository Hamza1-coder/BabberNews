import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinners from './Spinners';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }
capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
constructor(props) {
  super(props);
  this.state = {
  articles: [],
  loading: false,
  page:1,
  totalResults: 0
  }
  document.title = `${this.capitalizeFirstLetter(this.props.category)} - Babber News`;
}

async updateNews(){
  this.props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  this.props.setProgress(30);
  let parsedData = await data.json()
  this.props.setProgress(70);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false,
  })
  this.props.setProgress(100);
}
async componentDidMount(){
    this.updateNews();
}

handlePrevClick = async () => {
  this.setState({page: this.state.page - 1})
  this.updateNews();
}
handleNextClick = async () => {
  this.setState({page: this.state.page + 1})
  this.updateNews();
}

fetchMoreData = async () => {
  this.setState({page: this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
  })
};

  render() {
    return (
      <div>
        <h1 className='text-center' style={{margin:"40px"}}>BabberNews - Top {`${this.capitalizeFirstLetter(this.props.category)}`} Headlines</h1>
        {this.state.loading && <Spinners />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinners />}
        >
          <div className='container'>
        <div className="row">
        {this.state.articles.map((element)=> {
            return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div> 
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

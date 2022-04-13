import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinners from './Spinners';
import PropTypes from 'prop-types';

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

constructor() {
  super();
  this.state = {
  articles: [],
  loading: false,
  page:1
  }
}
async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645adba78f4049b1b97c870d7cce3d14&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
}

handlePrevClick = async () => {
  console.log("previous");
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645adba78f4049b1b97c870d7cce3d14&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({loading: false});
  this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles,
    loading: false
  })
}
handleNextClick = async () => {
  console.log("next");
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645adba78f4049b1b97c870d7cce3d14&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
    page: this.state.page+1,
    articles: parsedData.articles,
    loading: false
  })
}

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin:"40px"}}>Babber News Top Headlines</h1>
        {this.state.loading && <Spinners />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=> {
            return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} url={element.url}/>
            </div> 
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

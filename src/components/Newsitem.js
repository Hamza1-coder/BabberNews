import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title, description, imageurl, url, author, date, source} = this.props;
    return (
      <div className='my-3'>
      <div className="card">
      <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
        {source}
      </span> 
        <img src={!imageurl?"https://image.cnbcfm.com/api/v1/image/107045553-1649765074630-Lucid_Air_GT_Performance_launch_desert.jpg?v=1649765258&w=1920&h=1080":imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text"> {description}...</p>
          <p className="card-text"><small class="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
          <a href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
     </div>
    </div>
    )
  }
}

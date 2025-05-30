import React from 'react'

const Newsitem = (props) => {

    let { img, title, desc, newsUrl, source, time, newschannel } = props

    return (
        <div>
            <div className="card">
                <img src={img} className="card-img-top  h-42 w-full object-cover" alt="..." />
                <div className="card-body">
                    <h6> <span className="badge bg-secondary">{newschannel}</span></h6>

                    <h5 className="card-tile">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <a href={newsUrl} className="btn-sm btn-primary">Read More</a>
                    <p className="card-text"><small className="text-muted">By {source} published on {new Date(time).toGMTString()} </small></p>


                </div>
            </div>
        </div>
    )

}
export default Newsitem



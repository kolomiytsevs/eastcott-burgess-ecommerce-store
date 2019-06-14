import React from 'react'

import './Media.css'

const Media = () =>(

    <div className="content-wrapper">
        <h1>Videos</h1>
        <iframe width="100%" height="600px" src="https://www.youtube.com/embed/vJlDPIwFO_w" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br/>
        <div className="g-ytsubscribe" data-channelid="UCDubbvSBm0EgdzWU1y1cfnw" data-layout="default" data-count="default"></div>
    </div>
)

export default Media
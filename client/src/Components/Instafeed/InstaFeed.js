import React from 'react'
import Instafeed from 'instafeed.js'

const userFeed = new Instafeed({
    get: 'user',
    userId: '3529656626',
    limit:6,
    resolution: 'low_resolution', //low_resolution or standard_resolution
    accessToken: '3529656626.1677ed0.b982155b4dd843bfa8d93699ac5a765e', 
    sortBy: 'most-recent',
    template: '<div id="individual-insta-post"><a title="{{caption}}" href="{{link}}"><img src="{{image}}" /></a></div>'
})
userFeed.run()

const Gramfeed = () =>(
    <div id="instafeed" style={{width:"50px", height:"50px"}}></div>

)

export default Gramfeed
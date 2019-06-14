import React from 'react'
import {Helmet} from 'react-helmet'

import './OurStory.css'


const OurStory = () =>(
    <div className="page-container">
        <Helmet>
            <title> Our Story | Eastcott &amp; Burgess Tea</title>
        </Helmet>
        <div className="intro-div">
            <h1 style={{textAlign:"center"}}><span style={{color:"#000000"}}>Flavour. Everything We Do Revolves Around Flavour.</span></h1>
            <p >In Spring 2018 we headed to the mountains of China to track down the most prized terroirs and most skilful tea masters. The reason was simple. To find (and bring back) the most amazing and most complex flavours for each tea varietal.</p>
            <p >Every 2018 tea you find in our store, comes directly from the source, from its respective birthplace, and from the small family producers who have been both growing and processing these teas for generations.</p>
            <p >Produced by the tea masters as their signature finish (their pride and joy), each tea is the best from each family.</p>
            <p >Finally, we strive for a new level of transparency. Using sourcing videos, our sourcing stories and detailed information about each tea we want to tell you as much as possible. We do this to give you faith in where your tea came from and to make your tea drinking experience that bit more exciting.</p>
        </div>
        <div className="terroir-div">
            <div><img src="https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,e_sharpen:100,f_auto,h_400,q_auto,w_300/v1559242018/20180515_141033_k6zr4u.jpg"/></div>
            <div>
                <h2>Terroir</h2>
                <p >To do this we seek out the best terroir and most desirable growing conditions. We build on Yulia&rsquo;s knowledge as an environmental engineer to help us seek out the best locations. We do this not for ideological reasons or for some elusive birthplace or prestige, but rather for flavour and complexity not found anywhere else.</p>        
                <p >The flavour of a tea depends on how it is grown and how it is finished by a tea master (and stored in your home of course, but that&rsquo;s another story). &nbsp;</p>        
                <p >This makes location incredibly important, with local factors such as altitude, climatic variation, moisture levels, soil conditions, water quality, and presence of competing vegetation being the determinants of a truly complex leaf. &nbsp;Conditions which can&rsquo;t be recreated elsewhere.</p>    
            </div>    
        </div>
        <div className="tea-master-div">
            <div>
                <h2>Tea Masters &ndash; Artistic Souls</h2>      
                <p >We also seek out artists. Not sales men. Sometimes this will be someone who has grown and finished their leaves from start to finish and sometimes it will be someone who is more of a processing artist and buys his &lsquo;paints&rsquo; from local growers. What matters is the finished canvas. Going back to the source and following the leaf from seed to pan allows us to find individuals who are truly proud of what they make. They will never try to sell you their tea. Their tea sells itself.</p>    
            </div>
            <div><img src="https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,e_sharpen:100,f_auto,h_400,q_auto,w_300/v1559241503/IMG_2495_dkbawm.jpg"/></div>
             
        </div>
        <div className="transparency-div">
            <div><img src="https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,e_sharpen:100,f_auto,h_400,q_auto,w_300/v1559241576/IMG_2743_zgapp3.jpg"/></div>
            <div>
                <h2>Oversight and Transparency</h2>      
                <p >This complete oversight of the leaf from seed to pan (while satisfying for us as control freaks) also serves one important purpose. Transparency. It allows us to tell you with certainty that a particular tea was grown in a truly amazing place like Wudong and not simply sold there because of the prestige.</p>
            
                <p>All this is incredibly important if you want to find a tea which has that &lsquo;wow factor&rsquo; or a tea which makes you fall back in love with it. After all, it&rsquo;s not the name, a location, a legend, or a story that takes your breath away. It&rsquo;s the flavour and that moment of calm which follows. &nbsp;</p>    
            </div> 
        </div>
        <div className="yulia-div">
            <h2>Who Are We?</h2>
            <div>
            <div>
                <p >Having lived in Russia until the age of 11, I was introduced to whole leaf Chinese teas at a young age (yes even pu&rsquo;er).</p>    
                <p >Russian tea culture is a world apart from English tea culture and has a stronger link to wellness, meditation, and happiness. All of these things are of course important to me also.</p>    
                <p >After moving to the UK, tea became my go-to wellness tool that helped me to&nbsp;slow down, clear the mind and re-connect.</p>    
                <p >As I was introduced to more and more amazing tea (mostly through our Russian family friends), I quickly realised that genuinely amazing teas are hard to find in the UK (and the West in general). I wanted to be the catalyst for the growth of this rich tea culture.</p>    
            </div>
                <div><img src="https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,e_sharpen:100,f_auto,g_face:center,h_400,o_90,q_auto,w_400/v1559242740/_MG_1545_huyhqj.jpg"/><p>Yulia Kolomiytseva</p></div>      
            </div> 
        </div>
        <div className="sasha-div">
            <div>
            <div><img src="https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,e_sharpen:90,f_auto,g_face,h_400,w_400,y_1000/v1558877816/BY%20RG%20YC/100%20kb/_MG_1650_mggz13.jpg"/><p>Sasha Kolomiytsev</p></div>
            <div>
                <p  >After deciding&nbsp;to help Yulia with her project, I fell in love with tea. I have a personality that makes everything I love and do an obsession. As I delved into tea, I became &lsquo;obsessed&rsquo; or what I like to call &lsquo;a tea geek&rsquo;. The world of tea is almost bottomless and has so much space to grow and develop. That&rsquo;s exactly what we&#39;re trying&nbsp;to do. Make the world of tea more amazing that it already is.</p>    
                <p >The way we do thing has change a little since we started, but the mission remains the same &ndash; to source the best teas we can find, paying careful attention to the origin of the tea, the environment in which it was grown, how it was processed and most importantly how it tastes.</p>
            </div>
            </div> 
        </div>
        <div className="name-div">
            <h2 style={{textAlign:"center"}}><span style={{color:"#000000"}}>Where Does Our Name Come From?</span></h2>
            <p >We named the tea company as a tribute to our English grandparents, who were not only tea lovers, but also big supporters of our project. &nbsp;</p>
        </div>
    </div>
)

export default OurStory
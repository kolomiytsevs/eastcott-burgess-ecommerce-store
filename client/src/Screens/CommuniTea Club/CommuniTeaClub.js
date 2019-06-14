import React from 'react'
import {Helmet} from 'react-helmet'

import './CommuniTeaClub.css'
import SubscribeForm from '../../Components/Subscribe Form/SubscribeForm'

const CommuniTeaClub = () => (
    <div className='container-div'>
        <Helmet>
            <title>CommuniTea Club - Tea Group Buy | Eastcott&amp;Burgess</title>
        </Helmet>
        <h1 className="CTC-h1">CommuniTea Club</h1>
        <div>
            <h2>A place where the tea community can come together to participate in Tea Group Buys </h2>
            <h3>Sasha is moving to China in August where he is planning to relaunch the CT Club Tea Group Buy. Stay tuned!</h3>
            <SubscribeForm />
            <h4>Sign up to be notified when of our group buys go live!</h4>
        </div>
    </div>
)

export default CommuniTeaClub
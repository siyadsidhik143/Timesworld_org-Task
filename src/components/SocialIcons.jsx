import React from 'react'
import G_Icon from "../assets/images/G_icon.png"
import F_icon from "../assets/images/F_icon.png"
import in_icon from "../assets/images/in_icon.png"
import twitter_icon from "../assets/images/twitter_icon.png"

const SocialIcons = () => {
    return (
        <div>
            <div className='social-icons m-3'>
                <div className="round-icon m-1">
                    <img src={G_Icon} />
                </div>
                <div className="round-icon m-1">
                    <img src={F_icon} />
                </div>
                <div className="round-icon m-1">
                    <img src={in_icon} />
                </div>
                <div className="round-icon m-1">
                    <img src={twitter_icon} />
                </div>
            </div>
        </div>
    )
}

export default SocialIcons

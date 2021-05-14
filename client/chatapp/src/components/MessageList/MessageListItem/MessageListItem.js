import React from 'react'

import './MessageListItem.css'

export const MessageListItem = ({messageData}) => {
    const {message,createdAt: timesent, firstName: senderFirstname, lastName: senderLastName} = messageData;
    const date = new Date(timesent).toUTCString();
    return (
        <div className="message-item">
            <div className="message-item__info">
                <div>
                    <span className="message-item__sender">{senderFirstname} {senderLastName} </span> 
                    <span className="middot">&middot;</span>
                    <span className="message-item__time-sent">{date}</span>
                </div>
                <div className="message-item__content">
                    {message}.
                </div>
            </div>
        </div>
    )
}


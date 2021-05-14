import React from 'react'

import './ChatHeader.css'

export const ChatHeader = ({name}) => {
    return (
        <div id="chat-header">
            <p>{name}</p>
        </div>
    )
}

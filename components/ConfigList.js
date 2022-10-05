import { React, useState } from 'react'

export default function ConfigList(props) {
    return (
        <ul>
            {props.configs.map((config) => (
                <li>{config.id}</li>
            ))}
        </ul>
    )
}

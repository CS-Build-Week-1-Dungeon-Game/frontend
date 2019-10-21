import React from "react"
import Menu from '../Menu'
import Sidebar from "../Sidebar"
import {StyledMain} from "./styles"

const WorldPage = () => {
    return (
        <StyledMain>
            <Menu></Menu>
            <Sidebar></Sidebar>
        </StyledMain>
    )
}

export default WorldPage
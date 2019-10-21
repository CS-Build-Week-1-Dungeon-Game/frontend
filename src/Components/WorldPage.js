import React from "react"

import styled from "styled-components"

import Menu from './Menu'
import Sidebar from "./SideBar"
import World from "./World"

export const StyledMain = styled.main`
    margin: 0;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    background: black;
`

const WorldPage = () => {
    return (
        <StyledMain>
            <Menu></Menu>
            <World />
            <Sidebar></Sidebar>
        </StyledMain>
    )
}

export default WorldPage
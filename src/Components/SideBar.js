import React from 'react'
import styled from "styled-components"

const StyledAside = styled.aside`
   background: black;
   border-left: 2px solid white;
   grid-column: 10 / span 3;
   grid-row: 1 / span 12;
`
const Sidebar = () => {
    return (
            <StyledAside>
                <p>some text</p>
            </StyledAside>
        )
}
export default Sidebar
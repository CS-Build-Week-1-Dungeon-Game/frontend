import React, {useState} from 'react'
import {Slide} from "@material-ui/core"
import styled from "styled-components"

const StyledAside = styled.aside`
   background: black;
   border-left: 2px solid white;
   grid-column: 10 / span 3;
   grid-row: 1 / span 12;
`
const Sidebar = () => {
    const [visible, setVisible] = useState(true)
    return (
        <>
        {/* Sorry for the mess here, I was toying with making this a slide for on mobile devices, but I thought I would try to figure out the game area first */}
        {/* <button style={{'position': 'absolute'}} onClick={() => setVisible(!visible)}></button>
        <Slide direction="left" in={visible}> */}
            <StyledAside>
                <p>some text</p>
            </StyledAside>
        {/* </Slide> */}
        </>
        )
}
export default Sidebar
import React, {useState} from 'react'
import {Slide} from "@material-ui/core"
import {StyledAside} from "./styles"

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
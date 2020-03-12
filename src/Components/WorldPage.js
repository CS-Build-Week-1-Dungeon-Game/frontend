import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";
import Sidebar from "./SideBar";
import World from "./World";
import FullPageLoader from "./FullPageLoader";
import LinkToast from "./LinkToast";
import NoMobile from "./NoMobile";

import { requestWithAuth } from "../utils";
import { mixins } from "./Layout";

toast.configure({
  autoClose: 10000,
  draggable: false,
  closeOnClick: false
});

// beginning to change into hooks
export default function WorldPage() {
  let dimension = 200;
  let [player, setPlayer] = useState(null);
  let [roomIndex, setRoomIndex] = useState(null);
  let [playerColor, setPlayerColor] = useState(null);
  let [width, setWidth] = useState(null);
  const initialize = useCallback(() => {
    const token = localStorage.getItem("token");
    return requestWithAuth(token)
      .get(`/api/adv/init/`)
      .then(res => {
        const roomDict = {};
        for (let element of JSON.parse(res.data.rooms)) {
          roomDict[element.fields.title] = {
            ...element.fields,
            pk: element.pk
          };
        }
        setRoomIndex(roomDict);
        setPlayer(res.data.player);
        randomPlayerColor();
      })
      .catch(err => {
        toast.info(({ closeToast }) => <LinkToast />);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    setWidth(window.innerWidth);
    const updateWindowWidth = e => {
      setWidth(e.target.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  const randomPlayerColor = () => {
    const colors = [
      "#7f0000",
      "#4a148c",
      "#0d47a1",
      "#e65100",
      "#004d40",
      "#1565c0"
    ];
    const random = Math.floor(Math.random() * (colors.length - 1));
    setPlayerColor(colors[random]);
  };

  const move = direction => {
    const token = localStorage.getItem("token");
    requestWithAuth(token)
      .post(`api/adv/move`, { direction })
      .then(res => {
        if (res.data && res.data.error_msg.length > 0) {
          toast.error(res.data.error_msg);
        } else {
          setPlayer(res.data.player);
        }
      })
      .catch(err => {
        console.log("errors", err.response);
      });
  };

  const handleItems = (e, action) => {
    const token = localStorage.getItem("token");
    requestWithAuth(token)
      .post(`api/adv/${action}`, { item: e.target.innerText })
      .then(res => {
        setPlayer(res.data.player);
      })
      .catch(err => {
        if (err) {
          console.log("errors", err.response);
        }
      });
  };
  if (width < 768) {
    return <NoMobile />;
  }
  if (!roomIndex || !player) {
    return (
      <>
        <ToastContainer />
        <FullPageLoader />
      </>
    );
  }
  return (
    <StyledMain>
      <Menu></Menu>
      <ToastContainer />
      <World
        roomIndex={roomIndex}
        player={player}
        move={move}
        dimension={dimension}
        playerColor={playerColor}
        clickHandler={handleItems}
      />
      <Sidebar
        player={player}
        roomIndex={roomIndex}
        move={move}
        dimension={dimension}
        playerColor={playerColor}
        clickHandler={handleItems}
      ></Sidebar>
    </StyledMain>
  );
}
export const StyledMain = styled.main`
  margin: 0 auto;
  min-height: 100vh;
  max-width: 2000px;
  background: #212121;
  position: relative;
  ${mixins.gridParent};
`;

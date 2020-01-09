import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";
import Sidebar from "./SideBar";
import World from "./World";
import FullPageLoader from "./FullPageLoader";
import LinkToast from "./LinkToast";

import { positionRooms, requestWithAuth } from "../utils";
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
  let [rooms, setRooms] = useState(null);
  let [roomIndex, setRoomIndex] = useState(null);
  let [playerColor, setPlayerColor] = useState(null);

  useEffect(() => {
    initialize();
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
    setPlayerColor(random);
  };
  const initialize = () => {
    const token = localStorage.getItem("token");
    return requestWithAuth(token)
      .get(`/api/adv/init/`)
      .then(res => {
        const roomDict = {};
        const roomArr = [];
        for (let element of JSON.parse(res.data.rooms)) {
          roomArr.push({
            ...element.fields,
            pk: element.pk
          });
        }
        for (let element of roomArr) {
          roomDict[element.title] = element;
        }
        setRooms(roomArr);
        setRoomIndex(roomDict);
        setPlayer(res.data.player);
        randomPlayerColor();
      })
      .catch(err => {
        toast.info(({ closeToast }) => <LinkToast />);
        console.log(err);
      });
  };
  const move = direction => {
    const token = localStorage.getItem("token");
    requestWithAuth(token)
      .post(`api/adv/move`, { direction })
      .then(res => {
        setPlayer(res.data.player);
      })
      .catch(err => {
        console.log("errors", err.response);
      });
  };
  const pickup = e => {
    const token = localStorage.getItem("token");
    console.log(e.target.innerText);
    requestWithAuth(token)
      .post(`api/adv/take`, { item: e.target.innerText })
      .then(res => {
        this.setState({
          playerInventory: res.data.inventory,
          roomItems: res.data.room_items
        });
      })
      .catch(err => {
        console.log("errors", err.response);
      });
  };
  const drop = e => {
    const token = localStorage.getItem("token");
    requestWithAuth(token)
      .post(`api/adv/drop`, { item: e.target.innerText })
      .then(res => {
        this.setState({
          playerInventory: res.data.inventory,
          roomItems: res.data.room_items
        });
      })
      .catch(err => {
        console.log("errors", err.response);
      });
  };

  if (!roomIndex || !player) {
    // console.log(rooms, roomIndex);
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
        // rooms={rooms}
        roomIndex={roomIndex}
        player={player}
        move={move}
        dimension={dimension}
        playerColor={playerColor}
        clickHandler={pickup}
      />
      <Sidebar
        // rooms={rooms}
        player={player}
        roomIndex={roomIndex}
        move={move}
        dimension={dimension}
        playerColor={playerColor}
        clickHandler={drop}
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
// class WorldPage extends React.Component {
//   dimension = 300;
//   constructor() {
//     super();
//     this.state = {
//       playerRoom: null,
//       currentRoomTitle: "",
//       currentDesc: "",
//       rooms: null,
//       roomDict: null,
//       user: null,
//       rawRooms: [],
//       playerColor: null,
//       playerInventory: null,
//       roomItems: null
//     };
//   }
//   componentDidMount() {
//     const asyncHelper = async () => {
//       await this.getRooms();
//       await this.start();
//     };
//     asyncHelper();
//     console.log({ state: this.state });
//     this.setPlayerColor();
//   }
//   setPlayerColor = () => {
//     const colors = [
//       "#7f0000",
//       "#4a148c",
//       "#0d47a1",
//       "#e65100",
//       "#004d40",
//       "#1565c0"
//     ];
//     const random = Math.floor(Math.random() * (colors.length - 1));
//     this.setState({ playerColor: colors[random] });
//   };
//   getRooms = () => {
//     // Get and parse the rooms
//     return requestWithAuth()
//       .get(`api/adv/rooms/`)
//       .then(res => {
//         console.log(JSON.parse(res.data));
//         const rooms = positionRooms(JSON.parse(res.data), this.dimension);
//         const roomDict = {};
//         for (let i = 0; i < rooms.length; i++) {
//           roomDict[rooms[i].title] = rooms[i];
//         }
//         this.setState({
//           ...this.state,
//           rooms: rooms,
//           roomDict: roomDict,
//           rawRooms: res.data
//         });
//       })
//       .catch(err => {
//         toast.info(({ closeToast }) => <LinkToast />);
//         console.log(err);
//       });
//   };
//   start = () => {
//     // initialize the player
//     const token = localStorage.getItem("token");
//     return requestWithAuth(token)
//       .get(`/api/adv/init/`)
//       .then(res => {
//         let currentRoom = this.state.roomDict[res.data.title];
//         this.setState({
//           currentRoomTitle: res.data.title,
//           userID: res.data.uuid,
//           currentDesc: res.data.description,
//           playerRoom: currentRoom,
//           user: res.data.name,
//           playerInventory: res.data.inventory,
//           roomItems: res.data.room_items
//         });
//       })
//       .catch(err => {
//         toast.info(({ closeToast }) => <LinkToast />);
//         console.log(err);
//       });
//   };

//   move = direction => {
//     const token = localStorage.getItem("token");
//     requestWithAuth(token)
//       .post(`api/adv/move`, { direction })
//       .then(res => {
//         this.setState({
//           playerInventory: res.data.inventory,
//           roomItems: res.data.room_items,
//           currentRoomTitle: res.data.title,
//           currentDesc: res.data.description,
//           playerRoom: this.state.roomDict[res.data.title]
//         });
//       })
//       .catch(err => {
//         console.log("errors", err.response);
//       });
//   };
//   pickup = e => {
//     const token = localStorage.getItem("token");
//     console.log(e.target.innerText);
//     requestWithAuth(token)
//       .post(`api/adv/take`, { item: e.target.innerText })
//       .then(res => {
//         this.setState({
//           playerInventory: res.data.inventory,
//           roomItems: res.data.room_items
//         });
//       })
//       .catch(err => {
//         console.log("errors", err.response);
//       });
//   };
//   drop = e => {
//     const token = localStorage.getItem("token");
//     requestWithAuth(token)
//       .post(`api/adv/drop`, { item: e.target.innerText })
//       .then(res => {
//         this.setState({
//           playerInventory: res.data.inventory,
//           roomItems: res.data.room_items
//         });
//       })
//       .catch(err => {
//         console.log("errors", err.response);
//       });
//   };
//   render() {
//     if (!this.state.rooms || !this.state.currentRoomTitle) {
//       return (
//         <>
//           <ToastContainer />
//           <FullPageLoader />
//         </>
//       );
//     }
//     return (
//       <StyledMain>
//         <Menu></Menu>
//         <ToastContainer />

//         <World
//           rooms={this.state.rooms}
//           playerRoom={this.state.playerRoom}
//           move={this.move}
//           dimension={this.dimension}
//           currentRoomTitle={this.state.currentRoomTitle}
//           playerColor={this.state.playerColor}
//           currentDesc={this.state.currentDesc}
//           user={this.state.user}
//           roomItems={this.state.roomItems}
//           clickHandler={this.pickup}
//         />
//         <Sidebar
//           rooms={this.state.rooms}
//           playerRoom={this.state.playerRoom}
//           move={this.move}
//           dimension={this.dimension}
//           currentRoomTitle={this.state.currentRoomTitle}
//           playerColor={this.state.playerColor}
//           currentDesc={this.state.currentDesc}
//           user={this.state.user}
//           rawRooms={this.state.rawRooms}
//           playerInventory={this.state.playerInventory}
//           clickHandler={this.drop}
//         ></Sidebar>
//       </StyledMain>
//     );
//   }
// }

// export default WorldPage;

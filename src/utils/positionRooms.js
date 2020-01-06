export const positionRooms = (rooms, dimension) => {
  const roomDict = {};
  // load our array of rooms into a much more usable dictionary
  for (let i = 0; i < rooms.length; i++) {
    roomDict[rooms[i].pk] = {
      ...rooms[i].fields,
      pk: rooms[i].pk,
      x: 0,
      y: 0,
      isSet: false
    };
  }
  const recRoom = (room, roomDict) => {
    if (room.isSet) {
      return;
    }
    room.isSet = true;
    if (room.n_to) {
      roomDict[room.n_to].x = room.x;
      roomDict[room.n_to].y = room.y - dimension;
      recRoom(roomDict[room.n_to], roomDict);
    }
    if (room.s_to) {
      roomDict[room.s_to].x = room.x;
      roomDict[room.s_to].y = room.y + dimension;
      recRoom(roomDict[room.s_to], roomDict);
    }
    if (room.e_to) {
      roomDict[room.e_to].y = room.y;
      roomDict[room.e_to].x = room.x + dimension;
      recRoom(roomDict[room.e_to], roomDict);
    }
    if (room.w_to) {
      roomDict[room.w_to].y = room.y;
      roomDict[room.w_to].x = room.x - dimension;
      recRoom(roomDict[room.w_to], roomDict);
    }
  };
  recRoom(roomDict[Object.keys(roomDict)[0]], roomDict);
  const roomArr = [];
  for (let key in roomDict) {
    roomArr.push(roomDict[key]);
  }
  return roomArr;
};

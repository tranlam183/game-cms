// import React, { createContext, useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import { SOCKET_URL } from "constant";

// type SocketProviderProps = {
//   children: React.ReactNode;
// };

// export interface SocketState {
//   socket: Socket | null;
// }

// const initialState: SocketState = {
//   socket: null,
// };

// export const SocketContext = createContext(initialState);

// const socketIo = io(SOCKET_URL, {
//   transports: ["websocket", "polling"],
//   withCredentials: true,
// });

// const SocketProvider = (props: SocketProviderProps) => {
//   const { children } = props;
//   const { current: socket } = useRef(socketIo);

//   useEffect(() => {
//     if (!socket) return;

//     if (!socket?.connected) {
//       socket.connect();
//     }

//     return () => {
//       socket.removeAllListeners();
//       socket.close();
//     };
//   }, [socket]);

//   return (
//     <SocketContext.Provider
//       value={{
//         socket,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;

export default function SocketProvider() {
  return null;
}

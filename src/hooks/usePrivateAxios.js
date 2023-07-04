// import { PrivateApi } from "../api/axios";
// import { useEffect } from "react";

// function usePrivateAxios() {

//   useEffect(() => {
//     const accessToken = localStorage.getItem('access_token');

//     if (accessToken){

//       PrivateApi.interceptors.request.use((request) => {
//         console.log("intercepter request", accessToken);
//         request.headers.Authorization = `Bearer ${accessToken}`;
//         return request;
//       });
//     }

//     PrivateApi.interceptors.response.use((response) => {
//       console.log("intercepter response", "fshbgvjfsbv");
//       return response;
//     });

//   }, []);

//   return PrivateApi;
// }

// export default usePrivateAxios;

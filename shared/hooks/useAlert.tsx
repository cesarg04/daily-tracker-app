// import { useEffect } from "react";
// import CustomAlertTemplate, {
//   ICustomAlertProps,
// } from "../components/alert/CustomAlertTemplate";
// import useModal from "./useModal";

// const useAlert = () => {
//   const { modal, onClose, onConfirm } = useModal();

//   const alert = (props: ICustomAlertProps) => {
//     return modal({
//       template: (
//         <CustomAlertTemplate
//           {...props}
//           onClose={onClose}
//           onConfirm={onConfirm}
//         />
//       ),
//       options: {
//         style: {
//           minHeight: 220,
//         },
//       },
//     });
//   };

//   useEffect(() => {}, []);

//   return {
//     alert,
//   };
// };

// export default useAlert;
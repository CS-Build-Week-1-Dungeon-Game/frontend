import { toast } from "react-toastify";
import { requestWithAuth } from "./api-config";

export const loginOrRegister = (path, body, history) => {
  requestWithAuth()
    .post(`${path}`, body)
    .then(res => {
      const token = res.data.key;
      localStorage.setItem("token", `Token ${token}`);
      history.push("/world");
    })
    .catch(err => {
      console.log(err);
      if (err.response && err.response.data) {
        for (let key of Object.keys(err.response.data)) {
          toast.error(`${key}: ${err.response.data[key]}`);
        }
      } else {
        console.error(err);
        toast.error(`Something went wrong, please try again later`);
      }
    });
};

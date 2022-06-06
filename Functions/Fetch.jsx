import apiUrl from '../Routes/Url'
import axios from "axios";


export const Fetch = (url, method) =>
  new Promise((resolve, reject) => {
    fetch(apiUrl + url, {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .then(res => {
        if (res && res.status == 200|| res.status === 201) {
          resolve(res.json());
        } else {
          throw new Error(res.status)
        }
      })
      .catch(err => {
        console.log("url=>", apiUrl + url)
        console.log("method=>", method)
        console.log("status=>", err)
        reject("status code: " + err);
      });
  })

export const Axios = (url, method, body) =>
  new Promise((resolve, reject) => {
    const configurationObject = {
      url: apiUrl+url,
      method: method,
      data: body
    }
   
    axios(configurationObject)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve(response);
        } 
        else {
          throw new Error(response);
        }
      })
      .catch((error) => {
        console.log("body=>",body);
        console.log("url=>", apiUrl + url)
        console.log("method=>", method)
        reject(error.response.status);
      });
  })
  export const AxiosOutSystem = (url, method, body) =>
  new Promise((resolve, reject) => {
    const configurationObject = {
      url: url,
      method: method,
      data: body
    }
   
    axios(configurationObject)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve(response);
        } 
        else {
          throw new Error(response);
        }
      })
      .catch((error) => {
        console.log("body=>",body);
        console.log("url=>", apiUrl + url)
        console.log("method=>", method)
        reject(error.response.status);
      });
  })


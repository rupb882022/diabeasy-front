import apiUrl from '../Routes/Url'


export const Fetch=(url, method)=> 
  new Promise((resolve, reject) => {
    fetch(apiUrl + url, {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .then(res => {
        if (res && res.status == 200) {
          resolve(res.json());
      } else {
         throw new Error(res.status)
      }
      })
      .catch(err => {
        console.log("url=>", apiUrl + url)
        console.log("method=>", method)
        console.log("status=>",err )
        reject("status code: "+err);
      });
  })


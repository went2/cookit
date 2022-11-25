import { TIMEOUT_SEC } from "./config";

const timeout = function(s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request failed. Timeout after ${s} seconds`));
    }, s * 1000);
  })
}

export const request = async function (url, postData = undefined) {
  try {
    const fetchPro = postData 
      ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
      : fetch(url);

      const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
      const data = await res.json();

      if(!res.ok) {
        throw new Error(`${data.message} (${res.status})`);
      }
      return data;
  } catch(err) {
    throw err;
  }
}
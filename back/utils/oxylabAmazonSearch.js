import https from 'https';

// const username = "xchange_YxWlB";
// const password = "Xchangetechs+2024";

const username='anub0709_vdKmy'
const password='BheemaniAnurag_27'

const body = {
    source: "amazon_search",
    query: " ",
    domain: "in",
    geo_location: "500001",
    parse: true,
  };
  
  export const fetchDataFromOxylabs = (query,source) => {
    const searchBody = { ...body, query, source };
    console.log(searchBody);
    const options = {
      hostname: "realtime.oxylabs.io",
      path: "/v1/queries",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      },
    };
  
    return new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = "";
  
        response.on("data", (chunk) => {
          data += chunk;
        });
  
        response.on("end", () => {
          try {
            const responseData = JSON.parse(data);
            if (
              responseData.results &&
              responseData.results[0] &&
              responseData.results[0].content &&
              ((source === "amazon_search" && responseData.results[0].content.results && responseData.results[0].content.results.organic) ||
               (source === "amazon_product" && responseData.results[0].content))
            ) {
              if (source === "amazon_search") {
                resolve(responseData.results[0].content.results.organic);
              } else if (source === "amazon_product") {
                resolve(responseData.results[0].content);
              }
            } else {
              reject(`Unexpected API response structure: ${JSON.stringify(responseData, null, 2)}`);

            }            
          } catch (error) {
            reject("Error parsing the response data");
          }
        });
      });
  
      request.on("error", (error) => {
        reject(`Request error: ${error.message}`);
      });
  
      request.write(JSON.stringify(searchBody));
      request.end();
    });
  };
  




  // export const fetchDataFromOxylabs = (query, source) => {
  //   const searchBody = { ...body, query, source };
  //   console.log("Request Body:", JSON.stringify(searchBody, null, 2));
  
  //   const options = {
  //     hostname: "realtime.oxylabs.io",
  //     path: "/v1/queries",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
  //     },
  //   };
  
  //   return new Promise((resolve, reject) => {
  //     const request = https.request(options, (response) => {
  //       let data = "";
  
  //       response.on("data", (chunk) => {
  //         data += chunk;
  //       });
  
  //       response.on("end", () => {
  //         try {
  //           const responseData = JSON.parse(data);
  //           console.log("Response Data:", JSON.stringify(responseData, null, 2));
  
  //           if (
  //             responseData.results &&
  //             responseData.results[0] &&
  //             responseData.results[0].content
  //           ) {
  //             resolve(responseData.results[0].content.organic); // Adjusted to resolve `content` directly
  //           } else {
  //             reject(`Unexpected API response structure: ${JSON.stringify(responseData, null, 2)}`);
  //           }
  //         } catch (error) {
  //           reject("Error parsing the response data: " + error.message);
  //         }
  //       });
  //     });
  
  //     request.on("error", (error) => {
  //       reject(`Request error: ${error.message}`);
  //     });
  
  //     request.write(JSON.stringify(searchBody));
  //     request.end();
  //   });
  // };
  




// app.get('/results', async (req, res) => {
//   const { query } = req.query;

//   if (!query) {
//     return res.status(400).send("Query parameter is required");
//   }

//   try {
//     const results = await fetchDataFromOxylabs(query);
//     res.json({ results });
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     res.status(500).json({ error: "Failed to fetch data", details: err });
//   }
// });



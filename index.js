/* 
    Bonus Challenge 

    Fetch the list of 642 open APIs from
        https://api.publicapis.org/entries
        
    Create a my-api component
        display the name and category of the API,
        the description, and also display the type 
        of Auth (if any) and whether or not the API 
        supports HTTPS
    
    Use CSS Grid to style my-api
        The title and category should be 
        listed as Title (Category) 
        and should link to the API docs
        
    The grid should have 4 rows
        3rem, 1rem, 4rem, 3rem respectively
        and 3 columns each 1/3rd of available width
        
    Finally, display all of the APIs
*/

async function getAPIs() {
  const url = "https://api.publicapis.org/entries";
  const apiRequest = await fetch(url);
  const data = await apiRequest.json();
  return data;
}

function getAPIhtml(myAPI) {
  let { API, Description, Auth, HTTPS, Cors, Link, Category } = myAPI;
  let httpsElem = `<span class="https">${HTTPS}</span>;`;
  let authElem = `<span>${Auth}</span>`;
  let corsElem = `<span class="cors">${Cors}</span>`;

  if (!Description) {
    Description =
      "No description provided. Click API name for more information.";
  }

  if (!Auth) {
    Auth = "N/A";
    authElem = `<span class="auth notavail">${Auth}</span>;`;
  }

  if (!HTTPS) {
    HTTPS = "N/A";
    httpsElem = `<span class="https notavail">${HTTPS}</span>`;
  } else {
    HTTPS = "Available";
    httpsElem = `<span class="https available">${HTTPS}</span>`;
  }
  if (!Cors || Cors === "unknown" || Cors === "no") {
    Cors = "N/A";
    corsElem = `<span class="cors notavail">${Cors}</span>`;
  } else {
    corsElem = `<span class="cors available">${Cors}</span>`;
  }
  if (!Category) {
    Category = "";
  }

  const component = `
        <div class="api">
            <h4 class="name"><a class="link" href=${Link} target="_blank">${API}<br><span class="category">${Category}</span></a></h4>
            <p>Description: <br><span>${Description}</span></pDescription:>
            <p>Auth: ${authElem}</p>
            <p>HTTPS: ${httpsElem}</p>
            <p>CORS: ${corsElem}</p>
        </div>`;

  return component;
}

// displays first 100 apis.
function displayAPIs(myAPIs) {
  const app = document.createElement("div");
  app.id = "app";
  app.classList.add("app-grid");
  document.body.prepend(app);

  const { entries } = myAPIs;
  entries.slice(0, 200).forEach((item) => {
    app.innerHTML += getAPIhtml(item);
  });
}

getAPIs()
  .then((data) => displayAPIs(data))
  .catch((e) => console.log(`Error: ${e}`));

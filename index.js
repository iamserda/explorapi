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
  const { entries } = data;

  entries.sort((api1, api2) => {
    var apiName1 = api1.API.toUpperCase();
    var apiName2 = api2.API.toUpperCase();

    // order remains unchanged.
    if (apiName1 < apiName2) {
      return -1;
    }
    // sorts api2 before api1. changed.
    if (apiName1 > apiName2) {
      return 1;
    }

    // names must be equal, remain unchanged.
    return 0;
  });

  // returning a sorted array of objects.
  return entries;
}

function getAPIhtml(myAPI, idNum) {
  let { API, Description, Auth, HTTPS, Cors, Link, Category } = myAPI;
  let httpsElem = `<span class="https">${HTTPS}</span>;`;
  let authElem = `<span>${Auth}</span>`;
  let corsElem = `<span class="cors">${Cors}</span>`;

  if (!Description) {
    Description = `No description provided. 
      Click API name for more information.`;
  }

  if (!Auth) {
    Auth = "👎🏿 N/A";
    authElem = `<span class="auth notavail">${Auth}</span>`;
  } else {
    authElem = `<span class="auth available">👍🏾 ${Auth}</span>`;
  }

  if (!HTTPS) {
    HTTPS = "👎🏿 N/A";
    httpsElem = `<span class="https notavail">${HTTPS}</span>`;
  } else {
    HTTPS = "Available";
    httpsElem = `<span class="https available">👍🏾 ${HTTPS}</span>`;
  }
  if (!Cors || Cors === "unknown" || Cors === "no") {
    Cors = "👎🏿 N/A";
    corsElem = `<span class="cors notavail">${Cors}</span>`;
  } else {
    corsElem = `<span class="cors available">👍🏿 ${Cors}</span>`;
  }

  if (!Category) {
    Category = "";
  }

  const component = `
      <div class="api">
          <h4 class="name">
            <a class="link" href=${Link} target="_blank">${API}
            <br><span class="category">${Category}</span></a></h4>

          <p class="description">${Description}</p>
          
          <p class="auth">Auth: ${authElem}</p>
          <p class="https">HTTPS: ${httpsElem}</p>
          <p class="cors">CORS: ${corsElem}</p>
          <p class="counter"><span>${idNum}</span></p>
      </div>`;

  return component;
}

function appHeader() {
  const header = `
    <header class="header container">
      <a href="/" 
          target="_blank" class="brand">explorAPI</a>
      <nav class="nav">
        <ul class="container">
          <li class="nav-links"><a href="/">home</a></li>
          <li class="nav-links"><a href="https://github.com/iamserda/publicapis" target="_blank">onGH</a></li>
          <li class="nav-links"><a href="https://api.publicapis.org" target="_blank">PublicAPIs.org</a></li>
          <li class="nav-links"><a href="https://iamserda.com" target="_blank">iamserda</a></li>
        </ul>
      </nav>
    </header>
  `;

  return header;
}

function appFooter() {
  // using HTML inside of JS is awful. I know.
  // Creating DOM elements in JS can become unrully, so I do this.
  const footer = `
  <footer class="footer">
      <p>Visit the project's repo 
          <a href="https://github.com/davemachado/public-api">here</a></p>
      <p>Many thanks to <a href="https://github.com/davemachado" target="_blank">Dave Machado</a> and the contributers at: <a href="https://api.publicapis.org" 
          target="_blank">publicapis.org</a></p>
      <p> Made with ❤️ in Inwood, NYC. 🇭🇹</p>
  </footer>
  `;

  return footer;
}
function newSearchBar() {
  const search = document.createElement("input");
  search.id = "searchBar";
  search.className.add("search");
  return search;
}
// displays all object within the myAPIs array.
// this could be decoupled further.
function displayAPIs(entries) {
  let counter = 0;
  const root = document.getElementById("root");

  const app = document.createElement("div");
  let components = "";

  app.id = "app";
  app.classList.add("app-grid");

  //adding a header to app
  root.innerHTML += appHeader();
  root.appendChild(app);
  document
    .getElementsByTagName("header")
    .item(0)
    .insertAdjacentElement("afterend", app);

  entries.forEach((item) => {
    // to limit strain on the browser and DOM rendering
    // I have accumlated the components here.
    // Below, I will make a single DOM insertion.
    // console.log(item, ++counter);
    components += getAPIhtml(item, ++counter);
  });

  app.innerHTML += components;
  root.innerHTML += appFooter();
}

getAPIs()
  .then((data) => displayAPIs(data))
  .catch((e) => console.log(`Error: ${e}`));

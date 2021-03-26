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

// ()();

function getAPIhtml(myAPI) {
    const { API, Description, Auth,
        HTTPS, Cors, Link, Category } = myAPI;

    const component = `
        <div class="api">
            <h4 class="name"><a href=${ Link }>${ API }(<span class="category">${ Category }</span>)</a></h4>
            <p  class="description">Description: ${ Description }</p>
            
            <p  class="auth">Auth: ${ Auth }</p>
            <p  class="https">HTTPS: ${ HTTPS }</p>
            <p  class="cors">CORS: ${ Cors }</p>
        </div>`;

    return component;
}

function displayAPIs(myAPIs) {
    const app = document.createElement('div');
    app.id = "app";
    app.classList.add("app-grid");
    document.body.prepend(app);

    const { entries } = myAPIs;
    entries.slice(0, 25).forEach(
        item => {
            const component = getAPIhtml(item);
            app.innerHTML += component;
        }
    );

}

getAPIs()
    .then(data => { displayAPIs(data); })
    .catch(e => console.log(`Error: ${ e }`));
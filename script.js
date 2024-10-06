
let currentPage = 1; //from the first page
let limit = 6; //Loads per post

function fetchPosts() {
    //API call
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
            throw new Error("Error with status: " + response.status);   //error message if not successfull
        } 
        return response.json(); //concenrting to json-fomrat
    })
    .then((posts) => {
        let postContainer = document.getElementById("post-place");  //get the container
        let i = 1;
            posts.forEach((post) => {   //looping for each post in a for-loop
                const postElement = document.createElement("div");
                postElement.setAttribute("class", "box");
                
                const title = document.createElement("h3"); //set the title
                title.textContent = post.title;

                const body = document.createElement("p"); //set the body   
                body.textContent = post.body;
                
                //appending the title and body to the element
                postElement.appendChild(title);
                postElement.appendChild(body);
                postContainer.appendChild(postElement);
                //every thrid post for ensuring layout
            if (i % 3 == 0) {
                const clearfix = document.createElement("div");
                clearfix.setAttribute("class", "clearfix");
                postContainer.appendChild(clearfix);
            }
            i++;
        });
    })
    .catch((error) => {
        console.error("error: ", error);        //error handling for the fetch process
    });
}

//function for updates when user is scrolling down
function detectScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentPage++;  //increment to load more posts
        fetchPosts();
    }
}

//fetching the post when page is loaded
fetchPosts();

//event listener to detect when the user scrolls
window.addEventListener("scroll", detectScroll);

// global variables
const apiKey = "?api_key=9e553170-e229-4c48-875b-c54e2903e717";
// const comments = [
//     {
//         "name": "Connor Walton",
//         "time": "02/17/2021",
//         "text": "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//     },
//     {
//         "name": "Emilie Beach",
//         "time": "01/09/2021",
//         "text": "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
//     },
//     {
//         "name": "Miles Acosta",
//         "time": "12/20/2020",
//         "text": "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
//     }
// ];

// functions
const createElement = (type) => (classes) => {
    let newElement = document.createElement(type);
    if (classes === ""){
        return newElement;
    }
    if (typeof classes === "object"){
        newElement.classList.add(...classes);
    } else {
        newElement.classList.add(classes)
    }
    return newElement;
  };

const createDiv = createElement("div");
const createParagraph = createElement("p");

// displays single comment
const displaySingleComment = (newComment) => {
    const commentBlock = createDiv("comments__block");
        allComments.appendChild(commentBlock);
        
        const avatar = createDiv(["comments__avatar", "comments__avatar--empty"]);
        commentBlock.appendChild(avatar);
        
        const comment = createDiv("comments__comment");
        commentBlock.appendChild(comment);
    
        const name = createDiv("comments__comment-name");
        name.innerText = newComment["name"];
        const time = createDiv( "comments__comment-time");
        const timeStamp = newComment["time"];
        time.innerText = timeStampToTime(timeStamp);
        const text = createParagraph("comments__comment-text");
        text.innerText = newComment["text"];
        comment.append(name, time, text);
    
        const divider = document.createElement("hr");
        divider.classList.add("comments__divider");
        allComments.appendChild(divider);
}

// add and display a new comment
const displayComment = (newComment)=>{
    comments.unshift(newComment);
    displayAllComments(comments);
};

// display all comments
const displayAllComments = (comments) => {
    comments.sort(compare);
    comments.forEach((comment)=>{
        displaySingleComment(comment);
    });
}

// get comments from API
const getComments = (url, comments) => {
    axios.get(url)
    .then(response => {
        response.data.forEach(item => {
            let newComment = {
                name: item.name,
                time: item.timestamp,
                text: item.comment
            };
            console.log(item);
            comments.push(newComment);
        });
    })
    .then(()=>displayAllComments(comments))
    .catch(error => console.error(error));
};

// post comment to server
const postComment = (url, newComment, comments) => {
    axios.post(url, newComment)
    .then(response => {
        let comment = {
            name: response.data.name,
            time: response.data.timestamp,
            text: response.data.comment
        };
        comments.unshift(comment);
    })
    .then(()=>displayAllComments(comments))
    .catch(error => console.error(error));
};

// delete comment by id
const deleteComment = (url, id, key) => {
    axios.delete(url+'/'+id+key)
    .then((response => console.log(response)))
    .catch(error => console.error(error));
};

// compare comment by time
const compare = ( a, b ) => {
    if ( a.time > b.time ){
      return -1;
    }
    if ( a.time < b.time ){
      return 1;
    }
    return 0;
  };

// get time from timestamp
const timeStampToTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const time = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    return time;
};

// main

// read comments from API
const comments = [];
const urlNoKey = "https://project-1-api.herokuapp.com/comments";
const url = urlNoKey + apiKey;
getComments(url, comments);


const commentSection = document.querySelector(".comments");
const allComments = createDiv("comments__all");
commentSection.appendChild(allComments);

// read in a new comment from the page
const form = document.querySelector(".comments__form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    document.querySelector(".comments__all").innerHTML = "";
    const name = event.target.name.value;
    const text = event.target.comment.value;
    let newComment = {
        "name": name,
        "comment": text
    };
    postComment(url, newComment, comments);
    form.reset();
});



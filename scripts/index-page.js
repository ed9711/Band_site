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

const apiKey = "?api_key=9e553170-e229-4c48-875b-c54e2903e717";
const comments = [];
const urlNoKey = "https://project-1-api.herokuapp.com/comments";
const url = urlNoKey + apiKey;

// read comments from API
getComments(url, comments);

const commentSection = document.querySelector(".comments");
const allComments = createDiv("comments__all");
commentSection.appendChild(allComments);

// post comment to server
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



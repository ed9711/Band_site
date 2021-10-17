const comments = [
    {
        "name": "Connor Walton",
        "time": "02/17/2021",
        "text": "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    },
    {
        "name": "Emilie Beach",
        "time": "01/09/2021",
        "text": "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        "name": "Miles Acosta",
        "time": "12/20/2020",
        "text": "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

const createElement = (type, classes) => {
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

const displayComments = (comments) => {
    comments.forEach((item)=>{
        const commentBlock = createElement("div", "comments__block");
        allComments.appendChild(commentBlock);
        
        const avatar = createElement("div", "comments__avatar");
        avatar.style["background-image"] = "none";
        allComments.appendChild(avatar);
        
        const comment = createElement("div", "comments__comment");
        allComments.appendChild(comment);
    
        const name = createElement("div", "comments__comment-name");
        name.innerText = item["name"];
        const time = createElement("div", "comments__comment-time");
        time.innerText = item["time"];
        const text = createElement("p", ["comments__comment-text", "asdf"]);
        text.innerText = item["text"];
        comment.append(name, time, text);
    
        const divider = document.createElement("hr");
        divider.classList.add("comments__divider");
        allComments.appendChild(divider);
    });
};

const commentSection = document.querySelector(".comments");
const allComments = createElement("div", "comments__all");
commentSection.appendChild(allComments);

displayComments(comments);

const displayComment = (newComment)=>{
    comments.unshift(newComment);
    displayComments(comments);
};

const form = document.querySelector(".comments__form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    document.querySelector(".comments__all").innerHTML = "";
    const name = event.target.name.value;
    const text = event.target.comment.value;
    const date = new Date();
    const time = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    let newComment = {
        name: name,
        time: time,
        text: text
    };
    displayComment(newComment);
    document.getElementById('form').reset();
});



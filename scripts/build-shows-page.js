// functions
// create element
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

// create show block
const createSubBlock = (key, show, block)=>{
    const date = createDiv(["shows__detail", "shows__detail--coloured", "shows__detail--delete"]);
    date.innerText = key;
    const time = createDiv(["shows__detail", "shows__detail--bold"]);
    if (key === "DATE") {
        time.innerText = timeStampToTime(show[key]);
    } else {
        time.innerText = show[key];
    }
    block.append(date, time);
};

// create table table
const mobileTable = (info)=>{
    info.forEach((show)=>{
        const block = createDiv("shows__block");
        superBlock.appendChild(block);
        const subblock = createDiv("shows__subblock");
        const subblock1 = createDiv("shows__subblock");
        const subblock2 = createDiv("shows__subblock");
        block.append(subblock, subblock1, subblock2);
    
        createSubBlock("DATE", show, subblock);
        createSubBlock("VENUE", show, subblock1);
        createSubBlock("LOCATION", show, subblock2);
    
        const button = createButton("shows__button");
        block.appendChild(button);
        button.innerText = "BUY TICKETS";
    });
}

// secondary title block
const createSubTitle = ()=>{
    const subTitleBlock = createDiv("shows__subtitle");
    superBlock.prepend(subTitleBlock);
    const subTitle = createDiv(["shows__detail", "shows__detail--coloured"]);
    subTitle.innerText = "DATE";
    subTitleBlock.appendChild(subTitle);
    const subTitle1 = createDiv(["shows__detail", "shows__detail--coloured"]);
    subTitle1.innerText = "VENUE";
    subTitleBlock.appendChild(subTitle1);
    const subTitle2 = createDiv(["shows__detail", "shows__detail--coloured"]);
    subTitle2.innerText = "LOCATION";
    subTitleBlock.appendChild(subTitle2);
    const button = createButton(["shows__button", "shows__button--hidden"]);
    subTitleBlock.appendChild(button);
    button.innerText = "BUY TICKETS";
};

// react to change in screen sizes
const watchSize = () => {
    const tablet = window.matchMedia("(min-width: 768px)");
    mediaQ(tablet);
    tablet.addEventListener("change", (e)=>mediaQ(tablet));
};

const mediaQ = (size)=>{
    if (size.matches){
        createSubTitle();
    } else {
        const element = document.getElementsByClassName("shows__subtitle");
        if (element.length !== 0) {
            element[0].remove();
        }
    }
};

// change active colour
const activeColour = () => {
    document.querySelectorAll(".shows__block").forEach((block)=>{
        block.addEventListener("click", (e)=>{
            const elements = document.getElementsByClassName("shows__block--active");
            for (let i=0; i<elements.length; i++){
                if (elements[i] != block){
                    elements[i].classList.remove("shows__block--active");
                }
            }
            block.classList.toggle("shows__block--active");
        });
    });
};

// get shows data from API
const getShowdates = (url, info) => {
    axios.get(url)
    .then(response => {
        response.data.forEach(item => {
            let newInfo = {
                DATE: parseInt(item.date),
                VENUE: item.place,
                LOCATION: item.location
            };
            info.push(newInfo);
        });
    })
    .then(()=>{
        mobileTable(info);
        watchSize();
        activeColour();
    })
    .catch(error => console.error(error));
};

// get time from timestamp
const timeStampToTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const time = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    return time;
};

const createDiv = createElement("div");
const createButton = createElement("button");

const superBlock = createDiv("shows__superblock");
const shows = document.querySelector(".shows");
shows.appendChild(superBlock);
const apiKey = "?api_key=9e553170-e229-4c48-875b-c54e2903e717";
const urlNoKey = "https://project-1-api.herokuapp.com/showdates";
const url = urlNoKey + apiKey;
const info = []

getShowdates(url, info);



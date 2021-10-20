const apiKey = "?api_key=9e553170-e229-4c48-875b-c54e2903e717";
const info = [
    {
        "DATE": "Mon Sept 06 2021",
        "VENUE": "Ronald Lane",
        "LOCATION": "San Francisco, CA"
    },
    {
        "DATE": "Tue Sept 21 2021",
        "VENUE": "Pier 3 East",
        "LOCATION": "San Francisco, CA"
    },
    {
        "DATE": "Fri Oct 15 2021",
        "VENUE": "View Lounge",
        "LOCATION": "San Francisco, CA"
    },
    {
        "DATE": "Sat Nov 06 2021",
        "VENUE": "Hyatt Agency",
        "LOCATION": "San Francisco, CA"
    },
    {
        "DATE": "Fri Nov 26 2021",
        "VENUE": "Moscow Center",
        "LOCATION": "San Francisco, CA"
    },
    {
        "DATE": "Wed Dec 15 2021",
        "VENUE": "Press Club",
        "LOCATION": "San Francisco, CA"
    },
]

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

const createSubBlock = (key, show, block)=>{
    const date = createDiv(["shows__detail", "shows__detail--coloured", "shows__detail--delete"]);
    date.innerText = key;
    const time = createDiv(["shows__detail", "shows__detail--bold"]);
    time.innerText = show[key];
    block.append(date, time);
};

const createDiv = createElement("div");
const createButton = createElement("button");

const superBlock = createDiv("shows__superblock");
const shows = document.querySelector(".shows");
shows.appendChild(superBlock);

const mobileTable = ()=>{
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

const mediaQ = (size)=>{
    if (size.matches){
        createSubTitle();
    } else {
        superBlock.innerText = "";
        mobileTable();
    }
};
mobileTable();
const tablet = window.matchMedia("(min-width: 768px)");
mediaQ(tablet);
tablet.addEventListener("change", (e)=>mediaQ(tablet));

document.querySelectorAll(".shows__block").forEach((block)=>{
    block.addEventListener("click", (e)=>{
        const html = document.querySelector("html");
        const elements = document.getElementsByClassName("shows__block--active");
        for (let i=0; i<elements.length; i++){
            if (elements[i] != block){
                elements[i].classList.remove("shows__block--active");
            }
        }
        block.classList.toggle("shows__block--active");

    });
});

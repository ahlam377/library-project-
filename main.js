const books = [
  {
    title: "Code Complete",
    author: "Steve McConnell",
    image: "./img/code-complete.jpg",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    image: "./img/clean-code.jpg",
  },
  {
    title: "Working Effectively with Legacy Code",
    author: "Michael Feathers",
    image: "./img/legacy-code.jpg",
  },
  {
    title: "Writing Secure Code",
    author: "Michael Howard & David LeBlanc",
    image: "./img/secure-code.jpg",
  },
  {
    title: "Head First Design Patterns",
    author: "Eric Freeman & Bert Bates & Kathy Sierra & Elisabeth Robson",
    image: "./img/head-first-design-patterns.jpg",
  },
  {
    title: "Introduction To Algorithms",
    author:
      "Thomas H. Cormen & Charles E. Leiserson & Ronald L. Rivest & Clifford Stein",
    image: "./img/introduction-to-algorithms.jpg",
  },
  {
    title: "The Algorithm Design Manual",
    author: "Steven S Skiena",
    image: "./img/the-algorithm-desgin-manual.jpg",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    image: "./img/eloquent-javascript.jpg",
  },
  {
    title: "You Don`t Know JS",
    author: "Steve Kyle Simpson",
    image: "./img/you-don't-know-javascript.jpg",
  },
  {
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    image: "./img/learning-javascript-design-patterns.jpg",
  },
];

const myContainer = document.getElementById("container");
const myForm = document.getElementById("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const link = document.getElementById("link");
const formContainer = document.getElementById("formContainer");
const showFormBtn = document.getElementById("showFormBtn");
const hideFormBtn =document.getElementById("hideFormBtn");
const autoHide=document.getElementById("autoHide")

hideFormBtn.addEventListener("click",showHideFormToggle)
showFormBtn.addEventListener("click", showHideFormToggle);


myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewBook();
  clearForm();
  clearContainer();
  createShelves(numOfRows, myContainer);
  putBooksInSheves(books, maxNumOfBooksPerShelve(numOfRows, books));
if(autoHide.checked) showHideFormToggle();
});


const numOfRows = 3;

function createShelves(num, container) {
  for (let i = 0; i < num; i++) {
    let temp = document.createElement("div");
    temp.className = "shelves";
    container.appendChild(temp);
  }
}

function maxNumOfBooksPerShelve(numOfSheves, booksDataArray) {
  return Math.ceil(booksDataArray.length / numOfSheves);
}

function putBooksInSheves(booksDataArray, maxNumOfBooksPerShelve) {
  let shelvesNodeArray = document.getElementsByClassName("shelves");
  const booksDataArrayCopy = [...booksDataArray];
  let nodeIndex = 0;
  while (booksDataArrayCopy.length > 0) {
    for (let i = 0; i < maxNumOfBooksPerShelve; i++) {
      if (booksDataArrayCopy.length > 0) {

        const tempFigure = document.createElement("figure");
        tempFigure.style.width=`${85/maxNumOfBooksPerShelve}vw`
        shelvesNodeArray[nodeIndex].appendChild(tempFigure);

        const tempBookImg= document.createElement("img");
        tempBookImg.src=booksDataArrayCopy[0].image;
        tempBookImg.alt="img not found";

        tempFigure.appendChild(tempBookImg)

        const tempFigCaption=document.createElement("figcaption");
        tempFigure.appendChild(tempFigCaption)

        tempBookImg.onload=function(){
          tempFigCaption.style.width=`${tempFigure.clientWidth-this.width}px`
        }
        const tempTitleArticle=document.createElement("article");

        tempFigCaption.appendChild(tempTitleArticle)

        const tempTitleStrong=document.createElement("p");
        tempTitleStrong.textContent=booksDataArrayCopy[0].title;
        tempTitleStrong.title=booksDataArrayCopy[0].title;
        tempTitleStrong.style.fontWeight="bold";
        tempTitleStrong.style.height="6em"
        tempTitleStrong.style.whiteSpace="normal"
        tempTitleArticle.appendChild(tempTitleStrong)

        const tempAuthorArticle=document.createElement("article");
        tempFigCaption.appendChild(tempAuthorArticle)

        const tempAuthorStrong=document.createElement("p");
        tempAuthorStrong.textContent="Author : ";
        tempAuthorStrong.title="Author : ";
        tempAuthorStrong.style.fontWeight="bold";

        tempAuthorArticle.appendChild(tempAuthorStrong)
        const tempAuthorSpan=document.createElement("p");
        tempAuthorSpan.textContent=booksDataArrayCopy[0].author;
        tempAuthorSpan.title=booksDataArrayCopy[0].author;
        tempAuthorArticle.appendChild(tempAuthorSpan)

        booksDataArrayCopy.shift();
      }
    }
    nodeIndex++;
  }
}

function addNewBook() {
  books.push({
    title: title.value,
    author: author.value,
    image: link.value,
  });
}

function clearForm() {
  title.value = "";
  author.value = "";
  link.value = "";
}
function clearContainer() {
  myContainer.innerHTML = "";
}

function showHideFormToggle(){
     formContainer.classList.toggle("hidden");
    showFormBtn.classList.toggle("hidden");
}

window.onload = () => {
  createShelves(numOfRows, myContainer);
  putBooksInSheves(books, maxNumOfBooksPerShelve(numOfRows, books));
};
window.onresize=()=>{
  clearContainer();
  createShelves(numOfRows, myContainer);
  putBooksInSheves(books, maxNumOfBooksPerShelve(numOfRows, books));
}
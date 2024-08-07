const url = new URLSearchParams(window.location.search)
const idCharacter = url.get("q")
const myGetFunctionID = async (id) => {
  try {
    const response = await fetch(
      `https://js-7259a-default-rtdb.firebaseio.com/${id}.json`
    );
    const result = await response.json();
    console.log(result);
    createCard(result);
  } catch (error) {
    console.log(error);
  }
};
myGetFunctionID(idCharacter)

const createCard = (postData) => {
  let {
    img,
    author,
    comentarios,
    date,
    hashtag,
    reacciones,
    relevant,
    title,
    avatar,
    timeread,
    key
  } = postData;
  hashtag = hashtag.split(" ");

  //Create aside for total comments, likes and relevancy   
  const mainContainer = document.querySelector("#mainContainer");
  const aside = document.createElement("div");
  aside.classList.add("aside");
  aside.innerHTML = `
   <div class="container-fluid d-flex justify-content-around mt-4">
            <div class="col-2 d-sm-none d-md-block" id="aside__fixed">
              <aside class="side-bar">
                <ul class="list-group d-flex align-items-center">
                  <li class="list-group-item">
                    <!-- <div class="art__heart"> -->
                     <a href=""><img src="./img/heart-svgrepo-com.svg" width="30" height="30" alt=""></a>
                     <p>${reacciones}</p>
                    <!-- </div> -->
                  </li>
                  <li class="list-group-item">
                    <div class="art__comment">
                      <img src="./img/comment-1-svgrepo-com.svg" width="30" height="30" alt="">
                      <p>${comentarios}</p>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="art__save">
                      <img src="./img/bookmark-svgrepo-com.svg" width="30" height="30" alt="">
                      <p>${relevant}</p>
                    </div>
                  </li>
                </ul>          
              </aside>
            </div>
        </div>
    `;
  //insert aside before cardContainer
  mainContainer.insertBefore(aside, mainContainer.querySelector("#allCards"));


  // Card container
  const cardsContainer = document.querySelector("#allCards");
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "rounded",
    "overflow-hidden",
    "border-light-subtle"
  );
  cardsContainer.appendChild(card);

  //Image
  const cardImage = document.createElement("img");
  cardImage.classList.add("w-100");
  //add style for image to fit the card
  cardImage.style.height = "280px";
  cardImage.style.objectFit = "cover";
  cardImage.src = img;
  cardImage.alt = "cardImage";
  card.appendChild(cardImage);

  //Card content
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-body", "p-3", "border-light-subtle");
  card.appendChild(cardContent);

  //First section
  const firstSection = document.createElement("div");
  firstSection.classList.add("d-flex", "align-items-center");
  cardContent.appendChild(firstSection);
  const cardUserImage = document.createElement("img");
  cardUserImage.classList.add("me-2", "rounded-circle");
  cardUserImage.src = avatar;
  cardUserImage.width = 32;
  cardUserImage.height = 32;
  firstSection.appendChild(cardUserImage);

  const cardUserContent = document.createElement("div");
  cardUserContent.classList.add("flex-grow-1", "ms-1", "mt-2");
  firstSection.appendChild(cardUserContent);

  const cardUserName = document.createElement("a");
  cardUserName.classList.add(
    "btn",
    "btn-ghost",
    "text-dark",
    "text-start",
    "p-1",
    "fs-m"
  );
  cardUserName.href = "";
  cardUserName.textContent = author;
  cardUserContent.appendChild(cardUserName);

  const cardDate = document.createElement("p");
  cardDate.classList.add(
    "fw-light",
    "fs-sm",
    "ms-1",
    "text-light-emphasis",
    "link-dark",
    "fecha"
  );
  cardDate.textContent = date;
  cardUserContent.appendChild(cardDate);

  //Middle content
  const middleContent = document.createElement("div");
  middleContent.classList.add("mt-3");
  cardContent.appendChild(middleContent);

  const titleCard = document.createElement("h3");
  const titleLink = document.createElement("a");
  const strong = document.createElement("strong");
  titleCard.classList.add("mb-0", "font-weight-bold");
  titleLink.classList.add(
    "text-decoration-none",
    "text-dark",
    "fw-bold",
    "link-title"
  );
  strong.textContent = title;
  titleLink.appendChild(strong);
  titleCard.appendChild(titleLink);
  middleContent.appendChild(titleCard);


  const tags = document.createElement("div");
  tags.classList.add("tags", "mt-2");
  middleContent.appendChild(tags);
  hashtag.forEach((tag) => {
    const tagLink = document.createElement("a");
    tagLink.classList.add("btn", "btn-border", "fs-m");
    tagLink.textContent = tag;
    tags.appendChild(tagLink);
  });

  const likesDiv = document.createElement("div");
  likesDiv.classList.add(
    "likes",
    "m-3",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  middleContent.appendChild(likesDiv);

  const reactions = document.createElement("a");
  reactions.classList.add(
    "btn",
    "btn-ghost",
    "fs-reactions",
    "d-flex",
    "gap-1"
  );
  reactions.textContent = `${reacciones} likes`;
  likesDiv.appendChild(reactions);

  const comments = document.createElement("a");
  comments.classList.add("btn", "btn-ghost", "fs-reactions");
  comments.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="crayons-icon">
      <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
      </path>
      </svg>
      ${comentarios} comments`;
  likesDiv.appendChild(comments);

  const readingTime = document.createElement("div");
  readingTime.id = "readingtime";
  readingTime.classList.add("d-flex", "align-items-center");
  likesDiv.appendChild(readingTime);

  const time = document.createElement("p");
  time.classList.add("fw-light", "fs-sm", "text-light-emphasis", "mb-0");
  time.textContent = `${timeread} min read`;
  readingTime.appendChild(time);

  //create comments
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments");
  cardContent.appendChild(commentsContainer);

  const commentsTitle = document.createElement("h4");
  commentsTitle.classList.add("fs-m", "fw-bold", "mt-3");
  commentsTitle.textContent = "Comments";
  commentsContainer.appendChild(commentsTitle);

  const commentsForm = document.createElement("form");
  commentsForm.classList.add("mt-3");
  commentsContainer.appendChild(commentsForm);

  const commentsInput = document.createElement("input");
  commentsInput.classList.add("form-control", "mb-2");
  commentsInput.type = "text";
  commentsInput.placeholder = "Write a comment...";
  commentsForm.appendChild(commentsInput);

  //existing comments

  const existingComments = document.createElement("div");
  existingComments.classList.add("existing-comments");
  commentsContainer.appendChild(existingComments);

  //Display comments on small containers 
  const fakeComments = [
    { user: "John Doe", comment: "Nice post   " },
    { user: "Jane Doe", comment: "Great post" },
    { user: "John Doe", comment: "Nice post   " },
  ];

  fakeComments.forEach((comment) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment", "d-flex", "mb-2");
    existingComments.appendChild(commentContainer);

    const commentUser = document.createElement("p");
    commentUser.classList.add("fw-bold", "me-2");
    commentUser.textContent = comment.user;
    commentContainer.appendChild(commentUser);

    const commentText = document.createElement("p");
    commentText.textContent = comment.comment;
    commentContainer.appendChild(commentText);
  });


};


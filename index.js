const thumbnail = document.querySelector(".thumbnail");
const named = document.querySelector(".name");
const navToggle = document.querySelector(".nav");
const buttonToggle = document.querySelector("button.bars");

const github_data = {
  token: "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",
};

const body = {
  query: `
  query { 
    user(login: "bonarhyme"){
    avatarUrl
    bioHTML
    login
    name
    websiteUrl
    twitterUsername
    location
        followers{
          totalCount
        }
        following{
          totalCount
        }
        status{
          emojiHTML
          message
        }
    repositories(first: 20, privacy: PUBLIC, affiliations: OWNER, ownerAffiliations: OWNER, isFork: false){
      nodes{
        name
        url
        description
        languages(last: 10){
          nodes{
            name
            color
            id
          }
        }
        homepageUrl
        forkCount
        pullRequests(last: 10){
          totalCount
        }
        updatedAt
      }
    }
    }
}
    `,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + github_data.token,
};

async function postData(url = "", body) {
  fetch(url, {
    method: "POST",
    referrerPolicy: "origin-when-cross-origin",
    headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      thumbnail.src = data.data.user.avatarUrl;
      named.innerText = data.data.user.login;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

postData(baseUrl, body);

buttonToggle.addEventListener("click", () => {
  navToggle.classList.toggle("toggle");
});

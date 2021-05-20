const thumbnail = document.querySelector(".thumbnail");
const named = document.querySelector(".name");
const navToggle = document.querySelector(".nav");
const buttonToggle = document.querySelector("button.bars");
const fullImage = document.querySelector(".full-image");
const avatar = document.querySelectorAll(".avatar");
const avatarText = document.querySelector(".avatar-text");
const statused = document.querySelector(".status");
const followersCount = document.querySelector(".followers-count");
const followingsCount = document.querySelector(".followings-count");
const starCount = document.querySelector(".stars-count");
const locationed = document.querySelector(".location");
const website = document.querySelector(".website");
const twitter = document.querySelector(".twitter");
const repoCount = document.querySelector(".repo-count");
const fullname = document.querySelector(".fullname");
const username = document.querySelector(".username");
const links = document.querySelectorAll(".links > *");

const github_data = {
  token: "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",
};

const body = {
  query: `
  query { 
    user(login: "bonarhyme"){
    avatarUrl
    bioHTML
    starredRepositories(first: 50){
      totalCount
    }
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
      const d = data.data.user;
      thumbnail.src = d.avatarUrl;
      named.innerText = d.login;
      fullImage.src = d.avatarUrl;
      avatar.forEach((ava) => {
        ava.innerHTML = d.status.emojiHTML.split(">")[2].split("<")[0];
      });
      avatarText.innerText = d.status.message;
      statused.innerHTML = d.bioHTML;
      followersCount.innerText = d.followers.totalCount;
      followingsCount.innerText = d.following.totalCount;
      starCount.textContent = d.starredRepositories.totalCount;
      repoCount.textContent = d.repositories.nodes.length;
      locationed.textContent = d.location;
      website.textContent = d.websiteUrl;
      twitter.textContent = d.twitterUsername;
      fullname.textContent = d.name;
      username.textContent = d.login;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

postData(baseUrl, body);

buttonToggle.addEventListener("click", () => {
  navToggle.classList.toggle("toggle");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    removeBorder();
    link.style.borderBottom = "2px solid red";
  });
});

function removeBorder() {
  links.forEach((link) => {
    link.style.borderBottom = "none";
  });
}

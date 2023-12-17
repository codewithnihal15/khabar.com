// API key and base URL for the News API
const API_KEY = "112c2710355749d9abb96f47c640c663";
const url = "https://newsapi.org/v2/everything?q=";

// Event listener to fetch news on page load
window.addEventListener("load", () => fetchNews("India"));

// Function to reload the page
function reload() {
  window.location.reload();
}

// Async function to fetch news data from the News API
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

// Function to bind news data to the HTML template
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  // Loop through each article and create news cards
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

// Function to fill data into a news card template
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  // Set data into news card elements
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  // Format and display the publication date
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} · ${date}`;

  // Open the news article in a new tab when the card is clicked
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// Variable to keep track of the currently selected navigation item
let curSelectedNav = null;

// Function to handle clicks on navigation items
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

// Event listeners for the search button
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

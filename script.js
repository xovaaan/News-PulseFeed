const api = "4b562f85a7c64ffd8553af59ad19e54c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () =>
  fetchNews("AI")
);

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${api}`);
    const data = await response.json();
    bindData(data.articles);
}

    function bindData(articles){
        const container = document.querySelector('.cards');
        const template = document.querySelector('#card-news');

        container.innerHTML= "";

        articles.forEach((article) => {
            if(!article.urlToImage) return;
            const clone = template.content.cloneNode(true);
            fillDataInCard(clone, article);
            container.appendChild(clone);
        });

    }

     function fillDataInCard(clone, article){
         const newsImg = clone.querySelector(".news-img");
         const newsTitle = clone.querySelector(".title");
        const newsDesc = clone.querySelector(".desc");
        const newsSource = clone.querySelector(".source");

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;
         const date = Date(article.publishedAt).toLocaleString("en-US",{
             timeZone : "Asia/Jakarta"
         });

       newsSource.innerHTML = `${article.source.name} . ${date}`;

       clone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
       });
     }

     let selected = null;
     function onNavItemClick(id){
        fetchNews(id);
        const navss = document.getElementById(id);
        selected?.classList.remove("active");
        selected = navss;
        selected.classList.add("active");
     }

     const searchBox = document.getElementById("search");
     const searchButton = document.getElementById("btn");

     searchButton.addEventListener("click" , () =>{
        const query = searchBox.value;
        if(!query) return;
        fetchNews(query);
        selected?.classList.remove("active");
        selected = null;
     });
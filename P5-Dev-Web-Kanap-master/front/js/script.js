

let meubleData = [] ;

const fetchMeuble =async () => {
    await fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((Promise) => {
        meubleData = Promise;
        console.log(meubleData);
    }); 
};

const meubleDisplay = async () => {
    await fetchMeuble();
      document.getElementById("items").innerHTML = meubleData.map(
       (meuble) => `
       <a href="./product.html?id=${meuble._id}">
       <article >
       <img  class="" src="${meuble.imageUrl}" alt="image de meuble ${meuble.name
       }" > 
       <h3 class="productName">${meuble.name.toUpperCase()}</h3>
       <p class="productDescription">${meuble.description}</p>
       </article>
       </a>
      
       `,
      
     )
     .join("");


};

meubleDisplay();
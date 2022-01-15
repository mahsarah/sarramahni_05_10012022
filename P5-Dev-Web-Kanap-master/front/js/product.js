const id = window.location.search.split("?id=").join("");
console.log(id);

let produitData = [];

const fetchProduit = async () => {
    await fetch(` http://localhost:3000/api/products/${id} `)
    .then((res) =>res.json())
    .then((Promise) => {
        produitData = Promise; 
     console.log(produitData);
    });
};

const produitDisplay = async () => {
   await fetchProduit();

   let productSection = document.querySelector(".item");

   let imgP = document.querySelector(".item__img");
    imgP.innerHTML = `<img src="${produitData.imageUrl}" alt="${produitData.altTxt}">`;

    let price = document.getElementById("price");
    price.innerText = produitData.price;

    let description = document.getElementById("description");
    description.innerText = produitData.description;

    let colorGroup = document.getElementById("colors");

    produitData.colors.forEach(color => {
        let option = document.createElement("option");
        option.value = color;
        option.innerText = color;
        colorGroup.append(option);
    });

};
function checkQuantityK(quantity) {
    return quantity > 0 && quantity < 100 && quantity != null ? true : false;  
}


ajoutPanier = () => {
    //sélectionner du  bouton dans le dom 
    let btn = document.getElementById("addToCart");
     //ecouter le bouton et envoyer dans le panier
    btn.addEventListener("click", (event) => {
        event.preventDefault(); //voir mdn
        console.log("test");
       
        //recupiration des valeurs du formulaire 
       

        // S'assurrer que le champs couleur et quantité soit remplit
        let qty = parseInt(document.getElementById("quantity").value,10);
        let color = document.getElementById("colors").value;
        
        console.log(qty, color);
          

        if(checkQuantityK(qty) && color) {
            console.log("Tout se passe ici");

            // Verifier que un pnaier existe dans le localStoarge
            let panier = JSON.parse(localStorage.getItem("panier"));
            
            console.log(panier);
            if(panier) { // le panier existe.
                // vERIFIEZ QUE LE PRODUIT EXISTE DÉJA DANS LE PANIER
                panier.forEach(produit => {
                    console.log(color);
                    if(produit.id == produitData._id) {
                        if( produit.color == color) {
                            // Augmenter la quantité du produit.
                            produit.qty += qty;
                        } else { // couleur n'est pas même
                           
                            produit = {
                                id: produitData._id,
                                name: produitData.name,
                                price: produitData.price*qty,
                                qty: qty,
                                color: color,
                                imageUrl: produitData.imageUrl,
                                altText: produitData.altTxt
                            };

                            panier.push(produit);
                        }
    
                    } else {
                        
                        let produit = {
                            id: produitData._id,
                            name: produitData.name,
                            price: produitData.price*qty,
                            qty: qty,
                            color: color,
                            imageUrl: produitData.imageUrl,
                            altText: produitData.altTxt
                        }
                        panier.push(produit);
                    }
                });

               //la trosformation en format json et l'envoyer dans la keys "produit" du localstorage
                localStorage.setItem("panier", JSON.stringify(panier));

            } else {
                // ici le panier n'existe pas.
                let panier = [];
                let produit = {
                    id: produitData._id,
                    name: produitData.name,
                    price:produitData.price*qty,
                    qty: qty,
                    color: color,
                    imageUrl: produitData.imageUrl,
                    altText: produitData.altTxt
                }
                panier.push(produit);
                localStorage.setItem("panier", JSON.stringify(panier));
            }

        } else {
            alert("Veillez Remplire Les Champs Couleurs et Quantités")
        }

    })
}
 

produitDisplay();
ajoutPanier();



//----------la gestion de panier -------



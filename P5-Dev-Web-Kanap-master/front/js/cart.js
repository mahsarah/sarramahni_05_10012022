let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);

//---------------affichage les produit de panier ------------

//sélectionner la classe ou je vais injecter le code html 

const positionElement3 = document.querySelector("#cart__items");

console.log(positionElement3);
if(panier === null ){
//si le panier est vide
 
 const panierVide = ``;
}else{
   //si le panier est pas vide :afficher les produit dans local storage
  let structeurProduitPnier = [];
   for(k=0 ; k < panier.length; k++ ){
    structeurProduitPnier = structeurProduitPnier + `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
       <div class="cart__item__img">
           <img src="${panier[k].imageUrl}" alt="${panier.name}">
        </div>
     <div class="cart__item__content">
        <div class="cart__item__content__description">
         <h2>${panier[k].name}</h2>
         <p>${panier[k].color}</p>
        <p>${panier[k].price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[k].qty}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
      </div>
 </article>
    `;
   }
    if( k === panier.length){
    positionElement3.innerHTML = structeurProduitPnier ;
   }
}

//---------Fin de affichage des produit dans panier--------
//gestion de bouton suprimer l'article

let btnsuprimer = document.querySelectorAll(".deleteItem");
console.log(btnsuprimer);


for(let l = 0; l <  btnsuprimer.length; l++){
  btnsuprimer[l].addEventListener("click" ,(event) => {
  event.preventDefault();
 //Selection de id du produit qui vas etre suprimer en cliquant sur le bouton 

 let id_selection_suprission = panier[l].id;
 console.log("id_selection_suprission");
 console.log(id_selection_suprission);
 //avec la methode filtre je sélectionne les element a garder et je suprime l'element ou le btn suppr a ete clique 
      panier = panier.filter(el => el.id !==  id_selection_suprission);
      console.log(panier);
      //envoi la variable dans le locale storage 
      //la trosformation en format json et l'envoyer dans la keys "produit" du localstorage
      localStorage.setItem("panier", JSON.stringify(panier));

      //alert pour avertir que le produit a été suprimer et chargement de la page 
      alert("ce produit a été suprimer");
      window.location.href = "cart.html";
  })

}
//---------la quantité de panier------------------
//Qauntité :afficher les quantité de structeur 

//-------------le montant total de panier----------- 
//declaration de la variable pour pouvoir ymettre les prix qui sont present dans le panier 

let prixTotalCalcul = [] ; 
totalPrice = document.querySelector("#totalPrice");
//aler chercher les prix dans le panier 
for(m = 0 ; m < panier.length; m++ ){
  let prixProduitPnier = panier[m].price;
  //metre les prix du panier dans la variable prixTotalCalcul 
  prixTotalCalcul.push( prixProduitPnier)
console.log( prixTotalCalcul);

}
//additionner les prix q'il yas dans le tableau de la variable "prixTotalCalcul" avec la methode reduce

const reducer = (accumulator,currentValue) => accumulator + currentValue ;
const prixTotal = prixTotalCalcul.reduce(reducer,0);
console.log(prixTotal);

//le code HTML du prix total a afficher
const affichagHTML = `
<span id="totalPrice">${prixTotal}</span>

`
document.getElementById("totalQuantity").innerText = panier.length;
//afficher le total
totalPrice.insertAdjacentHTML("beforeend",affichagHTML);


//-------------le Formulaire de commande------------------
const afficherFormulair = () => {
const positionElement4 = document .querySelector(".cart__order__form");

}

//selectioner du bouton envoyer le formulair 

const btnEnvoyerFormulaire = document.querySelector("#order");

//-------------addventlistener-----------
btnEnvoyerFormulaire.addEventListener("click", (e)=>{
  e.preventDefault();

  //les value de formulaire 
  class Formulaire{
    constructor(input){
   this.Prenom =  document.querySelector("#firstName").value;
   this.Nom = document.querySelector("#lastName").value;
   this.Adresse = document.querySelector("#address").value;
   this.Ville = document.querySelector("#city").value;
   this.Email = document.querySelector("#email").value ;
  // this.input = document.querySelector(`#${input}`).value ;

    }
  }

  //Appel de l'intance de classe Formulaire pour creer l'objet formulairValues

const formulairValues = new Formulaire("address"); 
console.log("formulairValues ");
console.log(formulairValues );

//--------------Gestion de validation de formulaire-------------------
const regExnmprvil = (value) => {
return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
}

const regEmail = (value) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}
const regAdress = (value) => {
  return /^[A-Za-z0-9\s]{5,50}$/.test(value);
}


function prenomControle(){
//Control de la validité de prenom
const leprenom = formulairValues.Prenom;
if(regExnmprvil(leprenom)){
  document.querySelector("#firstNameErrorMsg").textContent = "";
return true;
}else{
  document.querySelector("#firstNameErrorMsg").textContent = "veuillez remplire bien ce champs";
  alert("chifre et symbole ne sont pas autorisé\n Ne pas dépasser 20 caractèr ,minimum 3 caractères");
  return false;
}
};

function nomControle(){
  //Control de la validité de prenom
  const lenom = formulairValues.Nom;
  if(regExnmprvil(lenom)){
    document.querySelector("#lastNameErrorMsg").textContent = "";
  return true;
  }else{
    document.querySelector("#lastNameErrorMsg").textContent = "veuillez remplire bien ce champs";
    alert("chifre et symbole ne sont pas autorisé\n Ne pas dépasser 20 caractèr ,minimum 3 caractères");
    return false;
  }
 };

 
function villControle(){
  //Control de la validité de prenom
  const laville = formulairValues.Ville;
  if(regExnmprvil(laville)){
    document.querySelector("#cityErrorMsg").textContent = "";
  return true;
  }else{
    document.querySelector("#cityErrorMsg").textContent = "veuillez remplire bien ce champs";
    alert("chifre et symbole ne sont pas autorisé\n Ne pas dépasser 20 caractèr ,minimum 3 caractères");
    return false;
  }
 };


  
function EmailControle(){
  //Control de la validité de prenom
  const leEmail = formulairValues.Email;
  if(regEmail( leEmail)){
    document.querySelector("#emailErrorMsg").textContent = "";
  return true;
  }else{
    document.querySelector("#emailErrorMsg").textContent = "veuillez remplire bien ce champs";
    alert("chifre et symbole ne sont pas autorisé\n Ne pas dépasser 20 caractèr ,minimum 3 caractères");
    return false;
  }
 };

  
function AdressControle(){
  //Control de la validité de prenom
  const ladress = formulairValues.Adresse;
  if(regAdress(ladress )){
    document.querySelector("#addressErrorMsg").textContent = "";
  return true;
  }else{
    document.querySelector("#addressErrorMsg").textContent = "veuillez remplire bien ce champs";
    alert("chifre et symbole ne sont pas autorisé\n Ne pas dépasser 50 caractèr ,minimum 5 caractères");
    return false;
  }
 };

let form = null
//------------Fin Gestion de validation de formulaire-----------------
if( prenomControle() && nomControle() && villControle() && EmailControle() && AdressControle() ){
//metre formulair objet "formulairValues" dans le local storage 
form = {
  firstName:  document.querySelector("#firstName").value,
  lastName: document.querySelector("#lastName").value,
  address: document.querySelector("#address").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value ,
   };
   console.log(form)
localStorage.setItem("formulairValues",JSON.stringify(form));

//envoyerverserveur(envoyer);
}else{
  alert("Veuillez bien remplire le formulaire");
}
/*
let listId = panier.map(produit => produit.id);
console.log(listId);*/
//metre les values du formulaire et mettre les produits sélectionnés dans un objet a envoyer vers le server 
//const envoyer = {
  // panier,
  //formulairValues,
//}
//product y metre l'id ou les id des produit dedans dans le backend 
let products = [];
for (o = 0 ; o < panier.length; o++){
let productsId = panier[o].id;
products.push(productsId);
};

contact = {
  firstName : "test",
  lastName : "test",
  address : "test",
  city : "test",
  email : "test@test.com",
} ;
//products = ["055743915a544fde83cfdfc904935ee7"] ;

const envoyer = {
contact, 
products,
}

console.log("envoyer");
console.log(envoyer);

/*let productsBought = [];
productsBought.push(panier);

const order = {
  contact: {
    firstName: inputName.value,
    lastName: inputLastName.value,
    city: inputCity.value,
    address: inputAdress.value,
    email: inputMail.value,
  },
  products: productsBought,
};
//envouer l'objet "envoyer" dans le serveur 
const options = {
  method: "POST",
  body: JSON.stringify(order),
  headers: { "Content-Type": "application/json" },
};

 // Préparation du prix formaté pour l'afficher sur la prochaine page
 let priceConfirmation = document.querySelector("#totalPrice").innerText;
 priceConfirmation = priceConfirmation.split(" :");
 console.log( "priceConfirmation");
 console.log( priceConfirmation);
 

 // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
 fetch("http://localhost:3000/api/products/order",options)
 .then((response) => response.json())
 .then((produitData) => {
  localStorage.setItem("orderId", produitData.orderId);
  localStorage.setItem("prixTotal", priceConfirmation[1]);


   //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
   //document.location.href = "confirmation.html";
 })

 .catch((err) => {
  alert("Il y a eu une erreur : " + err);
});
*/
const promise01 = fetch("http://localhost:3000/api/products/order",{
method: "POST",
body: JSON.stringify(envoyer),
headers:{
  "Content-Type" : "application/json",
},

});
console.log("promise01");
console.log(promise01);
//pour voir le resultats dans la consol
promise01.then(async(response)=>{

try{
const contenu = await response.json();
console.log("contenu a choidir");
console.log(contenu);
if(response.ok){
console.log(`Resultas de response.ok: ${response.ok}`);
//recuperation de id response de serveur 
console.log("id de la response");
console.log(contenu.orderId);
//Metre le id dans locale storage
localStorage.setItem("responseId",contenu.orderId);
//aller vers la page confirmation
document.location.href = "confirmation.html";
}else{
console.log(`response de serveur : ${response.status}`);
alert(`prbleme avec le serveur :erreur ${response.status}`);
}
}catch(e){
  console.log("ERRUR qui vien de catch()");
  console.log(e);
  alert(`ERRUR qui vien de catch() ${e}`);
}
})


});
 
//----------Mettre le contenu du localStorage dans les champs du formulaire ----------------
//prendre la key dans le localStorage et la mettre dans une variable 

const dataLocalStorage = localStorage.getItem("formulairValues");

//convertir la chaine de caracter en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Metre les values du localStorage dans les champs du formulaire 
document.querySelector("#firstName").value = dataLocalStorageObjet.Prenom;
document.querySelector("#lastName").value = dataLocalStorageObjet.Nom;
document.querySelector("#address").value = dataLocalStorageObjet.Adresse;
document.querySelector("#city").value = dataLocalStorageObjet.Ville;
document.querySelector("#email").value = dataLocalStorageObjet.Email;


console.log(" dataLocalStorageObjet");
console.log( dataLocalStorageObjet);














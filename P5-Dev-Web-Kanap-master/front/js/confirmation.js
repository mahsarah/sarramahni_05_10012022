
//recuperation de l'id de la commande (provenant du serveur) dans local storage
const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`);

//la structeur html de la page de confirmation de commande 
//selection element de DOM positionement 
const positionElement5 = document.querySelector(".confirmation");

positionElement5.innerHTML = `
<div class="confirmation">
<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${responseId}</span></p>
</div>`;

//injection HTML 
//positionElement5.insertAdjacentHTML("afterbegin", structeurConfirmationCommande);
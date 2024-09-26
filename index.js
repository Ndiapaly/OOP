// index.js

class Produit {
  constructor(nom, prix, image, stock) {
    this.nom = nom;
    this.prix = prix;
    this.image = image;
    this.stock = stock;
    this.quantite = 0;
  }

  augmenterQuantite() {
    if (this.quantite < this.stock) {
      this.quantite++;
    }
  }

  diminuerQuantite() {
    if (this.quantite > 0) {
      this.quantite--;
    }
  }

  prixTotal() {
    return this.prix * this.quantite;
  }
}

class Panier {
  constructor() {
    this.produits = [];
  }

  ajouterProduit(produit) {
    const produitExistant = this.produits.find((p) => p.nom === produit.nom);
    if (produitExistant) {
      produitExistant.augmenterQuantite();
    } else {
      produit.augmenterQuantite();
      this.produits.push(produit);
    }
    this.afficherProduits();
    this.mettreAJourTotal();
  }

  supprimerProduit(nomProduit) {
    const produit = this.produits.find((p) => p.nom === nomProduit);
    if (produit) {
      const index = this.produits.indexOf(produit);
      if (index > -1) {
        this.produits.splice(index, 1);
      }
    }
    this.afficherProduits();
    this.mettreAJourTotal();
  }

  mettreAJourTotal() {
    const total = this.produits.reduce(
      (acc, produit) => acc + produit.prixTotal(),
      0
    );
    document.querySelector(".total-price").textContent = `${total} €`;
  }

  afficherProduits() {
    const produitsContainer = document.querySelector(".produits");
    produitsContainer.innerHTML = ""; // Réinitialiser l'affichage

    this.produits.forEach((produit) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemDiv.innerHTML = `
              <div class="img-card">
                  <img src="${produit.image}" alt="${produit.nom}" class="img-fluid" />
              </div>
              <span class="item-name">${produit.nom}</span>
              <span class="quantity">Quantité: ${produit.quantite}</span>
              <span class="price">${produit.prix} €</span>
              <button class="remove-btn" data-nom="${produit.nom}">Supprimer</button>
          `;

      // Événement pour le bouton de suppression
      itemDiv
        .querySelector(".remove-btn")
        .addEventListener("click", (event) => {
          const nomProduit = event.target.getAttribute("data-nom");
          this.supprimerProduit(nomProduit);
        });

      produitsContainer.appendChild(itemDiv);
    });
  }

  passerCommande() {
    if (this.produits.length > 0) {
      alert("Commande passée avec succès !");
      this.produits = []; // Réinitialiser le panier après la commande
      this.afficherProduits();
      this.mettreAJourTotal();
    } else {
      alert("Votre panier est vide !");
    }
  }

  annulerCommande() {
    alert("Commande annulée !");
    this.produits = []; // Réinitialiser le panier
    this.afficherProduits();
    this.mettreAJourTotal();
  }
}

class Favoris {
  constructor() {
    this.produitsFavoris = [];
  }

  ajouterFavori(produit) {
    if (!this.produitsFavoris.includes(produit)) {
      this.produitsFavoris.push(produit);
    }
  }

  afficherFavoris() {
    const favorisContainer = document.querySelector(".favoris");
    favorisContainer.innerHTML = ""; // Réinitialiser l'affichage
    this.produitsFavoris.forEach((produit) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("favori-item");
      itemDiv.innerHTML = `
              <span>${produit.nom}</span>
              <span>${produit.prix} €</span>
          `;
      favorisContainer.appendChild(itemDiv);
    });
  }
}

const panier = new Panier();
const favoris = new Favoris();

// Création des produits
const produit1 = new Produit("Produit 1", 150, "image 1/images.jpeg", 50);
const produit2 = new Produit(
  "Produit 2",
  159,
  "image 1/téléchargement (2).jpeg",
  50
);
const produit3 = new Produit(
  "Produit 3",
  150,
  "image 1/téléchargement (4).jpeg",
  50
);

// Ajout des événements pour les boutons "Ajouter au panier"
document.querySelectorAll(".btn-primary").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    switch (index) {
      case 0:
        panier.ajouterProduit(produit1);
        break;
      case 1:
        panier.ajouterProduit(produit2);
        break;
      case 2:
        panier.ajouterProduit(produit3);
        break;
    }
  });
});

// Ajout des événements pour les boutons "Ajouter aux favoris"
document.querySelectorAll(".btn-secondary").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    switch (index) {
      case 0:
        favoris.ajouterFavori(produit1);
        break;
      case 1:
        favoris.ajouterFavori(produit2);
        break;
      case 2:
        favoris.ajouterFavori(produit3);
        break;
    }
    favoris.afficherFavoris();
  });
});

// Événements pour passer et annuler la commande
document.getElementById("passer-commande").addEventListener("click", () => {
  panier.passerCommande();
});

document.getElementById("annuler-commande").addEventListener("click", () => {
  panier.annulerCommande();
});

import cardsData from './cards.js';

const cards = document.querySelectorAll('.cards');



cards.forEach(card => {
    
    card.addEventListener('click', function() {
        const cardId = card.classList[1];
        window.location.href = `post.html?id=${cardId}`;
        
        let visualizacoes = localStorage.getItem('visualizacoes_' + cardId) || 0;

        visualizacoes = parseInt(visualizacoes) + 1;

        updateData(cardId, visualizacoes);
    });

});


document.addEventListener('DOMContentLoaded', function() {
    // verifica se o usuário está na página post.html
    if (window.location.pathname.includes('post.html')){
        const params = new URLSearchParams(window.location.search);
        const cardId = params.get('id');
        
    
        const visualizacoes = localStorage.getItem('visualizacoes_' + cardId) || 0;
    
        insertData(cardId, visualizacoes);
    }
    
});



function insertData(cardId, visualizacoes) {


    const cardData = cardsData[cardId];
    const postTitle = document.getElementById('post_title');
    const postText = document.getElementById('post_text');
    const postDate = document.getElementById('post_date');
    const postImg = document.getElementById('post_box_img');
    

    postTitle.innerHTML = `
    <h2 id="post_title" class="post_title">
            ${cardData.titulo}
            <strong id="post_title_highlighted" class="titulo__destaque">${cardData.destaque}</strong>
    </h2>
    `

    postDate.innerHTML = `

    ${cardData.data}
    <span id="post_views">
        <i class="fa-solid fa-eye"></i>
        ${visualizacoes}
    </span>
    visualizações
    `

    postText.textContent = cardData.texto;
    postImg.setAttribute("src", cardData.imagem);
    
}

// atualiza as visualizações do localStorage
function updateData(cardId, visualizacaoAtualizada) {
    localStorage.setItem('visualizacoes_' + cardId, visualizacaoAtualizada);
}


// o código que irá executar apenas na página index.html
if (window.location.href.endsWith("index.html")) {
    
    const cards = document.querySelectorAll('.cards');

    cards.forEach((card) => {
        const cardId = card.classList[1];
        const cardViewsNumber = document.querySelector(`.${cardId}_views`);
   
        if (cardViewsNumber) {
            const visualizacoes = localStorage.getItem('visualizacoes_' + cardId) || 0;
            cardViewsNumber.textContent = visualizacoes;
        }
    })


    // filtra os cards por categoria
    const menuLinks = document.querySelectorAll('.menu__links');
    
    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const valorLink = link.textContent;
            

            cards.forEach( (card) => {
                const cardId = card.classList[1];

                const categoria = cardsData[cardId].categoria;

                if (valorLink === categoria){
                   const cardsEspecificos = document.querySelectorAll(`.${cardId}`);

                   cardsEspecificos.forEach((cardEspecifico) => {
                        cardEspecifico.style.display = "block";
                   })
                
                } else if (valorLink === "Todas as categorias") {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

               
            })
            
        })
    })
    
}


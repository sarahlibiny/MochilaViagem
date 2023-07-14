
const form = document.getElementById("novoItem");

const lista = document.getElementById("lista");

const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach( (elemento) => {
    criarElemento(elemento);
})

form.addEventListener("submit", (evento) => { 
evento.preventDefault(); 


const nome = evento.target.elements["nome"];
const quantidade = evento.target.elements["quantidade"];


const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
}

const existeElemento = itens.find( (elemento) => elemento.nome === nome.value);

if (existeElemento){
    itemAtual.id = existeElemento.id;
    atualizaElemento(itemAtual);
    itens[itens.findIndex(elemento => elemento.id === existeElemento.id)] = itemAtual; 

} else{
    itemAtual.id = itens[itens.length -1] ? itens[itens.length - 1].id + 1 : 0; 
    criarElemento(itemAtual); 
    itens.push(itemAtual);
}

localStorage.setItem("itens", JSON.stringify(itens));

nome.value = "";
quantidade.value = "";

})

function criarElemento(item){
    
    const novoItem = document.createElement("li"); 
    novoItem.classList.add("item"); 

    const numeroItem = document.createElement("strong");
    
    numeroItem.dataset.id = item.id; 

    numeroItem.innerHTML = item.quantidade; 

    novoItem.appendChild(numeroItem); 
   
    novoItem.innerHTML = novoItem.innerHTML + item.nome; 

    novoItem.appendChild(botaoDeleta(item.id)); 

    lista.appendChild(novoItem); 
    
}

function atualizaElemento(item) {
        document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const botao = document.createElement("button"); 
    botao.innerHTML = "X"; 
    botao.addEventListener("click", function() { 
        deletaItem(this.parentNode, id); 
    })
   
    return botao; 
}

function deletaItem(tag, id){
    tag.remove();
    itens.splice(itens.findIndex[elemento => elemento.id === id], 1);
    localStorage.setItem("itens", JSON.stringify(itens));
    
}
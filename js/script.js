var selecao;
var div_secundaria = document.getElementById("secundaria");
function buscar(){
  div_secundaria.style.visibility = "hidden";
  if(selecao == 1){
    artistSearch();
  }else{
    musicSearch();
  }
}

async function artistSearch(){
  let h2_titulo = document.getElementById("jsH2");
  h2_titulo.style.visibility = "visible";

  let div_lista = document.getElementById("lista");
  div_lista.innerText = "";
  div_lista.style.visibility = "visible";
  
  let busca = document.getElementById("termoBusca").value;

  let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/" + busca, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		  "x-rapidapi-key": "0eadd6621emshfb5d1b56c721f8bp13da70jsn0c2f6810e3d8"
	  }
  });

  const json = await response.json();

  if(json.error != undefined || busca == ""){
    div_lista.innerText = "Nenhum resultado encontrado para essa pesquisa.";
  }else{
    // Nao sei pq mas fazendo um for of nao funciona, talve seja porque a resposta traga apenas um resultado
    // for(item of json){
    let div_item = document.createElement("div");
    div_item.id = "conteudo";

    let titulo = document.createElement("div");
    titulo.id = "sArtista";
    let imgArtist = document.createElement("img");
    imgArtist.id = "imagem";
    imgArtist.alt = "Imagem do Artista/Banda";
    imgArtist.title = "Imagem do Artista/Banda";

    titulo.innerText = json.name;
    imgArtist.src = json.picture_medium;
  
    div_item.appendChild(imgArtist);
    div_item.appendChild(titulo);

    div_lista.appendChild(div_item);
    div_item.addEventListener("click", function redirecionaPesquisa(){
      albumSearch(json.name);
    })
    // }

  }
}

async function musicSearch(){
  let h2_titulo_Music = document.getElementById("jsH2");
  h2_titulo_Music.style.visibility = "visible";

  let listaMusicas = [];
  let div_listaMusic = document.getElementById("lista");
  div_listaMusic.innerText = "";
  div_listaMusic.style.visibility = "visible";
  let buscaMusic = document.getElementById("termoBusca").value;

  let responseMusic = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + buscaMusic, {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		  "x-rapidapi-key": "0eadd6621emshfb5d1b56c721f8bp13da70jsn0c2f6810e3d8"
	  }
  });

  const jsonMusic = await responseMusic.json();

  if(jsonMusic.error != undefined || jsonMusic.total == "0"){
    div_listaMusic.innerText = "Nenhum resultado encontrado para essa pesquisa.";
  }else{
    for(itemMusic of jsonMusic.data){
      if(!listaMusicas.includes(itemMusic.artist.name)){
        listaMusicas.push(itemMusic.artist.name);
        let div_item_Music = document.createElement("div");
        div_item_Music.id = "conteudo";

        let artist = document.createElement("div");
        artist.id = "artista";
        let titulo = document.createElement("div");
        titulo.id = "artistaMusica";

        let imgArtist = document.createElement("img");
        imgArtist.id = "imagem";
        imgArtist.alt = "Imagem da Banda/Artista";
        imgArtist.title = "Imagem da Banda/Artista";

        let imgPlay = document.createElement("img");
        imgPlay.src = "images/iconeplay4.png";
        imgPlay.alt = "Botão ouvir";
        imgPlay.title = "Ouvir no Deezer"

        let a = document.createElement("a");
        a.href = itemMusic.link;
        a. target = "_blank";

        imgArtist.src = itemMusic.artist.picture_medium;
        artist.innerText = itemMusic.artist.name;
        titulo.innerText = `(${itemMusic.title})`;
        a.appendChild(imgPlay);
        
        div_item_Music.appendChild(imgArtist);
        div_item_Music.appendChild(artist);
        div_item_Music.appendChild(titulo);
        div_item_Music.appendChild(a);

        div_listaMusic.appendChild(div_item_Music);
      }
    }
  }
}

async function albumSearch(nomeArtista){
  let div_visivel = document.getElementById("secundaria");
  div_visivel.style.visibility = "visible";
  let listagem = [];
  let div_listaSearch = document.getElementById("secundaria");
  div_listaSearch.innerText = "";

  let responseSearch = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + nomeArtista, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "0eadd6621emshfb5d1b56c721f8bp13da70jsn0c2f6810e3d8"
    }
  });

  const jsonSearch = await responseSearch.json();

  for(item of jsonSearch.data){
    if(item.artist.name.includes(nomeArtista)){
      
      if(!listagem.includes(item.album.title)){
        listagem.push(item.album.title);

        let div_itemSearch = document.createElement("div");
        div_itemSearch.id = "conteudo";

        let titulo = document.createElement("div");
        titulo.id = "musica";
        let imgAlbum = document.createElement("img");
        imgAlbum.id = "imagem";
        imgAlbum.alt = "Imagem do Album do Artista/Banda";
        imgAlbum.title = "Imagem do Album do Artista/Banda";

        titulo.innerText = item.album.title;
        imgAlbum.src = item.album.cover_medium;
  
        div_itemSearch.appendChild(imgAlbum);
        div_itemSearch.appendChild(titulo);

        div_listaSearch.appendChild(div_itemSearch);
      } 
    }
  }
}

function selecionarOpcao(){
  let div_lista_none = document.getElementById("lista");
  div_lista_none.style.visibility = "hidden";

  let div_secundaria_none = document.getElementById("secundaria");
  div_secundaria_none.style.visibility = "hidden";

  let obj = document.getElementById("selecao");
  let obj_opcao_id = obj.options[obj.selectedIndex].id;
  let div_busca = document.getElementById("busca");

  if(obj_opcao_id == "1"){
    selecao = obj_opcao_id;
    div_busca.style = "display: block";
  }else if(obj_opcao_id == "2"){
    selecao = obj_opcao_id;
    div_busca.style = "display: block";
  }else{
    div_busca.style = "display: none";
  }
}
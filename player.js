const player = new Plyr('video');

const url = new URLSearchParams(document.location.search.substring(1));
const video_url = url.get('id');

if(video_url != null) {
  player.source = {
    type: 'video',
    sources: [
      {
        src: atob(video_url),
        type: 'video/mp4',
        size: 950,
      }
    ]
  };
  
  //Quando pronto.
  player.on('ready', event => {
    if(event) {
      document.getElementById('ads-conteiner').style.display = "flex";
    }
  });
  
  //Quando assistindo.
  player.on('play', event => {
    if(event) {
      document.getElementById('ads-conteiner').style.display = "none";
    }
  });

   //Quando pausado.
  player.on('pause', event => {
      if(event) {
        document.getElementById('ads-conteiner').style.display = "flex";
      }
  });
    
  //tratamento de erro.
  player.on('error', event => {
    if(event) {
      alert('Não foi possivel reproduzir este video!');
    }
  });
  
  const adsClose = document.getElementById("ads-close");
  
  adsClose.addEventListener('click', function() {
    document.getElementById('ads-conteiner').style.display = "none";
    player.play();
  });
  
  // Expose player so it can be used from the console
  window.player = player;
  
} else {
  alert('Não foi encontado nenhum video para reproduzir!');
}
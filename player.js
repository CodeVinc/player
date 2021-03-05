const player = new Plyr('video');

//const url = new URLSearchParams(document.location.search.substring(1));
const source = document.location.search.substring(6)

if(source != "" && source.length > 1) 
{
    document.addEventListener('DOMContentLoaded', () => {

        const video = document.querySelector('video');

        if (!Hls.isSupported()) {
            video.src = source;
        } else {
            // For more Hls.js options, see https://github.com/dailymotion/hls.js
            const hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);
            window.hls = hls;
        }

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

        //video ads
        const adsClose = document.getElementById("ads-close");

        adsClose.addEventListener('click', function() {
            document.getElementById('ads-conteiner').style.display = "none";
            player.play();
        });
    });
} else {
    alert('Não foi encontado nenhum video para reproduzir.');
}

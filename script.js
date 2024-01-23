async function getLyrics() {
  const temp = document.getElementById('temp');
  temp.style.display = 'flex';
    const songInput = document.getElementById('songInput').value || ' ';
    const artistInput = document.getElementById('artistInput').value || ' ';
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        song: songInput,
        artist: artistInput,
      }),
    });
  
    const data = await response.json();
    // displayResult(data);
    let dataToBeSent;
    if(data.error){
      dataToBeSent = data.error;  
    }else{
      dataToBeSent = JSON.stringify(data);
    }
    localStorage.setItem("dataList", dataToBeSent);
    window.location.href = "./viewList.html";
  }
  
  function displayResult(data) {
    const resultContainer = document.getElementById('result');
    const lyric = data.lyrics.replace(/\n/g, '<br>');
    resultContainer.innerHTML = `<p><strong>Song:</strong> ${data.title}</p>
                                 <img src = "${data.albumArt}" style="height: 100px; width: 100px;"/>
                                 <p><strong>Lyrics:</strong> ${lyric || 'Not available'}</p>`;
  }
  

function viewSongList(data) {
    window.location.href("./viewList.html");
    let container = document.getElementById("container");
    data.forEach((element) => {
        let newElement = document.createElement("div");
        newElement.classList.add("songListItems");
        newElement.innerHTML = `
          <p>Song title: ${element.title} </p>
          <img src="${element.albumArt}" style="height:100px; width:100px;">
        `;
        container.appendChild(newElement);
    });
}

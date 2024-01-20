document.addEventListener("DOMContentLoaded", function () {
  let backBtn = document.getElementById('backBtn');
  backBtn.addEventListener("click", () => {
    history.back();
  })

    let data = localStorage.getItem("dataList");
    const panelsData = JSON.parse(data);

    if(data.error){
      const panel  = document.createElement("div");
      const panelContainer = document.getElementById('panels-container');
      panel.classList.add("panel");
      panel.innerHTML = data.error;
      console.log(data.error);
      panelContainer.appendChild(panel);
    }else{

      const panelsContainer = document.getElementById("panels-container");
    
      function createPanel(data) {
        const panel = document.createElement("div");
        panel.classList.add("panel");
    
        const panelContent = `
          <div class="ring">
            <div class="card card1" style="background-image: url('${data.albumArt}')"></div>
            <div class="border">
              <div class="slide">
                <h6 class="para">${data.title}</h6>
              </div>
            </div>
          </div>
        `;
    
        panel.innerHTML = panelContent;
        panel.addEventListener("click", () => {
          console.log("you clicked ", data.title);
          let lyricElement = JSON.stringify(data);
          localStorage.setItem("data", lyricElement);
          window.location.href = "./lyrics.html";
      });
        panelsContainer.appendChild(panel);
      }
    
      panelsData.forEach(createPanel);
    }
  });
  

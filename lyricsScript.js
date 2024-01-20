
let backBtn = document.getElementById('backBtn');
backBtn.addEventListener("click", () => {
    history.back();
})

function extractArtistName(inputString) {
    const regex = /by\s(.+)$/; //
    const match = inputString.match(regex);
    if (match && match[1]) {
        return match[1].trim();
    } else {
        return "Artist not found";
    }
}

let data = JSON.parse(localStorage.getItem("data"));
const fetchAndDisplay = async (data) => {
    const tempMessage = document.getElementById("tempMessage");

    let songInput = data.title;
    let artistInput = data.artist;
    const response = await fetch("https://uptight-raincoat-wasp.cyclic.app/lyrics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            song: songInput,
            artist: artistInput || " ",
            songId: data.id,
        }),
    });
    let displayData = await response.json();
    if (displayData.error) {
        res.send("No such song found");
    }
    else {
        console.log(displayData);
        let container = document.getElementById("container");
        container.style.display = 'none'
        let songContainer = document.createElement("div");
        songContainer.classList.add("lyric1");
        songContainer.id = "firstpart";
        let title = document.createElement("h1");
        title.textContent = `${displayData.title}`;
        console.log(container);
        console.log(title);
        songContainer.appendChild(title);

        function extractSongName(title) {
            // Define a regular expression pattern to match the title format
            const pattern = /(.+) by/;

            // Use the pattern to extract song name and artist name
            const matches = title.match(pattern);
            console.log(matches);
            // Check if there are matches and return the song name (group 1 in the regex)
            return matches ? matches[1] : null;
        }

        // Example usage:
        const songName = extractSongName(displayData.title);

        if (songName) {
            console.log("Song Name:", songName);
        } else {
            console.log("Invalid title format");
        }
        // let albumArt = document.createElement("img");
        // albumArt.setAttribute("src", `${displayData.albumArt}`);


        // albumArt.classList.add("square");
        // songContainer.appendChild(albumArt);

        // let spotify = document.createElement("a");
        // spotify.innerHTML = "spotify";
        // spotify.setAttribute("href", url);
        let url = "https://open.spotify.com/search/" + displayData.title.replace(/\s/g, "%20");
        console.log(url);

        let playCard = document.getElementById('playCard');

        let albumArtCard = document.getElementById('albumArtCard');
        albumArtCard.setAttribute("src", `${displayData.albumArt}`);

        document.querySelector(".credits > h2").textContent = `${songName}`;

        let artist = extractArtistName(displayData.title);
        document.querySelector(".credits p").textContent = `${artist}`;

        document.querySelector(".cardContent button").addEventListener("click", () => {
            window.location.href = url;
        })

        songContainer.appendChild(playCard)
        playCard.style.display = "flex";



        // let spotify = document.createElement("button");
        // spotify.setAttribute("id", "spotify");
        // let url = "https://open.spotify.com/search/" + displayData.title.replace(/\s/g, "%20");
        // spotify.innerHTML = `<a href="${url}" id="spotifyLink" target="_blank"> <i style="font-size: 1.2rem;" class="fa fas fa-brands fa-spotify"></i>Open in spotify</a>`;
        // console.log(url);
        // songContainer.appendChild(spotify);


        let lyric = displayData.lyrics.replace(/\n/g, "<br>");
        var totalLength = lyric.length;
        var halfLength = Math.ceil(totalLength / 2);

        if (window.innerWidth <= 330) {
            firstPart = lyric;
            secondPart = "";
        } else {
            var firstPart = lyric.substring(0, halfLength);
            var secondPart = lyric.substring(halfLength);
        }
        let lyricContainer1 = document.createElement("p");
        lyricContainer1.innerHTML = `${firstPart}`;
        songContainer.appendChild(lyricContainer1);
        container.appendChild(songContainer);

        let lyricContainer2 = document.createElement("p");
        lyricContainer2.innerHTML = `${secondPart}`;

        let lyricContainer2Container = document.createElement('div');
        lyricContainer2Container.classList.add("lyric1")
        lyricContainer2Container.appendChild(lyricContainer2);
        container.appendChild(lyricContainer2Container);
        showSuggestions(data);
    }
};

window.addEventListener("resize", () => {
    if (window.innerWidth <= 330) {
        firstPart = lyric;
        secondPart = "";
    } else {
        var firstPart = lyric.substring(0, halfLength);
        var secondPart = lyric.substring(halfLength);
    }
})




async function showSuggestions(data) {
    let artistInput = extractArtistName(data.title);
    let container = document.getElementById('container')
    console.log(artistInput);

    const response = await fetch("https://uptight-raincoat-wasp.cyclic.app/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            song: " ",
            artist: artistInput || " ",
        }),
    });

    let suggestions = await response.json();
    console.log("suggestions : ", suggestions);
    let len = suggestions.length;
    let suggestionsContainer = document.createElement("div");
    suggestionsContainer.classList.add("container");
    suggestionsContainer.id = "suggestions";
    suggestionsContainer.style.display = "flex";
    let heading = document.createElement("h1");
    heading.textContent = "More from the Artist";
    suggestionsContainer.appendChild(heading);
    for (let i = 0; i < suggestions.length; i++) {
        if (suggestions[i].title == data.title) {
            suggestions.splice(i, 1);
        } else {
            let suggestion = document.createElement("div");
            suggestion.innerHTML = `
                <img src='${suggestions[i].albumArt}' style="height:50px; width:50px">
                <p>${suggestions[i].title}</p>
                `;
            suggestion.classList.add("suggestionElement");
            suggestion.addEventListener("click", () => {
                console.log("you clicked ", suggestions[i].title);
                let lyricElement = JSON.stringify(suggestions[i]);
                localStorage.setItem("data", lyricElement);
                window.location.href = "./lyrics.html";
            });
            let main = document.getElementById("main");
            suggestionsContainer.appendChild(suggestion);
            main.appendChild(suggestionsContainer);
        }
    }
    console.log("suggestions after deletion : ", suggestions);
    let tempMessage = document.getElementById('tempMessage');
    let temp = document.getElementById('temp');
    setTimeout(container.style.display = "flex", 1000);
    tempMessage.style.display = "none"
    temp.style.display = "none"
}
fetchAndDisplay(data);


async function getLyrics() {
    console.log("getLyrics is running....")
    // const temp = document.getElementById('temp');
    // temp.style.display = 'flex';
    const songInput = document.getElementById('songInput').value;
    console.log("songInput : ", songInput);
    // const artistInput = document.getElementById('artistInput').value || ' ';
    const response = await fetch('https://uptight-raincoat-wasp.cyclic.app/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            song: songInput,
            artist: " ",
        }),
    });

    const data = await response.json();
    console.log(data);

    // displayResult(data);
    let dataToBeSent;
    if (data.error) {
        dataToBeSent = data.error;
    } else {
        dataToBeSent = JSON.stringify(data);
    }
    localStorage.setItem("dataList", dataToBeSent);
    console.log("control reaches here");
    window.location.href = "./viewList.html";
}

let searchButton = document.getElementById('searchBtn');
searchButton.addEventListener("click", () => {
    console.log("you clicked search button");
    getLyrics();
}
);
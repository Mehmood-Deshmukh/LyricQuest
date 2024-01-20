@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap');

body {
  margin: 0;
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  font-family: "Salsa", cursive;
}

::-webkit-scrollbar{
  display: none;
}

.heading {
  margin-bottom: 10vh;
  margin-top: 10vh;
  color: white;
  text-align: center;
}
#backBtn {
  position: absolute;
  left: 100px;
  top: 18px;
  width: 50px;
  background-color: transparent;
  border: 1px solid white;
  padding: 5px;
  color: white;
  border-radius: 5px;
}

#backBtn:hover{
  cursor: pointer;
  background-color: white;
  color: black;
}
.container {
  /* /* height: 100vh; */
  width: 90vw;
  /* max-height: 600px; */
  /* max-width: 1200px;
    min-height: 600px;
    min-width: 1100px; */
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 7vw;
  /* margin: 0 auto; */
  backdrop-filter: blur(7px) saturate(180%);
  -webkit-backdrop-filter: blur(7px) saturate(180%);
  background-color: rgba(198, 211, 236, 0.358);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 5vh 0px;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(38, 33, 61, 0.2);
  /* overflow: auto;   */
}

.panel {
  height: 30vh;
  width: 30vh;
  position: relative;

  &:hover {
    .card {
      filter: blur(1.5px);
    }

    .title {
      color: rgba(255, 255, 255, 0.2);
    }

    .border {
      border: 1px solid rgba(255, 255, 255, 1);
    }

    .slide {
      bottom: 0px;
    }

    .ring:before,
    .ring:after {
      transform: translateX(-50%) translateY(-50%) rotate(310deg);
    }
  }
}

.ring,
.card,
.border,
.slide,
.line {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ring {
  color: #fffbf1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 170px;
}

.card {
  background: #f0ead6;
  position: relative;
  transition: all 1s;
  height: 20vh;
  width: 20vh;
  border: 1px solid rgba(255, 255, 255, 1);
  background-repeat: no-repeat;
  background-size: cover;

}

.ring:before,
.ring:after {
  content: "";
  padding: 0.7em 0.4em;
  position: absolute;
  left: 50%;
  width: 10%;
  top: 50%;
  display: block;
  border: 5px solid #50c9c3;
  border-radius: 50%;
  transition: transform 1s;
  transform: translateX(-50%) translateY(-50%) rotate(50deg);
}

.ring:before {
  border-color: rgb(235, 235, 235) rgb(235, 235, 235) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  z-index: -1;
}

.ring:after {
  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgb(235, 235, 235) rgb(235, 235, 235);
}

p {
  text-align: center;
  position: absolute;
  font-family: "Salsa", cursive;
}

.title {
  font-size: 36px;
  font-weight: 700;
  transition: all 1s;
  top: 0;
}

.para {
  bottom: 0;
  font-size: 16px;
  font-family: "Salsa", cursive;
  padding: 20px;
  margin: 0;
  text-align: center;
}

.border {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 30vh;
  width: 30vh;
  transition: border 1s;
  overflow: hidden;
}

.slide {
  height: 30vh;
  width: 30vh;
  position: absolute;
  border: 1px solid black;
  bottom: -270px;
  background: rgba(0, 0, 0, 0.5);
  transition: bottom 1s;
  flex-direction: column;
}

.fa-plane {
  font-size: 16px;
}

#gradient-canvas {
  position: fixed;
  min-height: 100vh;
  z-index: -1;
  --gradient-color-1: #4a4949;
  --gradient-color-2: #65e22f;
  --gradient-color-3: #1a1b1a;
  --gradient-color-4: #000000;
}

@media (max-width: 690px) {
  #backBtn{
    position: relative;
    top: 0;
    left: 0;
    margin: 20px;
  }
  .heading{
    margin-top: 3vh;
  }
}

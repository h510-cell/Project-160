AFRAME.registerComponent("tour", {
    schema: {
      state: { type: "string", default: "places-list" },
      selectedPlace: { type: "string", default: "#Place1" },
      zoomAspectRatio: { type: "number", default: 1 }
    },
    init: function() {
      this.placesContainer = this.el;
      this.cameraEl = document.querySelector("#camera");
      this.createPlaces();
    },
    update: function() {
      window.addEventListener("keydown", e => {
        if (e.key === "ArrowUp") {
          if (
            (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
            (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
          ) {
            this.data.zoomAspectRatio += 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
        if (e.key === "ArrowDown") {
          if (
            (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
            (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
          ) {
            this.data.zoomAspectRatio -= 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
      });
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    showView: function() {
      const { selectedCard } = this.data;
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `./assets/Thumbnails/${selectedPlace}/My Home.jpg`,
        color: "#fff"
      });
    },
    createPlaces: function() {
      
      const thumbNailsRef = [
        {
          position: {x:4.6,y: -5.5,z:25},
          rotation: {x: 180,y: 0,z: 0},
          id: "Main Gate",
          title: "Main Gate",
          url: "./assets/thumbnails/Main Gate.jpg"
        },
        {
          position: {x:20,y: -4.5,z: -5.5},
          rotation: {x: 0,y: -90,z: 0},
          id: "Play Ground",
          title: "Play Ground",
          url: "./assets/thumbnails/Play Ground.jpg"
        },
        {
          position: {x:-9,y: 34,z: -100},
          rotation: {x: 0,y: 0,z: 0},
          id: "My Home",
          title: "My Home",
          url: "./assets/thumbnails/My Home.jpg"
        }
      ];
      let prevoiusXPosition = -60;
      for (var item of thumbNailsRef) {
        const posX = prevoiusXPosition + 25;
        const posY = 10;
        const posZ = -40;
        const position = { x: posX, y: posY, z: posZ };
        prevoiusXPosition = posX;
  
        // Thubnail Element
        const thumbNail = this.createThumbNail(item);

        // Title Text Element
        const titleEl = this.createTitleEl(position, item);
        thumbNail.appendChild(titleEl);
        this.placesContainer.appendChild(thumbNail);
      }
    },
    createThumbNail: function(item) {
      const entityEl = document.createElement("a-entity");
      const id = `places-${item.id}`
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "circle",
        radius: 3
      });
      entityEl.setAttribute("position", { src: item.position });
      entityEl.setAttribute("rotation", { src: item.rotation });
      entityEl.setAttribute("material", { src: item.src, opacity: 0.6 });
      entityEl.setAttribute("cursor-listener", {});
      return entityEl;
    },
    createTitleEl: function(position, item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 60,
        color: "#e65100",
        value: item.title
      });
      const elPosition = position;
      elPosition.y = -20;
      entityEl.setAttribute("position", elPosition);
      entityEl.setAttribute("visible", true);
      return entityEl;
    }, 
    
  });
  
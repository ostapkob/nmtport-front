<template>
  <div>
    <div class="wrapper">
      <div 
         ref="map" 
         :class="olHeight"
        >
      </div>
      <b-button
        @click="chengeTerminal()"
        class="terminal"
        size="sm"
        variant="outline-primary"
      >
      {{ nameTerminal }}
      </b-button>
    </div>
    <template v-if="Boolean(this.map)">
      <slot :map="map"/>
    </template>

  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { transform } from "ol/proj";
import { DragRotateAndZoom } from "ol/interaction";
import { Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      map: null,
      view: null,
      terminal: this.propsterminal=="2",
      nameTerminal: "ГУТ-2",
      screenWidth: null,
      screenHeight: document.documentElement.clientHeight,
    };
  },
  props: {
    propsterminal: {
      default() {
        return 1;
      },
    }
  },
  async mounted() {
    this.screenWidth = document.documentElement.clientWidth;
    await this.initiateMap(this.clearSelectedFeatures);
  },
  computed: {
    ...mapGetters(["FLAG_2_MAPS"]),
    olHeight() {
      if (this.FLAG_2_MAPS) {
        return "ol-2map"
      }
        return "ol-map"
    }
  },
  methods: {
    ...mapActions(["SET_SELECTED_FEATURES"]),
    screenSize() {
      console.log(this.screenWidth);
    },
    initiateMap(fun) {
      //create a layer with the OSM sourse
      let layer = new TileLayer({
        source: new XYZ({
          url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        }),
      });
      //create view with center postion
      let centerTerminal;
      let rotationTerminal;
      let zoomTerminal;
      if (this.terminal) { //! not DRY
        this.nameTerminal = "УТ-1";
        rotationTerminal = Math.PI / -16;
        centerTerminal = transform([132.90094, 42.80333], "EPSG:4326", "EPSG:3857");
        zoomTerminal = 15.6;
        if (this.screenWidth > 450) {
          rotationTerminal = Math.PI / 3.1;
          centerTerminal = transform([132.9010, 42.8032], "EPSG:4326", "EPSG:3857");
          zoomTerminal = 17.3;
        }
      } else {
        this.nameTerminal = "ГУТ-2";
        centerTerminal = transform([132.8888, 42.8124], "EPSG:4326", "EPSG:3857");
        rotationTerminal=0;
        zoomTerminal=15.8;
        if (this.screenWidth > 450) {
          rotationTerminal = Math.PI / 2.71;
          centerTerminal = transform([132.8888, 42.8124], "EPSG:4326", "EPSG:3857");
          zoomTerminal = 17.4;
        }
      }
      this.view = new View({
        center: centerTerminal,
        rotation: rotationTerminal,
        zoom: zoomTerminal,
      });
      let interaction = new DragRotateAndZoom();

      let map = new Map({
        target: this.$refs["map"],
        layers: [layer],
        interaction: [interaction],
        view: this.view,
      });
      this.map = map;
      this.map.on("click", function (evt) {
        var coord = evt.coordinate;
        var degrees = transform(coord, "EPSG:3857", "EPSG:4326");
        console.log(degrees);
        fun();
      });
    },
    clearSelectedFeatures() {
      this.SET_SELECTED_FEATURES([]);
    },
    chengeTerminal() {
      this.terminal = !this.terminal;
      let centerTerminal;
      let zoomTerminal;
      let rotationTerminal;

      if (this.terminal) {
        this.nameTerminal = "УТ-1";
        rotationTerminal = Math.PI / -16;
        centerTerminal = transform([132.90094, 42.80333], "EPSG:4326", "EPSG:3857");
        zoomTerminal = 15.6;

        if (this.screenWidth > 450) {
          rotationTerminal = Math.PI / 3.1;
          centerTerminal = transform([132.9010, 42.8032], "EPSG:4326", "EPSG:3857");
          zoomTerminal = 17.3;
        }
      } else {
        this.nameTerminal = "ГУТ-2";
        centerTerminal = transform([132.8888, 42.8124], "EPSG:4326", "EPSG:3857");
        rotationTerminal=0;
        zoomTerminal=15.8;

        if (this.screenWidth > 450) {
          rotationTerminal = Math.PI / 2.71;
          centerTerminal = transform([132.8888, 42.8124], "EPSG:4326", "EPSG:3857");
          zoomTerminal = 17.4;
        }

      }
      this.view.animate({
        center: centerTerminal,
        rotation: rotationTerminal,
        zoom: zoomTerminal,
        duration: 1000,
        //easing: this.bounce,
      });
    },
    // showMap() {
    //   let center = this.map.getView().getCenter();
    //   let transCenter = transform(center, "EPSG:3857", "EPSG:4326");
    //   console.log(transCenter);
    //   console.log(this.map);
    // },

    // straight_line_equation(x1, y1, x2, y2) {
    //   let k = (y1 - y2) / (x1 - x2);
    //   let b = y2 - k * x2;
    //   return [k, b];
    // },

    // perpendicular_line_equation(k1, b1, mx, my) {
    //   let k2 = -(1 / k1)*1.9; //! 1.9 picked up about
    //   let b2 = my - k2 * mx;
    //   return [k2, b2];
    // },

    // intersection_point_of_lines(k1, b1, k2, b2) {
    //   let nx = (b2 - b1) / (k1 - k2);
    //   let ny = nx * k2 + b2;
    //   // console.log('->', nx, ny)
    //   return [nx, ny];
    // },

    // which_terminal(latitude, longitude) {
    //   let k1 = 0.5932709085972241;
    //   let b1 = 107.49050635162425;
    //   let res_perpendic = this.perpendicular_line_equation(
    //     k1,
    //     b1,
    //     latitude,
    //     longitude
    //   );
    //   let result = this.intersection_point_of_lines(
    //     k1,
    //     b1,
    //     res_perpendic[0],
    //     res_perpendic[1]
    //   );
    //   return result;
    // },


  },
  components: {},
};
</script>

<style lang="scss">
.ol-map {
  position: relative;
  margin: 0;
  padding: 0;
  height: 70vh;
  width: 100%;
  background: #ccc;
  top: -26px;
}
.ol-2map {
  position: relative;
  margin: 0;
  padding: 0;
  height: 45vh;
  width: 100%; 
  background: #ccc; 
  top: -26px;
}
.terminal {
  position: absolute;
  bottom: 28px;
  left: 2px;
}
.wrapper {
  position: relative;
}
</style>

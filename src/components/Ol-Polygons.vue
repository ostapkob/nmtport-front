<template>
  <div></div>
</template>
<script>
import "ol/ol.css";

import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Stroke, Fill } from "ol/style";
import Style from "ol/style/Style";

export default {
  props: {
    map: {
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      overlayCircle: null,
    };
  },
  mounted() {
    this.addPoligon();
  },
  methods: {
    addPoligon() {
      let vectorSource = new VectorSource();
      let coordinates = {
        "8-9": [
          [132.8908456132663, 42.817891900107554],
          [132.89344983560304, 42.81704850066657],
          [132.8915619862523, 42.81385431022519],
          [132.88893466274826, 42.81468618921056],
        ],
        "10-11": [
          [132.88893466274826, 42.81468618921056],
          [132.89091024241768, 42.814060301361906],
          [132.88954146628194, 42.81176023664855],
          [132.8875719513091, 42.81240166771664],
        ],
        "12-13": [
          [132.8875719513091, 42.81240166771664],
          [132.8895414662819, 42.81176023664855],
          [132.8880990389799, 42.8093130835295],
          [132.88611276207493, 42.80994907699463],
        ],
        "14-15": [
          [132.88611276207493, 42.80994907699463],
          [132.88809594682104, 42.80931407362476],
          [132.88665742808996, 42.80689610565736],
          [132.88462626749003, 42.80753172455002],
        ],
      };
      let style = new Style({
        stroke: new Stroke({
          color: "rgba(10, 105, 10, 1)",
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(100, 255, 0, 0.1)",
        }),
      });
      for (let key in coordinates) {
        var polyFeature = new Feature({
          geometry: new Polygon([coordinates[key]]),
        });
        polyFeature.setStyle(style);
        polyFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        vectorSource.addFeature(polyFeature);
      }

      var vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      this.map.addLayer(vectorLayer);
    },
  },
};
</script>


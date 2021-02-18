<template>
  <div></div>
</template>
<script>
import "ol/ol.css";

import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Stroke, Circle, Fill } from "ol/style";
import Style from "ol/style/Style";
import { transform } from "ol/proj";

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
        99: [
          [14793752.104015281, 5283353.203931924],
          [14793557.722027045, 5283696.063757062],
          [14794019.27175546, 5283768.273308048],
        ],
      };
      let style = new Style({
        stroke: new Stroke({
          color: "rgba(10, 10, 105, 1)",
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(100, 0, 255, 0.1)",
        }),
        rotation: 6.5,
      });
      var shipFeature = new Feature({
        geometry: new Polygon([coordinates["99"]]),
      });
      var coord = [14794019.27175546, 5283768.273308048]
      var pointFeature = new Feature({
        geometry: new Point(coord),
      });
      let circle = new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({ color: "#ff4" }),
          stroke: new Stroke({ color: "#000", width: 1 }),
        }),
      });
      pointFeature.setStyle(circle);
      var degrees = transform(coord, "EPSG:3857", "EPSG:4326");
      console.log(degrees)
      console.log(pointFeature.getGeometry())
      vectorSource.addFeature(pointFeature);
      shipFeature.setStyle(style);
      vectorSource.addFeature(shipFeature);
      var vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      this.map.addLayer(vectorLayer);
      shipFeature
        .getGeometry()
        .rotate(1, [14794019.27175546, 5283768.273308048]);
    },
  },
};
</script>


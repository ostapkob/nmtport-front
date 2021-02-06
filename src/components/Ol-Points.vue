<template>
  <div></div>
</template>
<script>
import "ol/ol.css";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Stroke, Circle, Fill } from "ol/style";
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
      names_terminals: [
        (9, 132.8908649130181),
        (11, 132.88896711975767),
        (13, 132.888787583844),
        (15, 132.88772444232788),
      ],
      coords: [
        [9, [132.89194679066017, 42.81736550995399]],
        [9, [132.89257462348414, 42.81589379423502]],
        [9, [132.88986696392485, 42.81595748772176]],
        [9, [132.89161522194811, 42.81419894232471]],
        [9, [132.88916770035377, 42.81475478530103]],
        [9, [132.88917668763676, 42.81476989016062]],
        [9, [132.891374839363, 42.81404213350927]],
        [9, [132.88990317783382, 42.81615568248341]],
        [9, [132.8902056407559, 42.81567523049253]],
        [9, [132.8904257384071, 42.81522114523636]],
        [9, [132.89058743687528, 42.81483370688806]],
        [9, [132.89074913534347, 42.81444626611244]],
        [9, [132.89103938675726, 42.8141375472708]],
        [9, [132.88905238171193, 42.81472577146314]],
        [9, [132.88948020966708, 42.81484054704739]],
        [9, [132.89005630963496, 42.81503972041025]],
        [9, [132.89073024692019, 42.81518359284351]],
        [9, [132.89136573255382, 42.81520790672962]],
        [9, [132.8921023160428, 42.81531973361439]],
        [11, [132.8891646231937, 42.81419314664282]],
        [11, [132.8888248696648, 42.8137008171735]],
        [11, [132.88991758824514, 42.81333378283207]],
        [11, [132.8895013421617, 42.81310638495421]],
        [11, [132.88857236403388, 42.81319772391066]],
        [11, [132.88782603382631, 42.8126122898114]],
        [11, [132.88907575397195, 42.81246977997844]],
        [11, [132.88835626010132, 42.81204749736881]],
        [11, [132.88918006475876, 42.81154327759049]],
        [13, [132.88840048662553, 42.81101999945392]],
        [13, [132.88784625048788, 42.8111115815972]],
        [13, [132.8872512688971, 42.81137078718737]],
        [13, [132.88699984920487, 42.8109875549039]],
        [13, [132.88792165710373, 42.81072675441268]],
        [13, [132.88861605517303, 42.8105559424861]],
        [13, [132.88789764724106, 42.8102535281653]],
        [13, [132.88712132692385, 42.81008988483347]],
        [13, [132.88638900987576, 42.81011825912287]],
        [13, [132.88747955657874, 42.80951143862879]],
        [15, [132.88535149641822, 42.80849242190669]],
        [15, [132.88586498710285, 42.80856846706237]],
        [15, [132.88661262650422, 42.80805425483484]],
        [15, [132.88658177371104, 42.80713661372471]],
        [15, [132.88585086990005, 42.8070099488533]],
        [15, [132.8864242215921, 42.80840657641383]],
        [15, [132.88706787750513, 42.80854399911098]],
      ],
    };
  },
  mounted() {
    this.test();
    this.addPoints();
  },
  methods: {
    straight_line_equation(x1, y1, x2, y2) {
      let k = (y1 - y2) / (x1 - x2);
      let b = y2 - k * x2;
      return [k, b];
    },

    perpendicular_line_equation(k1, b1, mx, my) {
      let k2 = -(1 / k1);
      let b2 = my - k2 * mx;
      return [k2, b2];
    },

    intersection_point_of_lines(k1, b1, k2, b2) {
      let nx = (b2 - b1) / (k1 - k2);
      let ny = nx * k2 + b2;
      // console.log('->', nx, ny)
      return [nx, ny];
    },

    which_terminal(latitude, longitude) {
      let k1 = 0.5932709085972241;
      let b1 = 107.49050635162425;
      let res_perpendic = this.perpendicular_line_equation(
        k1,
        b1,
        latitude,
        longitude
      );
      let result = this.intersection_point_of_lines(
        k1,
        b1,
        res_perpendic[0],
        res_perpendic[1]
      );
      // let name_terminal = 9;
      // for (let el of this.names_terminals) {
      //   if (ny < el[1]) {
      //     name_terminal = el[0];
      //   }
      // }
      // console.log(name_terminal);
      return result;
      // return name_terminal;
    },

    addPoints() {
      let vectorSource = new VectorSource();
      let circle = new Style({
        image: new Circle({
          radius: 2,
          fill: new Fill({ color: "#666" }),
          stroke: new Stroke({ color: "#bd5", width: 1 }),
        }),
      });
      let circle2 = new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({ color: "#ff4" }),
          stroke: new Stroke({ color: "#000", width: 1 }),
        }),
      });
      for (let coord of this.coords) {
        console.log(coord[1])
        var pointFeature = new Feature({
          // geometry: new Point(coord[1], coord[2]),
          geometry: new Point(coord[1])
        });
        let nCoord = this.which_terminal(coord[1][1], coord[1][0])
        console.log("**", nCoord[1], nCoord[0])
        var pointFeature2 = new Feature({
          // geometry: new Point(coord[1], coord[2]),
          geometry: new Point([nCoord[1], nCoord[0]])
        });
        pointFeature.setStyle(circle);
        pointFeature2.setStyle(circle2);
        pointFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
        pointFeature2.getGeometry().transform("EPSG:4326", "EPSG:3857");
        vectorSource.addFeature(pointFeature);
        vectorSource.addFeature(pointFeature2);
      }

      var vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      this.map.addLayer(vectorLayer);
    },
    test() {
      let latitude = 42.81589379423502;
      let longitude = 132.89257462348414;
      // let k1 = 0.5932709085972241;
      // let b1 = 107.49050635162425;
      // let res  = this.perpendicular_line_equation(k1, b1, latitude, longitude);
      // let coord = this.intersection_point_of_lines(k1, b1, res[0], res[1])
      let coord = this.which_terminal(latitude, longitude);
      console.log(coord)
      // console.log("coord1", coord[1]);
      // console.log("coord2", coord[2]);
    },
  },
};
</script>


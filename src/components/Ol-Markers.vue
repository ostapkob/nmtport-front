<template>
  <div>
    <div ref="wrapperIcon" class="wrapper-icon">
      <div ref="circleIcon" class="circle-icon"></div>
      <div ref="mechIcon" :class="getIconCss()" @click="clickMarker">
        {{ marker.number }}
      </div>
      <!-- <img ref="mechIcon" -->
      <!--  class="mech-icon" -->
      <!--  @click="clickMarker" -->
      <!--  :src='require(`@/${this.path}${this.getIcon()}`)' -->
      <!--  /> -->
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import Overlay from "ol/Overlay";
import { transform } from "ol/proj";
import { mapActions, mapGetters } from "vuex";
import { TimelineLite, TimelineMax, Back, Elastic, Expo } from "gsap/dist/gsap";
import { shiftNow, dateNow  } from "@/functions/functions";

export default {
  props: {
    isFocus: {
      default() {
        return null;
      },
    },
    marker: {
      default() {
        return [];
      },
    },
    map: {
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      path: "assets/img/numbers/",
      poll: null,
      overlayIcon: null,
      overlayCircle: null,
    };
  },
  mounted() {
    this.newMarker();
    this.changePosition();
    this.alarm(this.marker.alarm);
    //this.SET_SELECTED_FEATURES([])
  },
  methods: {
    ...mapActions(["SET_SELECTED_FEATURES"]),
    newMarker() {
      this.overlayIcon = new Overlay({
        element: this.$refs["wrapperIcon"],
        position: transform(
          [this.marker.longitude, this.marker.latitude],
          "EPSG:4326",
          "EPSG:3857"
        ),
      });
      this.map.addOverlay(this.overlayIcon);
    },
    clickMarker() {
      console.log(this.marker.name)
      this.$store.dispatch("SET_DATE_SHIFT", [dateNow(), shiftNow()])
      if (event.shiftKey) {
        let nowSelect = this.SELECTED_FEATURES;
        if (!nowSelect.includes(this.marker.id)) {
          nowSelect.push(this.marker.id);
          this.SET_SELECTED_FEATURES(nowSelect);
        }
      } else {
        this.SET_SELECTED_FEATURES([this.marker.id]);
      }
      this.push();
    },
    changePosition() {
      if (this.marker.filter) {
        let position = transform(
          [this.marker.longitude, this.marker.latitude],
          "EPSG:4326",
          "EPSG:3857"
        );
        this.overlayIcon.setPosition(position);
      } else {
        this.overlayIcon.setPosition(undefined);
      }
    },
    alarm(markerAlarm) {
      if (markerAlarm && this.isFocus) {
          this.animationAlarm();
      }
    },
    push() {
      const { mechIcon } = this.$refs;
      const timeline = new TimelineLite({});
      timeline.to(mechIcon, 0.2, {
        scale: 0.8,
        ease: Back.easeOut.config(1.7),
      });
      timeline.to(mechIcon, 0.3, {
        scale: 1,
        ease: Elastic.easeOut(2.5, 0.5),
      });
    },
    animationAlarm() {
      const timeline = new TimelineMax({
        repeat: 2,
      });
      // timeline.clear();
      // timeline.progress(0).clear();
      const { mechIcon, circleIcon } = this.$refs;
      timeline.to(mechIcon, 0.4, {
        scale: 1.8,
        rotation: 16,
        ease: Back.easeOut.config(1.7),
      });
      timeline.to(
        circleIcon,
        0.5,
        {
          scale: 16,
          opacity: 0.7,
          background: "#f34",
        },
        "-=0.6"
      ),
        timeline.to(mechIcon, 1.2, {
          scale: 1,
          rotation: "-=16",
          ease: Elastic.easeOut(2.5, 0.5),
        });
      timeline.to(
        circleIcon,
        1.1,
        {
          scale: 1,
          opacity: 0,
          ease: Expo.easeOut,
        },
        "-=1.2"
      );
    },
    getIconCss() {
      let state = this.marker.state;
      let type = this.marker.type;
      if (type == "kran") {
        // 123
        if (state == "180") {
          return `${type}-icon-blue`;
        } else if (state == "90_1" || state == "90_2") {
          return `${type}-icon-black`;
        } else if (state == "stay") {
          return `${type}-icon-yellow`;
        } else if (state == "no_power") {
          return `${type}-icon-red`;
        } else if (state == "long_no_power") {
          return `${type}-icon-gray`;
        } else if (state == "move") {
          return `${type}-icon-dark-yellow`;
        } else {
          return `${type}-icon-green`;
        }
      }
      if (type == "usm") {
        if (state == "work") {
          return `${type}-icon-blue`;
        } else if (state == "stay") {
          return `${type}-icon-yellow`;
        } else if (state == "move") {
          return `${type}-icon-dark-yellow`;
        } else if (state == "no_power") {
          return `${type}-icon-red`;
        } else if (state == "long_no_power") {
          return `${type}-icon-gray`;
        } else {
          return `${type}-icon-green`;
        }
      }
      if (type == "sennebogen") {
        //console.log(type, state)
        if (state == "work") {
          return `${type}-icon-blue`;
        } else if (state == "stay") {
          return `${type}-icon-yellow`;
        } else if (state == "no_power") {
          return `${type}-icon-red`;
        } else if (state == "long_no_power") {
          return `${type}-icon-gray`;
        } else {
          return `${type}-icon-green`;
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.poll);
  },
  created() {
    //this.pollData()
  },
  computed: {
    ...mapGetters(["SELECTED_FEATURES"]),
  },
  watch: {
    marker: function () {
      this.changePosition();
      this.alarm(this.marker.alarm);
    },
  },
};
</script>
<style>
li.nav-item {
  margin: 0 0 0 0;
}
a.nav-link {
  color: #007bff;
}
</style>

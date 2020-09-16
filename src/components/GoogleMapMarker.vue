<script>
//import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },

  methods: {
  },
  mounted() {

    new this.google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      animation: this.marker.alarm,
//      animation: this.toggleAnimation(this.marker.animation),
//      icon: POINT_MARKER_ICON_CONFIG,
      icon: this.marker.icon,
      title: this.marker.title,
    })

  },

  render() {}
};
</script>


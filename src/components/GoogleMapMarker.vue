<script>
import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";

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
      animation: this.google.maps.Animation.BOUNCE,
      icon: POINT_MARKER_ICON_CONFIG,
      title: "hi i am title",
    })

  },

  render() {}
};
</script>


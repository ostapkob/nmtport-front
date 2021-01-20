<template>
  <div class="video">
<h5> Посмотрите пожалуйста обучающее видео.</h5>
    <b-embed type="video" aspect="21by9" controls poster="@/assets/img/poster.png" >
      <source src="@/assets/video/learn.mp4" type="video/mp4"       height="180" />
    </b-embed>
  </div>
</template>

<script>
// import Areas from '@/components/Areas.vue'

import { BEmbed } from "bootstrap-vue";

export default {
  name: "Video",
  components: {
    BEmbed,
  },
};
</script>

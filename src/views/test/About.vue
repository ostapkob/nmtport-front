<template>
  <div class="about">
    <h4>This is an about page</h4>
    <div class="h2 mb-0">
    <b-icon icon="arrow-up"  animation="throb" ></b-icon>
    <vAbout>
        <h4 slot="name1">html text1 Slots</h4>
        <h3 slot="name2">html text2 Slots</h3>
    </vAbout>
  </div>
  </div>
</template>

<script>
import vAbout from '@/components/vAbout.vue'



export default{ 
mounted() {
    //-------------Promise-------------
    let a = 1;
    console.log(a);
    let p = new Promise(function(resolve) {
    setTimeout ( () => {
        resolve(a=99)
    }, 200); 
    });
    p.then( ()=> {
        console.log('----------')
        console.log(a)}
    )
    //---------------------------------
},
components: {
    vAbout
}

}
</script>

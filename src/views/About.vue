<template>
  <div class="about">
    <h1>This is an about page</h1>
  <div class="h2 mb-0">
    <b-icon icon="arrow-up"  animation="throb" ></b-icon>
  </div>
  </div>
</template>

<script>
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
}

}
</script>

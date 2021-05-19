<template>
  <div class="score-display-component">
    <!-- Called in for-loop by Table.vue in order to display bid and score
    pairs for each "hand" played -->

    <div class="flex-container">
      <div class="flex1"></div>
      <div class="flex2">{{ scoreList.bid }}</div>
      <div class="flex3"></div>
      <div class="flex4">{{ scoreList.score }}</div>
      <div class="flex5"></div>
    </div>

  </div>
</template>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'score-display-component',
  props: ['scoreList']
}
</script>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<style scoped>

.flex-container {
  display: flex;
}

.flex1 {
  flex: 2 1 auto;
}

.flex2 {
  flex: 1 1 0;
}

.flex3 {
  flex: 1 1 auto;
}

.flex4 {
  flex: 1 1 0;
}

.flex5 {
  flex: 2 1 auto;
}

</style>

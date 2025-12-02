<script setup>
import LinkPrevue from '../src/LinkPrevue.vue'
</script>

<template>
  <div style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
    <h2 style="margin-bottom: 1rem;">Original Card Layout</h2>
     <LinkPrevue url="https://www.github.com"></LinkPrevue>
    
    <h2 style="margin-top: 3rem; margin-bottom: 1rem;">Horizontal Card Layout</h2>
    <LinkPrevue url="https://vuejs.org/" :landscape="true"></LinkPrevue>
  </div>
</template>

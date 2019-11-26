<template lang="pug">
  div.mainWrapper
    div(v-if="isLoading" class="pageLoader")
    //.logoWrapper
    //  Logo
    .contentWrapper
      router-view :key="key"
    Navigation
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/active/Navigation';

export default {
  name: 'Main',
  components: {
    Navigation,
    Logo,
  },
  data: () => ({
    isLoading: false,
  }),
  computed: {
    ...mapGetters(['isAuthenticated']),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getModules();
    }
  },
  methods: {
    ...mapActions(['getModules']),
  },
};
</script>

<style lang="scss" src="./Main.scss" scoped />

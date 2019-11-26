<template>
  <div class="certificateWrapper">
    <section class="certificateDetails">
      <h2 class="certificateTitle" v-if="isAuthenticated">
        Digital certificate of completion
      </h2>

      <p class="certificateSubtitle" v-if="isAuthenticated">
        Here is your certificate. You can share it on social network. Please, also share your impressions. Your honest
        feedback is of great value for us.
      </p>

      <Sharing
        v-if="isAuthenticated && fullPath"
        :url="fullPath"
        :media="media"
        class="certificateSocial"
        title="Tell friends about your achievement!"
        background="#f7f7f7"
      />

      <img v-if="certificateUrl" :src="certificateUrl" class="certificateImage" />

      <div v-if="!isAuthenticated" class="text-center">
        <router-link :to="{ name: '/' }" target="_blank">
          <Button class="certificateButton" primary>About the course</Button>
        </router-link>
      </div>
    </section>
    <Navigation certOpened v-if="isAuthenticated" />
  </div>
</template>

<script>
import { propOr } from 'ramda';
import { mapActions, mapGetters } from 'vuex';
import Sharing from '@/components/ui/Sharing';
import Navigation from '@/components/active/Navigation';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';

export default {
  components: { Sharing, Navigation, Logo, Button },
  data: () => ({
    certificateUrl: null,
    fullPath: '',
    id: null,
  }),
  mounted() {
    const id = propOr('', 'id', this.$route.params);
    this.id = id;
    this.certificateUrl = this.getCertificate();
    this.fullPath = window.location.href;

    if (this.isAuthenticated) {
      this.getProfile();
      this.getModules();
    }
  },
  computed: {
    ...mapGetters(['chapters', 'selectedModule', 'isAuthenticated', 'currentUser']),
    title() {
      return propOr('', 'title', this.selectedModule);
    },
    name() {
      return propOr('', 'name', this.currentUser);
    },
    media() {
      return `https://qniversity.herokuapp.com/certificate/${this.id}`;
    },
  },
  methods: {
    ...mapActions(['getProfile', 'getModules']),
    getCertificate() {
      return `https://qniversity.herokuapp.com/certificate/${this.id}/image`;
    },
  },
  metaInfo() {
    return {
      meta: [
        { property: 'og:title', content: 'Qniversity: Digital Marketing Essentials' },
        { property: 'og:image', content: this.fullPath },
        { property: 'og:type', content: 'image' },
        { property: 'og:image:type', content: 'image/png' },

        { name: 'twitter:card', content: 'Qniversity: Digital Marketing Essentials' },
        { name: 'twitter:title', content: `${this.name} has successfully completed this course.` },
        { name: 'twitter:image:src', content: this.fullPath },

        { name: 'facebook:card', content: 'Qniversity: Digital Marketing Essentials' },
        { name: 'facebook:title', content: `${this.name} has successfully completed this course.` },
      ],
    };
  },
  watch: {
    $route() {
      const id = propOr('', 'id', this.$route.params);
      const url = this.getCertificate(id);

      this.fullPath = window.location.href;
      this.certificateUrl = url;
    },
  },
};
</script>

<style lang="scss" src="./CertificateDetails.scss" scoped />

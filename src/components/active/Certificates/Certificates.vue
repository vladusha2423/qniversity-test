<template>
  <div>
    <ModalOverflow v-model="isOpened">
      <div class="certificates" v-if="certificateUrl">
        <div class="certificatesContent">
          <h1 class="title">Certificates</h1>
          <h2 class="subtitle">You got 1 of {{ this.moduleList.length }} certificates</h2>
          <div class="certificate-block">
            <h3 class="moduleTitle">{{ title }}</h3>
            <Sharing :url="certificateUrl" title="Tell friends about your achievement!" />
            <img v-if="certificateUrl" class="certificate-img responsive" :src="certificateUrl" />
          </div>
        </div>
      </div>
    </ModalOverflow>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { propOr } from 'ramda';
import ModalOverflow from '@/components/ui/ModalOverflow';
import Sharing from '@/components/ui/Sharing';

export default {
  name: 'Certificates',
  components: {
    ModalOverflow,
    Sharing,
  },
  props: {
    value: Boolean,
  },
  computed: {
    ...mapGetters(['selectedModule', 'certificateId', 'moduleList', 'currentUser']),
    title() {
      return propOr('', 'title', this.selectedModule);
    },
    certificateUrl() {
      return `https://qniversity.herokuapp.com/certificate/${this.certificateId}/image`;
    },
    name() {
      return propOr('', 'name', this.currentUser);
    },
    isOpened: {
      set: function(value) {
        this.$emit('input', value);
      },
      get: function() {
        return this.value;
      },
    },
  },
  metaInfo() {
    return {
      meta: [
        { property: 'og:title', content: 'Qniversity: Digital Marketing Essentials' },
        { property: 'og:image', content: this.certificateUrl },
        { property: 'og:type', content: 'image' },
        { property: 'og:image:type', content: 'image/png' },

        { name: 'twitter:card', content: 'Qniversity: Digital Marketing Essentials' },
        { name: 'twitter:title', content: `${this.name} has successfully completed this course.` },
        { name: 'twitter:image:src', content: this.certificateUrl },

        { name: 'facebook:card', content: 'Qniversity: Digital Marketing Essentials' },
        { name: 'facebook:title', content: `${this.name} has successfully completed this course.` },
        { name: 'facebook:image:src', content: this.certificateUrl },
      ],
    };
  },
};
</script>

<style lang="scss" src="./Certificates.scss" scoped />

<template>
  <div class="character">
    <div v-if="!avatar && avatarLabel" class="avatar" :style="{ 'background-image': `url(${avatar})` }">
      {{ avatarLabel }}
    </div>
    <div v-else-if="avatar" class="avatar" :style="{ 'background-image': `url(${avatar})` }" />
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'Character',
  props: {
    userInfo: Object,
  },
  computed: {
    name() {
      return this.userInfo.name;
    },
    avatar() {
      return this.userInfo.avatar;
    },
    avatarLabel() {
      const [firstName, lastName] = this.name.split(' ');
      let label = '';

      if (firstName) {
        label = firstName.toUpperCase()[0];
      }

      if (lastName) {
        label = `${label}${lastName.toUpperCase()[0]}`;
      }

      return label;
    },
  },
};
</script>

<style lang="scss" src="./Character.scss" scoped />

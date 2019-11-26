<template>
  <div class="sharing">
    <p class="sharing-title" v-if="title" :style="{ 'background-color': background }">{{ title }}</p>
    <social-sharing
      :url="url"
      title="Qniversity: Digital Marketing Essentials"
      :description="`${name} has successfully completed this course.`"
      :media="media"
      quote=""
      inline-template
    >
      <ul class="sharingList">
        <li class="sharingItem">
          <network network="facebook">
            <img src="@/assets/icons/facebook.svg" width="36px" height="36px" alt="facebook" />
          </network>
        </li>

        <li class="sharingItem">
          <network network="twitter">
            <img src="@/assets/icons/twitter.svg" width="45px" height="36px" alt="twitter" />
          </network>
        </li>

        <li class="sharingItem">
          <network network="linkedin">
            <img src="@/assets/icons/linkedin.svg" width="36px" height="36px" alt="linkedin" />
          </network>
        </li>
      </ul>
    </social-sharing>
  </div>
</template>

<script>
import { propOr } from 'ramda';
import { mapGetters } from 'vuex';

export default {
  name: 'Sharing',
  computed: {
    ...mapGetters(['currentUser']),
    name() {
      return propOr('', 'name', this.currentUser);
    },
  },
  props: {
    title: String,
    url: String,
    media: String,
    background: {
      type: String,
      default: '#fff',
    },
  },
};
</script>

<style lang="scss" scoped>
.sharing {
  position: relative;
  display: flex;
  justify-content: center;
  border: 4px solid $color_primary;
  padding-top: 38px;
  padding-bottom: 38px;
  margin-bottom: 30px;
}

.sharing-title {
  position: absolute;
  width: 180px;
  top: 4px;
  left: 50%;
  transform: translate(-50%, -80%);
  padding-left: 8px;
  font-size: 10px;
  line-height: 11px;
  font-weight: 700;

  @media (min-width: 480px) {
    width: 200px;
    font-size: 12px;
    line-height: 10px;
  }

  @media (min-width: 768px) {
    width: auto;
    font-size: 15px;
    line-height: 16px;
    padding-right: 8px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
    line-height: 23px;
  }
}

.sharingList {
  width: 150px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 480px) {
    width: 160px;
  }

  @media (min-width: 768px) {
    width: 170px;
  }

  @media (min-width: 1024px) {
    width: 184px;
  }
}
</style>

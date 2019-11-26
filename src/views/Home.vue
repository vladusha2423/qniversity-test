<template>
  <div>
    <div class="actions" v-if="!isAuthenticated">
      <div>
        <Button class="submit-btn" primary @onClick="goToRegistration">Registration</Button>
      </div>
      <div>
        <Button class="submit-btn" primary @onClick="goToAuth">Authorization</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Button from '@/components/ui/Button';
import { Routes } from '../constants/enum';

export default {
  name: 'Home',
  components: {
    Button,
  },
  async created() {
    if (this.isAuthenticated) {
      await this.getProfile();

      const certificateId = await this.getModules();

      if (!this.isPaid) {
        this.$router.push({ name: Routes.InitialPayment });
        return;
      }

      if (!this.userInfo) {
        this.$router.push({ name: Routes.AdditionalInfo });
        return;
      }

      if (certificateId) {
        this.$router.push(`/certificate/${certificateId}`);
        return;
      }

      if (this.versionId && this.currentChapterId) {
        const path = `/chapter/${this.versionId}/${this.currentChapterId}`;
        this.$router.push(path);
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isPaid', 'userInfo', 'versionId', 'currentChapterId']),
  },
  methods: {
    ...mapActions(['getProfile', 'getModules']),
    goToRegistration() {
      this.$router.push({ name: Routes.Registration });
    },
    goToAuth() {
      this.$router.push({ name: Routes.Auth });
    },
  },
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
}

.submit-btn {
  display: block;
  width: 220px;
  font-size: 1rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 480px) {
    width: 280px;
  }

  @media (min-width: 768px) {
    width: auto;
    min-width: 20rem;
    font-size: 1.4rem;
  }
}
</style>

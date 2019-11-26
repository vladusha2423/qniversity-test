<template>
  <div class="auth">
    <Card class="auth-card">
      <h3 class="title">Restore Form</h3>
      <ValidationObserver ref="obs">
        <form class="profile-form" slot-scope="{ invalid, validated }" v-on:submit.prevent="handleSubmitForm(email)">
          <validation-provider name="email" rules="required|email">
            <div slot-scope="{ errors }">
              <Input
                type="email"
                name="email"
                v-model="email"
                placeholder="Email"
                :required="true"
                :hasError="errors.length > 0"
                :errorText="errors[0]"
              />
            </div>
          </validation-provider>

          <div>
            <Button
              class="submit-btn"
              primary
              @onClick="handleSubmitForm"
              :disabled="invalid || !validated || isSubmitting"
              >Submit</Button
            >
            <p class="successMessage" v-if="showMessage">Success!</p>
            <p class="error-messages" v-if="errorsState">{{ errorsState }}</p>
          </div>
        </form>
      </ValidationObserver>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Routes } from '../constants/enum';

export default {
  name: 'RestorePassword',
  data: () => ({
    email: '',
    showMessage: false,
    isSubmitting: false,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    Card,
    Input,
    Button,
  },
  async created() {
    if (this.isAuthenticated) {
      await this.getProfile();
      if (!this.isPaid) {
        this.$router.push({ name: Routes.InitialPayment });
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.messageTimeout);
  },
  computed: {
    ...mapGetters(['errorsState', 'isAuthenticated', 'isPaid']),
  },
  methods: {
    ...mapActions(['restorePasswordRequest', 'getProfile']),
    closeMessage() {
      this.messageTimeout = setTimeout(() => (this.showMessage = false), 3000);
    },
    async handleSubmitForm() {
      const { email } = this;
      const isValidForm = await this.$refs.obs.validate();

      if (isValidForm) {
        this.isSubmitting = true;
        this.restorePasswordRequest(email)
          .then(() => {
            this.showMessage = true;
            this.isSubmitting = false;
            this.closeMessage();
          })
          .catch(() => {
            this.isSubmitting = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
}

.auth-card {
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);

  @media (min-width: 480px) {
    padding: 40px;
  }

  @media (min-width: 768px) {
    padding-left: 120px;
    padding-right: 120px;
  }

  @media (min-width: 1024px) {
    max-width: 890px;
    height: auto;
    padding-left: 40px;
    padding-right: 40px;
  }
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 480px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 3rem;
    text-align: left;
  }
}

.profile-form {
  margin-bottom: 1rem;
}

.error-messages {
  display: inline-block;
  margin-left: 30px;
  font-size: 16px;
  line-height: 11px;
  color: $color_error;
  opacity: 1;
  transition: opacity 1s ease 0s;
}

.successMessage {
  display: inline-block;
  margin-left: 30px;
  font-size: 16px;
  line-height: 11px;
  color: #6ece61;
  opacity: 1;
  transition: opacity 1s ease 0s;
}

.submit-btn {
  display: block;
  width: 220px;
  font-size: 1rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;

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

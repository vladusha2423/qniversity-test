<template>
  <div class="auth">
    <Card class="auth-card">
      <h3 class="title">Auth Form</h3>
      <ValidationObserver ref="obs">
        <form
          class="profile-form"
          slot-scope="{ invalid, validated }"
          v-on:submit.prevent="handleSubmitForm(email, password)"
        >
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

          <validation-provider name="password" rules="required">
            <div slot-scope="{ errors }">
              <Input
                type="password"
                name="password"
                v-model="password"
                placeholder="Password"
                :required="true"
                :hasError="errors.length > 0"
                :errorText="errors[0]"
              />
            </div>
          </validation-provider>

          <div class="actions">
            <router-link class="link" to="/restore">Restore password</router-link>
            <div>
              <Button class="submit-btn" primary :disabled="invalid || !validated">Submit</Button>
            </div>
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
import JwtService from '../common/jwt.service';

export default {
  name: 'AuthForm',
  data: () => ({
    email: '',
    password: '',
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    Card,
    Input,
    Button,
  },
  beforeRouteEnter(to, from, next) {
    if (JwtService.getToken()) {
      return next({ name: Routes.Profile });
    }
    return next();
  },
  async created() {
    if (this.isAuthenticated) {
      await this.getProfile();

      if (!this.isPaid) {
        this.$router.push({ name: Routes.InitialPayment });
      }
    }
  },
  computed: {
    ...mapGetters(['errorsState', 'isAuthenticated', 'isPaid', 'currentChapterId', 'versionId']),
  },
  methods: {
    ...mapActions(['authRequest', 'getProfile', 'getModules']),
    async handleSubmitForm() {
      const { email, password } = this;
      const isValidForm = await this.$refs.obs.validate();

      if (isValidForm) {
        await JwtService.destroyToken();
        this.authRequest({ email, password }).then(() => {
          const path = `/chapter/${this.versionId}/${this.currentChapterId}`;
          this.$router.push(path);
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
  padding: 20px;
  background-color: #fff;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);

  @media (min-width: 480px) {
    padding: 40px;
  }

  @media (min-width: 1024px) {
    max-width: 890px;
    height: auto;
  }
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 4rem;
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

.actions {
  display: flex;
  flex-direction: column;
}

.link {
  font-size: 12px;
  margin-bottom: 15px;

  @media (min-width: 480px) {
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    margin-bottom: 25px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 10px;
  }
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

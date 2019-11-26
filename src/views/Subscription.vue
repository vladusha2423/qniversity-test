<template>
  <section class="container">
    <PageNav />
    <Card>
      <h3 class="bold title">
        Subscription
        <img src="@/assets/icons/checked.png" alt="checked" />
      </h3>

      <p>
        Once a month a new module is opened based on your subscription. When all modules are open the subscription will
        be canceled automatically.
      </p>

      <h4>
        Modules:
      </h4>

      <p><span class="bold">1. «High-level Digital Marketing»</span> open</p>
      <p class="color-lightgray">
        <span class="bold">2. «Customer Acquisition»</span>&nbsp;<span class="color-success">next module</span><br />
        Will be automatically paid and opened on March 23. Payment amount is $99.
      </p>
      <p class="color-lightgray">
        <span class="bold">3. «Retention Marketing»</span> access closed<br />
        Will be automatically paid and opened on April 23. Payment amount is $99.
      </p>

      <p>
        <a href="#">Change billing information</a>
      </p>

      <div class="subscription-footer">
        <h4 class="pricing bold no-margin">For $198</h4>
        <Button primary>Purchase ALL MOdules</Button>
        <div class="spacer"></div>
        <Button @click="cancelSubscriptionOpened = true">Cancel subscription</Button>
      </div>
    </Card>

    <Modal v-model="cancelSubscriptionOpened">
      <h3 slot="header" class="bold no-margin">Cancel subscription</h3>

      <div>
        <Input placeholder="Why do you want to cancel?" multiline noMargin />
      </div>

      <div class="text-center" slot="footer">
        <Button>Cancel subscription</Button>
      </div>
    </Modal>
  </section>
</template>

<script>
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import PageNav from '@/components/template/PageNav';

export default {
  components: { Card, PageNav, Button, Modal, Input },
  data: () => ({
    cancelSubscriptionOpened: false,
  }),
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 4rem;
}

.pricing {
  display: inline-block;
  margin-right: 4rem;
}

.subscription-footer {
  display: flex;
  align-items: center;

  .spacer {
    flex-grow: 1;
  }
}
</style>

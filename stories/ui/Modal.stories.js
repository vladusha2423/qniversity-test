import { storiesOf } from '@storybook/vue';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { SpacerDecorator } from '../helpers';

storiesOf('Modal', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { Button, Modal },
    data: () => ({ isOpened: false }),
    template: `
      <Button @click="isOpened = true">Открыть</Button>
      <Modal v-model="isOpened">
        Some modal content here
      </Modal>
    `,
  }));

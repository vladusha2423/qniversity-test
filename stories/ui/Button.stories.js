import { storiesOf } from '@storybook/vue';
import Button from '@/components/ui/Button';
import { SpacerDecorator } from '../helpers';

storiesOf('Button', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { Button },
    template: '<Button>Продолжить</Button>',
  }))
  .add('Primary', () => ({
    components: { Button },
    template: '<Button primary>Продолжить</Button>',
  }))
  .add('Success', () => ({
    components: { Button },
    template: '<Button success>Продолжить</Button>',
  }))
  .add('Warning', () => ({
    components: { Button },
    template: '<Button warning>Продолжить</Button>',
  }))
  .add('Error', () => ({
    components: { Button },
    template: '<Button error>Продолжить</Button>',
  }))
  .add('Disabled', () => ({
    components: { Button },
    template: '<Button disabled>Продолжить</Button>',
  }));

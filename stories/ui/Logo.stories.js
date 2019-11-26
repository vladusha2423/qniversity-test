import { storiesOf } from '@storybook/vue';
import Logo from '@/components/ui/Logo';
import { SpacerDecorator } from '../helpers';

storiesOf('Logo', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { Logo },
    template: `<Logo />`,
  }));

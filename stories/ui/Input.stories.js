import { storiesOf } from '@storybook/vue';
import Input from '@/components/ui/Input';
import { SpacerDecorator } from '../helpers';

storiesOf('Input', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    components: { Input },
    template: '<Input placeholder="Компания" />',
  }))
  .add('Multiline', () => ({
    components: { Input },
    template: '<Input placeholder="Компания" multiline />',
  }))
  .add('Success', () => ({
    components: { Input },
    template: '<Input placeholder="Компания" value="Some value here" success />',
  }))
  .add('Error', () => ({
    components: { Input },
    template:
      '<Input placeholder="Компания" value="Some value here" hasError errorText="Please, fill in this field" />',
  }));

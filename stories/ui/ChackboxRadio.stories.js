import { storiesOf } from '@storybook/vue';
import Checkbox from '@/components/ui/Checkbox';
import CheckboxGroup from '@/components/ui/CheckboxGroup';
import Radio from '@/components/ui/Radio';
import RadioGroup from '@/components/ui/RadioGroup';
import { SpacerDecorator } from '../helpers';

storiesOf('CheckboxRadio', module)
  .addDecorator(SpacerDecorator)
  .add('Checkbox', () => ({
    components: { Checkbox },
    data: () => ({ checked1: false, checked2: true }),
    template: `
      <div style="margin-bottom: 1rem"><Checkbox v-model="checked1">Value 1</Checkbox></div>
      <div style="margin-bottom: 1rem"><Checkbox v-model="checked2">Value 2</Checkbox></div>
    `,
  }))
  .add('Radio', () => ({
    components: { Radio },
    data: () => ({ value: '1' }),
    template: `
      <div style="margin-bottom: 1rem"><Radio v-model="value" name="a" inputValue="1">Value 1</Radio></div>
      <div style="margin-bottom: 1rem"><Radio v-model="value" name="a" inputValue="2">Value 2</Radio></div>
    `,
  }))
  .add('Checkbox group', () => ({
    components: { CheckboxGroup },
    data: () => ({
      value: null,
      options: [
        { id: 1, content: 'First option' },
        { id: 2, content: 'Second option' },
        { id: 3, content: 'Third option' },
        { id: 4, content: 'Fourth option' },
        { id: 5, content: 'Fifth option' },
      ],
    }),
    template: `
      <CheckboxGroup v-model="value" :options="options" labelKey="id" nameKey="content" />
    `,
  }))
  .add('Radio group', () => ({
    components: { RadioGroup },
    data: () => ({
      value: null,
      options: [
        { id: 1, content: 'First option' },
        { id: 2, content: 'Second option' },
        { id: 3, content: 'Third option' },
        { id: 4, content: 'Fourth option' },
        { id: 5, content: 'Fifth option' },
      ],
    }),
    template: `
      <RadioGroup v-model="value" :options="options" labelKey="id" nameKey="content" />
    `,
  }));

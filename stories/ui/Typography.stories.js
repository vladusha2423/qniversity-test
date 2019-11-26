import { storiesOf } from '@storybook/vue';
import { SpacerDecorator } from '../helpers';

storiesOf('Typography', module)
  .addDecorator(SpacerDecorator)
  .add('Default', () => ({
    template: `
      <h1>H1 - Header 1 - 36pt Source Sans Pro</h1>
      <h2>H2 - Header 2 - 30pt Source Sans Pro</h2>
      <h3>H3 - Header 3 - 24pt Source Sans Pro</h3>
      <h4>H4 - Header 4 - 24pt Source Sans Pro</h4>
      <h5>H5 - Header 5 - 18pt Source Sans Pro</h5>
      <h6>H6 - Header 6 - 18pt Source Sans Pro</h6>
      <p>Paragraph 1 - 18pt Source Sans Pro</p>
      <p class="sm">Paragraph 2 - 16pt Source Sans Pro</p>
      <p class="xs">Paragraph 3 - 14pt Source Sans Pro</p>
      <small>Small - 12pt Source Sans Pro</small>

      <hr />

      <p class="light">Light: Paragraph 1 - 18pt Source Sans Pro</p>
      <p class="regular">Regular: Paragraph 1 - 18pt Source Sans Pro</p>
      <p class="semibold">Semibold: Paragraph 1 - 18pt Source Sans Pro</p>
      <p class="bold">Bold: Paragraph 1 - 18pt Source Sans Pro</p>
      <p class="black">Black: Paragraph 1 - 18pt Source Sans Pro</p>

      <hr />

      <h1>Some text with <a href="#">Link</a></h1>
      <h3 class="bold">Some text with <a href="#">Link</a></h3>
      <p>Some text with <a href="#">Link</a></p>
      <small>Some text with <a href="#">Link</a></small>

      <hr />

      <p class="text-left">Left: Paragraph 1 - 18pt Source Sans Pro</p>      
      <p class="text-center">Center: Paragraph 1 - 18pt Source Sans Pro</p>      
      <p class="text-right">Right: Paragraph 1 - 18pt Source Sans Pro</p> 
      
      <hr />

      <h1 class="bold">
        <span class="color-primary">Primary</span>
        <span class="color-success">Success</span>
        <span class="color-warning">Warning</span>
        <span class="color-error">Error</span>
        <span class="color-black">Black</span>
        <span class="color-gray">Gray</span>
        <span class="color-lightgray">Lightgray</span>
        <span class="color-silver">Silver</span>
        <span class="color-lightsilver">Lightsilver</span>
        <span class="color-white bg-gray">White</span>
      </h1>
    `,
  }));

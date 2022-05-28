import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Component/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  color: "primary",
  children: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
  children: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  children: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  children: "Button",
};

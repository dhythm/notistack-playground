import { ComponentMeta, ComponentStory } from "@storybook/react";
import { OptionsObject, SnackbarMessage } from "notistack";
import { FC } from "react";
import { FlashMessageProvider, useFlashMessage } from "./FlashMessageProvider";

type Props = { message: SnackbarMessage; closable: boolean } & OptionsObject;
const FlashMessageConsumer: FC<Props> = ({
  message,
  variant,
  persist,
  style,
  closable,
}) => {
  const { openFlashMessage } = useFlashMessage();
  return (
    <button
      onClick={() =>
        openFlashMessage(message, { variant, persist, style, closable })
      }
    >
      {message}
    </button>
  );
};

export default {
  title: "Components/FlashMessage",
  component: FlashMessageConsumer,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning"],
    },
  },
} as ComponentMeta<typeof FlashMessageConsumer>;

const Template: ComponentStory<typeof FlashMessageConsumer> = (args) => (
  <FlashMessageProvider>
    <FlashMessageConsumer {...args} />
    <FlashMessageConsumer {...args} message="error" variant="error" />
    <FlashMessageConsumer {...args} message="success" variant="success" />
    <FlashMessageConsumer {...args} message="warning" variant="warning" />
    <FlashMessageConsumer {...args} message="info" variant="info" />
    <FlashMessageConsumer {...args} message="persist" persist />
  </FlashMessageProvider>
);

export const FlashMessage = Template.bind({});
FlashMessage.args = {
  message: "text",
  variant: "default",
  persist: false,
  closable: true,
};

import React from "react";
import { AirbnbExample } from "./AirbnbExample";

export default {
  title: "ChakraUI/AirbnbExample",
  component: AirbnbExample,
};

const Template = (args) => (
  <withChakraUi>
    <AirbnbExample {...args} />
  </withChakraUi>
);

export const Primary = Template.bind({});

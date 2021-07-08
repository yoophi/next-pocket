import React from "react";
import WithNavigation from "../shared/layouts/WithNavigation";
import { AirbnbExample } from "../stories/AirbnbExample";

export default function Home() {
  return (
    <WithNavigation>
      <AirbnbExample />
    </WithNavigation>
  );
}

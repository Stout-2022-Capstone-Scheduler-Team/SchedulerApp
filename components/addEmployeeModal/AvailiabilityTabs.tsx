import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { TabPanel } from "../";

function a11yProps(index: number): { id: string; "aria-controls": string } {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

interface Props {
  tabContent: JSX.Element[];
  tabHeaders: string[];
}

export function AvailabilityTabs(props: Props): JSX.Element {
  const { tabContent, tabHeaders } = props;
  const [current, setCurrent] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    if (newValue !== current) {
      setCurrent(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={current}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabHeaders.map((header, index) => (
            <Tab label={header} key={header} {...a11yProps(index + 1)} />
          ))}
        </Tabs>
      </Box>
      {tabContent.map((child, index) => (
        <TabPanel value={current} index={index} key={index}>
          {child}
        </TabPanel>
      ))}
    </Box>
  );
}

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { AvailabilityEditor, EditEmployeeInfo, TabPanel } from "../";
import { Time } from "../../entities";

function a11yProps(index: number): { id: string; "aria-controls": string } {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export function AvailabilityTabs(): JSX.Element {
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
          <Tab label="Employee Info" {...a11yProps(0)} />
          {Time.getWeekDays().map((day, index) => (
            <Tab label={day} key={day} {...a11yProps(index + 1)} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={current} index={0}>
        <EditEmployeeInfo />
      </TabPanel>
      {Time.getWeekDayNumbers().map((day, index) => (
        <TabPanel value={current} index={index + 1} key={index}>
          <AvailabilityEditor day={day} />
        </TabPanel>
      ))}
    </Box>
  );
}

import { Button, Box, Stack } from "@mui/material";

import ExportModal from "../components/export/ExportModal";
import TestingComponent from "../components/export/print";
import { React, ReactInstance, RefObject, useRef } from "react";
import Link from "next/link";

const Home: NextPage = () => {
  let goodRef: React.RefObject<any> = useRef();

  return (
    <main>
      {/* <TestingComponent
          refSetter={(newRef: any) => {
            console.log('setting ref', newRef)
            goodRef = newRef
          }}
        /> */}
      <ExportModal componentToExport={goodRef} />
    </main>
  );
};

export default Home;

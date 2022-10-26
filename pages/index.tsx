import ExportModal from "../components/export/ExportModal";
import Calendar from "../components/Calendar/Calendar";
import { useRef } from "react";

export default function Home(): JSX.Element {
  const goodRef: React.RefObject<any> = useRef();

  return (
    <>
      {/* <TestingComponent
          refSetter={(newRef: any) => {
            console.log('setting ref', newRef)
            goodRef = newRef
          }}
        /> */}
      <ExportModal componentToExport={goodRef} />
      <Calendar allShifts={[]} ref={goodRef} />
    </>
  );
}

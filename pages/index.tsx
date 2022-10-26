import ExportModal from "../components/export/ExportModal";

export default function Home(): JSX.Element {
  let goodRef: React.RefObject<any> = useRef();

  return (
    <>
      {/* <TestingComponent
          refSetter={(newRef: any) => {
            console.log('setting ref', newRef)
            goodRef = newRef
          }}
        /> */}
      <ExportModal componentToExport={goodRef} />
      <EditSchedule />
      {/* ADD logic to switch between pages */}
    </>
  );
}

import ExportModal from "../components/export/ExportModal";

const Home: JSX.Element = (): JSX.Element => {
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
    </>
  );
};

export default Home;

import Link from "next/link";
import React, { RefObject, useRef } from "react";

interface testProps {
  refSetter: Function;
}

const ComponentToPrint = ({ refSetter }: testProps): JSX.Element => {
  return (
    <Link href="https://nextjs.org/docs" ref={refSetter}>
      <h2>Documentation &rarr;</h2>
      <p>Find in-depth information about Next.js features and API.</p>
    </Link>
  );
};

export default ComponentToPrint;

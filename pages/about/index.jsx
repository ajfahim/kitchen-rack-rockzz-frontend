import React from 'react';

function About() {
  return (
    <>
      <div>About</div>
      <button className="btn-primary btn">click</button>
      <div className=" mt-10 flex w-full items-center justify-center space-x-3">
        <div className="h-40 w-40 border bg-primary shadow-md">primary</div>
        <div className="h-40 w-40 border bg-secondary shadow-md">secondary</div>
        <div className="bg-base h-40 w-40 border shadow-md">base</div>
        <div className="h-40 w-40 border bg-accent shadow-md">accent</div>
      </div>
    </>
  );
}

export default About;

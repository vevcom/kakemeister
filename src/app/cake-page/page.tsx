"use server";

import { get_all_cakes } from "@/services/cake/actions";
import CakeSlot from "./cakeComponent";
import BackgroundVideo from "@/components/BackgroundVideo";

export default async function CakePage() {
  const cakes = await get_all_cakes();

  if (!cakes || cakes.length === 0) {
    return (
      <>
        
        <h1>Det er ingen kaker her. Å nei!</h1>
      </>
    );
  }

  return (
    <>
      
      <div style={{ position: "relative", zIndex: 1 }}>
        {cakes.map((data, index) => (
          <div key={index}>
            <CakeSlot cakeData={data} />
          </div>
        ))}
      </div>
    </>
  );
}
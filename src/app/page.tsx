/* eslint-disable react/react-in-jsx-scope */
// import Image from 'next/image'

import Featured from "@/components/Featured";
import Offers from "@/components/Offers";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div className="">
      <Slider />
      <Featured />
      <Offers />
    </div>
  )
}

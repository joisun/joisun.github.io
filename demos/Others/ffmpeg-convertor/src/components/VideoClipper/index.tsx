import React, { ChangeEvent, SVGProps, useEffect, useRef, useState } from "react";
import DragHandler, { HandlerEnum } from "./DragHandler";
import { cn, msToTime } from "@/lib/utils";

interface VideoClipperProps extends React.HTMLAttributes<HTMLVideoElement> { 
  src: string
  onClipChange:(startPoint:string, endPoint:string)=>void
}

export default function VideoClipper({onClipChange,...props}:VideoClipperProps) {
  const [play, setPlay] = useState(false);
  const [range, setRange] = useState([0, 0])
  const [startPoint, setStartPoint] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [volumVisible, setVolumVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const len = 54003240
  const handleChange = (isStart: boolean, e: number, percentage: number) => {
    const newRange = Array.from(range)
    newRange[isStart ? 0 : 1] = e
    setRange(newRange)
    const time = msToTime(len * percentage)
    isStart ? setStartPoint(time) : setEndPoint(time)
    onClipChange(startPoint, endPoint)
  }
  const handlePlay = function () {
    play ? videoRef.current?.pause() : videoRef.current?.play()
    setPlay(!play)
  }
  const handleVolChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    videoRef.current && (videoRef.current.volume = Number(target.value))
  }


  return (
    <div className="relative w-full max-w-[1000px] mx-auto">
      <video ref={videoRef} className="relative w-full" {...props}></video>
      <div className="absolute flex gap-4 px-4 justify-between items-center z-20 bottom-12 left-1/2 rounded-2xl  backdrop-blur-2xl  -translate-x-1/2 z-1000 controller h-20 w-11/12 bg-black/10">
        <button className="text-4xl hover:scale-110 transition-all" onClick={handlePlay}>
          {play ? <IcRoundPause /> : <IcRoundPlayArrow />}
        </button>
        <div className="con-bar flex-1 bg-black/60 rounded-2xl backdrop-blur-3xl h-8 relative flex items-center transition-all">
          <DragHandler onPositionChange={(e, p) => handleChange(true, e, p)} type={HandlerEnum.START}>
            {startPoint}
          </DragHandler>
          <DragHandler onPositionChange={(e, p) => handleChange(false, e, p)} type={HandlerEnum.END}>
            {endPoint}
          </DragHandler>
          <div className="range-bar absolute z-10 bg-green-500/80 h-full" style={{ left: range[0], right: `calc(100% - ${range[1]}px)` }}></div>
        </div>
        <button className="text-3xl hover:scale-110 transition-all" onClick={() => setVolumVisible(!volumVisible)}>
          <MaterialSymbolsVolumeUp />
        </button>
        {volumVisible && <input onChange={(e) => handleVolChange(e)} className={cn(
          "absolute -right-14 -top-0 -rotate-90 transition-all w-20 ",
          "appearance-none bg-transparent",
          "[&::-webkit-slider-runnable-track]:rounded-full",
          " [&::-webkit-slider-runnable-track]:bg-black/40",
          " [&::-webkit-slider-runnable-track]:backdrop-blur-2xl",
          "[&::-webkit-slider-thumb]:appearance-none ",
          "[&::-webkit-slider-thumb]:h-4 ",
          "[&::-webkit-slider-thumb]:w-4 ",
          "[&::-webkit-slider-thumb]:rounded-full ",
          "[&::-webkit-slider-thumb]:bg-white",
        )} type="range" id="volumeSlider" min="0" max="1" step="0.01"></input>}
      </div>
      {props.children}
    </div>
  );
}

function IcRoundPlayArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82"
      ></path>
    </svg>
  );
}
function IcRoundPause(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsVolumeUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14 20.725v-2.05q2.25-.65 3.625-2.5t1.375-4.2t-1.375-4.2T14 5.275v-2.05q3.1.7 5.05 3.138T21 11.975t-1.95 5.613T14 20.725M3 15V9h4l5-5v16l-5-5zm11 1V7.95q1.175.55 1.838 1.65T16.5 12q0 1.275-.663 2.363T14 16"
      ></path>
    </svg>
  );
}

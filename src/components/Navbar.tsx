import React, { useState } from "react";

import { ModeToggle } from "./ui/Darkmode/mode-toggle";
import { Zap } from 'lucide-react';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { CircleHelp, PersonStanding, Video, VideoOff, FlipHorizontal, Aperture, Cctv, Volume2, VolumeX } from 'lucide-react';
import Dropdown from "./Dropdown";

interface NavbarProps {
  onWebcamToggle: () => void;
  onFlipToggle: () => void;
  onScreenshotToggle: () => void;
  onRecordingToggle: () => void; // Function to toggle recording state
  onAutoRecordingToggle: () => void; // Function to toggle auto recording state
  onSoundChange: (value: number) => void; // Function to handle beep value change

  webcamOn: boolean;
  recording: boolean; // Recording state
  autorecording: boolean; // Auto Recording state
  soundValue: number; // Beep value
}

const Navbar: React.FC<NavbarProps> = ({ 

  onWebcamToggle, 
  onFlipToggle, 
  onScreenshotToggle, 
  onRecordingToggle,
  onAutoRecordingToggle,
  onSoundChange,
  webcamOn,
  recording,
  autorecording,
  soundValue
}) => {

  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col h-full justify-between rounded-lg border-2 w-20 p-2">

          <div>
            <div className="flex justify-center h-20 items-center">
            <Zap fill="#3e9392" strokeWidth={0} />
            </div>
            <Separator />
          </div>

          <div className="flex flex-col h-full justify-between">

              <div>
                <div className="flex justify-center h-16 items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
                        <CircleHelp />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex justify-center items-center">
                  <ModeToggle />
                </div>
              </div>

              <div>
                <div className="flex justify-center h-16 items-center">
                  <Button variant="secondary" size="icon"  disabled={!webcamOn} onClick={onFlipToggle}>
                    <FlipHorizontal />
                  </Button>
                </div>
                <div className="flex justify-center h-16 items-center">
                  <Button 
                  variant={webcamOn ? 'destructive' : 'secondary'} 
                  size="icon" 
                  onClick={onWebcamToggle}>
                    <Cctv/>
                  </Button>
                </div>
                <div className="flex justify-center h-16 items-center">
                  <Button variant={recording ? 'destructive' : 'secondary'}  size="icon"  disabled={!webcamOn} onClick={onRecordingToggle}>
                    {recording ? <Video /> : <VideoOff />}
                  </Button>
                </div>
                <div className="flex justify-center h-16 items-center">
                  <Button variant="secondary" size="icon"  disabled={!webcamOn} onClick={onScreenshotToggle}>
                    <Aperture />
                  </Button>
                </div>
                <div className="flex justify-center h-16 items-center">
                  <Button 
                  variant={autorecording ? 'destructive' : 'secondary'} 
                  size="icon"  
                  disabled={!webcamOn} 
                  onClick={onAutoRecordingToggle}>
                    <PersonStanding />
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex justify-center h-16 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size={'icon'}>
                    {soundValue === 0 ? <VolumeX /> : <Volume2 />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Slider
                      max={1}
                      min={0}
                      step={0.2}
                      defaultValue={[soundValue]}
                      onValueCommit={(value) => onSoundChange(value[0])}
                    />
                  </PopoverContent>
                </Popover>
                </div>
              </div>

          </div>

          <div>
            <Separator />
            <div className="flex justify-center h-20 items-center">
              <Dropdown/>
            </div>
          </div>

    </div>

  )
}

export default Navbar;

/*
        <div className="flex flex-col justify-between">

          <div>
            <div 
            className={`flex justify-center h-20 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >Head</div>
            <Separator />
          </div>

          <div>
            <div 
            className={`flex justify-center h-16 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >01</div>
            <div 
            className={`flex justify-center h-16 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >02</div>
            <div 
            className={`flex justify-center h-16 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >03</div>
            <div 
            className={`flex justify-center h-16 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >04</div>
            <div 
            className={`flex justify-center h-16 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >05</div>
            <div 
            className={`flex justify-center h-16 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >06</div>
          </div>
          <Separator />
          <div>
            <div 
            className={`flex justify-center h-20 items-center ${
              open ? "w-0 scale-0" : "w-28 "
              }  duration-300`}
            >Footer</div>
          </div>

        </div>
*/

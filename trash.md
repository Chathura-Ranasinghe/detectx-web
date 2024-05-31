      <div className='flex justify-center items-center w-full bg-neutral-800'>
        <div className="grid grid-cols-2 grid-rows-2 gap-5 h-full">
          <div className="flex justify-center items-center">
            <Webcam className="w-full h-full object-contain" />
          </div>
          <div className="flex justify-center items-center">
            <Webcam className="w-full h-full object-contain" />
          </div>
          <div className="flex justify-center items-center">
            <Webcam className="w-full h-full object-contain" />
          </div>
          <div className="flex justify-center items-center">
            <Webcam className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div
className={`bg-red-200 ${
  open ? "w-24" : "w-72"
} `}
>
  Hello
</div>
  <i className="fa-regular fa-circle-question p-2 bg-blue-500"
    onClick={() => setOpen(!open)}
  />

</div>
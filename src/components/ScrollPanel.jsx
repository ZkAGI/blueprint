
import React from 'react';

export default function ScrollPanel({
  open,
  children,
  className = '',
  title = '',
  imageUrl = '/img/scroll-full.png',
}) {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div
        className={[
          'relative mx-auto w-full max-w-5xl', // keep panel wide so image stays big
          'transition-[max-height,opacity,transform] duration-700 ease-out',
          open ? 'max-h-[1600px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2',
          'overflow-hidden',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div
          className="relative w-full"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',     // image fills the panel
            backgroundPosition: 'center',
            minHeight: '900px',
            padding: '10px 4px 12px 4px',
           //: '0 0 18px -4px rgba(0, 200, 255, 0.12)',
           // borderRadius: '14px',
           // border: '1px solid rgba(34,211,238,0.2)',
          }}
        >
          {/* Title floating on top */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6 text-cyan-300 font-bold tracking-widest text-xs md:text-sm">
            {title}
          </div>

          {/* CONTENT: center a narrow column over the full-size image */}
          <div className="relative z-10 flex justify-center pt-40 pb-24">
            <div className="w-full max-w-md px-4">
              <div className="max-h-[520px] overflow-y-auto">
                <div className="text-cyan-100 leading-relaxed">
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* Edge glows */}
          {/* <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-cyan-400/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-cyan-400/10 to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-cyan-400/8 to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-cyan-400/8 to-transparent" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

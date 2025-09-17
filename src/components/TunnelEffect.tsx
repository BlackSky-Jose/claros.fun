import React from 'react';

const TunnelEffect: React.FC = () => {
  return (
    <div className="tunnel-effect">
      <style jsx>{`
        .tunnel-effect {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .scene {
          width: 100vmin;
          height: 100vmin;
          perspective: 75vmin;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.7;
        }

        .wrapper {
          width: 100vmin;
          height: 100vmin;
          transform-style: preserve-3d;
        }

        .tunnel {
          width: 100vmin;
          height: 100vmin;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(50vmin);
          animation: moveTunnel 1s linear infinite;
        }

        .side {
          width: calc(20 * 10vmin);
          height: 100vmin;
          display: flex;
          position: absolute;
          left: -50%;
        }

        .side:nth-child(1) {
          transform: rotateY(90deg) translateZ(50vmin) translateX(50%);
        }

        .side:nth-child(2) {
          transform: rotateY(90deg) translateZ(-50vmin) translateX(50%);
        }

        .side:nth-child(3) {
          transform: rotateY(90deg) rotateX(90deg) translateZ(50vmin) translateX(50%);
        }

        .side:nth-child(4) {
          transform: rotateY(90deg) rotateX(90deg) translateZ(-50vmin) translateX(50%);
        }

        .side:nth-child(5) {
          width: 100vmin;
          box-shadow:
            0px 0px 20vmin 10vmin rgba(55, 238, 146, 0.56),
            inset 0px 0px 50vmin 20vmin rgba(18, 109, 71, 0.44);
          transform: translateZ(calc(-20 * 10vmin)) translateX(50%);
        }

        .stroke {
          width: 10vmin;
        }

        .square {
          width: 10vmin;
          aspect-ratio: 1;
          border: 2px solid rgb(160, 255, 7);
          filter: blur(3px);
        }

        @keyframes moveTunnel {
          from {
            transform: translateZ(50vmin);
          }
          to {
            transform: translateZ(60vmin);
          }
        }

        @keyframes highlight {
          99% {
            transform: translateZ(0) translateX(50%);
            opacity: 1;
          }
          100% {
            transform: translateX(0) translateX(50%);
            opacity: 0;
          }
        }
      `}</style>
      
      <div className="scene">
        <div className="wrapper">
          <div className="tunnel">
            {/* Side 1 */}
            <div className="side">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 10 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Side 2 */}
            <div className="side">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 10 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Side 3 */}
            <div className="side">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 10 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Side 4 */}
            <div className="side">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 10 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Highlight side */}
            <div className="side highlight"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TunnelEffect;

import React from 'react';

const TunnelEffect: React.FC = () => {
  return (
    <div className="tunnel-effect">
              <div className="back z-1 "></div>

      <style jsx>{`
        .tunnel-effect {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .scene {
          width: 700vmin;
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
          width: calc(10 * 5vmin);
          height: 50vmin;
          display: flex;
          position: absolute;
          left: 0%;
        }
          .back {
            margin-top: 19vmin;
            width: 400vmin;
            height: 30vmin;
            background: rgba(0, 0, 0, 0.81);
            box-shadow: 0 0 40px 40px rgba(0, 0, 0, 0.86);
            

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
          width: 400vmin;
          box-shadow:
            0px 0px 40vmin 40vmin rgba(184, 40, 40, 0.72),
            inset 0px 0px 50vmin 20vmin rgba(0, 0, 0, 0.69);
          transform: translateZ(calc(-20 * 10vmin)) translateX(50%);
        }

        .stroke {
          width: 10vmin;
        }

        .square {
          width: 20vmin;
          aspect-ratio: 1;
          border: 2px solid rgb(114, 253, 72);
          filter: blur(2px);
          box-shadow: 0 0 20px 20px rgba(3, 168, 39, 0.2);
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
          0% {
            transform: translateZ(0) translateX(30%);
            opacity: 1;
            }
            0% {
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
              {Array.from({ length: 22 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 0 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Side 2 */}
            <div className="side">
              {Array.from({ length: 22 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 0 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Side 3 */}
            <div className="side">
              {Array.from({ length: 23 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 40 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Side 4 */}
            <div className="side">
              {Array.from({ length: 22 }, (_, i) => (
                <div key={i} className="stroke">
                  {Array.from({ length: 40 }, (_, j) => (
                    <div key={j} className="square"></div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Highlight side */}
            {/* <div className="side highlight"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TunnelEffect;

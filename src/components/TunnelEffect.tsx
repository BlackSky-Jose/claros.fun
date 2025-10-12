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
          width: 100vmin;
          height: 70vmin;
          perspective: 150vmin;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.7;
        }

        .wrapper {
          width: 50vmin;
          height: 50vmin;
          transform-style: preserve-3d;
        }

        .tunnel {
          width: 50vmin;
          height:50vmin;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(50vmin);
          animation: moveTunnel 1s linear infinite;
        }

        .side {
          width: calc(10 * 5vmin);
          height: 70vmin;
          display: flex;
          position: absolute;
          left: -400%;
        }
          .back {
            margin-top: 6%;
            width: 440vmin;
            height: 40vmin;
            background: rgba(0, 0, 0, 0.91);
            box-shadow: 0 0 40px 40px rgba(0, 0, 0, 0.92);
            

          }

        .side:nth-child(1) {
          transform: rotateY(90deg) translateZ(0vmin) translateX(50%);
        }

        .side:nth-child(2) {
          transform: rotateY(90deg) translateZ(-00vmin) translateX(50%);
        }

        .side:nth-child(3) {
          transform: rotateY(90deg) rotateX(90deg) translateZ(40vmin) translateX(50%);
        }

        .side:nth-child(4) {
          transform: rotateY(90deg) rotateX(90deg) translateZ(-30vmin) translateX(10%);
        }

        .side:nth-child(5) {
          width: 100vmin;
          box-shadow:
            0px 0px 40vmin 40vmin rgba(255, 51, 102, 0.3),
            inset 0px 0px 50vmin 20vmin rgba(187, 68, 153, 0.5);
          transform: translateZ(calc(-20 * 10vmin)) translateX(50%);
        }

        .stroke {
          width: 10vmin;
        }

        .square {
          width: 20vmin;
          aspect-ratio: 1;
          border: 4px solid rgb(255, 51, 102);
          filter: blur(2px);
          box-shadow: 0 0 15px 10px rgba(221, 119, 187, 0.41);
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

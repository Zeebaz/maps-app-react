import tulogo from "@/../tulogo.png";
import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Logo = () => {
  const [showInformation, setShowInformation] = useState(false);

  const toggleInformation = () => {
    setShowInformation(true);

    setTimeout(() => {
      setShowInformation(false);
    }, 3000);
  };

  return (
    <>
      {showInformation && (
        <Modal>
          <div
            style={{
              position: "fixed",
              bottom: 20,
              left: 20,
              width: 100,
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <p style={{ color: "white", textAlign: "center", }}>Information about your business</p>
          </div>
        </Modal>
      )}
      <img
        src={tulogo}
        alt="logo"
        className="logo"
        style={{ position: "fixed", bottom: 20, right: 20, width: 100 }}
        onClick={toggleInformation}
      />
    </>
  );
};

const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  const portalNode = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(portalNode);

    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  return ReactDOM.createPortal(children, portalNode);
};

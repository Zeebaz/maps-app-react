import tulogo from "@/../public/tulogo.png";

export const Logo = () => {
  return (
    <img
      src={tulogo}
      alt="logo"
      className="logo"
      style={{ position: "fixed", bottom: 20, right: 20, width: 100 }}
    />
  );
};

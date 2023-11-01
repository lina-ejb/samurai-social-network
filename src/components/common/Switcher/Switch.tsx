import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import s from "./Switch.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { handleDarkMode } from "../../../redux/app-reducer";



function Switch() {
  const dispatch = useAppDispatch();
  const lightMode = useAppSelector<boolean>((state) => state.app.isLightMode);

  const switchToDarkMode = () => {
    if (lightMode) {
      dispatch(handleDarkMode(false));
    } else {
      dispatch(handleDarkMode(true));
    }
  };

  return (
    <>
      <div className={s.darkmode} id={"lightMode"}>
        <input type="checkbox" className={s.checkbox} id="checkbox" onChange={switchToDarkMode}
               checked={lightMode} />
        <label htmlFor="checkbox" className={s.label}>
          <DarkModeIcon style={{ fontSize: "medium" }} />
          <LightModeIcon style={{ fontSize: "medium", color: "yellow" }} />
          <div className={s.ball}></div>
        </label>
      </div>
    </>
  );
}

export default Switch;
import { useAtom } from "jotai";
import { chartsOpenAtom, infoOpenAtom, settingsOpenAtom } from "../atoms/headerAtoms";



export const useHeader = () => {
    const [, setHelpOpen] = useAtom(infoOpenAtom);
    const [, setChartsOpen] = useAtom(chartsOpenAtom);
    const [, setSettingsOpen] = useAtom(settingsOpenAtom);

    const handleSettingsClick = () => {
        setHelpOpen(false);
        setChartsOpen(false);
        setSettingsOpen((value) => (!value));
      };
    
      const handleHelpClick = () => {
        setSettingsOpen(false);
        setChartsOpen(false);
        setHelpOpen((value) => (!value));
      };
    
      const handleChartsClick = () => {
        setSettingsOpen(false);
        setHelpOpen(false);
        setChartsOpen((value) => (!value));
      };

    return [handleSettingsClick, handleHelpClick, handleChartsClick]
}
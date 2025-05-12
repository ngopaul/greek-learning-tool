import { useAtom } from "jotai";
import { chartsOpenAtom, infoOpenAtom, settingsOpenAtom, searchOpenAtom } from "../atoms/headerAtoms";



export const useHeader = () => {
    const [, setHelpOpen] = useAtom(infoOpenAtom);
    const [, setChartsOpen] = useAtom(chartsOpenAtom);
    const [, setSettingsOpen] = useAtom(settingsOpenAtom);
    const [, setSearchOpen]   = useAtom(searchOpenAtom);

    const handleSettingsClick = () => {
        setHelpOpen(false);
        setChartsOpen(false);
        setSearchOpen(false);
        setSettingsOpen((value) => (!value));
      };
    
      const handleHelpClick = () => {
        setSettingsOpen(false);
        setChartsOpen(false);
        setSearchOpen(false);
        setHelpOpen((value) => (!value));
      };
    
      const handleChartsClick = () => {
        setSettingsOpen(false);
        setHelpOpen(false);
        setSearchOpen(false);
        setChartsOpen((value) => (!value));
      };

      const handleSearchClick = () => {
        setSettingsOpen(false);
        setHelpOpen(false);
        setChartsOpen(false);
        setSearchOpen(v => !v);
      };

      return [handleSettingsClick, handleHelpClick, handleChartsClick, handleSearchClick];
}
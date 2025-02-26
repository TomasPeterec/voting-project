import { darkBackground, fCoef } from './generalVariables';

const headerHeight = 40;
const maxContentWidth = 1000;
const sidePadding = 11;
const backgroundCornersRadius = 40 / fCoef;

const styles02 = {
  floatedVisible: {
    position: 'fixed',
    bottom: 150,
    right: 27,
    zIndex: 1000,
    visibility: 'visible',
    borderRadius: '50px',
    height: '50px',
  },
  floatedHidden: {
    visibility: 'hidden',
    height: '0px',
    width: '0px',
  },
  hiddenList20: {
    visibility: 'hidden',
  },
  visibleButton20: {
    visibility: 'visible',
  },
  floatedHiddevisibleButton20n: {
    visibility: 'hidden',
    height: '0px',
  },
  modalListVisible: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'block',
    zIndex: 2000,
  },
  modalSaveVisible: {
    visibility: 'visible',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'block',
    zIndex: 2000,
  },
  modalSaveHidden: {
    visibility: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '0%',
    height: '0%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'block',
    zIndex: 2000,
  },
  separatorFlat: {
    height: '0',
  },
  separatorHigh: {
    height: '14px',
  },
  desktopFormContainerVisible: {
    display: 'block',
  },
  desktopFormContainerHidden: {
    display: 'none',
  },
  displayed: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(32, 32, 32, 0.9)',
    display: 'block',
    zIndex: 2000,
  },
  modalInnerDivMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '10px',
    top: 100,
  },
  modalInnerDivDesk: {
    padding: '0px',
  },
  mainUpperContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: darkBackground,
    paddingBottom: '13px',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    boxSizing: 'border-box',
    borderBottomLeftRadius: backgroundCornersRadius,
    borderBottomRightRadius: backgroundCornersRadius,
  },
  mainBottomContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    boxSizing: 'border-box',
  },
  mainContentContainer: {
    width: '100%',
    maxWidth: maxContentWidth,
  },
  basicButton: {
    border: '0px solid white',
  },
  headerBasic: {
    height: headerHeight,
    backgroundColor: darkBackground,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    boxSizing: 'border-box',
  },
  mainHeaderContainer: {
    width: '100%',
    maxWidth: maxContentWidth,
  },
  innerHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: headerHeight,
  },
  listOfItems: {
    listStyleType: 'none',
    padding: '0px',
    marginTop: '7px',
  },
  buttonNest01: {
    display: 'flex',
    justifyContent: 'center',
  },
  itemStyle: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '48px',
    marginBottom: '7px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 6px #dddddd',
    paddingRight: '4px',
    paddingLeft: '5px',
  },
  itemStyle2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '48px',
    marginBottom: '7px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 6px #dddddd',
    paddingRight: '4px',
    paddingLeft: '4px',
  },
  itemRow: {
    display: 'flex',
  },
  buttonsAlignedToRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  nameOfCurentItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  statusNest: {
    width: '45px',
  },
  textFromLeft: {
    width: '12px',
  },
  nameOfItemOnModal: {
    display: 'flex',
    justifyContent: 'center',
    color: '#dddddd',
  },
  nameOfItemOnModalNest: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'absolute',
    left: '0px',
    top: '0px',
    height: '100%',
    width: '100%',
    zIndex: '10000',
  },
  roundButonNest: {
    display: 'flex',
    width: '42px',
    justifyContent: 'flex-end',
  },
  rounderFrame: {
    backgroundColor: 'white',
    height: '36px',
    width: '36px',
    borderRadius: '18px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#cccccc',
  },
  rounderNoFrame: {
    backgroundColor: 'white',
    height: '36px',
    width: '36px',
    borderRadius: '18px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
  },
  rowIcone: {
    height: '100%',
    width: '100%',
  },
};

export { styles02 };

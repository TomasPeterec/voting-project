const headerHeight = 40
const maxContentWidth = 1000
const sidePadding = 11
const backgroundCornersRadius = 15

const styles02 = {
  floatedVisible: {
    position: 'fixed',
    bottom: 100,
    right: 16,
    zIndex: 1000,
    visibility: 'visible',
    borderRadius: '50px',
    height: '50px'
  },
  floatedHidden: {
    visibility: 'hidden',
    height: '0px'
  },
  separatorFlat: {
    height: '0'
  },
  separatorHigh: {
    height: '14px'
  },
  desktopFormContainerVisible: {
    display: 'block'
  },
  desktopFormContainerHidden: {
    display: 'none'
  },
  displayed: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'block',
    zIndex: 2000
  },
  modalInnerDivMobile: {
    padding: '10px',
    top: 100
  },
  modalInnerDivDesk: {
    padding: '0px'
  },
  mainUpperContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#ddd',
    paddingBottom: '13px',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    boxSizing: 'border-box',
    borderBottomLeftRadius: backgroundCornersRadius,
    borderBottomRightRadius: backgroundCornersRadius
  },
  mainBottomContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    boxSizing: 'border-box'
  },
  mainContentContainer: {
    width: '100%',
    maxWidth: maxContentWidth
  },
  basicButton: {
    border: '0px solid white'
  },
  headerBasic: {
    height: headerHeight,
    backgroundColor: '#bbb',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    boxSizing: 'border-box'
  },
  mainHeaderContainer: {
    width: '100%',
    maxWidth: maxContentWidth
  },
  innerHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: headerHeight
  },
  listOfItems: {
    listStyleType: 'none',
    padding: '0px',
    marginTop: '7px'
  },
  buttonNest01: {
    display: 'flex',
    justifyContent: 'center'
  },
  itemStyle: {
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    marginBottom: '7px'
  },
  itemRow: {
    display: 'flex'
  },
  buttonsAlignedToRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  nameOfCUrentItem: {
    width: '100%',
    display: 'flex'
  },
  statusNest: {
    width: '55px'
  },
  nameOfItemOnModal: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white'
  },
  nameOfItemOnModalNest: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center'
  }
}

export { styles02 }

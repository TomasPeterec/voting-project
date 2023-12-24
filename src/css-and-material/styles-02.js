const styles02 = {
  floatedVisible: {
    position: 'fixed',
    bottom: 100,
    right: 16,
    zIndex: 1000,
    opacity: 1,
    borderRadius: '50%'
  },
  floatedHidden: {
    opacity: 0
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
    paddingBottom: '15px',
    paddingLeft: '10px',
    paddingRight: '10px',
    boxSizing: 'border-box',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px'
  },
  mainBottomContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
    boxSizing: 'border-box'
  },
  mainContentContainer: {
    width: '100%',
    maxWidth: '1000px'
  },
  basicButton: {
    border: '0px solid white'
  }
}

export { styles02 }

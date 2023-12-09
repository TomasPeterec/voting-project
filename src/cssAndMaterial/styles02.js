const styles02 = {
  floatedVIsible: {
    position: 'fixed',
    bottom: 100,
    right: 16,
    zIndex: 1000, // Adjust the z-index to make sure the button appears above other content
    opacity: 100,
  },
  button: {
    borderRadius: '50%',
  },
  floatedHidden: {
    opacity: 0,
  },
  desktopFormContainerVisible: {
    display: "block",
  },
  desktopFormContainerHidden: {
    display: "none",
  },
  verticalGap: {
  },
  displayed: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Black with 50% opacity
    display: 'block',
    zIndex: 2000,
  },
  modalInnerDivMobile: {
    padding: "10px",
    top: 100,
  },
  modalInnerDivDesk: {
    padding: "0px",
  }
};

export { styles02 };
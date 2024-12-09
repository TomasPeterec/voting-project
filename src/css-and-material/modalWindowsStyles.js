const basicModalStyles = {
  nameOfItemOnModalNest: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(32, 32, 32, 0.9)',
    position: 'absolute',
    left: '0px',
    top: '0px',
    height: '100%',
    width: '100%',
    zIndex: '3000',
    textAlign: 'center',
  },
  solidFoundation: {
    padding: 'clamp(10px, 3.466666667vw, 20px)',
    paddingTop: '12px',
    width: 'clamp(300px,95vw,540px)',
    backgroundColor: '#131313',
    borderColor: '#373737',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: 'clamp(20px, 6vw, 37px)',
    borderTopLeftRadius: 'clamp(7.5px, 2.25vw, 15px)',
    borderTopRightRadius: 'clamp(7.5px, 2.25vw, 15px)',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.67)',
  },
  modalHeader: {
    fontSize: 'clamp(17.8px, 5.5vw, 27px)',
    color: '#186DFD',
  },
  modalMessage: {
    fontSize: 'clamp(14px, 4.3vw, 21px)',
    color: '#A1A1A1',
  },
  returnButton: {
    marginTop: '14px',
    fontSize: 'clamp(11px, 3.5vw, 21px)',
    color: '#B7B7B7',
    width: '100%',
    height: 'clamp(43.85px, 11vw, 65px)',
    borderColor: '#5376B1',
    borderWidth: 'clamp(1.78px, 0.55vw, 3.3px)',
    borderStyle: 'solid',
    borderRadius: 'clamp(12px, 3.0vw, 19px)',
  },
  sendButton: {
    marginTop: '14px',
    fontSize: 'clamp(11px, 3.5vw, 21px)',
    color: '#B7B7B7',
    width: '100%',
    height: 'clamp(43.85px, 11vw, 65px)',
    borderColor: '#186DFD',
    borderWidth: 'clamp(1.78px, 0.55vw, 3.3px)',
    borderStyle: 'solid',
    borderRadius: 'clamp(12px, 3.0vw, 19px)',
  },
  confirmDeleteButton: {
    marginTop: '14px',
    fontSize: 'clamp(11px, 3.5vw, 21px)',
    color: '#B7B7B7',
    width: '100%',
    height: 'clamp(43.85px, 11vw, 65px)',
    borderColor: '#BE2122',
    borderWidth: 'clamp(1.78px, 0.55vw, 3.3px)',
    borderStyle: 'solid',
    borderRadius: 'clamp(12px, 3.0vw, 19px)',
  },
  invisibleNostyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: '0px',
    borderWidth: '0px',
  },
  modalRowIcone: {
    margin: 'clamp(12px, 3.0vw, 18px)',
    height: 'clamp(45px, 12.9vw, 69px)',
    width: 'clamp(45px, 12.9vw, 69px)',
  },
  inputStyle: {
    width: '100%',
    backgroundColor: '#131313',
    borderColor: '#6F6E6E',
    borderWidth: '1px',
    height: '40px',
    borderRadius: '9px',
    borderStyle: 'solid',
    color: '#B7B7B7',
    paddingLeft: '10px',
  },
  automaticRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
};

const modalWindowsStyles = {
  ...basicModalStyles,
  sendButtonHover: {
    ...basicModalStyles.sendButton,
    color: '#ffffff',
    borderColor: '#4489FF',
  },
};

// Inject autofill style on document load
const addAutofillStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    input:-webkit-autofill {
      background-color: #131313 !important;
      color: #B7B7B7 !important;
      border-color: #6F6E6E !important;
    }
  `;
  document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', addAutofillStyles);

export { modalWindowsStyles };

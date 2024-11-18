// src/declaration.d.ts

declare module './css-and-material/is-device' {
  const mobileWidth: number; // Adjust the type as needed
  export default mobileWidth;
}

declare module './css-and-material/styles' {
  export const roundedBoxStyles: any; // Specify the correct type if known
  export const mobileStyles: any; // Specify the correct type if known
}

declare module './front/reg-and-login-button' {
  const RegAndLoginButton: React.FC; // Adjust as needed
  export default RegAndLoginButton;
}

declare module './firebaseConfig' {
  const firebaseConfig: any; // Adjust to match your Firebase configuration type
  export default firebaseConfig;
}

declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
}

declare module '*.jpg' {
  import React from 'react';
  const ReactComponent: React.FunctionComponent<React.JPGProps<JPGJPGlement>>;
  export { ReactComponent };
}
